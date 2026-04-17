import { useState } from "react";
import Icon from "@/components/ui/icon";

type Status = "paid" | "pending" | "overdue";

interface Payment {
  id: number;
  student: string;
  group: string;
  amount: number;
  period: string;
  date: string;
  status: Status;
  method: string;
}

const payments: Payment[] = [
  { id: 1, student: "Анна Петрова", group: "Мурашки 1", amount: 3500, period: "Апрель 2026", date: "02.04.2026", status: "paid", method: "Карта" },
  { id: 2, student: "Светлана Иванова", group: "Мурашки 1", amount: 3500, period: "Апрель 2026", date: "01.04.2026", status: "paid", method: "Перевод" },
  { id: 3, student: "Ксения Романова", group: "Мурашки 2", amount: 3500, period: "Апрель 2026", date: "07.04.2026", status: "paid", method: "Карта" },
  { id: 4, student: "Дарья Трофимова", group: "Мурашки 2", amount: 3500, period: "Апрель 2026", date: "—", status: "pending", method: "—" },
  { id: 5, student: "Мария Смирнова", group: "Средняя группа", amount: 4200, period: "Апрель 2026", date: "05.04.2026", status: "paid", method: "Наличные" },
  { id: 6, student: "Екатерина Соколова", group: "Средняя группа", amount: 4200, period: "Апрель 2026", date: "—", status: "pending", method: "—" },
  { id: 7, student: "Дмитрий Козлов", group: "Старшая группа", amount: 4800, period: "Апрель 2026", date: "—", status: "overdue", method: "—" },
  { id: 8, student: "Артём Белов", group: "Старшая группа", amount: 4800, period: "Апрель 2026", date: "10.04.2026", status: "paid", method: "Карта" },
  { id: 9, student: "Алексей Волков", group: "Старшая группа", amount: 4800, period: "Март 2026", date: "—", status: "overdue", method: "—" },
  { id: 10, student: "Никита Сидоров", group: "Старшая группа", amount: 4800, period: "Апрель 2026", date: "—", status: "pending", method: "—" },
];

const statusLabels: Record<Status, string> = { paid: "Оплачено", pending: "Ожидает", overdue: "Просрочено" };
const statusClass: Record<Status, string> = { paid: "badge-paid", pending: "badge-pending", overdue: "badge-overdue" };

export default function Payments() {
  const [filter, setFilter] = useState<Status | "all">("all");

  const filtered = filter === "all" ? payments : payments.filter((p) => p.status === filter);

  const totalPaid = payments.filter((p) => p.status === "paid").reduce((s, p) => s + p.amount, 0);
  const totalPending = payments.filter((p) => p.status === "pending").reduce((s, p) => s + p.amount, 0);
  const totalOverdue = payments.filter((p) => p.status === "overdue").reduce((s, p) => s + p.amount, 0);

  return (
    <div className="p-6 lg:p-8 space-y-6 animate-fade-in">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-cormorant text-4xl font-light text-foreground">Оплата</h1>
          <p className="text-muted-foreground font-golos mt-1 text-sm">Управление счетами и платежами</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg gold-gradient text-background font-golos text-sm font-medium hover:opacity-90 transition-all">
          <Icon name="Plus" size={15} />
          Новый счёт
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="stat-card rounded-xl p-5 bg-gradient-to-br from-emerald-500/15 to-emerald-600/5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <Icon name="CheckCircle" size={17} className="text-emerald-400" />
            </div>
            <span className="font-golos text-xs text-muted-foreground uppercase tracking-wider">Оплачено</span>
          </div>
          <p className="font-cormorant text-3xl font-semibold text-foreground">{totalPaid.toLocaleString("ru-RU")} ₽</p>
          <p className="font-golos text-xs text-emerald-400 mt-1">{payments.filter((p) => p.status === "paid").length} платежей</p>
        </div>
        <div className="stat-card rounded-xl p-5 bg-gradient-to-br from-amber-500/15 to-amber-600/5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <Icon name="Clock" size={17} className="text-amber-400" />
            </div>
            <span className="font-golos text-xs text-muted-foreground uppercase tracking-wider">Ожидает</span>
          </div>
          <p className="font-cormorant text-3xl font-semibold text-foreground">{totalPending.toLocaleString("ru-RU")} ₽</p>
          <p className="font-golos text-xs text-amber-400 mt-1">{payments.filter((p) => p.status === "pending").length} платежей</p>
        </div>
        <div className="stat-card rounded-xl p-5 bg-gradient-to-br from-red-500/15 to-red-600/5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-lg bg-red-500/10 flex items-center justify-center">
              <Icon name="AlertCircle" size={17} className="text-red-400" />
            </div>
            <span className="font-golos text-xs text-muted-foreground uppercase tracking-wider">Просрочено</span>
          </div>
          <p className="font-cormorant text-3xl font-semibold text-foreground">{totalOverdue.toLocaleString("ru-RU")} ₽</p>
          <p className="font-golos text-xs text-red-400 mt-1">{payments.filter((p) => p.status === "overdue").length} платежей</p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 bg-muted/50 p-1 rounded-lg w-fit">
        {(["all", "paid", "pending", "overdue"] as const).map((f) => {
          const labels = { all: "Все", paid: "Оплачено", pending: "Ожидает", overdue: "Просрочено" };
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-md font-golos text-sm transition-all ${
                filter === f ? "bg-gold text-background font-medium" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {labels[f]}
            </button>
          );
        })}
      </div>

      {/* Table */}
      <div className="card-glass rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-4 font-golos text-xs font-medium text-muted-foreground uppercase tracking-wider">Ученик</th>
              <th className="text-left p-4 font-golos text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">Группа</th>
              <th className="text-left p-4 font-golos text-xs font-medium text-muted-foreground uppercase tracking-wider">Сумма</th>
              <th className="text-left p-4 font-golos text-xs font-medium text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Период</th>
              <th className="text-left p-4 font-golos text-xs font-medium text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Дата</th>
              <th className="text-left p-4 font-golos text-xs font-medium text-muted-foreground uppercase tracking-wider">Статус</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, i) => (
              <tr
                key={p.id}
                className="border-b border-border/40 hover:bg-white/[0.02] transition-colors cursor-pointer animate-fade-in"
                style={{ animationDelay: `${i * 0.03}s` }}
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full gold-gradient flex items-center justify-center text-xs font-cormorant font-bold text-background flex-shrink-0">
                      {p.student.charAt(0)}
                    </div>
                    <span className="font-golos text-sm text-foreground">{p.student}</span>
                  </div>
                </td>
                <td className="p-4 hidden md:table-cell">
                  <span className="font-golos text-sm text-muted-foreground">{p.group}</span>
                </td>
                <td className="p-4">
                  <span className="font-cormorant text-lg font-semibold text-foreground">{p.amount.toLocaleString("ru-RU")} ₽</span>
                </td>
                <td className="p-4 hidden lg:table-cell">
                  <span className="font-golos text-sm text-muted-foreground">{p.period}</span>
                </td>
                <td className="p-4 hidden lg:table-cell">
                  <span className="font-golos text-sm text-muted-foreground">{p.date}</span>
                </td>
                <td className="p-4">
                  <span className={`text-[10px] px-2.5 py-1 rounded-full font-golos font-medium ${statusClass[p.status]}`}>
                    {statusLabels[p.status]}
                  </span>
                </td>
                <td className="p-4">
                  {p.status !== "paid" && (
                    <button className="text-xs px-3 py-1 rounded-lg gold-gradient text-background font-golos font-medium hover:opacity-80 transition-all">
                      Отметить
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}