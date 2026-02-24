import React from 'react';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header index.jsx sidebare thakbe, Layout e rakhlam na sidebar control er jonno */}
      <main className="flex-1 overflow-hidden">
        {children}
      </main>
    </div>
  );
}