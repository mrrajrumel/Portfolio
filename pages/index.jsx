import React, { useState, useRef, useEffect } from 'react';
import { 
  Facebook, Instagram, Phone, Download, Globe2, 
  CheckCircle, Image as ImageIcon, RefreshCcw, Type, 
  Settings2, UploadCloud, Star, Smartphone 
} from 'lucide-react';

/**
 * Head Component Mock: 
 * Next.js environment-e 'next/head' kaaj kore, kintu preview-te error avoid korar jonno 
 * eti locally handle kora hochchhe.
 */
const HeadMock = ({ children }) => <>{children}</>;

/**
 * Header Component: 
 * Resolution error fix korar jonno Header-ti ekhane consolidate kora hoyechhe.
 */
const Header = () => (
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
      Live Editor
    </div>
  </header>
);

/**
 * Footer Component:
 * Design-er purnonggota-r jonno Footer ekhane add kora hoyechhe.
 */
const Footer = () => (
  <footer className="py-6 border-t border-slate-100 bg-white/50 flex flex-col items-center gap-2">
    <div className="flex items-center gap-2 text-slate-400 select-none">
      <Smartphone size={14} />
      <span className="text-[10px] font-black uppercase tracking-[0.5em]">
        Engineered by Rumel Ahmed
      </span>
    </div>
  </footer>
);

