"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MessageCircle, X } from "lucide-react"

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {showTooltip && (
        <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-lg p-4 mb-2 w-64 animate-in fade-in slide-in-from-bottom-5">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-semibold">Need help?</h4>
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setShowTooltip(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mb-3">Chat with us on WhatsApp for instant loan assistance.</p>
          <Link href="https://wa.me/918057348348" target="_blank" rel="noopener noreferrer">
            <Button className="w-full bg-[#25D366] hover:bg-[#25D366]/90 text-white gap-2">
              <MessageCircle className="h-4 w-4" />
              Start Chat
            </Button>
          </Link>
        </div>
      )}

      <Button
        size="icon"
        className="h-14 w-14 rounded-full bg-[#25D366] hover:bg-[#25D366]/90 text-white shadow-lg"
        onClick={() => setShowTooltip(!showTooltip)}
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    </div>
  )
}
