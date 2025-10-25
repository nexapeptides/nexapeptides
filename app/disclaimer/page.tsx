export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 px-6 py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-6">Disclaimer</h1>
        <p className="text-neutral-300 mb-4">
          All products available through Nexa Peptides are intended for laboratory 
          research purposes only. They are not approved by the FDA for human use, 
          and should not be used for diagnosis, treatment, or prevention of disease.
        </p>
        <p className="text-neutral-300 mb-4">
          Nexa Peptides does not make any guarantees or claims about the accuracy 
          or completeness of product descriptions. Research chemicals should only 
          be handled by trained professionals.
        </p>
        <p className="text-neutral-300">
          By accessing this website and purchasing our products, you agree to 
          these terms and accept full responsibility for proper use and compliance 
          with all applicable regulations.
        </p>
      </div>
    </div>
  );
}