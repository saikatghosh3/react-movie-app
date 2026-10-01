import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type PointerEvent as ReactPointerEvent,
  type MouseEvent as ReactMouseEvent
} from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselProps {
  children: ReactNode;
  ariaLabel: string;
  className?: string;
  fadeEdges?: boolean;
  showArrows?: boolean;
}

export const Carousel = ({
  children,
  ariaLabel,
  className = '',
  fadeEdges = true,
  showArrows = true
}: CarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: 0 });
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);
  const [dragging, setDragging] = useState(false);

  const sync = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 8);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    sync();
    el.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    return () => {
      el.removeEventListener('scroll', sync);
      window.removeEventListener('resize', sync);
    };
  }, [sync, children]);

  const scrollBy = (direction: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = Math.max(el.clientWidth * 0.8, 200);
    el.scrollBy({ left: direction * amount, behavior: 'smooth' });
  };

  const onPointerDown = (event: ReactPointerEvent) => {
    if (event.pointerType === 'touch') return;
    const el = scrollRef.current;
    if (!el) return;
    drag.current = { active: true, startX: event.clientX, startScroll: el.scrollLeft, moved: 0 };
  };

  const onPointerMove = (event: ReactPointerEvent) => {
    const el = scrollRef.current;
    if (!el || !drag.current.active) return;
    const delta = event.clientX - drag.current.startX;
    drag.current.moved = Math.abs(delta);
    if (drag.current.moved > 4) {
      setDragging(true);
      el.scrollLeft = drag.current.startScroll - delta;
    }
  };

  const endDrag = () => {
    drag.current.active = false;
    setDragging(false);
  };

  const onClickCapture = (event: ReactMouseEvent) => {
    if (drag.current.moved > 6) {
      event.preventDefault();
      event.stopPropagation();
      drag.current.moved = 0;
    }
  };

  const arrowBase =
    'absolute top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full ' +
    'bg-gray-900/85 backdrop-blur-md border border-white/15 text-white shadow-2xl ' +
    'flex items-center justify-center transition-all duration-200 ' +
    'hover:bg-red-600 hover:border-red-500 hover:scale-110 active:scale-95 ' +
    'disabled:opacity-0 disabled:pointer-events-none';

  return (
    <div className={`relative ${className}`}>
      <div
        ref={scrollRef}
        role="region"
        aria-label={ariaLabel}
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
        onKeyDown={(event) => {
          if (event.key === 'ArrowRight') {
            event.preventDefault();
            scrollBy(1);
          }
          if (event.key === 'ArrowLeft') {
            event.preventDefault();
            scrollBy(-1);
          }
        }}
        className={`flex gap-3 sm:gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory
                    [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
                    ${dragging ? 'cursor-grabbing select-none' : 'cursor-grab'}`}
      >
        {children}
      </div>

      {fadeEdges && (
        <>
          <div
            className={`pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-14 bg-gradient-to-r
                        from-gray-950 to-transparent transition-opacity duration-300
                        ${canLeft ? 'opacity-100' : 'opacity-0'}`}
          />
          <div
            className={`pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-14 bg-gradient-to-l
                        from-gray-950 to-transparent transition-opacity duration-300
                        ${canRight ? 'opacity-100' : 'opacity-0'}`}
          />
        </>
      )}

      {showArrows && (
        <>
          <button
            onClick={() => scrollBy(-1)}
            disabled={!canLeft}
            aria-label="Scroll left"
            className={`${arrowBase} left-1`}
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <button
            onClick={() => scrollBy(1)}
            disabled={!canRight}
            aria-label="Scroll right"
            className={`${arrowBase} right-1`}
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </>
      )}
    </div>
  );
};