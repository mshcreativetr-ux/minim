import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Check, Clock3, Mail, ShieldCheck } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { buildHead } from "@/components/site/seo";

export const Route = createFileRoute("/thank-you")({
  head: () =>
    buildHead({
      title: "تم استلام شكواك بنجاح | منصة حماية المستهلك",
      description:
        "شكرًا لتقديم شكواك عبر منصة حماية المستهلك تم استلام الطلب وبدأت عملية المراجعة.",
      path: "/thank-you",
    }),
  component: ThankYouPage,
});

const EASE = [0.22, 1, 0.36, 1] as const;

const steps = [
  {
    title: "تم استلام الشكوى",
    text: "تم تسجيل بياناتك بنجاح",
    state: "done",
    icon: Check,
  },
  {
    title: "قيد المراجعة",
    text: "يتم التحقق من تفاصيل الشكوى",
    state: "current",
    icon: Clock3,
  },
  {
    title: "متابعة الحالة",
    text: "ستصلك التحديثات عبر البريد",
    state: "next",
    icon: Mail,
  },
] as const;

function ThankYouPage() {
  const reduce = !!useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: EASE, delay },
  });

  return (
    <div dir="rtl" className="flex min-h-screen flex-col bg-background text-right">
    

      <main className="relative flex-1 overflow-hidden">
        {/* لمسة خلفية هادئة: شبكة فاتحة جداً تتلاشى للأسفل */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[520px] opacity-[0.045] [mask-image:linear-gradient(to_bottom,black,transparent)]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, var(--color-foreground) 0 1px, transparent 1px 32px), repeating-linear-gradient(90deg, var(--color-foreground) 0 1px, transparent 1px 32px)",
          }}
        />

        <div className="relative mx-auto max-w-3xl px-5 py-12 md:px-8 md:py-16">
          {/* ===== علامة النجاح + العنوان ===== */}
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-8 grid h-24 w-24 place-items-center">
              {/* حلقة تنبض مرة واحدة */}
              {!reduce && (
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full border border-success/40"
                  initial={{ scale: 0.8, opacity: 0.9 }}
                  animate={{ scale: 1.7, opacity: 0 }}
                  transition={{ duration: 1.6, ease: "easeOut", delay: 0.7 }}
                />
              )}
              <motion.div
                className="grid h-24 w-24 place-items-center rounded-full bg-success shadow-card"
                initial={reduce ? false : { scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                <svg viewBox="0 0 48 48" className="h-12 w-12" fill="none" aria-hidden="true">
                  <motion.path
                    d="M12 25.5 L21 34 L37 15"
                    stroke="white"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={reduce ? false : { pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.35 }}
                  />
                </svg>
              </motion.div>
            </div>

            <motion.div
              {...rise(0.7)}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-4 py-1.5 text-xs font-bold text-success"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden="true" />
              تم تسجيل الطلب بنجاح
            </motion.div>

            <motion.h1
              {...rise(0.8)}
              className="text-4xl font-black leading-[1.3] text-foreground md:text-6xl"
            >
              شكواك وصلت إلينا
            </motion.h1>

            <motion.p
              {...rise(0.92)}
              className="mx-auto mt-5 max-w-xl text-base leading-8 text-muted-foreground md:text-lg"
            >
              شكرًا لثقتك بـ{" "}
              <span className="font-bold text-foreground">منصة حماية المستهلك</span>
              . تم استلام شكواك بنجاح، وبدأت عملية مراجعتها.
            </motion.p>
          </div>

          {/* ===== وثيقة حالة الطلب ===== */}
          <motion.article
            {...rise(1.05)}
            aria-labelledby="status-title"
            className="mt-12 overflow-hidden rounded-2xl border border-border bg-surface shadow-card"
          >
            {/* رأس الوثيقة */}
            <div className="flex items-center justify-between gap-4 border-b border-border bg-muted/50 px-6 py-5 md:px-8">
              <div>
                <p className="text-xs font-bold text-muted-foreground">حالة الطلب</p>
                <p id="status-title" className="mt-1 text-xl font-black text-foreground">
                  قيد المراجعة
                </p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-bold text-foreground">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60 motion-safe:animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                قيد المعالجة
              </span>
            </div>

            {/* المسار الزمني العمودي */}
            <ol className="relative px-6 py-8 md:px-8">
              {/* الخط الأساسي */}
              <span
                aria-hidden="true"
                className="absolute bottom-[68px] top-[68px] w-px bg-border"
                style={{ right: "calc(1.5rem + 19px)" }}
              />
              {/* الجزء المكتمل من الخط */}
              <motion.span
                aria-hidden="true"
                className="absolute top-[68px] h-[calc(50%-68px)] w-px origin-top bg-success"
                style={{ right: "calc(1.5rem + 19px)" }}
                initial={reduce ? false : { scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.9, ease: EASE, delay: 1.5 }}
              />

              <div className="space-y-9">
                {steps.map((s, i) => {
                  const Icon = s.icon;
                  const done = s.state === "done";
                  const current = s.state === "current";
                  return (
                    <motion.li
                      key={s.title}
                      className="relative flex items-start gap-5"
                      initial={reduce ? false : { opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, ease: EASE, delay: 1.25 + i * 0.18 }}
                      aria-current={current ? "step" : undefined}
                    >
                      <span
                        className={
                          "relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full " +
                          (done
                            ? "bg-success text-white"
                            : current
                              ? "border-2 border-accent bg-surface text-accent"
                              : "border border-border bg-muted text-muted-foreground")
                        }
                      >
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>

                      <div className="pt-1">
                        <p
                          className={
                            "font-bold " + (s.state === "next" ? "text-foreground/70" : "text-foreground")
                          }
                        >
                          {s.title}
                        </p>
                        <p className="mt-1 text-sm leading-6 text-muted-foreground">{s.text}</p>
                      </div>
                    </motion.li>
                  );
                })}
              </div>
            </ol>

            {/* تذييل الوثيقة: البريد + المدة */}
            <div className="grid divide-y divide-border border-t border-border sm:grid-cols-[1fr_auto] sm:divide-x sm:divide-x-reverse sm:divide-y-0">
              <div className="flex items-start gap-3 px-6 py-5 md:px-8">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-border bg-muted text-foreground">
                  <Mail className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-bold text-foreground">راجع بريدك الإلكتروني</p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    سيصلك الرقم المرجعي والتحديثات المتعلقة بالشكوى.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-muted/50 px-6 py-5 text-sm font-bold text-foreground md:px-8">
                <Clock3 className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                خلال 24 ساعة عمل
              </div>
            </div>
          </motion.article>

          {/* ===== الإجراء ===== */}
          <motion.div {...rise(1.4)} className="mt-10 flex justify-center">
            <Link
              to="/"
              className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-auto"
            >
              العودة للصفحة الرئيسية
              <ArrowLeft
                className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
