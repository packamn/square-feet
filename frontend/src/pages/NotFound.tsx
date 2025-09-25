import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="flex flex-col items-center justify-center gap-6 py-24 text-center">
      <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 text-2xl font-semibold text-brand-600">
        404
      </span>
      <div className="space-y-3">
        <h1 className="font-display text-3xl font-semibold text-slate-900">
          Page not found
        </h1>
        <p className="mx-auto max-w-xl text-slate-600">
          The page you’re looking for doesn’t exist or has been moved. Check the
          URL or return to the homepage to continue exploring.
        </p>
      </div>
      <Link
        to="/"
        className="rounded-full bg-brand-500 px-5 py-2 text-sm font-semibold text-white shadow transition hover:bg-brand-600"
      >
        Back to Home
      </Link>
    </section>
  );
};

export default NotFound;
