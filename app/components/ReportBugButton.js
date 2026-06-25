export default function ReportBugButton() {
  return (
    
    <a  href="mailto:info@madeirafriends.org?subject=Bug%20Report%20-%20Madeira%20Hikes"
      className="fixed bottom-6 left-6 z-40 bg-white border border-stone-200 text-stone-700 px-4 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition flex items-center gap-2 text-sm"
    >
    <img src="/madeiraLogo.png" alt="Madeira Friends" className="w-5 h-5 object-contain" />      
    <span className="hidden sm:inline">Report a bug</span>
    </a>
  )
}