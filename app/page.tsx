"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  const [birthYear, setBirthYear] = useState("");

  useEffect(() => {
    const verified = localStorage.getItem("ageVerified");
    if (verified === "true") {
      setIsVerified(true);
    } else {
      setIsVerified(false);
    }
  }, []);

  const handleSubmit = () => {
    const currentYear = new Date().getFullYear();
    const age = currentYear - parseInt(birthYear);
    if (age >= 21) {
      localStorage.setItem("ageVerified", "true");
      setIsVerified(true);
    } else {
      alert("You must be 21 or older to enter this website.");
    }
  };

  if (isVerified === false) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/90 text-white z-50 p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Age Verification Required</h1>
        <p className="max-w-2xl mb-4 text-sm leading-relaxed text-gray-300">
          All products offered by NexaPeptides are intended exclusively for laboratory
          research and in vitro use. They are not approved for human or animal
          consumption, medical, diagnostic, therapeutic, or cosmetic applications.
          These compounds have not been evaluated by the U.S. Food and Drug
          Administration (FDA) for safety or efficacy in any context. NexaPeptides is
          not a compounding pharmacy; it is a chemical supplier. NexaPeptides is not a
          chemical compounding facility as defined under Section 503a of the Federal
          Food, Drug, and Cosmetic Act, nor is NexaPeptides an outsourcing facility as
          defined under Section 503b of the same Act. Any misuse, unauthorized
          distribution, or deviation from these terms may violate federal or state laws
          and is strictly prohibited. By proceeding, you agree to indemnify and hold
          NexaPeptides harmless from any claims, liabilities, or damages arising from
          the improper use of our products.
        </p>

        <div className="flex flex-col items-center">
          <label className="mb-2 text-sm text-gray-300">Enter your birth year:</label>
          <input
            type="number"
            value={birthYear}
            onChange={(e) => setBirthYear(e.target.value)}
            placeholder="e.g. 2003"
            className="mb-4 px-3 py-2 rounded text-black text-center w-32"
          />
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-white text-black rounded-md font-semibold hover:bg-gray-200 transition"
          >
            Enter Site
          </button>
        </div>
      </div>
    );
  }

  if (!isVerified) return null;

  // Your normal homepage content goes below
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-12 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to NexaPeptidesRX</h1>
      <p className="max-w-xl text-gray-600">
        Premium research-grade peptides and compounds for laboratory use only.
      </p>
    </main>
  );
}
