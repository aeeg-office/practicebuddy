export default function MockExamsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f6f6f6]">
      {/* Breadcrumb bar */}
      <div className="bg-white border-b border-gray-200/60">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-2 text-sm">
          <a href="/" className="text-[rgb(71,32,183)] hover:text-[rgb(55,25,150)] font-medium transition-colors">
            Home
          </a>
          <span className="text-gray-400">/</span>
          <a href="/practice" className="text-[rgb(71,32,183)] hover:text-[rgb(55,25,150)] font-medium transition-colors">
            Practice
          </a>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600 font-medium">Mock Exams</span>
        </div>
      </div>
      {children}
    </div>
  )
}