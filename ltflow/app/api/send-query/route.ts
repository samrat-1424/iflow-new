import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const cmsToken = process.env.STRAPI_ACCESS_TOKEN || process.env.NEXT_PUBLIC_STRAPI_TOKEN;
    
    if (!cmsToken) {
      console.error("Missing Strapi Token in environment variables!");
      return NextResponse.json(
        { error: "Configuration error: Missing API token" },
        { status: 500 }
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL?.endsWith('/') 
      ? process.env.NEXT_PUBLIC_STRAPI_URL 
      : `${process.env.NEXT_PUBLIC_STRAPI_URL}/`;
      
    const strapiUrl = `${baseUrl}queries`;
    
    console.log("Strapi URL:", strapiUrl);
    console.log("Token length:", cmsToken?.length);
    console.log("Token starts with:", cmsToken?.substring(0, 5));

    const payload = { data: body };

    const res = await fetch(strapiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cmsToken}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Strapi error (${res.status}):`, errorText);
      return NextResponse.json(
        { error: `Strapi error: ${res.status}`, details: errorText },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error sending query:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
