export default function ThankYouPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white text-neutral-900 p-6">
      <h1 className="text-3xl font-bold mb-3">Thank you for your order!</h1>
      <p className="text-sm text-neutral-600 mb-8 text-center max-w-md">
        We’ve received your submission and will email your invoice shortly.
        Please check your inbox (and spam folder) for a message from
        <b> nexapeptides@gmail.com</b>. Your order is not finalized until you
        receive and pay the invoice.
      </p>
      <a
        href="/"
        className="border border-neutral-900 px-6 py-2 rounded-xl text-sm font-semibold hover:bg-neutral-900 hover:text-white"
      >
        Return to Store
      </a>
    </main>
  );
}
