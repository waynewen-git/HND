import Button from "@/components/ui/Button";

/** Static showcase page — no server searchParams (required for GitHub Pages export). */
export default function OrderConfirmPage() {
  return (
    <div className="pt-16 md:pt-20">
      <div className="section-padding container-max flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-hnd-red/10">
          <svg
            className="h-8 w-8 text-hnd-red"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="mt-8 font-bebas text-3xl md:text-4xl">
          Order Confirmed
        </h1>
        <p className="mt-4 text-hnd-gray-500">
          Thank you for your purchase. A confirmation email will be sent shortly.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Button href="/shop" size="lg">
            Continue Shopping
          </Button>
          <Button href="/account" variant="outline" size="lg">
            View Account
          </Button>
        </div>
      </div>
    </div>
  );
}
