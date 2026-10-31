import { Link } from "@tanstack/react-router";
import { HelpCircle, ChevronLeft } from "lucide-react";

export interface FaqItem {
  q: string;
  a: string;
}

export const faqPreview: FaqItem[] = [
  {
    q: "كيف تعمل منصة حماية المستهلك لتقديم الشكاوى؟",
    a: "تتيح لك المنصة تقديم بيانات شكواك والوثائق الداعمة بسهولة. يقوم فريقنا بمراجعتها، توثيقها برقم مرجعي، ثم مخاطبة الشركة المعنية لمتابعة التوصل إلى حل إيجابي.",
  },
  {
    q: "هل خدمة تقديم الشكوى مجانية للمستهلكين في الإمارات؟",
    a: "نعم، خدمة توثيق وتقديم ومتابعة الشكاوى مجانية بالكامل لجميع المستهلكين والمتعاملين داخل دولة الإمارات العربية المتحدة.",
  },
  {
    q: "ما الدور الذي تقوم به المنصة لحل المشكلة مع الشركة؟",
    a: "نقوم بتوثيق الشكوى قانونياً، إصدار الرقم المرجعي، ومخاطبة إدارة المنشأة التجارية للوصول إلى تسوية عادلة تحمي حقوق المستهلك وفق الأنظمة المتبعة.",
  },
];

export function FaqSection() {
  return (
    <section className="relative bg-white py-16 md:py-24 text-neutral-900 border-b border-neutral-200 dir-rtl text-right">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid gap-10 lg:grid-cols-3 items-start">
        
        {/* العمود الأيمن */}
        <div className="space-y-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3.5 py-1 text-xs font-semibold text-neutral-800 border border-neutral-200">
            <HelpCircle className="h-3.5 w-3.5 shrink-0 text-neutral-600" />
            <span>الأسئلة الشائعة</span>
          </span>
          
          <h2 className="text-2xl font-black text-neutral-900 sm:text-3xl md:text-4xl tracking-tight leading-tight">
            استفسارات تتكرر باستمرار
          </h2>
          
          <p className="text-sm sm:text-base text-neutral-600 font-normal leading-relaxed">
            إليك إجابات لأبرز الأسئلة المتعلقة بتقديم وتوثيق الشكاوى التجارية للمستهلكين.
          </p>

          <div className="pt-2">
            <Link
              to="/faq"
              className="group inline-flex items-center gap-2 text-sm font-bold text-neutral-900 hover:text-black"
            >
              <span>عرض جميع الأسئلة</span>
              <ChevronLeft className="h-4 w-4 shrink-0 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* العمود الأيسر: كروت بسيطة وهادئة جداً */}
        <dl className="lg:col-span-2 space-y-3">
          {faqPreview.map((f, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-neutral-200 bg-neutral-50/50 p-6 transition-all duration-200 hover:border-neutral-300 hover:bg-white hover:shadow-sm"
            >
              <dt className="text-base font-bold text-neutral-900">
                {f.q}
              </dt>
              <dd className="mt-2 text-xs sm:text-sm leading-relaxed text-neutral-600 font-normal">
                {f.a}
              </dd>
            </div>
          ))}
        </dl>

      </div>
    </section>
  );
}