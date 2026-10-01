import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, ChevronDown, Search } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
  hint?: string;
}

interface SelectMenuProps {
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  searchable?: boolean;
  icon?: ReactNode;
  width?: string;
}

export const SelectMenu = ({
  label,
  value,
  options,
  onChange,
  searchable = false,
  icon,
  width = 'w-full'
}: SelectMenuProps) => {
  const [open, setOpen] = useState(false);
  const [term, setTerm] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;

    const onClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', onClickOutside);
    document.addEventListener('keydown', onKeyDown);

    if (searchable) {
      setTerm('');
      requestAnimationFrame(() => inputRef.current?.focus());
    }

    return () => {
      document.removeEventListener('mousedown', onClickOutside);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, searchable]);

  const filtered = useMemo(() => {
    if (!searchable || !term.trim()) return options;
    const needle = term.trim().toLowerCase();
    return options.filter((option) => option.label.toLowerCase().includes(needle));
  }, [options, searchable, term]);

  const selected = options.find((option) => option.value === value);

  return (
    <div ref={containerRef} className={`relative ${width}`}>
      <span className="block text-xs uppercase tracking-wide text-gray-400 font-semibold mb-1.5">
        {label}
      </span>

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl border text-sm
                    bg-white/5 hover:bg-white/[0.08] transition-all duration-200 text-left
                    ${open ? 'border-red-500/60 bg-white/10' : 'border-white/10'}`}
      >
        {icon}
        <span className={`flex-1 truncate ${selected ? 'text-white' : 'text-gray-400'}`}>
          {selected?.label ?? 'Select'}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            role="listbox"
            className="absolute left-0 right-0 top-full mt-2 z-50 rounded-2xl overflow-hidden
                       bg-gray-900/98 backdrop-blur-xl border border-gray-700/60 shadow-2xl shadow-black/60"
          >
            {searchable && (
              <div className="p-2 border-b border-white/5">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
                  <input
                    ref={inputRef}
                    value={term}
                    onChange={(event) => setTerm(event.target.value)}
                    placeholder="Search..."
                    className="w-full bg-white/5 text-white text-sm rounded-lg pl-8 pr-3 py-2
                               border border-white/5 focus:outline-none focus:border-red-500/50
                               placeholder-gray-500"
                  />
                </div>
              </div>
            )}

            <div className="max-h-64 overflow-y-auto p-1.5">
              {filtered.length === 0 ? (
                <p className="px-3 py-6 text-center text-sm text-gray-500">No matches</p>
              ) : (
                filtered.map((option) => {
                  const isSelected = option.value === value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => {
                        onChange(option.value);
                        setOpen(false);
                      }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm
                                  text-left transition-colors
                                  ${
                                    isSelected
                                      ? 'bg-red-500/15 text-red-300'
                                      : 'text-gray-300 hover:bg-white/10'
                                  }`}
                    >
                      <Check
                        className={`w-4 h-4 shrink-0 ${isSelected ? 'opacity-100' : 'opacity-0'}`}
                      />
                      <span className="flex-1 truncate">{option.label}</span>
                      {option.hint && (
                        <span className="text-[10px] uppercase text-gray-500 shrink-0">
                          {option.hint}
                        </span>
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};