"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { NAV_ITEMS } from "@/lib/site-data"

export default function Footer() {
  const pathname = usePathname()
  const isHome = pathname === "/"

  return (
    <footer className="py-20 bg-black text-white relative overflow-hidden border-t border-gray-800/50">
      <div className="container mx-auto px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="text-3xl font-extralight">Physiogen</div>
          <p className="text-gray-300 font-light max-w-3xl mx-auto text-lg">
            Advancing human movement science through evidence-based clinical practice, innovative therapeutic
            interventions, and comprehensive rehabilitation protocols.
          </p>
          <div className="flex flex-wrap justify-center gap-12 text-gray-300 font-light">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={"section" in item && item.section && !isHome ? `/${item.href}` : item.href}
                className="hover:text-white transition-all duration-300 hover:scale-110 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>
          <div className="border-t border-gray-700 pt-8 text-gray-400 font-light">
            <p>
              &copy; 2024 Physiogen Clinical Sciences. All rights reserved. Licensed healthcare facility providing
              evidence-based rehabilitation services.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
