"use client";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, ShoppingCart, X } from "lucide-react";
import { useRouter } from "next/navigation";

const LOGO_SRC = "/logo-nexa.png";

const BRAND = {
  name: "Nexa Peptides",
  tagline: "Precision Research Compounds",
  phone: "(941) 405-7808",
  phoneHref: "+19414057808",
  email: "nexapeptides@gmail.com",
  location: "Bradenton • Sarasota • Florida",
};

// Registered ambassador codes
const REFERRAL_CODES: Record<string, string> = {
  KENNY10: "Kenneth Lopez",
  TEST10: "Demo Ambassador",
};

const PRODUCTS = [
  // Weight Loss & Appetite Control
  { sku: "SEMAG-5MG", name: "Semaglutide 5mg", price: 60, desc: "GLP-1 agonist for appetite suppression and long-term weight management.", category: "Weight Loss" },
  { sku: "SEMAG-10MG", name: "Semeg 10mg", price: 85, desc: "Higher-dose semaglutide for extended appetite control and metabolic support.", category: "Weight Loss" },
  { sku: "TIRZ-10MG", name: "Tirzepatide 10mg", price: 100, desc: "Dual GLP-1/GIP agonist supporting appetite control, fat loss, and insulin sensitivity.", category: "Weight Loss" },
  { sku: "RETA-10MG", name: "Retatrutide 10mg", price: 100, desc: "Advanced multi-pathway compound for powerful weight loss and glycemic support.", category: "Weight Loss" },

  // Healing & Recovery
  { sku: "BPC-5MG", name: "BPC-157 5mg", price: 40, desc: "Healing peptide supporting tendon, ligament, and soft-tissue recovery.", category: "Healing & Recovery" },
  { sku: "TB500-5MG", name: "TB-500 5mg", price: 45, desc: "Aids recovery, helps reduce inflammation, and supports injury healing.", category: "Healing & Recovery" },
  { sku: "BPCTB-10MG", name: "BPC + TB 10mg", price: 75, desc: "Combo of healing peptides for faster recovery and reduced inflammation.", category: "Healing & Recovery" },

  // Muscle Growth & Performance
  { sku: "IGF-LR3-1MG", name: "IGF-1 LR3 1mg", price: 125, desc: "Growth factor studied for muscle growth, recovery, and fat loss.", category: "Muscle & Performance" },
  { sku: "IPAM-5MG", name: "Ipamorelin 5mg", price: 45, desc: "Stimulates GH release—recovery, sleep, and lean mass.", category: "Muscle & Performance" },
  { sku: "CJC-DAC-5MG", name: "CJC w/ DAC 5mg", price: 45, desc: "Long-acting GHRH analog studied for increased GH levels and fat loss.", category: "Muscle & Performance" },
  { sku: "MK677-25MG-50CT", name: "MK-677 25mg (50 ct)", price: 75, desc: "Secretagogue studied for GH release, sleep, recovery, and fullness.", category: "Muscle & Performance" },
  { sku: "SLUPP-5MG", name: "SLU-PP 5mg", price: 55, desc: "Myostatin-pathway research compound explored for new muscle growth.", category: "Muscle & Performance" },
  { sku: "CARD-10MG", name: "Cardarine 10mg", price: 75, desc: "PPARδ agonist investigated for endurance, fat metabolism, and cardio performance.", category: "Muscle & Performance" },
  { sku: "TESA-5MG", name: "Tesamorelin 5mg", price: 45, desc: "GHRH analog studied for reductions in visceral adipose tissue.", category: "Muscle & Performance" },

  // Cognitive & Mood
  { sku: "SEMAX-5MG", name: "Semax 5mg", price: 45, desc: "Nootropic peptide researched for focus, cognition, and mood.", category: "Cognitive & Mood" },
  { sku: "SELANK-5MG", name: "Selank 5mg", price: 45, desc: "Peptide studied for anxiolytic effects and calm focus.", category: "Cognitive & Mood" },
  { sku: "DSIP-5MG", name: "DSIP 5mg", price: 55, desc: "Peptide explored for deep sleep and stress reduction.", category: "Cognitive & Mood" },
  { sku: "OXY-2MG", name: "Oxytocin 2mg", price: 45, desc: "Neuropeptide associated with social bonding; offered strictly for research.", category: "Cognitive & Mood" },

  // Anti-Aging & Wellness
  { sku: "NAD-500MG", name: "NAD+ 500mg", price: 100, desc: "Studied for cellular energy and mitochondrial health.", category: "Anti-Aging" },
  { sku: "EPITH-10MG", name: "Epithalon 10mg", price: 45, desc: "Investigated for longevity, sleep, and immune support.", category: "Anti-Aging" },
  { sku: "GSH-1500MG", name: "Glutathione 1500mg", price: 45, desc: "Master antioxidant studied for detoxification and skin health.", category: "Anti-Aging" },
  { sku: "GHKCU-50MG", name: "GHK-Cu 50mg", price: 85, desc: "Copper peptide studied for skin, hair, and tissue regeneration.", category: "Anti-Aging" },
  { sku: "MOTC-10MG", name: "MOT-C 10mg", price: 50, desc: "Mitochondrial peptide explored for energy and metabolic support.", category: "Anti-Aging" },

  // Libido & Sexual Health
  { sku: "PT141-10MG", name: "PT-141 10mg", price: 65, desc: "Peptide investigated for libido enhancement.", category: "Libido" },
  { sku: "MT2", name: "MT2", price: 35, desc: "Tanning peptide that darkens pigmentation; mild libido benefits reported.", category: "Libido" },
  { sku: "CIALIS-20MG-50CT", name: "Cialis 20mg (50 ct)", price: 60, desc: "PDE5 inhibitor researched for blood-flow effects.", category: "Libido" },

  // Other
  { sku: "CLEN-200-30ML", name: "Liquid Clen 200 mcg/ml 30ml", price: 100, desc: "Studied for thermogenesis and metabolism.", category: "Other" },
  { sku: "HCG-5000IU", name: "HCG 5000 IU amps", price: 50, desc: "Gonadotropin; research on testosterone production.", category: "Other" },
  { sku: "BACW-30ML", name: "Bacteriostatic Water 30 ml", price: 1, desc: "Sterile diluent for peptide reconstitution.", category: "Other" },

  // Kits
  { sku: "KIT-HCG-5000IU", name: "HCG 5000 IU Kit", price: 450, desc: "Post-cycle research kit for hormone recovery.", category: "Kits" },
  { sku: "KIT-TIRZ-10MG", name: "Tirzepatide 10 mg Kit", price: 625, desc: "Full course kit for long-term appetite control.", category: "Kits" },
  { sku: "KIT-RETA-10MG", name: "Retatrutide 10 mg Kit", price: 625, desc: "Complete multi-pathway weight-management research kit.", category: "Kits" },
  { sku: "KIT-SEMAG-5MG", name: "Semeg 5 mg Kit", price: 325, desc: "Semaglutide-based kit for appetite suppression.", category: "Kits" },
  { sku: "KIT-BPC-5MG", name: "BPC-157 5 mg Kit", price: 325, desc: "Extended supply for injury-healing research support.", category: "Kits" },
  { sku: "KIT-TB500-10MG", name: "TB-500 10 mg Kit", price: 350, desc: "Full healing protocol kit for recovery research.", category: "Kits" },
];

