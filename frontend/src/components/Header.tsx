import { Link, NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/properties", label: "Properties" },
  { to: "/sell", label: "Sell" },
  { to: "/dashboard", label: "Dashboard" },
  { to: '/admin', label: 'Admin' },
];

const Header = () => {
  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-6 px-4 md:px-8">
        <Link to="/" className="flex items-center gap-2">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-500 text-lg font-semibold text-white">
            SF
          </span>
          <div className="flex flex-col leading-none">
            <span className="font-display text-lg font-semibold text-slate-900">
              SquareFeet
            </span>
            <span className="text-xs font-medium text-slate-500">
              Real Estate Platform
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `transition-colors hover:text-brand-600 ${isActive ? "text-brand-600" : ""}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/login"
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-brand-500 hover:text-brand-600"
          >
            Sign In
          </Link>
          <Link
            to="/dashboard"
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-brand-500 hover:text-brand-600"
          >
            Seller View
          </Link>
          <Link
            to="/sell"
            className="rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-600"
          >
            List Property
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
