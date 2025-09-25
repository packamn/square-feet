import { useForm } from "react-hook-form";

type SearchFormValues = {
  location: string;
  minPrice: string;
  maxPrice: string;
  propertyType: string;
  bedrooms: string;
  bathrooms: string;
};

type SearchBarProps = {
  className?: string;
};

const propertyTypes = [
  "Any",
  "House",
  "Apartment",
  "Condo",
  "Land",
  "Commercial",
];
const quickFilters = ["Luxury homes", "Waterfront", "New developments"];

const SearchBar = ({ className = "" }: SearchBarProps) => {
  const { register, handleSubmit, formState } = useForm<SearchFormValues>({
    defaultValues: {
      location: "",
      minPrice: "",
      maxPrice: "",
      propertyType: "Any",
      bedrooms: "",
      bathrooms: "",
    },
  });

  const onSubmit = (values: SearchFormValues) => {
    console.log("Search submitted", values);
  };

  return (
    <section
      className={`relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-100 via-white to-slate-100 shadow-card ${className}`}
    >
      <div className="pointer-events-none absolute -left-24 top-0 h-64 w-64 rounded-full bg-brand-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-48 w-48 rounded-full bg-brand-100/40 blur-3xl" />

      <div className="relative flex flex-col gap-6 p-6 md:p-10">
        <header className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-500">
              Find your match
            </p>
            <h2 className="font-display text-2xl font-semibold leading-tight text-slate-900 md:text-[2.15rem]">
              Discover the right property faster
            </h2>
            <p className="mt-2 max-w-xl text-sm text-slate-600">
              Fine-tune by location, price, and lifestyle amenities. We surface
              curated options to keep your search effortless.
            </p>
          </div>
        </header>

        <div className="flex flex-wrap gap-3">
          {quickFilters.map((filter) => (
            <button
              type="button"
              key={filter}
              className="rounded-full border border-brand-200 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-brand-600 transition hover:border-brand-400 hover:bg-brand-50"
            >
              {filter}
            </button>
          ))}
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 md:grid-cols-[repeat(5,minmax(0,1fr))_auto]"
        >
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Location
            </label>
            <input
              type="text"
              placeholder="City or ZIP"
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 placeholder-slate-400 transition focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
              {...register("location")}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Min Price
            </label>
            <input
              type="number"
              placeholder="Any"
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 placeholder-slate-400 transition focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
              {...register("minPrice")}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Max Price
            </label>
            <input
              type="number"
              placeholder="Any"
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 placeholder-slate-400 transition focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
              {...register("maxPrice")}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Property Type
            </label>
            <select
              className="w-full appearance-none rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 transition focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
              {...register("propertyType")}
            >
              {propertyTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Beds
            </label>
            <input
              type="number"
              placeholder="Any"
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 placeholder-slate-400 transition focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
              {...register("bedrooms")}
            />
          </div>
          <div className="flex flex-col gap-1 md:col-auto md:flex-row md:items-end md:justify-end">
            <label className="text-xs font-medium uppercase tracking-wide text-slate-500 md:hidden">
              Baths
            </label>
            <div className="flex w-full items-center gap-2 md:w-auto">
              <input
                type="number"
                placeholder="Baths"
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 placeholder-slate-400 transition focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100 md:w-28"
                {...register("bathrooms")}
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-brand-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-200 disabled:cursor-not-allowed disabled:bg-brand-300"
                disabled={formState.isSubmitting}
              >
                {formState.isSubmitting ? "Searching…" : "Search"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SearchBar;
