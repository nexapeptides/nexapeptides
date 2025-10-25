"use client";

import { useState, useEffect } from "react";

/**
 * Simple owner dashboard:
 * - Protects with a password prompt
 * - Lets you VIEW, ADD, and DELETE approved ambassador codes
 * - Saves them to localStorage as "approvedAmbassadorCodes"
 *
 * NOTE: This is local-only. It doesn't talk to a server or database.
 * It's meant to give you control for now.
 */

const OWNER_PASSWORD = "nexa-owner-2025"; // <- change this to whatever you want

export default function AdminCodesPage() {
  // auth gate
  const [authed, setAuthed] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");

  // codes
  const [codes, setCodes] = useState<string[]>([]);
  const [newCode, setNewCode] = useState("");

  // load from localStorage (runs once after auth passes)
  useEffect(() => {
    if (!authed) return;
    try {
      const stored = localStorage.getItem("approvedAmbassadorCodes");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setCodes(parsed);
        }
      }
    } catch (err) {
      console.error("Failed to load codes from storage", err);
    }
  }, [authed]);

  // save to localStorage whenever codes change
  useEffect(() => {
    if (!authed) return;
    localStorage.setItem(
      "approvedAmbassadorCodes",
      JSON.stringify(codes.map((c) => c.toUpperCase()))
    );
  }, [codes, authed]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === OWNER_PASSWORD) {
      setAuthed(true);
    } else {
      alert("Incorrect password");
    }
  };

  const addCode = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = newCode.trim().toUpperCase();
    if (!cleaned) return;
    if (codes.includes(cleaned)) {
      alert("That code already exists.");
      return;
    }
    setCodes((prev) => [...prev, cleaned]);
    setNewCode("");
  };

  const removeCode = (target: string) => {
    setCodes((prev) => prev.filter((c) => c !== target));
  };

  // If not logged in, show password screen
  if (!authed) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black text-white p-6">
        <div className="bg-neutral-900 border border-neutral-700 rounded-2xl p-8 max-w-sm w-full shadow-2xl">
          <h1 className="text-xl font-bold text-center mb-4">
            Admin Access
          </h1>
          <p className="text-sm text-neutral-400 text-center mb-6">
            Owner verification required.
          </p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="Password"
              className="w-full border border-neutral-700 bg-neutral-950 text-white rounded-xl px-3 py-2 placeholder-neutral-500"
            />
            <button
              type="submit"
              className="w-full bg-white text-black py-2 rounded-xl font-semibold hover:opacity-90 transition"
            >
              Enter Dashboard
            </button>
          </form>
        </div>
      </main>
    );
  }

  // Logged in view
  return (
    <main className="min-h-screen flex flex-col items-center justify-start bg-black text-white p-6">
      <div className="w-full max-w-lg bg-neutral-900 border border-neutral-700 rounded-2xl shadow-2xl p-8">
        <h1 className="text-2xl font-bold text-white text-center mb-2">
          Ambassador Codes
        </h1>
        <p className="text-sm text-neutral-400 text-center mb-6">
          These codes get 10% off for the buyer and 10% commission for the
          code owner. Editing this list updates checkout instantly (on this
          device / browser).
        </p>

        {/* Add a new code */}
        <form onSubmit={addCode} className="flex gap-2 mb-6">
          <input
            value={newCode}
            onChange={(e) => setNewCode(e.target.value)}
            placeholder="NEWCODE10"
            className="flex-1 border border-neutral-700 bg-neutral-950 text-white rounded-xl px-3 py-2 uppercase placeholder-neutral-600"
          />
          <button
            type="submit"
            className="bg-white text-black font-semibold rounded-xl px-4 py-2 hover:opacity-90"
          >
            Add
          </button>
        </form>

        {/* Current codes list */}
        {codes.length === 0 ? (
          <p className="text-neutral-500 text-sm text-center">
            No approved codes yet.
          </p>
        ) : (
          <ul className="space-y-2">
            {codes.map((code) => (
              <li
                key={code}
                className="flex items-center justify-between bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-sm"
              >
                <span className="font-mono text-white">{code}</span>
                <button
                  onClick={() => removeCode(code)}
                  className="text-red-400 text-xs font-semibold hover:text-red-300"
                >
                  remove
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="text-[10px] text-neutral-500 mt-6 leading-relaxed">
          Reminder: This dashboard saves codes in this browser only using
          localStorage. To use the same list on another device, log in there
          and re-add the codes. A future upgrade can move this to a shared
          database so it syncs automatically.
        </div>
      </div>

      <a
        href="/"
        className="mt-8 text-xs text-neutral-400 underline hover:text-white"
      >
        ← Back to Store
      </a>
    </main>
  );
}