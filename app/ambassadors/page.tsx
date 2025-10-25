"use client";

import { useState } from "react";

export default function AmbassadorsPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement & {
      [key: string]: HTMLInputElement;
    };

    const name = form.fullName.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const instagram = form.instagram.value;
    const tiktok = form.tiktok.value;
    const code = form.code.value.toUpperCase();

    const subject = `New Ambassador Application — ${name}`;
    const body = `
Name: ${name}
Email: ${email}
Phone: ${phone}
Instagram: ${instagram}
TikTok: ${tiktok}
Requested Discount Code: ${code}

Terms:
By applying, the ambassador agrees to promote NexaPeptidesRX. 
Approved codes will provide 10% off for customers and 10% commission to the ambassador.
    `.replace(/\n/g, "%0D%0A");

    window.location.href = `mailto:nexapeptides@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${body}`;

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black text-center p-6">
        <div className="bg-neutral-900 text-white rounded-2xl shadow-2xl p-8 max-w-md border border-neutral-800">
          <h1 className="text-2xl font-bold mb-4 text-white">
            Application Submitted ✅
          </h1>
          <p className="text-neutral-400">
            Your ambassador application has been sent. We’ll review it and get
            back to you shortly.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full bg-neutral-900 p-8 rounded-2xl shadow-2xl border border-neutral-800 text-white">
        <h1 className="text-3xl font-bold text-center mb-6 text-white">
          Become a NexaPeptides Ambassador
        </h1>
        <p className="text-sm text-neutral-400 text-center mb-6">
          Earn 10% commission for every order placed using your custom 10% off
          code. Fill out the form below to apply.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="fullName"
            type="text"
            required
            placeholder="Full Name"
            className="w-full border border-neutral-700 bg-neutral-950 text-white rounded-xl px-3 py-2 placeholder-neutral-500"
          />
          <input
            name="email"
            type="email"
            required
            placeholder="Email"
            className="w-full border border-neutral-700 bg-neutral-950 text-white rounded-xl px-3 py-2 placeholder-neutral-500"
          />
          <input
            name="phone"
            type="text"
            required
            placeholder="Phone Number"
            className="w-full border border-neutral-700 bg-neutral-950 text-white rounded-xl px-3 py-2 placeholder-neutral-500"
          />
          <input
            name="instagram"
            type="text"
            placeholder="Instagram Handle"
            className="w-full border border-neutral-700 bg-neutral-950 text-white rounded-xl px-3 py-2 placeholder-neutral-500"
          />
          <input
            name="tiktok"
            type="text"
            placeholder="TikTok Handle"
            className="w-full border border-neutral-700 bg-neutral-950 text-white rounded-xl px-3 py-2 placeholder-neutral-500"
          />
          <input
            name="code"
            type="text"
            required
            placeholder="Preferred Discount Code (e.g. KENNY10)"
            className="w-full border border-neutral-700 bg-neutral-950 text-white rounded-xl px-3 py-2 uppercase placeholder-neutral-500"
          />
          <button
            type="submit"
            className="w-full bg-white text-black py-2 rounded-xl font-semibold hover:opacity-90 transition"
          >
            Submit Application
          </button>
        </form>

        <p className="text-xs text-neutral-500 mt-6 text-center">
          You’ll receive a confirmation and approval email once reviewed.
        </p>
      </div>
    </main>
  );
}
