"use client";

import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, ArrowDownLeft, ChevronDown } from "lucide-react";

const navItems: ReadonlyArray<{
  to: string;
  label: string;
  hasDropdown?: boolean;
}> = [
  { to: "/", label: "الرئيسية" },
  { to: "/about", label: "عن المنصة" },
  {
    to: "/how-it-works",
    label: "كيف تعمل المنصة",
    hasDropdown: true,
  },
  { to: "/faq", label: "الأسئلة الشائعة" },
  { to: "/contact", label: "تواصل معنا" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-neutral-100 py-3 transition-all duration-200 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between gap-4 dir-rtl">

        {/* 1. أقصى اليمين: الشعار واسم المنصة */}
        <div className="flex items-center gap-3 shrink-0">
          <Link 
            to="/" 
            className="group flex items-center gap-3 transition-transform duration-200 active:scale-95"
          >
            <img 
              src="/kk.png" 
              alt="شعار منصة حماية المستهلك" 
              className="h-9 md:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
              // @ts-ignore
              fetchpriority="high"
            />
            
            <div className="flex flex-col border-r border-blue-900/20 pr-3">
              <span className="text-sm md:text-base font-black text-neutral-900 leading-tight">
                منصة حماية المستهلك
              </span>
              <span className="text-[10px] md:text-xs text-blue-950 font-semibold leading-none mt-0.5">
                دولة الإمارات العربية المتحدة
              </span>
            </div>
          </Link>
        </div>

        {/* 2. المنتصف: روابط التنقل (بتصميم منسق وأنيق يتناغم مع الـ Navy) */}
        <nav aria-label="التنقل الرئيسي" className="hidden lg:flex items-center gap-1.5 bg-neutral-50 p-1.5 rounded-full border border-neutral-200/60 shadow-inner">
          {navItems.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-xs font-semibold text-neutral-700 transition-all duration-200 whitespace-nowrap hover:bg-white hover:text-blue-950 hover:shadow-sm"
              activeProps={{ 
                className: "bg-white text-blue-950 font-bold shadow-sm border border-blue-900/10" 
              }}
              activeOptions={{ exact: n.to === "/" }}
            >
              <span>{n.label}</span>
              {n.hasDropdown && (
                <ChevronDown className="h-3.5 w-3.5 text-neutral-400" />
              )}
            </Link>
          ))}
        </nav>

        {/* 3. أقصى اليسار: الزر باللون الكحلي/الأسود الفاخر وزر الموبايل */}
        <div className="flex items-center gap-3">
          
          {/* الزر المميز */}
          <div className="hidden md:flex items-center">
            <Link
              to="/"
              hash="complaint-form"
              className="group inline-flex items-center gap-3 rounded-full bg-neutral-900 hover:bg-blue-950 text-white font-medium pl-1.5 pr-5 py-2 text-xs lg:text-sm transition-all duration-200 shadow-md active:scale-95"
            >
              <span className="font-bold">تقديم طلب شكوى</span>
              <span className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center transition-transform group-hover:-translate-x-1">
                <ArrowDownLeft className="h-4 w-4 text-white" />
              </span>
            </Link>
          </div>

          {/* زر فتح القائمة في الموبايل */}
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-neutral-200 bg-neutral-50 text-neutral-800 lg:hidden transition-colors hover:bg-neutral-100"
            aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

      </div>

      {/* قائمة الموبايل المنسدلة */}
      <div 
        className={
          "lg:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white/95 backdrop-blur-md px-4 border-b border-neutral-200 " +
          (open ? "max-h-[420px] opacity-100 py-4 mt-2" : "max-h-0 opacity-0 py-0")
        }
      >
        <div className="flex flex-col gap-2 dir-rtl">
          {navItems.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-neutral-700 bg-neutral-50 hover:bg-blue-50 hover:text-blue-950"
              activeProps={{ className: "bg-blue-50 text-blue-950 font-bold border border-blue-900/10" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              <span>{n.label}</span>
              {n.hasDropdown && <ChevronDown className="h-4 w-4 text-neutral-400" />}
            </Link>
          ))}

          <div className="pt-3 mt-1 border-t border-neutral-200">
            <Link
              to="/"
              hash="complaint-form"
              onClick={() => setOpen(false)}
              className="inline-flex w-full items-center justify-between rounded-full bg-neutral-900 text-white font-semibold pl-2 pr-5 py-3 text-sm shadow-md"
            >
              <span>تقديم طلب شكوى</span>
              <span className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
                <ArrowDownLeft className="h-4 w-4 text-white" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}