export default function NexaPeptidesPage() {
  const [cart, setCart] = useState<{ sku: string; qty: number }[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [referral, setReferral] = useState("");
  const router = useRouter();

  const total = useMemo(() => {
    const subtotal = cart.reduce((sum, item) => {
      const p = PRODUCTS.find((x) => x.sku === item.sku);
      return p ? sum + p.price * item.qty : sum;
    }, 0);
    const discount = REFERRAL_CODES[referral.toUpperCase()] ? subtotal * 0.1 : 0;
    return subtotal - discount;
  }, [cart, referral]);

  const addToCart = (sku: string) =>
    setCart((prev) => {
      const idx = prev.findIndex((x) => x.sku === sku);
      if (idx >= 0) {
        const next = [...prev];
        next[idx].qty += 1;
        return next;
      }
      return [...prev, { sku, qty: 1 }];
    });

  const removeFromCart = (sku: string) =>
    setCart((prev) => prev.filter((x) => x.sku !== sku));

  const handleCheckout = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement & {
      [index: number]: HTMLInputElement;
    };
    const name = form[0].value;
    const email = form[1].value;
    const phone = form[2].value;
    const address = form[3].value;

    const subject = `New Order — ${name}`;
    const lines = cart
      .map((l) => {
        const p = PRODUCTS.find((x) => x.sku === l.sku)!;
        return `${l.qty}× ${p.name} (${p.sku}) — $${(
          p.price * l.qty
        ).toFixed(2)}`;
      })
      .join("%0D%0A");

    const ref = referral
      ? `%0D%0AReferral Code: ${referral.toUpperCase()} — ${
          REFERRAL_CODES[referral.toUpperCase()] || "Unregistered"
        }`
      : "";

    const body = `Contact Info:%0D%0AName: ${name}%0D%0AEmail: ${email}%0D%0APhone: ${phone}%0D%0AAddress: ${address}%0D%0A%0D%0AItems:%0D%0A${lines}%0D%0A%0D%0ATotal: $${total.toFixed(
      2
    )}%0D%0A${ref}%0D%0A%0D%0ANote: Research use only — not for human or veterinary use.`;

    alert("Opening Gmail… If nothing happens, check popup settings.");
    window.location.href = `mailto:${BRAND.email}?subject=${encodeURIComponent(
      subject
    )}&body=${body}`;
    setCart([]);
    setCartOpen(false);
    router.push("/thank-you");
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* HEADER */}
      <header className="border-b border-neutral-200 sticky top-0 bg-white z-40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={LOGO_SRC} alt="logo" className="h-8 w-8" />
            <span className="font-extrabold text-xl">Nexa Peptides</span>
          </div>
          <button
            onClick={() => setCartOpen(true)}
            className="border border-neutral-900 rounded-full px-4 py-1 text-sm hover:bg-neutral-900 hover:text-white"
          >
            <ShoppingCart className="inline h-4 w-4 mr-1" />
            Cart ({cart.reduce((s, l) => s + l.qty, 0)})
          </button>
        </div>
      </header>

      {/* PRODUCTS */}
      <section id="products" className="py-16 max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-extrabold mb-6 text-center">
          Research Materials
        </h2>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((p) => (
            <div
              key={p.sku}
              className="border border-neutral-200 rounded-2xl p-4 shadow-sm hover:shadow-md"
            >
              <div className="aspect-square bg-neutral-100 border border-neutral-200 rounded-xl flex items-center justify-center text-neutral-400 text-sm">
                Add product photo
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <div className="text-xs text-neutral-500">{p.category}</div>
                  <div className="font-semibold text-lg">{p.name}</div>
                </div>
                <div className="text-xl font-bold">${p.price}</div>
              </div>
              <p className="mt-2 text-sm text-neutral-700">{p.desc}</p>
              <button
                onClick={() => addToCart(p.sku)}
                className="mt-3 w-full border border-neutral-900 rounded-xl py-2 text-sm font-semibold hover:bg-neutral-900 hover:text-white"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CART MODAL */}
      <AnimatePresence>
        {cartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-lg relative"
            >
              <button
                onClick={() => setCartOpen(false)}
                className="absolute right-4 top-4 text-neutral-500 hover:text-black"
              >
                <X className="h-5 w-5" />
              </button>

              <h3 className="text-2xl font-bold mb-4">Your Cart</h3>
              {cart.length === 0 ? (
                <p className="text-neutral-600">Your cart is empty.</p>
              ) : (
                <>
                  <ul className="space-y-2 mb-4">
                    {cart.map((item) => {
                      const p = PRODUCTS.find((x) => x.sku === item.sku)!;
                      return (
                        <li
                          key={item.sku}
                          className="flex justify-between items-center border-b pb-2"
                        >
                          <span>
                            {item.qty}× {p.name}
                          </span>
                          <button
                            onClick={() => removeFromCart(item.sku)}
                            className="text-xs text-red-500 hover:underline"
                          >
                            Remove
                          </button>
                        </li>
                      );
                    })}
                  </ul>

                  <input
                    className="border border-neutral-300 rounded-xl px-3 py-2 w-full mb-3"
                    placeholder="Referral Code (optional)"
                    value={referral}
                    onChange={(e) => setReferral(e.target.value)}
                  />
                  {referral && (
                    <p className="text-sm mb-3">
                      {REFERRAL_CODES[referral.toUpperCase()]
                        ? `✅ Code Applied — 10% off credited to ${REFERRAL_CODES[referral.toUpperCase()]}`
                        : "❌ Invalid Code"}
                    </p>
                  )}

                  <div className="text-right font-bold mb-4">
                    Total: ${total.toFixed(2)}
                  </div>

                  <form className="grid gap-3 text-sm text-left" onSubmit={handleCheckout}>
                    <input className="border border-neutral-300 rounded-xl px-3 py-2" placeholder="Full Name" required />
                    <input className="border border-neutral-300 rounded-xl px-3 py-2" placeholder="Email" required />
                    <input className="border border-neutral-300 rounded-xl px-3 py-2" placeholder="Phone" required />
                    <input className="border border-neutral-300 rounded-xl px-3 py-2" placeholder="Address" required />
                    <button
                      type="submit"
                      className="bg-neutral-900 text-white rounded-xl py-2 font-semibold hover:opacity-90"
                    >
                      Submit Order (Email Invoice)
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FOOTER */}
      <footer className="bg-neutral-950 text-neutral-300 mt-20">
        <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-8">
          <div>
            <div className="font-extrabold text-lg text-neutral-100">
              Nexa Peptides
            </div>
            <p className="mt-3 text-sm text-neutral-400">
              Precision Research Compounds
            </p>
          </div>

          <div>
            <div className="font-semibold text-neutral-200">Contact</div>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex items-center gap-2">📧 nexapeptides@gmail.com</li>
              <li className="flex items-center gap-2">📞 (941) 405-7808</li>
              <li>Bradenton • Sarasota • Florida</li>
            </ul>
          </div>

          <div className="text-sm text-neutral-400">
            © {new Date().getFullYear()} Nexa Peptides — For laboratory research only.
            <div className="mt-2 space-x-3">
              <a href="/terms" className="hover:underline">Terms</a>
              <a href="/privacy" className="hover:underline">Privacy</a>
              <a href="/disclaimer" className="hover:underline">Disclaimer</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}