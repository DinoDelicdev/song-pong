import { createNewGame } from "@/app/utils";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Assuming you want to log the request body
    const body = await req.json();
    console.log("Request Body:", body);

    const game = await createNewGame(body.senderEmail, body.recieverEmail);
    console.log("FROM SUPA", game);

    return NextResponse.json({ game: game });
  } catch (error) {
    console.error("Error handling POST request:", error);
    return NextResponse.json({ error: "Internal Server Error" });
  }
}
