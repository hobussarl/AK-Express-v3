import React, { useState } from 'react';
import { Share2, Check } from 'lucide-react';

export default function ShareButton() {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: 'Achu & Kati-Kati Express',
      text: 'Order authentic Cameroonian Grassfields cuisine delivered hot in Douala!',
      url: window.location.href,
    };

    // Try native phone sharing first
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        // User canceled share sheet, fallback to clipboard copy
      }
    }

    // Desktop fallback: copy link to clipboard
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      alert('Share link: ' + window.location.href);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center justify-center gap-2 w-full py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl shadow-md transition-all active:scale-95"
      title="Share App"
    >
      {copied ? (
        <>
          <Check className="w-5 h-5 text-green-200" />
          <span>Link Copied!</span>
        </>
      ) : (
        <>
          <Share2 className="w-5 h-5" />
          <span>Share App</span>
        </>
      )}
    </button>
  );
}