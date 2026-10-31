import { Link } from "@tanstack/react-router";
import { Mail, ShieldAlert, ArrowUpRight, Heart } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-20 border-t border-neutral-200 bg-neutral-900 text-white dir-rtl text-right overflow-hidden">
      
      {/* خلفية جمالية هادئة */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/30 via-transparent to-neutral-950/60 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 grid gap-12 lg:grid-cols-12 lg:gap-8">
        
        {/* العمود الأول: الشعار ونبذة تعريفية */}
        <div className="lg:col-span-5 space-y-4">
          <Link to="/" className="inline-flex items-center gap-3 group">
            <img 
              src="/kk.png" 
              alt="شعار منصة حماية المستهلك" 
              width={42} 
              height={42} 
              className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
              loading="lazy"
            />
            <div className="flex flex-col">
              <span className="text-base font-black text-white leading-tight">منصة حماية المستهلك</span>
              <span className="text-[10px] text-neutral-400 font-semibold tracking-wide">دولة الإمارات العربية المتحدة</span>
            </div>
          </Link>
          
          <p className="max-w-md text-xs sm:text-sm leading-relaxed text-neutral-300 font-normal">
            منصة رقمية مستقلة تساعد المستهلكين في الإمارات على توثيق شكاواهم تجاه الشركات الخاصة ومتابعتها بدقة واحترافية. المنصة غير تابعة لأي جهة حكومية ولا تمثلها بأي شكل.
          </p>

          {/* تنبيه قانوني مصغر بارز */}
          <div className="inline-flex items-center gap-2 rounded-xl border border-blue-900/40 bg-blue-950/30 px-3.5 py-2 text-xs text-blue-200 backdrop-blur-sm">
            <ShieldAlert className="h-4 w-4 shrink-0 text-blue-400" />
            <span>خدمة توثيق مستقلة لرفع مستوى جودة الخدمات التجارية.</span>
          </div>
        </div>

        {/* العمود الثاني: روابط سريعة */}
        <div className="lg:col-span-3 space-y-4">
          <h3 className="text-sm font-bold text-white tracking-wider border-r-2 border-blue-600 pr-2.5">
            روابط سريعة
          </h3>
          <ul className="space-y-3 text-xs sm:text-sm text-neutral-300 font-medium">
            <li>
              <Link to="/about" className="inline-flex items-center gap-1 transition-colors hover:text-white group">
                <span className="transition-transform group-hover:-translate-x-1">←</span>
                <span>من نحن</span>
              </Link>
            </li>
            <li>
              <Link to="/how-it-works" className="inline-flex items-center gap-1 transition-colors hover:text-white group">
                <span className="transition-transform group-hover:-translate-x-1">←</span>
                <span>كيف تعمل المنصة</span>
              </Link>
            </li>
            <li>
              <Link to="/faq" className="inline-flex items-center gap-1 transition-colors hover:text-white group">
                <span className="transition-transform group-hover:-translate-x-1">←</span>
                <span>الأسئلة الشائعة</span>
              </Link>
            </li>
            <li>
              <Link to="/contact" className="inline-flex items-center gap-1 transition-colors hover:text-white group">
                <span className="transition-transform group-hover:-translate-x-1">←</span>
                <span>تواصل معنا</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* العمود الثالث: الروابط القانونية والدعم */}
        <div className="lg:col-span-4 space-y-4">
          <h3 className="text-sm font-bold text-white tracking-wider border-r-2 border-blue-600 pr-2.5">
            السياسات والدعم
          </h3>
          <ul className="space-y-3 text-xs sm:text-sm text-neutral-300 font-medium">
            <li>
              <Link to="/privacy" className="inline-flex items-center gap-1 transition-colors hover:text-white group">
                <span className="transition-transform group-hover:-translate-x-1">←</span>
                <span>سياسة الخصوصية</span>
              </Link>
            </li>
            <li>
              <Link to="/terms" className="inline-flex items-center gap-1 transition-colors hover:text-white group">
                <span className="transition-transform group-hover:-translate-x-1">←</span>
                <span>الشروط والأحكام</span>
              </Link>
            </li>
            <li className="pt-2">
              <a 
                href="mailto:moetshakawi-uae@gmail.com" 
                className="inline-flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-white transition-all hover:border-blue-500 hover:bg-white/10 group" 
                dir="ltr"
              >
                <Mail className="h-4 w-4 shrink-0 text-blue-400 group-hover:scale-110 transition-transform" aria-hidden="true" />
                <span className="font-semibold">moetshakawi-uae@gmail.com</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-neutral-400" />
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* الشريط السفلي للحقوق */}
      <div className="border-t border-neutral-800 bg-neutral-950 py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-between gap-4 text-xs font-medium text-neutral-400 md:flex-row text-center md:text-right">
          <p>© {currentYear} منصة حماية المستهلك. جميع الحقوق محفوظة.</p>
          
          <p className="text-neutral-500 max-w-lg">
            منصة حماية المستهلك — ليست جهة حكومية ولا تمثل أي جهة رسمية في دولة الإمارات العربية المتحدة.
          </p>
        </div>
      </div>
    </footer>
  );
}