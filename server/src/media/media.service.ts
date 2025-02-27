import {
	deleteObject,
	getDownloadURL,
	getStorage,
	ref,
	uploadBytes,
} from 'firebase/storage';
import { HTTPException } from 'hono/http-exception';
import { MediaGetDTO } from './interface/MediaGetDTO'; // import fs from "node:fs/promises";
import prismaClient from '../prismaClient';
import { Media, Prisma } from '@prisma/client';
import { MainService } from '../utils/service/main.service';
import { QueryParameterTypes } from '../utils/service/service.type';
import path from 'node:path';
import fs from 'node:fs';
import { QueryParamHandler } from '../utils/query-params/QueryParams.service';

interface FileData {
	fileExtension: string;
	fileDirectory: string;
}

class MediaOptions {}

class MediaService {
	private mainService = new MainService();
	private queryParams = new QueryParamHandler();

	protected supportedMimeTypes: Map<string, FileData> = new Map();

	constructor() {
		this.setupMimeTypes();
	}

	public setupMimeTypes(): void {
		this.supportedMimeTypes
			.set('image/png', {
				fileExtension: '.png',
				fileDirectory: 'image/png',
			})
			.set('image/jpeg', {
				fileExtension: '.jpg',
				fileDirectory: 'image/jpg',
			});
	}

	protected getUrl(fileData: FileData, fileName: string): string {
		const url: string[] = ['nayzak-images'];
		url.push(fileData.fileDirectory);
		url.push(fileName + fileData.fileExtension);
		return url.join('/');
	}

	private async deleteToFirebase(url?: string) {
		const storage = getStorage();
		const storageRef = ref(storage, url);
		return await deleteObject(storageRef);
	}

	private async getUniqueFileName(baseName: string) {
		let uniqueFileName = baseName;

		const media = await prismaClient.media.findMany({
			where: {
				OR: [
					{ name: uniqueFileName },
					{ name: { startsWith: `${uniqueFileName}[` } },
				],
			},
		});

		for (let i = 0; i < media.length; i++) {
			uniqueFileName = `${baseName}[${i + 1}]`;
		}

		return uniqueFileName;
	}

	async getAll(inputData: QueryParameterTypes) {
		const take = this.queryParams.limit(inputData);
		const skip = this.queryParams.offset(inputData);
		const orderBy =
			this.queryParams.orderBy<Prisma.MediaOrderByWithRelationInput>(
				inputData,
				Prisma.MediaScalarFieldEnum
			);
		const where = this.queryParams.filter<Prisma.MediaWhereInput>(
			inputData,
			Prisma.MediaScalarFieldEnum
		);

		const queryParams: Prisma.MediaFindManyArgs = {
			take,
			orderBy,
			skip,
			where,
		};

		const media = await prismaClient.media.findMany(queryParams);
		const totalCount = await prismaClient.media.count();

		return { totalCount, media };
	}

	async getOne(mediaId: string) {
		return prismaClient.media.findFirst({ where: { id: +mediaId } });
	}

	async uploadMedia(data: MediaGetDTO) {
		const fileData = this.supportedMimeTypes.get(data.file.type);

		if (!fileData)
			throw new HTTPException(415, { message: 'Unsupported Media Type' });

		const storage = getStorage();

		const currentFileName = data.fileName
			? data.fileName
					.trim()
					.replaceAll(fileData.fileExtension, '')
					.replaceAll(/[ _/.]/g, '-')
			: data.file.name
					.trim()
					.replaceAll(fileData.fileExtension, '')
					.replaceAll(/[ _/.]/g, '-');

		const uniqueFileName = await this.getUniqueFileName(currentFileName);

		const uploadURL = this.getUrl(fileData, uniqueFileName);

		const storageRef = ref(storage, uploadURL);

		await uploadBytes(storageRef, data.file);

		const downloadURL = await getDownloadURL(storageRef);

		return prismaClient.media.create({
			data: {
				name: uniqueFileName,
				src: downloadURL,
				description: data.description,
			},
		});
	}

	async uploadMediaToLocalHost(data: MediaGetDTO) {
		const fileData = this.supportedMimeTypes.get(data.file.type) as FileData;

		const fileName =
			data.fileName.replaceAll(/[ _/.]/g, '-') + fileData.fileExtension;

		const currentFileName = fileName ? fileName : data.file.name;

		try {
			const uploadDir = path.join(
				process.cwd(),
				'static',
				fileData.fileDirectory,
				currentFileName
			);
			const dirPath = path.dirname(uploadDir);

			fs.access(dirPath, (err) => {
				if (err)
					fs.mkdir(dirPath, (err) => {
						console.error(err);
					});
			});

			const chunk = await data.file
				.stream()
				.getReader()
				.read()
				.then(({ value }) => value);

			fs.createWriteStream(uploadDir).write(chunk);
		} catch (e) {
			console.log(e);
		}
	}

	async getMedialToLocalHost() {
		const uploadDir = path.join(process.cwd(), 'static');

		console.log(true);

		// const readStream = fs.createReadStream(uploadDir);
		// console.log(readStream);

		// readStream
		//   .on("ready", (event) => {
		//     console.log(event);
		//   })
		//   .on("error", (err) => {
		//     console.log(err);
		//   })
		//   .end(() => {
		//     console.log("stream end");
		//   });
		return;
	}

	async deleteMedia(mediaId: number | number[]) {
		const supportedMapTypes = new Map<
			string,
			(media: any) => Promise<number | number[]>
		>()
			.set('Array', async (media: Media[]) => {
				const arrId: number[] = [];

				for (const key of media) {
					await this.deleteToFirebase(key.src);
					arrId.push(key.id);
				}

				return arrId;
			})
			.set('Object', async (media: Media) => {
				await this.deleteToFirebase(media.src);
				return media.id;
			});

		const media = await this.mainService.delete<Media | Media[]>(
			'Media',
			mediaId
		);

		if (!media) return;
		for (const [key, value] of supportedMapTypes) {
			if (media.constructor.name.includes(key)) {
				return await value(media);
			}
		}
	}
}

export default new MediaService();
