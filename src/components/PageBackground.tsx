"use client"

// Single subtle grid background used across pages (replaces multiple SVG decorations)
export function PageBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <div className="absolute inset-0 opacity-[0.03]">
        <svg width="100%" height="100%" className="text-gray-600">
          <defs>
            <pattern id="page-grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#page-grid)" />
        </svg>
      </div>
    </div>
  )
}
