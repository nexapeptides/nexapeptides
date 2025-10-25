"use client";
import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, ShoppingCart, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const LOGO_SRC = "/logo-nexa.png";
const BRAND = {
  name: "Nexa Peptides",
  tagline: "Precision Research Compounds",
  phone: "(941) 405-7808",
  phoneHref: "+19414057808",
  email: "nexapeptides@gmail.com",
  location: "Bradenton • Sarasota • Florida",
};

// ---------------------------
// PRODUCT LIST
// ---------------------------
const PRODUCTS = [
  { sku: "SEMAG-5MG", name: "Semaglutide 5mg", price: 60, desc: "GLP-1 agonist for appetite suppression and long-term weight management.", category: "Weight Loss" },
  { sku: "SEMAG-10MG", name: "Semeg 10mg", price: 85, desc: "Higher-dose semaglutide for extended appetite control and metabolic support.", category: "Weight Loss" },
  { sku: "TIRZ-10MG", name: "Tirzepatide 10mg", price: 100, desc: "Dual GLP-1/GIP agonist supporting appetite control, fat loss, and insulin sensitivity.", category: "Weight Loss" },
  { sku: "RETA-10MG", name: "Retatrutide 10mg", price: 100, desc: "Advanced multi-pathway compound for powerful weight loss and glycemic support.", category: "Weight Loss" },
  { sku: "BPC-5MG", name: "BPC-157 5mg", price: 40, desc: "Healing peptide supporting tendon, ligament, and soft-tissue recovery.", category: "Healing & Recovery" },
  { sku: "TB500-5MG", name: "TB-500 5mg", price: 45, desc: "Aids recovery, helps reduce inflammation, and supports injury healing.", category: "Healing & Recovery" },
  { sku: "BPCTB-10MG", name: "BPC + TB 10mg", price: 75, desc: "Combo of healing peptides for faster recovery and reduced inflammation.", category: "Healing & Recovery" },
  { sku: "IGF-LR3-1MG", name: "IGF-1 LR3 1mg", price: 125, desc: "Growth factor studied for muscle growth, recovery, and fat loss.", category: "Muscle & Performance" },
  { sku: "IPAM-5MG", name: "Ipamorelin 5mg", price: 45, desc: "Stimulates GH release — recovery, sleep, and lean mass.", category: "Muscle & Performance" },
  { sku: "CJC-DAC-5MG", name: "CJC w/ DAC 5mg", price: 45, desc: "Long-acting GHRH analog studied for increased GH levels and fat loss.", category: "Muscle & Performance" },
  { sku: "MK677-25MG-50CT", name: "MK-677 25mg (50 ct)", price: 75, desc: "Secretagogue studied for GH release, sleep, recovery, and fullness.", category: "Muscle & Performance" },
  { sku: "SLUPP-5MG", name: "SLU-PP 5mg", price: 55, desc: "Myostatin-pathway research compound explored for new muscle growth.", category: "Muscle & Performance" },
  { sku: "CARD-10MG", name: "Cardarine 10mg", price: 75, desc: "PPARδ agonist investigated for endurance, fat metabolism, and cardio performance.", category: "Muscle & Performance" },
  { sku: "TESA-5MG", name: "Tesamorelin 5mg", price: 45, desc: "GHRH analog studied for reductions in visceral adipose tissue.", category: "Muscle & Performance" },
  { sku: "SEMAX-5MG", name: "Semax 5mg", price: 45, desc: "Nootropic peptide researched for focus, cognition, and mood.", category: "Cognitive & Mood" },
  { sku: "SELANK-5MG", name: "Selank 5mg", price: 45, desc: "Peptide studied for anxiolytic effects and calm focus.", category: "Cognitive & Mood" },
  { sku: "DSIP-5MG", name: "DSIP 5mg", price: 55, desc: "Peptide explored for deep sleep and stress reduction.", category: "Cognitive & Mood" },
  { sku: "OXY-2MG", name: "Oxytocin 2mg", price: 45, desc: "Neuropeptide associated with social bonding; offered strictly for research.", category: "Cognitive & Mood" },
  { sku: "NAD-500MG", name: "NAD+ 500mg", price: 100, desc: "Studied for cellular energy and mitochondrial health.", category: "Anti-Aging" },
  { sku: "EPITH-10MG", name: "Epithalon 10mg", price: 45, desc: "Investigated for longevity, sleep, and immune support.", category: "Anti-Aging" },
  { sku: "GSH-1500MG", name: "Glutathione 1500mg", price: 45, desc: "Master antioxidant studied for detoxification and skin health.", category: "Anti-Aging" },
  { sku: "GHKCU-50MG", name: "GHK-Cu 50mg", price: 85, desc: "Copper peptide studied for skin, hair, and tissue regeneration.", category: "Anti-Aging" },
  { sku: "MOTC-10MG", name: "MOT-C 10mg", price: 50, desc: "Mitochondrial peptide explored for energy and metabolic support.", category: "Anti-Aging" },
  { sku: "PT141-10MG", name: "PT-141 10mg", price: 65, desc: "Peptide investigated for libido enhancement.", category: "Libido" },
  { sku: "MT2", name: "MT2", price: 35, desc: "Tanning peptide that darkens pigmentation; mild libido benefits reported.", category: "Libido" },
  { sku: "CIALIS-20MG-50CT", name: "Cialis 20mg (50 ct)", price: 60, desc: "PDE5 inhibitor researched for blood-flow effects.", category: "Libido" },
  { sku: "CLEN-200-30ML", name: "Liquid Clen 200 mcg/ml 30ml", price: 100, desc: "Studied for thermogenesis and metabolism.", category: "Other" },
  { sku: "HCG-5000IU", name: "HCG 5000 IU amps", price: 50, desc: "Gonadotropin; research on testosterone production.", category: "Other" },
  { sku: "BACW-30ML", name: "Bacteriostatic Water 30 ml", price: 1, desc: "Sterile diluent for peptide reconstitution.", category: "Other" },
  { sku: "KIT-HCG-5000IU", name: "HCG 5000 IU Kit", price: 450, desc: "Post-cycle research kit for hormone recovery.", category: "Kits" },
  { sku: "KIT-TIRZ-10MG", name: "Tirzepatide 10 mg Kit", price: 625, desc: "Full course kit for long-term appetite control.", category: "Kits" },
  { sku: "KIT-RETA-10MG", name: "Retatrutide 10 mg Kit", price: 625, desc: "Complete multi-pathway weight-management research kit.", category: "Kits" },
  { sku: "KIT-SEMAG-5MG", name: "Semeg 5 mg Kit", price: 325, desc: "Semaglutide-based kit for appetite suppression.", category: "Kits" },
  { sku: "KIT-BPC-5MG", name: "BPC-157 5 mg Kit", price: 325, desc: "Extended supply for injury-healing research support.", category: "Kits" },
  { sku: "KIT-TB500-10MG", name: "TB-500 10 mg Kit", price: 350, desc: "Full healing protocol kit for recovery research.", category: "Kits" },
];

