import { NextResponse } from "next/server";

const API_URL = process.env.KV_REST_API_URL!;
const API_TOKEN = process.env.KV_REST_API_TOKEN!;

/**
 * GET  → fetch all ambassador codes
 * POST → add a new ambassador code
 * DELETE → remove an ambassador code
 */

export async function GET() {
  try {
    const res = await fetch(`${API_URL}/get/ambassador_codes`, {
      headers: { Authorization: `Bearer ${API_TOKEN}` },
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json([]);
    }

    const { result } = await res.json();
    return NextResponse.json(result ? JSON.parse(result) : []);
  } catch (err) {
    console.error("Failed to load ambassadors:", err);
    return NextResponse.json([]);
  }
}

export async function POST(request: Request) {
  try {
    const { code, name } = await request.json();

    // get existing list
    const res = await fetch(`${API_URL}/get/ambassador_codes`, {
      headers: { Authorization: `Bearer ${API_TOKEN}` },
      cache: "no-store",
    });

    const { result } = res.ok ? await res.json() : { result: "[]" };
    const list = result ? JSON.parse(result) : [];

    // add new one
    const updated = [
      ...list.filter((c: any) => c.code.toUpperCase() !== code.toUpperCase()),
      { code: code.toUpperCase(), name },
    ];

    await fetch(`${API_URL}/set/ambassador_codes`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updated),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("POST error:", err);
    return NextResponse.json({ success: false });
  }
}

export async function DELETE(request: Request) {
  try {
    const { code } = await request.json();

    const res = await fetch(`${API_URL}/get/ambassador_codes`, {
      headers: { Authorization: `Bearer ${API_TOKEN}` },
      cache: "no-store",
    });

    const { result } = res.ok ? await res.json() : { result: "[]" };
    const list = result ? JSON.parse(result) : [];

    const updated = list.filter(
      (c: any) => c.code.toUpperCase() !== code.toUpperCase()
    );

    await fetch(`${API_URL}/set/ambassador_codes`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updated),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE error:", err);
    return NextResponse.json({ success: false });
  }
}