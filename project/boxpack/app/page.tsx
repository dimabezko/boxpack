"use client";

import { useEffect, useState } from "react";

type Panel = "calculator" | "consultation" | "cases" | null;

const steps = [
  { title: "Оставляете заявку", detail: "Через сайт или Telegram" },
  { title: "Получаете расчет", detail: "Под ваш объем и формат работы" },
  { title: "Подписываем договор", detail: "Через ЭДО" },
  { title: "Принимаем товар", detail: "От поставщика или транспортной компании" },
  { title: "Автоматизированная упаковка", detail: "С видеоконтролем каждого этапа" },
  { title: "Отправляем", detail: "На маркетплейсы по всей России" },
  { title: "Получаете результат", detail: "Отчеты и прозрачную статистику" },
];

const services = [
  { title: "Приемка и сортировка", detail: "Принимаем поставки любого объема и размещаем товар на адресное хранение." },
  { title: "Проверка на брак", detail: "Контроль качества перед отправкой покупателю." },
  { title: "Автоматизированная упаковка", detail: "Автоматические линии и видеоконтроль каждого заказа." },
  { title: "Сборка заказов", detail: "Быстрая комплектация заказов по данным маркетплейсов." },
  { title: "Отправка на маркетплейсы", detail: "FBO и FBS для всех крупных площадок." },
  { title: "Хранение товаров", detail: "Безопасное адресное хранение продукции." },
  { title: "Интеграции", detail: "Синхронизация с маркетплейсами и CRM." },
];

