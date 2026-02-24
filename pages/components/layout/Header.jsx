import React from 'react';
import { Settings2 } from 'lucide-react';

export default function Header() {
  return (
    <header className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-50">
      <div className="flex items-center gap-3">
        <div className="bg-emerald-500 p-2.5 rounded-xl text-white shadow-lg">
          <Settings2 size={20} />
        </div>
        <h1 className="text-xl font-black uppercase tracking-tighter text-slate-800">
          Hair Roots Engine 4.0
        </h1>
      </div>
      <div className="text-[10px] font-black bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full uppercase tracking-widest border border-emerald-100">
        Live Build
      </div>
    </header>
  );
}