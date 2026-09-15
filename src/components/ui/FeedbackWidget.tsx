// src/components/ui/FeedbackWidget.tsx
'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { MessageSquarePlus, X, Send, AlertTriangle, Lightbulb, Bug } from 'lucide-react';
import { submitFeedbackAction } from '@/lib/actions/feedback';
import { FEEDBACK_MESSAGE_MAX_LENGTH, type FeedbackType } from '@/lib/validation/feedback';

export function FeedbackWidget() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<FeedbackType>('bug');
  const [message, setMessage] = useState('');
  // Honeypot: people never see or fill this field, bots do.
  const [website, setWebsite] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    const result = await submitFeedbackAction({
      type,
      message,
      pageUrl: pathname,
      website,
    });

    setIsSubmitting(false);

    if (result.success) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setMessage('');
        setIsOpen(false);
      }, 2000);
    } else {
      setErrorMessage(result.error || 'Failed to send feedback.');
    }
  };

  return (
    <>
      {/* Persistent Floating Trigger Button */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex items-center gap-2 rounded-full border border-(--border) bg-(--surface) px-4 py-2.5 text-sm font-bold text-(--foreground) shadow-lg backdrop-blur transition hover:scale-105 hover:border-blue-500 active:scale-95"
          aria-label="Open feedback menu"
        >
          <MessageSquarePlus className="h-4 w-4 text-blue-500" />
          <span className="hidden sm:inline">Feedback</span>
        </button>
      </div>

      {/* Slide-Up Drawer */}
      {isOpen && (
        <div className="fixed bottom-16 right-4 z-50 w-[calc(100vw-2rem)] max-w-sm rounded-2xl border-2 border-(--game-panel-border) bg-(--game-panel) p-5 shadow-2xl select-none">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-(--border) pb-3">
            <h3 className="flex items-center gap-2 text-base font-black text-(--foreground)">
              🧪 ChemGames Feedback
            </h3>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1 text-muted hover:bg-(--surface-2) hover:text-(--foreground)"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {submitted ? (
            <div className="py-8 text-center">
              <span className="inline-block text-3xl">🎉</span>
              <p className="mt-2 text-sm font-bold text-emerald-500">Feedback sent!</p>
              <p className="text-xs text-muted">Thank you for helping us refine ChemGames.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
              {/* Category Selector */}
              <div className="grid grid-cols-3 gap-1.5 rounded-xl border border-(--border) bg-(--surface-2) p-1">
                {[
                  { id: 'bug', label: 'Bug', Icon: Bug },
                  { id: 'chemistry', label: 'Data', Icon: AlertTriangle },
                  { id: 'feature', label: 'Idea', Icon: Lightbulb },
                ].map(({ id, label, Icon }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setType(id as FeedbackType)}
                    className={`flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-bold transition ${
                      type === id
                        ? 'bg-blue-500 text-white shadow-sm'
                        : 'text-muted hover:text-(--foreground)'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {label}
                  </button>
                ))}
              </div>

              {/* Text Input */}
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={
                  type === 'chemistry'
                    ? 'Spot an incorrect valency or formula?'
                    : type === 'bug'
                    ? 'What went wrong on this page?'
                    : 'What feature would make this game better?'
                }
                rows={3}
                required
                maxLength={FEEDBACK_MESSAGE_MAX_LENGTH}
                className="w-full resize-none rounded-xl border border-(--border) bg-(--background) p-3 text-xs text-(--foreground) outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />

              {/*
                Honeypot. Kept in the DOM (no display:none) so automated
                submitters fill it, but moved off-screen, skipped by the tab
                order and hidden from assistive technology.
              */}
              <input
                type="text"
                name="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                autoComplete="off"
                tabIndex={-1}
                aria-hidden="true"
                className="absolute -left-[9999px] top-0 h-px w-px overflow-hidden opacity-0"
              />

              {errorMessage && (
                <p className="text-xs font-bold text-red-500">{errorMessage}</p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !message.trim()}
                className="btn-primary flex items-center justify-center gap-2 text-xs disabled:opacity-50"
              >
                {isSubmitting ? (
                  'Submitting...'
                ) : (
                  <>
                    <Send className="h-3.5 w-3.5" /> Send Feedback
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      )}
    </>
  );
}
