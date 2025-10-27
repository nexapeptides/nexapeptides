import { NextResponse } from "next/server";

export const runtime = "edge"; // optional — can keep or remove

export async function GET() {
  try {
    const url = process.env.KV_REST_API_URL;
    const token = process.env.KV_REST_API_TOKEN;

    if (!url || !token) {
      console.error("⚠ No Upstash creds in env. Using fallback list.");
      const fallback = [
        { code: "KENNY10", name: "Kenneth Lopez" },
        { code: "TEST10", name: "Demo Ambassador" },
        { code: "TITAN", name: "Brady Gryffin" },
        { code: "SIMON10", name: "Simon Freed" },
        { code: "LXRRY", name: "Larry Lianito" },
        { code: "WHEYTOOHOT", name: "Sophia Banik" },
      ];
      return NextResponse.json(fallback, { status: 200 });
    }

    const res = await fetch(`${url}/hgetall/ambassador_codes`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("❌ Upstash fetch failed:", res.status, res.statusText);
      return NextResponse.json([], { status: 500 });
    }

    const data = await res.json();
    const formatted = Object.entries(data).map(([code, name]) => ({
      code,
      name: String(name),
    }));

    return NextResponse.json(formatted, { status: 200 });
  } catch (err) {
    console.error("🔥 Error in /api/ambassadors:", err);
    return NextResponse.json([], { status: 500 });
  }
}