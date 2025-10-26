"use client";

import { useState, useEffect } from "react";

export default function AdminCodesPage() {
  const [codes, setCodes] = useState<{ code: string; name: string }[]>([]);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Load ambassador codes from Upstash via API
  useEffect(() => {
    async function loadCodes() {
      try {
        const res = await fetch("/api/ambassadors", { cache: "no-store" });
        const data = await res.json();
        setCodes(data || []);
      } catch (err) {
        console.error("Error loading codes", err);
      }
    }
    loadCodes();
  }, []);

  // ✅ Add new code
  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!code || !name) return alert("Enter both code and name");
    setLoading(true);
    try {
      await fetch("/api/ambassadors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, name }),
      });
      setCode("");
      setName("");
      const res = await fetch("/api/ambassadors", { cache: "no-store" });
      setCodes(await res.json());
    } catch (err) {
      console.error("Error adding code", err);
    }
    setLoading(false);
  }

  // ✅ Delete code
  async function handleDelete(c: string) {
    if (!confirm(`Delete ${c}?`)) return;
    setLoading(true);
    try {
      await fetch("/api/ambassadors", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: c }),
      });
      const res = await fetch("/api/ambassadors", { cache: "no-store" });
      setCodes(await res.json());
    } catch (err) {
      console.error("Error deleting code", err);
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-white text-neutral-900 p-8">
      <h1 className="text-3xl font-extrabold mb-6">Ambassador Codes</h1>

      {/* Add Form */}
      <form onSubmit={handleAdd} className="flex gap-3 mb-8">
        <input
          placeholder="Referral Code (e.g. KENNY10)"
          className="border border-neutral-300 rounded-xl px-3 py-2"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
        />
        <input
          placeholder="Ambassador Name"
          className="border border-neutral-300 rounded-xl px-3 py-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-neutral-900 text-white rounded-xl px-5 py-2 hover:opacity-90"
        >
          {loading ? "Saving…" : "Add"}
        </button>
      </form>

      {/* Code List */}
      <ul className="space-y-2">
        {codes.map((c) => (
          <li
            key={c.code}
            className="flex justify-between border-b py-2 items-center"
          >
            <span>
              <b>{c.code}</b> — {c.name}
            </span>
            <button
              onClick={() => handleDelete(c.code)}
              className="text-red-500 hover:underline text-sm"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {codes.length === 0 && (
        <p className="text-neutral-500 mt-6">No ambassador codes found yet.</p>
      )}
    </div>
  );
}