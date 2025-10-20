import { contactConfig } from '../config/contact'

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white/90 py-10 text-sm text-slate-500">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 md:px-8">
        <div className="rounded-3xl bg-slate-100/90 p-6 text-center md:text-left">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="font-display text-xl font-semibold text-slate-900">Try the different roles</h3>
              <p className="text-sm text-slate-600">Jump into the seller or admin experiences with the seeded data.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              <a
                href="/dashboard"
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-brand-500 hover:text-brand-600"
              >
                Seller dashboard
              </a>
              <a
                href="/admin"
                className="rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-600"
              >
                Admin panel
              </a>
            </div>
          </div>
        </div>

        {(contactConfig.scheduleUrl || contactConfig.phone || contactConfig.whatsapp) && (
          <div className="border-t border-slate-200 pt-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="font-display text-lg font-semibold text-slate-900">Ready to talk?</h3>
                <p className="text-sm text-slate-600">
                  Personalized strategy session with a Squarefeet advisor. We'll align inventory, timelines, and financing in a single call.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                {contactConfig.scheduleUrl && (
                  <a
                    href={contactConfig.scheduleUrl}
                    className="rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-600"
                  >
                    Schedule Time
                  </a>
                )}
                {contactConfig.phone && (
                  <a
                    href={`tel:${contactConfig.phone}`}
                    className="rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-600 transition hover:border-brand-500 hover:text-brand-600"
                  >
                    Call now
                  </a>
                )}
                {contactConfig.whatsapp && (
                  <a
                    href={contactConfig.whatsapp}
                    className="rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-600 transition hover:border-brand-500 hover:text-brand-600"
                  >
                    WhatsApp
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
          <p>&copy; {new Date().getFullYear()} SquareFeet. All rights reserved.</p>
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
      </div>
    </footer>
  );
};

export default Footer;
