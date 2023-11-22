import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get("query");

        if (!query) {
            return new NextResponse(
                JSON.stringify({ error: "URL is required" }),
                {
                    status: 400,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }

        const response = await axios.get(query);
        const html = response.data;

        const $ = cheerio.load(html);
        const metaData = {
            title: $('meta[property="og:title"]').attr("content"),
            description: $('meta[property="og:description"]').attr("content"),
            imageUrl: $('meta[property="og:image"]').attr("content"),
        };
        return new NextResponse(JSON.stringify(metaData), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error fetching data from surfsite.ai:", error);
        return new NextResponse(
            JSON.stringify({ error: "Internal Server Error" }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}
