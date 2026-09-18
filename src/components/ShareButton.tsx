import React, { useState } from 'react';
import { Share2, X, Copy, Check, MessageCircle, Send, Facebook, Twitter, Smartphone } from 'lucide-react';

export default function ShareButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://ak-express.com';
  const shareText = 'Order authentic Cameroonian Grassfields cuisine delivered hot in Douala on Achu & Kati-Kati Express!';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      alert('Share link: ' + shareUrl);
    }
  };

  const shareOptions = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-green-500 text-white',
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
    },
    {
      name: 'WhatsApp Status',
      icon: Smartphone,
      color: 'bg-emerald-600 text-white',
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
    },
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-blue-600 text-white',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: 'X (Twitter)',
      icon: Twitter,
      color: 'bg-black text-white',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: 'Telegram',
      icon: Send,
      color: 'bg-sky-500 text-white',
      url: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
    },
    {
      name: 'Messenger',
      icon: MessageCircle,
      color: 'bg-blue-500 text-white',
      url: `fb-messenger://share/?link=${encodeURIComponent(shareUrl)}`,
    },
  ];

  return (
    <>
      {/* Header Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 bg-amber-500 hover:bg-amber-600 text-white rounded-full shadow-sm transition-all active:scale-95 flex items-center justify-center shrink-0"
        title="Share App"
        aria-label="Share App"
      >
        <Share2 className="w-4 h-4 text-white" />
      </button>

      {/* Share Pop-up Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-sm p-5 shadow-2xl relative">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b pb-3 mb-4">
              <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2">
                <Share2 className="w-5 h-5 text-amber-500" />
                Share App
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Social Share Grid */}
            <div className="grid grid-cols-3 gap-3 mb-5">
              {shareOptions.map((option) => (
                <a
                  key={option.name}
                  href={option.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl hover:bg-gray-50 transition-colors text-center"
                >
                  <div className={`p-2.5 rounded-full ${option.color} shadow-sm`}>
                    <option.icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-medium text-gray-700 leading-tight">
                    {option.name}
                  </span>
                </a>
              ))}
            </div>

            {/* Copy Link Action Bar */}
            <div className="bg-gray-50 rounded-xl p-2 flex items-center gap-2 border border-gray-200">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="bg-transparent text-xs text-gray-600 flex-1 px-2 outline-none truncate"
              />
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-bold transition-all active:scale-95 shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}