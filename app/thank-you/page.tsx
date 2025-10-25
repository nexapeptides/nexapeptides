export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col items-center justify-center px-6">
      <h1 className="text-4xl font-extrabold mb-4 text-center">
        ✅ Thank You for Your Order!
      </h1>
      <p className="text-lg text-neutral-300 text-center max-w-xl mb-8">
        Your inquiry has been sent successfully. A team member from Nexa Peptides will contact you shortly to confirm your order and provide tracking or payment details.
      </p>
      <a
        href="/"
        className="bg-white text-neutral-900 px-6 py-3 rounded-xl font-semibold hover:opacity-90"
      >
        Return to Home
      </a>
    </div>
  );
}