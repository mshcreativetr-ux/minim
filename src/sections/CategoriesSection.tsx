import {
  Smartphone,
  ShoppingCart,
  Building2,
  Plane,
  CreditCard,
  Wrench,
  Truck,
  Users,
  LucideIcon,
} from "lucide-react";

export interface CategoryItem {
  icon: LucideIcon;
  title: string;
  desc: string;
}

export const categories: CategoryItem[] = [
  { icon: Smartphone, title: "شكاوى الاتصالات والإنترنت", desc: "عقود الهواتف، مشاكل التغطية، ورسوم الخدمات المضافة بدون إذن." },
  { icon: ShoppingCart, title: "التسوق الإلكتروني والمتاجر", desc: "المتاجر الإلكترونية، التأخر في التوصيل، وسياسات الإرجاع المضللة." },
  { icon: Building2, title: "العقارات والوساطة التجارية", desc: "خلافات شركات إدارة العقارات، الرسوم الإدارية، وعقود الوساطة." },
  { icon: Plane, title: "السفر والحجوزات السياحية", desc: "إلغاء وتأخير الرحلات، مشكلات حجوزات الفنادق، والشركات السياحية." },
  { icon: CreditCard, title: "البنوك والخدمات المالية", desc: "الرسوم المجحفة، المعاملات غير المصرح بها، والخدمات المصرفية." },
  { icon: Wrench, title: "الصيانة والخدمات المنزلية", desc: "عقود الصيانة، الأجهزة الكهربائية، والخدمات الفنية غير المطابقة." },
  { icon: Truck, title: "تطبيقات التوصيل والنقل", desc: "تطبيقات التوصيل الذكية، طلبات الطعام، وخدمات النقل الخاص." },
  { icon: Users, title: "خدمات القطاع الخاص الأخرى", desc: "الشكاوى العامة ضد الشركات والمراكز التجارية الخاصة بالدولة." },
];

export function CategoriesSection() {
  return (
    <section className="relative bg-white py-16 md:py-24 text-neutral-900 border-b border-neutral-100 dir-rtl text-right">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* العنوان والوصف الرئيسي */}
        <div className="mx-auto max-w-2xl text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-4 py-1 text-xs font-bold text-blue-950 border border-blue-900/15">
            القطاعات المشمولة
          </span>
          <h2 className="text-2xl font-black sm:text-3xl md:text-4xl text-neutral-900 tracking-tight">
            مجالات الشكاوى التجارية
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 font-medium leading-relaxed">
            نغطي مختلف القطاعات التجارية الخاصة لضمان توثيق صوتك وحماية حقوقك الشاملة.
          </p>
        </div>

        {/* شبكة البطاقات بتصميم Navy Blue الفاخر */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c, idx) => (
            <article
              key={idx}
              className="group relative rounded-2xl border-2 border-blue-900/15 bg-gradient-to-b from-blue-950/[0.02] to-blue-900/[0.06] p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-950/40 hover:shadow-lg hover:shadow-blue-950/5"
            >
              {/* أيقونة العنصر */}
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-blue-950 text-white transition-all duration-300 group-hover:bg-blue-900 group-hover:scale-110 shadow-md">
                <c.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
              </div>

              {/* عنوان الشكوى */}
              <h3 className="mt-5 text-base font-bold text-blue-950 transition-colors duration-200">
                {c.title}
              </h3>

              {/* الشرح */}
              <p className="mt-2 text-xs leading-relaxed text-neutral-600 font-medium">
                {c.desc}
              </p>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}