export default function Home() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-center text-center space-y-8 py-20">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-brand">
          Welcome to ZevCommerce
        </h1>
        <p className="max-w-2xl text-lg text-text-secondary">
          The premium Next.js template powered by the <strong>@zevop/commerce-storefront</strong> SDK.
          Start editing <code className="bg-surface-hover px-2 py-1 rounded text-sm text-brand font-mono">src/app/page.tsx</code> to fetch your products.
        </p>

        <div className="flex gap-4 pt-4">
          <a
            href="/products"
            className="rounded-md bg-brand px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand transition-all"
          >
            View Products
          </a>
          <a
            href="https://github.com/IntechNG"
            target="_blank"
            rel="noreferrer"
            className="rounded-md bg-surface px-6 py-3 text-sm font-semibold text-brand shadow-sm ring-1 ring-inset ring-border-light hover:bg-surface-hover transition-all"
          >
            Documentation
          </a>
        </div>
      </div>
    </div>
  );
}
