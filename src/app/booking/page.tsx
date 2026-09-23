import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PHONE, PHONE_TEL, WHATSAPP_URL } from "@/lib/site-data"

export default function BookingPage() {
  return (
    <main className="min-h-screen bg-[#020817] text-white px-6 py-24 md:px-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-sm text-blue-300 hover:text-blue-200">
            ← Back to Home
          </Link>
        </div>

        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-8 shadow-2xl shadow-blue-500/10 md:p-12">
          <p className="mb-4 inline-flex rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-200">
            Appointment Booking
          </p>

          <h1 className="text-4xl font-light tracking-tight text-white md:text-6xl">
            Book Your Consultation
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-slate-300">
            Schedule a clinical assessment with our sports physiotherapy specialists for injury recovery, performance optimization, or rehabilitation planning.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link href="/doctors" className="w-full">
              <Button className="w-full rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 text-base text-white shadow-lg shadow-blue-500/20 hover:from-blue-600 hover:to-purple-700">
                Choose Specialist Doctor & Book Online →
              </Button>
            </Link>
          </div>

          <div className="mt-4 flex flex-col gap-4 sm:flex-row">
            <a href={PHONE_TEL} className="w-full">
              <Button variant="outline" className="w-full rounded-full border border-white/10 bg-white/5 px-6 py-3 text-base text-white hover:bg-white/10">
                Call {PHONE}
              </Button>
            </a>

            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="w-full">
              <Button variant="outline" className="w-full rounded-full border border-white/10 bg-white/5 px-6 py-3 text-base text-white hover:bg-white/10">
                WhatsApp Booking
              </Button>
            </a>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-slate-400">Assessment Type</p>
              <p className="mt-2 text-xl font-medium text-white">Clinical Consultation</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-slate-400">Available</p>
              <p className="mt-2 text-xl font-medium text-white">Mon–Wed</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-slate-400">Support</p>
              <p className="mt-2 text-xl font-medium text-white">24/7 Clinical Guidance</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
