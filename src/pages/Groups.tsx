import { useState } from "react";
import Icon from "@/components/ui/icon";

const groups = [
  {
    id: 1, name: "Балет — Начинающие", level: "Начальный", teacher: "Елена Соколова",
    students: 14, maxStudents: 16, schedule: "Пн, Ср, Пт • 10:00–11:30", hall: "Зал 1",
    attendance: 91, color: "from-rose-500/20 to-rose-600/5", emoji: "🩰"
  },
  {
    id: 2, name: "Современный танец", level: "Средний", teacher: "Кирилл Морозов",
    students: 18, maxStudents: 20, schedule: "Вт, Чт • 18:30–20:00", hall: "Зал 2",
    attendance: 87, color: "from-violet-500/20 to-violet-600/5", emoji: "💃"
  },
  {
    id: 3, name: "Хореография", level: "Продвинутый", teacher: "Анастасия Белова",
    students: 22, maxStudents: 25, schedule: "Пн, Ср • 16:00–18:00", hall: "Зал 1",
    attendance: 94, color: "from-amber-500/20 to-amber-600/5", emoji: "🎭"
  },
  {
    id: 4, name: "Детская хореография", level: "Дети 6–10 лет", teacher: "Ольга Кузнецова",
    students: 16, maxStudents: 18, schedule: "Сб, Вс • 11:00–12:00", hall: "Зал 3",
    attendance: 79, color: "from-sky-500/20 to-sky-600/5", emoji: "⭐"
  },
  {
    id: 5, name: "Степ — Взрослые", level: "Начальный", teacher: "Максим Орлов",
    students: 11, maxStudents: 15, schedule: "Вт, Пт • 19:00–20:30", hall: "Зал 2",
    attendance: 83, color: "from-emerald-500/20 to-emerald-600/5", emoji: "🥿"
  },
  {
    id: 6, name: "Латиноамериканские танцы", level: "Средний", teacher: "Виктория Лебедева",
    students: 20, maxStudents: 20, schedule: "Пн, Ср, Пт • 20:00–21:30", hall: "Зал 1",
    attendance: 96, color: "from-orange-500/20 to-orange-600/5", emoji: "🌺"
  },
];

const students = [
  { id: 1, name: "Анна Петрова", group: "Балет — Начинающие", phone: "+7 900 123-45-67", joined: "Сен 2025", status: "active" },
  { id: 2, name: "Дмитрий Козлов", group: "Современный танец", phone: "+7 915 234-56-78", joined: "Окт 2025", status: "active" },
  { id: 3, name: "Мария Смирнова", group: "Хореография", phone: "+7 926 345-67-89", joined: "Авг 2025", status: "active" },
  { id: 4, name: "Иван Новиков", group: "Детская хореография", phone: "+7 937 456-78-90", joined: "Янв 2026", status: "active" },
  { id: 5, name: "Екатерина Фёдорова", group: "Степ — Взрослые", phone: "+7 948 567-89-01", joined: "Фев 2026", status: "active" },
  { id: 6, name: "Алексей Волков", group: "Латиноамериканские", phone: "+7 959 678-90-12", joined: "Мар 2026", status: "inactive" },
];

const levelColors: Record<string, string> = {
  "Начальный": "badge-present",
  "Средний": "badge-pending",
  "Продвинутый": "badge-paid",
  "Дети 6–10 лет": "badge-present",
};

export default function Groups() {
  const [tab, setTab] = useState<"groups" | "students">("groups");

  return (
    <div className="p-6 lg:p-8 space-y-6 animate-fade-in">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-cormorant text-4xl font-light text-foreground">Группы</h1>
          <p className="text-muted-foreground font-golos mt-1 text-sm">{groups.length} активных групп • {students.length} учеников</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg gold-gradient text-background font-golos text-sm font-medium hover:opacity-90 transition-all">
          <Icon name="Plus" size={15} />
          Добавить
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-muted/50 p-1 rounded-lg w-fit">
        {(["groups", "students"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-md font-golos text-sm transition-all ${
              tab === t ? "bg-gold text-background font-medium" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t === "groups" ? "Группы" : "Ученики"}
          </button>
        ))}
      </div>

      {tab === "groups" && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {groups.map((g, i) => (
            <div
              key={g.id}
              className={`card-glass rounded-xl p-5 bg-gradient-to-br ${g.color} cursor-pointer animate-fade-in`}
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center text-2xl">
                  {g.emoji}
                </div>
                <span className={`text-[10px] px-2.5 py-1 rounded-full font-golos font-medium ${levelColors[g.level] || "badge-present"}`}>
                  {g.level}
                </span>
              </div>

              <h3 className="font-cormorant text-xl font-semibold text-foreground mb-1">{g.name}</h3>
              <p className="font-golos text-xs text-muted-foreground mb-4">{g.teacher}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground font-golos">
                  <Icon name="Clock" size={12} className="text-gold" />
                  {g.schedule}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground font-golos">
                  <Icon name="MapPin" size={12} className="text-gold" />
                  {g.hall}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className="w-24 h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full gold-gradient"
                        style={{ width: `${(g.students / g.maxStudents) * 100}%` }}
                      />
                    </div>
                    <span className="font-golos text-xs text-foreground">{g.students}/{g.maxStudents}</span>
                  </div>
                  <p className="font-golos text-[10px] text-muted-foreground">учеников</p>
                </div>
                <div className="text-right">
                  <p className="font-cormorant text-xl font-semibold text-gold">{g.attendance}%</p>
                  <p className="font-golos text-[10px] text-muted-foreground">посещаемость</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "students" && (
        <div className="card-glass rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 font-golos text-xs font-medium text-muted-foreground uppercase tracking-wider">Ученик</th>
                <th className="text-left p-4 font-golos text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">Группа</th>
                <th className="text-left p-4 font-golos text-xs font-medium text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Телефон</th>
                <th className="text-left p-4 font-golos text-xs font-medium text-muted-foreground uppercase tracking-wider hidden lg:table-cell">С нами с</th>
                <th className="text-left p-4 font-golos text-xs font-medium text-muted-foreground uppercase tracking-wider">Статус</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s, i) => (
                <tr key={s.id} className="border-b border-border/50 hover:bg-white/[0.02] transition-colors cursor-pointer" style={{ animationDelay: `${i * 0.04}s` }}>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full gold-gradient flex items-center justify-center text-xs font-cormorant font-bold text-background flex-shrink-0">
                        {s.name.charAt(0)}
                      </div>
                      <span className="font-golos text-sm text-foreground">{s.name}</span>
                    </div>
                  </td>
                  <td className="p-4 hidden md:table-cell">
                    <span className="font-golos text-sm text-muted-foreground">{s.group}</span>
                  </td>
                  <td className="p-4 hidden lg:table-cell">
                    <span className="font-golos text-sm text-muted-foreground">{s.phone}</span>
                  </td>
                  <td className="p-4 hidden lg:table-cell">
                    <span className="font-golos text-sm text-muted-foreground">{s.joined}</span>
                  </td>
                  <td className="p-4">
                    <span className={`text-[10px] px-2.5 py-1 rounded-full font-golos font-medium ${s.status === "active" ? "badge-paid" : "badge-absent"}`}>
                      {s.status === "active" ? "Активен" : "Неактивен"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
