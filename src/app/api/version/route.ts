import { NextResponse } from "next/server";

export const revalidate = 3600; // Revalidate setiap 1 jam

export async function GET() {
  try {
    const response = await fetch("https://registry.npmjs.org/canxjs/latest", {
      next: { revalidate: 3600 }, // Cache 1 jam
    });

    if (!response.ok) {
      // Fallback ke versi default jika npm tidak tersedia
      return NextResponse.json({ version: "1.6.2" });
    }

    const data = await response.json();
    return NextResponse.json({ version: data.version });
  } catch {
    // Fallback jika error
    return NextResponse.json({ version: "1.6.0" });
  }
}
