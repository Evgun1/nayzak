import { Hono } from 'hono';
import mediaController from './media.controller';
import validation from '../validator/validation';
import { serveStatic } from '@hono/node-server/serve-static';
import customValidator from '../validator/customValidator';
import mediaMiddleware from './media.middleware';

const mediaRoute = new Hono();

const schemaParam = new Map().set('mediaId', validation().global.number);

mediaRoute.get('/', mediaController.getAll);
mediaRoute.get('/:mediaId', mediaController.getOne);

mediaRoute.post('/upload', mediaController.uploadMedia);

mediaRoute.delete(
	'/',
	customValidator('param', schemaParam),
	mediaMiddleware.deleteMedia,
	mediaController.deleteMedia
);

mediaRoute.get('/local-host', mediaController.getMediaToLocalHost);
mediaRoute.post('/upload/local-host', mediaController.uploadMediaToLocalHost);

export default mediaRoute;
