import { NextResponse } from "next/server";

export const runtime = "edge"; // run close to user

export async function GET() {
  try {
    const url = process.env.KV_REST_API_URL;
    const token = process.env.KV_REST_API_TOKEN;

    // if env vars aren't there in prod, don't crash — just return fallback
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

    // normal path: pull live data from Upstash
    const res = await fetch(`${url}/hgetall/ambassador_codes`, {
      headers: { Authorization: `Bearer ${token}` },
      // make sure we don't cache stale codes
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("❌ Upstash fetch failed:", res.status, res.statusText);

      return NextResponse.json(
        [],
        {
          status: 500,
        }
      );
    }

    const data = await res.json(); // { "KENNY10": "Kenneth Lopez", "TITAN": "Brady Gryffin", ... }

    // convert object -> array of {code, name}
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