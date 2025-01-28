import pool from "@/lib/database";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ uuid: string }> }) {
    const uuid = (await params).uuid;
    if (!uuid) {
        return new Response(null, { status: 400 });
    }
    const image = await getImage(uuid);
    if (!image) {
        return new Response(null, { status: 404 });
    }

    const match = image.match(/^data:(.+);base64,(.+)$/);
    if (!match) {
        return new Response(null, { status: 500 });
    }
    
    const mimeType = match[1];
    const base64Data = match[2];
    
    const buffer = Buffer.from(base64Data, "base64");

    return new Response(buffer, {
        headers: {
            'Content-Type': mimeType,
        },
    });
}

async function getImage(uuid: string) {
    if(!pool) {
        return null;
    }
    const [rows]: any = await pool.query(`SELECT image FROM images WHERE uuid = ?`, [uuid]);
    if(rows.length > 0) {
        return rows[0].image;
    }
    return null;
}