export default function Home() {
  // --- States ---
  const [template, setTemplate] = useState('style-vibrant');
  const [screenshot, setScreenshot] = useState(null);
  const [customLogo, setCustomLogo] = useState(null);
  const [title, setTitle] = useState("সম্মানিত\nগ্রাহকের\nমতামত");
  const [phone, setPhone] = useState("+880 1606-730686");
  const [website, setWebsite] = useState("hairroots.com.bd");
  
  // Typography controls
  const [titleSize, setTitleSize] = useState(76);
  const [phoneSize, setPhoneSize] = useState(36);
  const [logoSize, setLogoSize] = useState(140);
  const [lineHeight, setLineHeight] = useState(0.85);
  const [letterSpacing, setLetterSpacing] = useState(-2);
  const [scale, setScale] = useState(1);
  const [titleColor, setTitleColor] = useState('#10b981');
  
  const [isExporting, setIsExporting] = useState(false);
  const [libLoaded, setLibLoaded] = useState(false);
  const captureRef = useRef(null);

  // Logo default path: Public folder definition
  const LOGO_PATH = "/logo.png"; 

  // High-res library load for JPG export
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html-to-image/1.11.11/html-to-image.min.js';
    script.async = true;
    script.onload = () => setLibLoaded(true);
    document.body.appendChild(script);
  }, []);

  const handleUpload = (e, type) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (type === 'review') setScreenshot(event.target.result);
        else setCustomLogo(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadImage = async () => {
    if (!captureRef.current || !libLoaded) return;
    // @ts-ignore
    const h2i = window.htmlToImage;
    if (!h2i) return;

    setIsExporting(true);
    try {
      await new Promise(r => setTimeout(r, 600));
      const dataUrl = await h2i.toJpeg(captureRef.current, { 
        quality: 1, 
        pixelRatio: 3.75 
      });
      const link = document.createElement('a');
      link.download = `HairRoots-Review-${Date.now()}.jpg`;
      link.href = dataUrl;
      link.click();
    } catch (err) { 
      console.error("Export Error:", err); 
    } finally { 
      setIsExporting(false); 
    }
  };

  const StarLine = () => (
    <div className="flex gap-1">
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={32} className="text-yellow-400 fill-current shadow-sm" />
      ))}
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-[#f8fafc] font-sans overflow-hidden">
      <HeadMock>
        <title>Review Maker 4.0 | Hair Roots</title>
      </HeadMock>

      {/* --- Sidebar: Layout Settings & Controls --- */}
      <aside className="w-full lg:w-[400px] bg-white border-r border-slate-200 overflow-y-auto custom-scroll flex flex-col z-30 shadow-2xl h-screen">
        <Header />
        
        <div className="p-6 space-y-8 flex-1 pb-32">
          {/* Layout Template Selector */}
          <div className="space-y-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Layout selection</span>
            <div className="grid gap-2">
              {[
                { id: 'style-vibrant', label: 'Classic Right', sub: 'Style 01' },
                { id: 'style-classic', label: 'Vibrant Green', sub: 'Style 02' },
                { id: 'style-organic', label: 'Banner Frame', sub: 'Style 03' }
              ].map(t => (
                <button 
                  key={t.id} 
                  onClick={() => setTemplate(t.id)} 
                  className={`w-full p-4 rounded-2xl border-2 text-left transition-all flex justify-between items-center ${template === t.id ? 'border-emerald-500 bg-emerald-50 shadow-sm' : 'border-slate-100 bg-slate-50 hover:bg-slate-100'}`}
                >
                  <div>
                    <span className={`text-[9px] font-bold uppercase ${template === t.id ? 'text-emerald-500' : 'text-slate-400'}`}>{t.sub}</span>
                    <span className="block text-sm font-black text-slate-800">{t.label}</span>
                  </div>
                  {template === t.id && <CheckCircle size={20} className="text-emerald-500" />}
                </button>
              ))}
            </div>
          </div>

          {/* Typography Controls */}
          <div className="space-y-5 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-widest"><Type size={16} /> Typography engine</div>
            <textarea 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm font-bold outline-none focus:border-emerald-500 min-h-[100px] resize-none" 
            />
            
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-slate-400 uppercase">Title Size</span>
                  <span className="text-xs font-black text-emerald-600">{titleSize}px</span>
                </div>
                <input type="range" min="30" max="140" value={titleSize} onChange={e => setTitleSize(parseInt(e.target.value))} className="w-full accent-emerald-500 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-slate-400 uppercase">Logo Size</span>
                  <span className="text-xs font-black text-emerald-600">{logoSize}px</span>
                </div>
                <input type="range" min="50" max="300" value={logoSize} onChange={e => setLogoSize(parseInt(e.target.value))} className="w-full accent-emerald-500 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                   <span className="text-[10px] font-black text-slate-400 uppercase leading-none">Line Height</span>
                   <input type="range" min="0.6" max="1.5" step="0.05" value={lineHeight} onChange={e => setLineHeight(parseFloat(e.target.value))} className="w-full accent-emerald-500 h-1.5 bg-slate-200 rounded-lg" />
                </div>
                <div className="space-y-2">
                   <span className="text-[10px] font-black text-slate-400 uppercase leading-none">Spacing</span>
                   <input type="range" min="-10" max="10" step="1" value={letterSpacing} onChange={e => setLetterSpacing(parseInt(e.target.value))} className="w-full accent-emerald-500 h-1.5 bg-slate-200 rounded-lg" />
                </div>
              </div>
            </div>
          </div>

          {/* Branding Asset Uploads */}
          <div className="space-y-6 pt-4 border-t border-slate-100">
             <div className="flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-widest"><UploadCloud size={16} /> Asset library</div>
             <div className="grid grid-cols-2 gap-3">
                <label className="relative border-2 border-dashed border-slate-200 rounded-2xl p-4 text-center hover:bg-emerald-50 cursor-pointer transition-all">
                  <input type="file" onChange={(e) => handleUpload(e, 'logo')} className="absolute inset-0 opacity-0 cursor-pointer" />
                  <p className="text-[8px] font-black uppercase text-slate-400">Brand Logo</p>
                </label>
                <label className="relative border-2 border-dashed border-slate-200 rounded-2xl p-4 text-center hover:bg-emerald-50 cursor-pointer transition-all">
                  <input type="file" onChange={(e) => handleUpload(e, 'review')} className="absolute inset-0 opacity-0 cursor-pointer" />
                  <p className="text-[8px] font-black uppercase text-slate-400">Review Image</p>
                </label>
             </div>
             
             <div className="space-y-3">
                <input type="text" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm font-bold focus:border-emerald-500 outline-none" />
                <input type="text" value={website} onChange={e => setWebsite(e.target.value)} placeholder="Website" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm font-black uppercase tracking-widest focus:border-emerald-500 outline-none" />
             </div>
          </div>
        </div>

        {/* Action Button: High Res Export */}
        <div className="p-6 border-t border-slate-100 bg-white sticky bottom-0 z-50 shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
          <button 
            onClick={downloadImage} 
            disabled={isExporting} 
            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-black active:scale-95 transition-all shadow-xl disabled:opacity-50"
          >
            {isExporting ? <RefreshCcw size={16} className="animate-spin" /> : <Download size={16} />}
            {isExporting ? 'GENERATING...' : 'EXPORT ULTRA HD'}
          </button>
        </div>
      </aside>

      {/* --- Main View: Live Canvas Preview --- */}
      <main className="flex-1 flex items-center justify-center bg-[#e5e9f0] p-10 relative overflow-hidden h-screen">
        <div className="shadow-[0_80px_160px_-40px_rgba(0,0,0,0.3)] origin-center scale-[0.35] sm:scale-[0.5] md:scale-[0.6] xl:scale-[0.9] border-[16px] border-white rounded-[4.5rem] overflow-hidden bg-white">
          <div ref={captureRef} className="w-[800px] h-[800px] relative bg-white overflow-hidden capture-area">
            
            {/* Layout 01: Classic White (Mockup Right) */}
            {template === 'style-vibrant' && (
              <div className="w-full h-full flex bg-white relative overflow-hidden">
                <div className="absolute top-1/2 -left-20 w-96 h-96 bg-emerald-100/30 rounded-full blur-[100px]" />
                <div className="w-[62%] p-20 flex flex-col justify-between z-10 relative">
                  <div>
                    <img src={customLogo || LOGO_PATH} style={{ width: `${logoSize}px` }} className="object-contain" alt="Logo" onError={(e) => e.currentTarget.style.display = 'none'} />
                    <div className="mt-16">
                      <h1 className="italic font-black whitespace-pre-line tracking-tighter mb-10 leading-none"
                        style={{ fontSize: `${titleSize}px`, color: titleColor, lineHeight: lineHeight, letterSpacing: `${letterSpacing}px` }}>
                        {title}
                      </h1>
                      <div className="scale-110 origin-left"><StarLine /></div>
                    </div>
                  </div>
                  <div className="space-y-10">
                    <div className="font-black text-slate-900 tracking-tighter leading-none" style={{ fontSize: `${phoneSize * 1.5}px` }}>{phone}</div>
                    <div className="flex items-center gap-5 text-emerald-600 font-black tracking-[0.4em] text-xl uppercase"><Globe2 size={28} /> {website}</div>
                  </div>
                </div>
                <div className="w-[38%] bg-emerald-600 relative flex items-center justify-center p-8 overflow-visible">
                   <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/5" />
                   <div className="w-[280px] h-[580px] bg-slate-950 rounded-[55px] p-3 border-[10px] border-slate-900 shadow-2xl translate-x-12 z-20 relative overflow-hidden">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100px] h-[25px] bg-[#0f172a] rounded-b-[15px] z-50"><div className="w-8 h-0.5 bg-slate-800 rounded-full mx-auto mt-1" /></div>
                      <div className="w-full h-full rounded-[40px] overflow-hidden bg-white relative flex items-center justify-center">
                        {screenshot ? <img src={screenshot} className="w-full h-full object-cover" style={{ transform: `scale(${scale})` }} alt="R" /> : <div className="opacity-10 text-slate-900 flex flex-col items-center gap-2 font-black text-xs uppercase tracking-widest italic">Mockup 01</div>}
                      </div>
                   </div>
                </div>
              </div>
            )}

            {/* Layout 02: Vibrant Green (Full Mockup Left) */}
            {template === 'style-classic' && (
              <div className="w-full h-full flex items-center px-16 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[550px] h-full bg-gradient-to-br from-emerald-600 to-emerald-400 rounded-l-[400px] -rotate-3 translate-x-32" />
                <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px]" />
                <div className="w-[45%] z-10 flex items-center">
                  <div className="w-[335px] h-[680px] bg-slate-950 rounded-[65px] p-3.5 shadow-2xl border-[10px] border-slate-900 overflow-hidden relative mx-auto">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[30px] bg-[#0f172a] rounded-b-[20px] z-50"><div className="w-12 h-1 bg-slate-800 rounded-full mx-auto mt-2" /></div>
                    <div className="w-full h-full rounded-[48px] overflow-hidden bg-white relative flex items-center justify-center">
                      {screenshot ? <img src={screenshot} className="w-full h-full object-cover" style={{ transform: `scale(${scale})` }} alt="R" /> : <div className="opacity-10 text-slate-800 italic uppercase font-black tracking-widest">Mockup 02</div>}
                    </div>
                  </div>
                </div>
                <div className="w-[55%] pl-14 z-10 flex flex-col justify-center items-start text-white">
                  <div className="mb-14 p-4 bg-white/20 rounded-3xl backdrop-blur-xl border border-white/20 shadow-xl">
                    <img src={customLogo || LOGO_PATH} style={{ width: `${logoSize}px` }} className="object-contain" alt="Logo" onError={(e) => e.currentTarget.style.display = 'none'} />
                  </div>
                  <h1 className="italic font-black whitespace-pre-line tracking-tighter mb-8 leading-none text-white drop-shadow-lg"
                    style={{ fontSize: `${titleSize}px`, lineHeight: lineHeight, letterSpacing: `${letterSpacing}px` }}>{title}</h1>
                  <div className="mb-12 scale-110 origin-left"><StarLine /></div>
                  <div className="space-y-10 w-full">
                    <div className="flex items-center gap-6">
                       <div className="p-5 bg-white rounded-3xl text-emerald-600 shadow-xl flex items-center justify-center"><Phone size={32} className="fill-current" /></div>
                       <div className="flex flex-col">
                          <span className="text-[11px] font-black text-white/70 uppercase tracking-[0.4em] mb-1">Appointment</span>
                          <span className="font-black text-white tracking-tighter leading-none whitespace-nowrap" style={{ fontSize: `${phoneSize}px` }}>{phone}</span>
                       </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-3xl px-8 py-4 rounded-2xl border border-white/30 inline-flex items-center gap-4 text-white uppercase tracking-widest text-sm font-black italic">
                       <Globe2 size={24} /> {website}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Layout 03: Banner Style */}
            {template === 'style-organic' && (
              <div className="w-full h-full bg-emerald-600 relative flex flex-col items-center overflow-hidden">
                <div className="w-full h-[510px] bg-white rounded-b-[240px] shadow-2xl z-10 flex flex-col items-center justify-start pt-14 px-12 relative overflow-hidden text-center">
                   <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-emerald-50 to-transparent pointer-events-none rounded-b-[240px]" />
                   <img src={customLogo || LOGO_PATH} style={{ width: `${logoSize}px` }} className="object-contain mb-10 z-20" alt="Logo" onError={(e) => e.currentTarget.style.display = 'none'} />
                   <h1 className="italic font-black whitespace-pre-line tracking-tighter drop-shadow-sm max-w-[700px] leading-none z-20"
                     style={{ fontSize: `${titleSize * 0.9}px`, color: titleColor, lineHeight: lineHeight, letterSpacing: `${letterSpacing}px` }}>{title}</h1>
                   <div className="mt-8 scale-90 z-20"><StarLine /></div>
                </div>
                <div className="mt-[-110px] z-20 relative">
                  <div className="w-[520px] h-[360px] bg-white rounded-[70px] p-6 shadow-[0_60px_150px_-30px_rgba(0,0,0,0.5)] border-[14px] border-white overflow-hidden flex items-center justify-center">
                    <div className="w-full h-full rounded-[45px] overflow-hidden bg-slate-50 relative flex items-center justify-center">
                      {screenshot ? <img src={screenshot} className="w-full h-full object-cover" style={{ transform: `scale(${scale})` }} alt="R" /> : <div className="opacity-10 text-emerald-950 font-black italic uppercase">Banner 03</div>}
                    </div>
                  </div>
                </div>
                <div className="mt-14 w-full flex justify-center items-center gap-12 px-12 z-20">
                   <div className="bg-white/10 backdrop-blur-3xl px-14 py-6 rounded-[2.5rem] border border-white/40 text-white font-black tracking-tighter shadow-2xl whitespace-nowrap leading-none tabular-nums" style={{ fontSize: `${phoneSize * 1.2}px` }}>{phone}</div>
                   <div className="flex gap-6">
                      <div className="bg-white p-6 rounded-full text-emerald-600 shadow-2xl"><Facebook size={36} className="fill-current" /></div>
                      <div className="bg-white p-6 rounded-full text-emerald-600 shadow-2xl"><Instagram size={36} /></div>
                   </div>
                </div>
                <div className="absolute bottom-8 text-white/40 text-[11px] font-black uppercase tracking-[1em] select-none">{website}</div>
              </div>
            )}
          </div>
        </div>
        <div className="absolute bottom-10 opacity-30 pointer-events-none flex flex-col items-center gap-1 italic">
           <div className="flex items-center gap-2 text-slate-700">
              <Smartphone size={16} />
              <span className="text-[10px] font-black uppercase tracking-[0.5em]">Engineered by Rumel Ahmed</span>
           </div>
        </div>
      </main>
    </div>
  );
}