export default function NexaPeptidesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // -----------------------------
  // AGE VERIFICATION
  // -----------------------------
  const [isVerified, setIsVerified] = useState(false);
  const [birthYear, setBirthYear] = useState("");
  useEffect(() => {
    if (localStorage.getItem("ageVerified") === "true") setIsVerified(true);
  }, []);
  const handleSubmitAgeGate = () => {
    const currentYear = new Date().getFullYear();
    if (currentYear - parseInt(birthYear) >= 21) {
      localStorage.setItem("ageVerified", "true");
      setIsVerified(true);
    } else alert("You must be 21 or older to enter this website.");
  };

  // -----------------------------
  // CART + DISCOUNTS + REFERRALS
  // -----------------------------
  const [cart, setCart] = useState<{ sku: string; qty: number }[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [approvedCodes, setApprovedCodes] = useState<string[]>([]);

  // load ambassador codes
  useEffect(() => {
    const stored = localStorage.getItem("approvedAmbassadorCodes");
    if (stored) setApprovedCodes(JSON.parse(stored).map((c: string) => c.toUpperCase()));
    else setApprovedCodes(["KENNY10", "JAY10", "SARAH10", "NEXA10"]);
  }, []);

  // auto-apply ?ref=CODE from URL
  useEffect(() => {
    const ref = searchParams.get("ref");
    if (ref) setDiscountCode(ref.toUpperCase());
  }, [searchParams]);

  const subtotal = useMemo(() => cart.reduce((s, i) => {
    const p = PRODUCTS.find((x) => x.sku === i.sku);
    return p ? s + p.price * i.qty : s;
  }, 0), [cart]);

  const isCodeValid = useMemo(() =>
    discountCode && approvedCodes.includes(discountCode.toUpperCase()),
    [discountCode, approvedCodes]);

  const discountAmount = isCodeValid ? subtotal * 0.1 : 0;
  const finalTotal = subtotal - discountAmount;

  const addToCart = (sku: string) =>
    setCart((p) => {
      const i = p.findIndex((x) => x.sku === sku);
      if (i >= 0) {
        const n = [...p]; n[i].qty += 1; return n;
      }
      return [...p, { sku, qty: 1 }];
    });
  const removeFromCart = (sku: string) => setCart((p) => p.filter((x) => x.sku !== sku));

  // -----------------------------
  // CHECKOUT HANDLER
  // -----------------------------
  const handleCheckout = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = e.currentTarget as HTMLFormElement & { [i: number]: HTMLInputElement };
    const name = f[0].value, email = f[1].value, phone = f[2].value, address = f[3].value;
    const subject = `New Order — ${name}`;
    const items = cart.map((l) => {
      const p = PRODUCTS.find((x) => x.sku === l.sku)!;
      return `${l.qty}× ${p.name} (${p.sku}) — $${(p.price * l.qty).toFixed(2)}`;
    }).join("%0D%0A");

    const body = `
Name: ${name}
Email: ${email}
Phone: ${phone}
Address: ${address}

Items:
${items}

Discount Code: ${discountCode || "None"}
Total: $${finalTotal.toFixed(2)}

Note: Research use only.
`.replace(/\n/g, "%0D%0A");

    window.location.href = `mailto:${BRAND.email}?subject=${encodeURIComponent(subject)}&body=${body}`;
    router.push("/thank-you");
  };

  // -----------------------------
  // AGE GATE SCREEN
  // -----------------------------
  if (!isVerified) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/70 px-4 py-8">
        <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-lg text-neutral-900 border border-neutral-200">
          <h1 className="text-xl font-bold text-center">Age Verification Required</h1>
          <p className="text-xs text-neutral-600 leading-relaxed mt-4 max-h-40 overflow-y-auto border border-neutral-200 rounded-lg p-3 bg-neutral-50">
            All products offered by NexaPeptides are intended exclusively for laboratory research and in vitro use...
          </p>
          <div className="mt-6 flex flex-col items-center">
            <label className="text-sm text-neutral-700 mb-2 font-medium">Enter your birth year</label>
            <input type="number" value={birthYear} onChange={(e) => setBirthYear(e.target.value)}
              placeholder="2003" className="px-3 py-2 rounded-xl border border-neutral-300 text-center w-32" />
            <button onClick={handleSubmitAgeGate}
              className="mt-4 w-full rounded-xl bg-neutral-900 text-white text-sm font-semibold py-2 hover:opacity-90">
              Enter Site
            </button>
          </div>
        </div>
      </div>
    );
  }

  // -----------------------------
  // MAIN SITE
  // -----------------------------
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* HEADER */}
      <header className="border-b border-neutral-200 sticky top-0 bg-white z-40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={LOGO_SRC} alt="logo" className="h-8 w-8" />
            <span className="font-extrabold text-xl">Nexa Peptides</span>
          </div>
          <div className="flex items-center gap-3">
            <a href="/ambassadors" className="text-xs font-semibold border border-neutral-900 rounded-full px-3 py-1 hover:bg-neutral-900 hover:text-white">Ambassadors</a>
            <a href="/admin-codes" className="text-[10px] text-neutral-400 underline hover:text-neutral-800">Admin</a>
            <button onClick={() => setCartOpen(true)}
              className="border border-neutral-900 rounded-full px-4 py-1 text-sm hover:bg-neutral-900 hover:text-white">
              <ShoppingCart className="inline h-4 w-4 mr-1" />Cart ({cart.reduce((s, l) => s + l.qty, 0)})
            </button>
          </div>
        </div>
      </header>

      {/* PRODUCTS */}
      <section id="products" className="py-16 max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-extrabold mb-6 text-center">Research Materials</h2>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((p) => (
            <div key={p.sku} className="border border-neutral-200 rounded-2xl p-4 shadow-sm hover:shadow-md">
              <div className="aspect-square bg-neutral-100 border border-neutral-200 rounded-xl flex items-center justify-center text-neutral-400 text-sm">Add product photo</div>
              <div className="mt-4 flex justify-between">
                <div><div className="text-xs text-neutral-500">{p.category}</div><div className="font-semibold text-lg">{p.name}</div></div>
                <div className="text-xl font-bold">${p.price}</div>
              </div>
              <p className="mt-2 text-sm text-neutral-700">{p.desc}</p>
              <button onClick={() => addToCart(p.sku)} className="mt-3 w-full border border-neutral-900 rounded-xl py-2 text-sm font-semibold hover:bg-neutral-900 hover:text-white">Add to Cart</button>
            </div>
          ))}
        </div>
      </section>

      {/* CART */}
      <AnimatePresence>
        {cartOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-lg relative">
              <button onClick={() => setCartOpen(false)} className="absolute right-4 top-4 text-neutral-500 hover:text-black"><X className="h-5 w-5" /></button>
              <h3 className="text-2xl font-bold mb-4">Your Cart</h3>
              {cart.length === 0 ? <p>Your cart is empty.</p> : (