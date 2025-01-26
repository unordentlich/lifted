import db from "@/lib/database";
import { validatePassword } from "@/lib/encryption";
import { generateToken } from "@/lib/jwtUtils";
import { RowDataPacket } from "mysql2";
import { NextApiResponse } from "next";


export async function POST(req: Request) {
  const url = req.url ? new URL(req.url) : null;

  const { identifier, password } = await req.json();

  try {
    if (db) {
      const [rows] = await db.query<{uuid: string, email: string, password_hash: string} & RowDataPacket[]>('SELECT * FROM users WHERE email = ? OR username = ?', [identifier, identifier]);
      const user = rows[0];

      if (!user) {
        return new Response(JSON.stringify({ message: 'Invalid email or password' }), { status: 401 });
      }

      const isPasswordValid = await validatePassword(password, user.password_hash);

      if (!isPasswordValid) {
        return new Response(JSON.stringify({ message: 'Invalid email or password' }), { status: 401 });
      }

      const token = await generateToken({ uuid: user.uuid, username: user.username, displayname: user.display_name, email: user.email });

      return new Response(JSON.stringify({ token: token }), { status: 200 });
    }
  } catch (error) {
    console.log(error);
  }

  return new Response(JSON.stringify({ message: "An error occurred while trying to log you in" }), { status: 500 });
}