import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";
import {
  motion,
  useInView,
  animate,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";

interface HeroProps {
  onPrimaryClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

/* عدّاد أرقام: يبدأ من 0 ويصل للقيمة عند ظهوره على الشاشة */
function CountUp({
  to,
  suffix = "",
  prefix = "",
  duration = 1,
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, to, {
      duration,
      ease: "easeOut",
      onUpdate(value) {
        setCount(Math.floor(value));
      },
    });
    return () => controls.stop();
  }, [isInView, to, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}

/* ---------- العنوان المتحرك ----------
   ملاحظة مهمة: ما منقسم الحروف أبداً لأن الحروف العربية بتنقطع اتصالها.
   التقسيم بيكون على مستوى الكلمة فقط. */
const EASE = [0.22, 1, 0.36, 1] as const;
const TITLE_WORDS = ["منصة", "حماية", "المستهلك"];

function AnimatedTitle({ reduce }: { reduce: boolean }) {
  return (
    <h1
      aria-label={TITLE_WORDS.join(" ")}
      className="flex w-full flex-nowrap justify-center gap-x-[0.24em] whitespace-nowrap text-center text-[clamp(1.5rem,6.6vw,7.5rem)] font-black leading-[1.25] drop-shadow-[0_4px_30px_rgba(0,0,0,0.45)]"
    >
      {TITLE_WORDS.map((word, i) => (
        <span
          key={word}
          aria-hidden
          /* القناع: الكلمة بتطلع من تحت خط وهمي */
          className="inline-block overflow-hidden px-[0.04em] py-[0.18em] -my-[0.18em] align-bottom"
        >
          <motion.span
            className="hero-sheen inline-block"
            style={{ ["--i" as string]: i } as React.CSSProperties}
            initial={reduce ? false : { y: "115%", rotate: 3, opacity: 0, filter: "blur(10px)" }}
            animate={{ y: "0%", rotate: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.15, ease: EASE, delay: 0.25 + i * 0.16 }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

export function HeroSection({ onPrimaryClick }: HeroProps) {
  const reduce = !!useReducedMotion();

  /* تتبّع الماوس: العنوان والخلفية بيتحركوا بعكس بعض (عمق) */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 60, damping: 18, mass: 0.6 });
  const titleX = useTransform(sx, (v) => v * 14);
  const titleY = useTransform(sy, (v) => v * 8);
  const bgX = useTransform(sx, (v) => v * -18);
  const bgY = useTransform(sy, (v) => v * -10);

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const stats = [
    { value: <CountUp to={100} suffix="%" duration={1} />, label: "خدمة مجانية بالكامل" },
    { value: <CountUp to={24} suffix=" ساعة" duration={0.8} />, label: "متوسط وقت الاستجابة" },
    { value: "تأطير كامل", label: "صياغة قانونية للشكوى" },
    { value: <CountUp to={10000} prefix="+" duration={1.2} />, label: "طلب تم توثيقه" },
  ];

  const fadeUp = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: EASE, delay },
  });

  return (
    <div dir="rtl" className="w-full bg-white text-right">
      {/* لمعة الضوء على العنوان */}
      <style>{`
        .hero-sheen {
          background-image: linear-gradient(
            105deg,
            #d9d9d9 0%, #d9d9d9 40%,
            #ffffff 50%,
            #d9d9d9 60%, #d9d9d9 100%
          );
          background-size: 300% 100%;
          background-position: 0% 0;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          animation: hero-sheen 7s ease-in-out infinite;
          animation-delay: calc(1.9s + var(--i, 0) * 0.22s);
          animation-fill-mode: backwards;
        }
        @keyframes hero-sheen {
          0%   { background-position: 0% 0; }
          38%, 100% { background-position: 100% 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-sheen { animation: none; background-image: none; -webkit-text-fill-color: #fff; color: #fff; }
        }
      `}</style>

      {/* ================= 1. HERO ================= */}
      <section
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="relative flex min-h-[640px] w-full flex-col overflow-hidden bg-neutral-900 md:min-h-[720px] lg:min-h-screen"
      >
        {/* الخلفية: صورة بزوم بطيء + عمق + تعتيم */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <motion.div
            className="absolute -inset-6"
            style={reduce ? undefined : { x: bgX, y: bgY }}
          >
            <motion.img
              src="/mm.jpg"
              alt="منصة حماية المستهلك"
              className="h-full w-full object-cover"
              initial={reduce ? false : { scale: 1.18 }}
              animate={{ scale: 1.04 }}
              transition={{ duration: 3.2, ease: EASE }}
            />
          </motion.div>
          <div className="absolute inset-0 bg-neutral-950/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-neutral-950/35" />
          {/* فينيت خفيف بيركّز النظر على العنوان */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.45)_100%)]" />
        </div>

        {/* المحتوى فوق الصورة */}
        <div className="relative z-10 flex flex-1 flex-col justify-between p-5 sm:p-8 md:p-30">
          <div className="flex flex-col gap-2">
            {/* العنوان */}
            <motion.div
              className="flex flex-col items-center"
              style={reduce ? undefined : { x: titleX, y: titleY }}
            >
              <AnimatedTitle reduce={reduce} />

              {/* خط رفيع بيرسم نفسه تحت العنوان */}
              <div className="relative mt-5 h-px w-40 sm:w-64 md:mt-7">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-l from-transparent via-white/70 to-transparent"
                  initial={reduce ? false : { scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 1.2, ease: EASE, delay: 1.1 }}
                />
                {!reduce && (
                  <motion.span
                    className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-white shadow-[0_0_12px_3px_rgba(255,255,255,0.7)]"
                    initial={{ right: "0%", opacity: 0 }}
                    animate={{ right: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 1.6, ease: "easeInOut", delay: 1.3 }}
                  />
                )}
              </div>
            </motion.div>

            {/* الوصف + الأزرار */}
            <div className="mt-8 flex flex-col gap-4 md:mt-12 md:flex-row md:items-center md:justify-between">
              <motion.p
                {...fadeUp(1.35)}
                className="max-w-xl text-base font-medium leading-relaxed text-white sm:text-lg md:text-xl"
              >
                منصة رقمية مستقلة وغير تابعة لأي جهة حكومية لتوثيق وتنظيم الشكاوى ضد المنشآت التجارية، لتسهيل متابعتها وإيصالها للجهات المختصة بوضوح وسرعة.
              </motion.p>

              <motion.div
                {...fadeUp(1.5)}
                className="flex flex-col gap-3 sm:flex-row sm:items-center"
              >
                <a
                  href="#complaint-form"
                  onClick={onPrimaryClick}
                  className="group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full bg-white px-7 py-3 text-sm font-semibold text-neutral-950 transition-all duration-300 hover:shadow-[0_0_0_6px_rgba(255,255,255,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900"
                >
                  <span className="relative z-10">تقديم طلب توثيق شكوى</span>
                  <ArrowLeft className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                  {/* لمعة بتمر على الزر عند الـ hover */}
                  <span className="pointer-events-none absolute inset-y-0 right-0 w-1/3 translate-x-[-400%] skew-x-[20deg] bg-gradient-to-l from-transparent via-neutral-300/70 to-transparent transition-transform duration-700 group-hover:translate-x-[-50%]" />
                </a>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-md transition-colors duration-200 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  دليل الإجراءات
                </a>
              </motion.div>
            </div>
          </div>

          {/* الشريط العائم في الأسفل */}
          <motion.div
            initial={reduce ? false : { y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: EASE, delay: 1.7 }}
            className="mx-auto grid w-full max-w-4xl grid-cols-2 gap-3 rounded-3xl bg-white/95 p-4 text-neutral-900 shadow-2xl backdrop-blur-md sm:grid-cols-4 md:rounded-full md:p-3"
          >
            {stats.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center px-2 py-1 text-center"
              >
                <span className="text-lg font-extrabold text-neutral-900 sm:text-xl">
                  {item.value}
                </span>
                <span className="text-xs font-medium text-neutral-500 sm:text-sm">
                  {item.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= 2. من نحن + الإحصائيات ================= */}
      <section className="mx-auto mt-12 grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-4 pb-12 sm:px-6 md:mt-16 lg:grid-cols-12 lg:gap-12 lg:px-8">
        <div className="space-y-3 lg:col-span-5">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-900">
            <span>نبذة عنا</span>
          </div>
          <h2 className="text-2xl font-black text-neutral-900 sm:text-3xl">من نحن</h2>
          <p className="text-sm leading-relaxed text-neutral-600 sm:text-base">
            خدمة إلكترونية متخصصة في إعادة تأطير وصياغة الشكاوى التجارية في دولة الإمارات، لضمان استيفائها للبيانات والمستندات المطلوبة قبل رفعها للجهات المعنية.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:col-span-7">
          {stats.map((item, idx) => (
            <div
              key={idx}
              className="group flex flex-col justify-between gap-2 rounded-2xl border-2 border-blue-900/15 bg-gradient-to-b from-blue-950/[0.02] to-blue-900/[0.06] p-5 shadow-sm transition-all duration-300 hover:border-blue-950/40 hover:shadow-md"
            >
              <span className="text-xl font-black text-blue-950 sm:text-2xl">
                {item.value}
              </span>
              <span className="text-xs font-semibold leading-normal text-neutral-600">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
