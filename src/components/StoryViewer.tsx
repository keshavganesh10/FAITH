import { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Story } from '@/data/community';
import { ACCOUNTS } from '@/data/accounts';

interface Props {
  story: Story | null;
  onClose: () => void;
}

export const StoryViewer = ({ story, onClose }: Props) => {
  const [idx, setIdx] = useState(0);

  useEffect(() => { setIdx(0); }, [story?.id]);

  useEffect(() => {
    if (!story || story.slides.length === 0) return;
    const t = window.setTimeout(() => {
      if (idx < story.slides.length - 1) setIdx(idx + 1);
      else onClose();
    }, 4500);
    return () => window.clearTimeout(t);
  }, [story, idx, onClose]);

  if (!story || story.slides.length === 0) return null;

  const slide = story.slides[idx];
  const acct = ACCOUNTS[story.handle];

  return (
    <div className="fixed inset-0 z-[60] bg-black flex items-center justify-center" onClick={onClose}>
      <div
        className="relative w-full max-w-[420px] h-full md:h-[760px] md:max-h-[calc(100vh-2rem)] md:rounded-[2.25rem] overflow-hidden bg-black"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Progress bars */}
        <div className="absolute top-0 left-0 right-0 z-20 flex gap-1 p-3 pt-4">
          {story.slides.map((_, i) => (
            <div key={i} className="flex-1 h-0.5 bg-white/30 rounded overflow-hidden">
              <div
                className="h-full bg-white"
                style={{
                  width: i < idx ? '100%' : i === idx ? '100%' : '0%',
                  transition: i === idx ? 'width 4.5s linear' : 'none',
                }}
              />
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="absolute top-6 left-3 right-3 z-20 flex items-center gap-2 mt-3">
          {acct && (
            <img src={acct.avatar} alt="" className="h-8 w-8 rounded-full object-cover border border-white/30" />
          )}
          <p className="text-white text-sm font-semibold drop-shadow">{story.name}</p>
          {story.live && (
            <span className="text-[9px] font-bold tracking-widest bg-destructive text-destructive-foreground rounded px-1.5 py-0.5">
              LIVE
            </span>
          )}
          <div className="ml-auto" />
          <button onClick={onClose} className="h-8 w-8 grid place-items-center rounded-full bg-black/30 text-white">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Image */}
        <img
          src={slide.image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

        {/* Caption */}
        {slide.caption && (
          <p className="absolute bottom-20 left-5 right-5 text-white text-base font-display drop-shadow">
            {slide.caption}
          </p>
        )}

        {/* Tap zones */}
        <button
          className="absolute left-0 top-12 bottom-16 w-1/3"
          onClick={() => idx > 0 ? setIdx(idx - 1) : null}
          aria-label="Previous"
        >
          <ChevronLeft className="h-5 w-5 text-white/60 ml-2" />
        </button>
        <button
          className="absolute right-0 top-12 bottom-16 w-1/3"
          onClick={() => idx < story.slides.length - 1 ? setIdx(idx + 1) : onClose()}
          aria-label="Next"
        >
          <ChevronRight className="h-5 w-5 text-white/60 ml-auto mr-2" />
        </button>

        {/* Reply bar */}
        <div className="absolute bottom-4 left-3 right-3 flex items-center gap-2">
          <input
            placeholder={`Reply to ${story.name}…`}
            className="flex-1 bg-white/10 backdrop-blur border border-white/20 rounded-full px-4 py-2.5 text-sm text-white placeholder:text-white/60 focus:outline-none focus:border-white/40"
          />
        </div>
      </div>
    </div>
  );
};
