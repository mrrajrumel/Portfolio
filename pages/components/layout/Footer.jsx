import React from 'react';
import { Smartphone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-6 border-t border-slate-100 bg-white/50 flex flex-col items-center gap-2">
      <div className="flex items-center gap-2 text-slate-400 select-none">
        <Smartphone size={14} />
        <span className="text-[10px] font-black uppercase tracking-[0.5em]">
          Engineered by Rumel Ahmed
        </span>
      </div>
      <div className="w-12 h-0.5 bg-slate-200 rounded-full" />
    </footer>
  );
}