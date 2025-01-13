import variables from "@/lib/variables";
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const res = new NextResponse();

  res.cookies.delete('access_token');

  return res;
}