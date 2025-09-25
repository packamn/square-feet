const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white/90 py-8 text-sm text-slate-500">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 text-center md:flex-row md:px-8 md:text-left">
        <p>
          &copy; {new Date().getFullYear()} SquareFeet. All rights reserved.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <a href="#" className="hover:text-brand-600">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-brand-600">
            Terms of Service
          </a>
          <a href="#" className="hover:text-brand-600">
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