const benefits = [
  { title: "Скорость", detail: "До 20 000 товаров за смену и отправка день в день." },
  { title: "Точность", detail: "99.8% точность сборки благодаря автоматизации." },
  { title: "Надежность", detail: "Страхование товара и круглосуточный контроль." },
  { title: "Поддержка", detail: "Персональный менеджер и оперативная помощь." },
];

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true">
      <path d="M7 2a1 1 0 0 1 1 1v1h8V3a1 1 0 1 1 2 0v1h1a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h1V3a1 1 0 0 1 1-1Zm13 9H4v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-8ZM7 6H5a1 1 0 0 0-1 1v2h16V7a1 1 0 0 0-1-1h-1v1a1 1 0 1 1-2 0V6H8v1a1 1 0 0 1-2 0V6h1Z" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true">
      <path d="M12 2.3 3 5.6V12c0 5.4 3.6 9 9 10 5.4-1 9-4.6 9-10V5.6l-9-3.3Zm4.8 7.9-5.3 5.4a1 1 0 0 1-1.4 0l-2.9-2.8a1 1 0 0 1 1.4-1.5l2.2 2.2 4.6-4.7a1 1 0 0 1 1.4 1.4Z" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M3 4h12a2 2 0 0 1 2 2v3h2a2 2 0 0 1 1.6.8l2 2.7c.3.4.4.8.4 1.2V18h-2a3 3 0 0 1-6 0H9a3 3 0 0 1-6 0H1V6a2 2 0 0 1 2-2Zm14 7v3h4l-2.2-3H17ZM6 17a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm12 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export default function HomePage() {
  const [panel, setPanel] = useState<Panel>(null);
  const [monthlyOrders, setMonthlyOrders] = useState("1000");
  const [itemsPerOrder, setItemsPerOrder] = useState("1");
  const [customerName, setCustomerName] = useState("");
  const [contact, setContact] = useState("");
  const [note, setNote] = useState("");
  const [prepared, setPrepared] = useState(false);
  const [copied, setCopied] = useState(false);
  const operations = Math.max(0, Number(monthlyOrders) || 0) * Math.max(0, Number(itemsPerOrder) || 0);
  const preparedText = `Заявка на консультацию BOXPACK\nИмя: ${customerName}\nКонтакт: ${contact}\nКомментарий: ${note || "Не указан"}`;

  useEffect(() => {
    if (!panel) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPanel(null);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [panel]);

  const openPanel = (value: Panel) => {
    setPanel(value);
    setPrepared(false);
    setCopied(false);
  };

  const navItems = [
    { label: "Услуги", url: "#services" },
    { label: "Как это работает", url: "#steps" },
    { label: "Видеофиксация", url: "#video" },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-white">
      <header className="bg-white">
        <div className="mx-auto flex h-[50px] w-[calc(100%-40px)] max-w-[1000px] items-center justify-between gap-6">
          <a href="#top" className="text-[23px] font-[800] tracking-[-0.6px] text-[#1a2a52]" aria-label="BOXPACK — на главную">
            BOXPACK
          </a>
          <nav className="hidden items-center gap-[27px] lg:flex" aria-label="Основная навигация">
            {navItems.map((item) => (
              <a key={item.label} href={item.url} className="whitespace-nowrap text-[12px] font-medium text-[#151515] transition-colors hover:text-[#17aabe]">
                {item.label}
              </a>
            ))}
            <button type="button" onClick={() => openPanel("calculator")} className="whitespace-nowrap text-[12px] font-medium text-[#151515] transition-colors hover:text-[#17aabe]">
              Калькулятор
            </button>
            <button type="button" onClick={() => openPanel("cases")} className="whitespace-nowrap text-[12px] font-medium text-[#151515] transition-colors hover:text-[#17aabe]">
              Кейсы
            </button>
            <button type="button" onClick={() => openPanel("consultation")} className="whitespace-nowrap text-[12px] font-medium text-[#151515] transition-colors hover:text-[#17aabe]">
              Контакты
            </button>
          </nav>
          <details className="group relative lg:hidden">
            <summary className="flex list-none items-center justify-center rounded-md p-2 text-[#1a2a52] marker:hidden" aria-label="Открыть меню">
              <MenuIcon />
            </summary>
            <nav className="absolute right-0 top-full z-20 mt-2 flex w-[240px] flex-col gap-1 rounded-xl bg-white p-3 shadow-xl ring-1 ring-black/10" aria-label="Мобильная навигация">
              {navItems.map((item) => (
                <a key={item.label} href={item.url} className="rounded-md px-3 py-2 text-sm hover:bg-gray-100">
                  {item.label}
                </a>
              ))}
              <button type="button" onClick={() => openPanel("calculator")} className="rounded-md px-3 py-2 text-left text-sm hover:bg-gray-100">Калькулятор</button>
              <button type="button" onClick={() => openPanel("cases")} className="rounded-md px-3 py-2 text-left text-sm hover:bg-gray-100">Кейсы</button>
              <button type="button" onClick={() => openPanel("consultation")} className="rounded-md px-3 py-2 text-left text-sm hover:bg-gray-100">Контакты</button>
            </nav>
          </details>
        </div>
      </header>

      <section id="top" className="bg-[#1a2a52] text-white">
        <div className="mx-auto grid min-h-[600px] w-[calc(100%-40px)] max-w-[1000px] grid-cols-1 items-start gap-12 py-[60px] lg:grid-cols-[500px_400px] lg:gap-[100px]">
          <div className="min-w-0">
            <p className="text-[14px] leading-[20px] text-white/90">Автоматизированный фулфилмент</p>
            <h1 className="mt-[17px] text-[36px] font-[700] leading-[1.14] tracking-[-1px] sm:text-[44px] lg:text-[48px]">
              Фулфилмент,<br className="hidden sm:block" /> который держит<br className="hidden sm:block" /> сроки и репутацию
            </h1>
            <p className="mt-[14px] max-w-[510px] text-[14px] leading-[17px] text-white/90">
              Автоматизированная упаковка, видеоконтроль каждого заказа и отправка в день поступления. Мы берем на себя хранение, сборку, маркировку и логистику.
            </p>
            <div className="mt-[28px] flex flex-wrap items-center gap-x-[37px] gap-y-4">
              <button type="button" onClick={() => openPanel("calculator")} className="flex items-center gap-3 text-[14px] font-bold transition-opacity hover:opacity-75">
                Рассчитать стоимость <span className="text-[19px] font-normal" aria-hidden="true">→</span>
              </button>
              <button type="button" onClick={() => openPanel("consultation")} className="rounded-[3px] border border-white/90 px-[15px] py-[11px] text-[11px] font-bold transition-colors hover:bg-white hover:text-[#1a2a52]">
                Получить консультацию
              </button>
            </div>
            <div className="mt-[50px] grid max-w-[468px] grid-cols-1 gap-[24px] min-[560px]:grid-cols-3">
              <div className="flex min-h-[82px] flex-col justify-center rounded-[10px] bg-[#32436a] px-[12px] py-[9px]">
                <CalendarIcon />
                <p className="mt-[4px] text-[15px] font-bold leading-[18px]">5000+</p>
                <p className="mt-[1px] text-[11px] leading-[14px] text-white/80">заказов в день</p>
              </div>
              <div className="flex min-h-[82px] flex-col justify-center rounded-[10px] bg-[#32436a] px-[12px] py-[9px]">
                <ShieldIcon />
                <p className="mt-[4px] text-[15px] font-bold leading-[18px]">99.8%</p>
                <p className="mt-[1px] text-[11px] leading-[14px] text-white/80">точность сборки</p>
              </div>
              <div className="flex min-h-[82px] flex-col justify-center rounded-[10px] bg-[#32436a] px-[12px] py-[9px]">
                <TruckIcon />
                <p className="mt-[4px] text-[15px] font-bold leading-[18px]">FBO/FBS</p>
                <p className="mt-[1px] text-[11px] leading-[14px] text-white/80">все маркетплейсы</p>
              </div>
            </div>
          </div>
          <div id="video" className="flex scroll-mt-20 items-center justify-center lg:h-[400px]">
            <div className="flex aspect-[400/220] w-full max-w-[400px] items-center justify-center rounded-[9px] bg-[#d2d5de] px-4 text-center text-[10px] text-[#1b1b1b]">
              Видео автоматической упаковочной линии
            </div>
          </div>
        </div>
      </section>

      <section id="steps" className="scroll-mt-10 bg-white pt-[65px] pb-[100px]">
        <div className="mx-auto w-[calc(100%-40px)] max-w-[1030px]">
          <h2 className="text-center text-[24px] font-bold leading-[30px]">Как начать работать с нами</h2>
          <p className="mx-auto mt-[10px] max-w-[660px] text-center text-[14px] leading-[19px]">
            Подключение занимает всего несколько дней. Все процессы максимально автоматизированы.
          </p>
          <div className="mt-[50px] grid grid-cols-1 gap-[24px] sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <article key={step.title} className={`flex min-h-[165px] flex-col justify-center rounded-[10px] border-t-[5px] border-[#d7d7d7] bg-[#f0f0f0] px-[17px] py-[18px] ${index === 0 ? "shadow-[5px_7px_5px_rgba(0,0,0,0.2)]" : ""}`}>
                <p className="text-[12px] font-bold leading-[16px]">ШАГ {index + 1}</p>
                <h3 className="mt-[5px] text-[13px] font-bold leading-[16px]">{step.title}</h3>
                <p className="mt-[10px] text-[12px] leading-[14px] text-[#a5a5a5]">{step.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="scroll-mt-10 bg-[#f8f8f8] pt-[60px] pb-[73px]">
        <div className="mx-auto w-[calc(100%-40px)] max-w-[850px]">
          <h2 className="text-center text-[24px] font-bold leading-[30px]">Услуги фулфилмента</h2>
          <p className="mt-[12px] text-center text-[14px] leading-[20px]">Полный цикл обработки товара от приемки до доставки.</p>
          <div className="mt-[50px] grid grid-cols-1 gap-[22px] sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <article key={service.title} className={`flex min-h-[165px] flex-col justify-center rounded-[10px] border-t-[5px] border-[#23b9c7] bg-white px-[18px] py-[22px] ${index === 0 ? "shadow-[5px_8px_5px_rgba(0,0,0,0.19)]" : ""}`}>
                <h3 className="text-[13px] font-bold leading-[17px]">{service.title}</h3>
                <p className="mt-[11px] text-[12px] leading-[15px] text-[#aaaaaa]">{service.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="advantages" className="bg-[#1a2a52] pt-[36px] pb-[52px] text-white">
        <div className="mx-auto w-[calc(100%-40px)] max-w-[920px]">
          <h2 className="text-center text-[24px] font-bold leading-[30px]">Почему выбирают BOXPACK</h2>
          <div className="mt-[39px] grid grid-cols-1 gap-[28px] sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => (
              <article key={benefit.title} className="flex min-h-[143px] flex-col justify-center rounded-[10px] bg-[#32436a] px-[16px] py-[20px]">
                <h3 className="text-[16px] font-bold leading-[20px]">{benefit.title}</h3>
                <p className="mt-[10px] text-[12px] leading-[15px] text-white/85">{benefit.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {panel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) setPanel(null); }}>
          <section role="dialog" aria-modal="true" aria-labelledby="panel-heading" className="w-full max-w-[480px] rounded-[14px] bg-white p-6 text-[#111111] shadow-2xl sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <h2 id="panel-heading" className="text-[23px] font-bold text-[#1a2a52]">
                {panel === "calculator" ? "Рассчитать стоимость" : panel === "cases" ? "Кейсы BOXPACK" : "Получить консультацию"}
              </h2>
              <button type="button" aria-label="Закрыть" onClick={() => setPanel(null)} className="rounded-md px-2 text-[28px] leading-none text-gray-500 hover:text-[#1a2a52]">×</button>
            </div>
            {panel === "calculator" && (
              <div className="mt-6 space-y-5">
                <label className="block text-sm font-medium">Заказов в месяц
                  <input min="0" type="number" inputMode="numeric" value={monthlyOrders} onChange={(event) => setMonthlyOrders(event.target.value)} className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-3 outline-none focus:border-[#23b9c7]" />
                </label>
                <label className="block text-sm font-medium">Товаров в одном заказе
                  <input min="0" type="number" inputMode="numeric" value={itemsPerOrder} onChange={(event) => setItemsPerOrder(event.target.value)} className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-3 outline-none focus:border-[#23b9c7]" />
                </label>
                <div className="rounded-lg bg-[#f0f4f7] p-4">
                  <p className="text-[13px] text-gray-600">Расчетный объем обработки за месяц</p>
                  <p className="mt-1 text-[28px] font-bold text-[#1a2a52]">{operations.toLocaleString("ru-RU")} товаров</p>
                  <p className="mt-2 text-[12px] leading-[18px] text-gray-600">Стоимость рассчитывается индивидуально с учетом хранения, упаковки и схемы поставки.</p>
                </div>
                <button type="button" onClick={() => openPanel("consultation")} className="w-full rounded-lg bg-[#1a2a52] px-4 py-3 text-sm font-bold text-white hover:bg-[#273b69]">Получить расчет</button>
              </div>
            )}
            {panel === "cases" && (
              <div className="mt-5">
                <p className="text-sm leading-6 text-gray-700">Решения по упаковке, сборке и доставке подбираются под ассортимент, объем заказов и требования маркетплейса. Подробности проектов можно уточнить на консультации.</p>
                <button type="button" onClick={() => openPanel("consultation")} className="mt-6 rounded-lg bg-[#1a2a52] px-5 py-3 text-sm font-bold text-white hover:bg-[#273b69]">Получить консультацию</button>
              </div>
            )}
            {panel === "consultation" && (
              <form onSubmit={(event) => { event.preventDefault(); setPrepared(true); }} className="mt-5 space-y-4">
                <p className="text-[13px] leading-5 text-gray-600">Укажите свои данные, чтобы подготовить текст заявки.</p>
                <label className="block text-[13px] font-medium">Ваше имя
                  <input required value={customerName} onChange={(event) => { setCustomerName(event.target.value); setPrepared(false); }} className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-3 outline-none focus:border-[#23b9c7]" placeholder="Имя" />
                </label>
                <label className="block text-[13px] font-medium">Телефон, email или Telegram
                  <input required value={contact} onChange={(event) => { setContact(event.target.value); setPrepared(false); }} className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-3 outline-none focus:border-[#23b9c7]" placeholder="Контакт для связи" />
                </label>
                <label className="block text-[13px] font-medium">Комментарий
                  <textarea rows={3} value={note} onChange={(event) => { setNote(event.target.value); setPrepared(false); }} className="mt-2 w-full resize-y rounded-lg border border-gray-300 px-3 py-3 outline-none focus:border-[#23b9c7]" placeholder="Объем, товары, услуги" />
                </label>
                <button type="submit" className="w-full rounded-lg bg-[#1a2a52] px-4 py-3 text-sm font-bold text-white hover:bg-[#273b69]">Подготовить заявку</button>
                {prepared && (
                  <div className="space-y-2 rounded-lg bg-[#f0f4f7] p-3">
                    <p className="text-[12px] text-gray-600">Текст заявки для отправки менеджеру</p>
                    <textarea readOnly value={preparedText} rows={4} className="w-full resize-none rounded-md border border-gray-200 bg-white p-2 text-[12px]" />
                    <button type="button" onClick={async () => { try { await navigator.clipboard.writeText(preparedText); setCopied(true); } catch { setCopied(false); } }} className="rounded-lg border border-[#1a2a52] px-3 py-2 text-[12px] font-bold text-[#1a2a52]">{copied ? "Скопировано" : "Скопировать текст"}</button>
                  </div>
                )}
              </form>
            )}
          </section>
        </div>
      )}
    </main>
  );
}
