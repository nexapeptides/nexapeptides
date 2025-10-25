export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900 p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <p className="text-sm text-neutral-700 mb-4">
        NexaPeptides respects your privacy. We collect only the information
        you provide voluntarily, such as your name, contact information, and
        order details, for the purpose of communicating with you and preparing
        invoices.
      </p>

      <h2 className="text-lg font-semibold text-neutral-900 mt-6 mb-2">
        How We Use Your Info
      </h2>
      <p className="text-sm text-neutral-700 mb-4">
        We may use your email or phone number to contact you about your order,
        to send an invoice, or to clarify details needed to fulfill the
        transaction.
      </p>

      <h2 className="text-lg font-semibold text-neutral-900 mt-6 mb-2">
        Sharing
      </h2>
      <p className="text-sm text-neutral-700 mb-4">
        We do not sell or market your personal information. We will only share
        data if required by law or to comply with a lawful request.
      </p>

      <h2 className="text-lg font-semibold text-neutral-900 mt-6 mb-2">
        Security
      </h2>
      <p className="text-sm text-neutral-700 mb-4">
        We take reasonable steps to protect information, but no data
        transmission over the internet is 100% secure. You submit information
        at your own risk.
      </p>
    </main>
  );
}