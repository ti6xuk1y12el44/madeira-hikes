'use client'

import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function ReportBugButton() {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  async function handleSend() {
    if (!message.trim()) return
    setSending(true)

    await supabase.from('bug_reports').insert({
      message: message.trim(),
      page_url: window.location.href,
    })

    setSending(false)
    setSent(true)
    setMessage('')

    setTimeout(() => {
      setSent(false)
      setOpen(false)
    }, 2000)
  }

  return (
    <div className="fixed bottom-6 left-6 z-40">

      {open && (
        <div className="mb-3 bg-white border border-stone-200 rounded-3xl shadow-2xl p-5 w-80">
          {sent ? (
            <div className="text-center py-4">
              <p className="font-bold text-stone-800 mt-2">Thanks!</p>
              <p className="text-stone-500 text-sm mt-1">Your report has been sent.</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-stone-900">Report a bug</h3>
                <button onClick={() => setOpen(false)} className="text-stone-400 hover:text-stone-700 text-lg">✕</button>
              </div>
              <p className="text-stone-500 text-sm mb-3">Found something broken? Let us know and we'll fix it.</p>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Describe what went wrong..."
                rows={3}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-900 resize-none focus:outline-none focus:border-stone-400"
              />
              <button
                onClick={handleSend}
                disabled={sending || !message.trim()}
                className="w-full mt-3 bg-stone-900 text-white py-2.5 rounded-full font-semibold text-sm hover:bg-stone-800 transition disabled:opacity-50"
              >
                {sending ? 'Sending...' : 'Send report'}
              </button>
            </>
          )}
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="bg-white border border-stone-200 text-stone-700 px-4 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition flex items-center gap-2 text-sm"
      >
        <img src="/madeiraLogo.png" alt="Madeira Friends" className="w-5 h-5 object-contain" />
        <span className="hidden sm:inline">Report a bug</span>
      </button>

    </div>
  )
}