import { json } from "stream/consumers";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { tags } from "@/utils/http";
import { revalidateTag } from "next/cache";

export async function POST(req: Request, res: NextApiResponse) {
    const secretKey = process.env.CACHE_SECRET_KEY;
    const header = req.headers;

    const { tag } = (await req.json()) as Record<string, string>;

    if (req.method !== "POST") {
        return NextResponse.json(
            {
                message: "Method Not Allowed",
            },
            { status: 405 }
        );
    }
    if (header.get("Authorization") !== secretKey) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!tag) {
        return NextResponse.json({ message: "Missing tag" }, { status: 400 });
    }

    if (!Object.keys(tags).includes(tag)) {
        return NextResponse.json(
            {
                message: `The tags do not match: (${Object.keys(tags).join(
                    ", "
                )})`,
            },
            { status: 422 }
        );
    }

    // console.log(tag);

    try {
        revalidateTag(tag);
        return NextResponse.json({
            message: `Cache revalidated for ${tag}`,
        });
        // await fetch("http://localhost:3000/", {
        //     method: "PURGE",
        //     headers: {
        //         "x-next-cache-tag": tag,
        //     },
        // });
    } catch (error) {
        return NextResponse.json(
            { message: "Error revalidating", error },
            { status: 500 }
        );
    }
}
