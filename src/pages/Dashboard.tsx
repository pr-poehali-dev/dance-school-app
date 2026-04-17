import Icon from "@/components/ui/icon";

const stats = [
  { label: "Учеников всего", value: "124", delta: "+8 за месяц", icon: "Users", color: "from-amber-500/20 to-amber-600/5" },
  { label: "Активных групп", value: "12", delta: "3 новых в сезоне", icon: "Layers", color: "from-purple-500/20 to-purple-600/5" },
  { label: "Занятий на неделе", value: "34", delta: "Пн–Вс", icon: "CalendarDays", color: "from-blue-500/20 to-blue-600/5" },
  { label: "Доход за месяц", value: "186 400 ₽", delta: "+12% к прошлому", icon: "TrendingUp", color: "from-emerald-500/20 to-emerald-600/5" },
];

const recentGroups = [
  { name: "Мурашки 1", students: 12, time: "Пн, Ср, Пт • 10:00", level: "Малыши", attendance: 91 },
  { name: "Мурашки 2", students: 14, time: "Вт, Чт • 11:00", level: "Малыши", attendance: 87 },
  { name: "Средняя группа", students: 16, time: "Пн, Ср • 16:00", level: "Средний", attendance: 94 },
  { name: "Старшая группа", students: 18, time: "Вт, Чт • 18:00", level: "Продвинутый", attendance: 89 },
];

const upcomingLessons = [
  { group: "Мурашки 1", time: "10:00", hall: "Зал 1", students: 12 },
  { group: "Мурашки 2", time: "11:00", hall: "Зал 1", students: 14 },
  { group: "Средняя группа", time: "16:00", hall: "Зал 1", students: 16 },
  { group: "Старшая группа", time: "18:00", hall: "Зал 1", students: 18 },
];

const overduePayments = [
  { name: "Анна Петрова", group: "Мурашки 1", amount: "3 500 ₽", days: 5 },
  { name: "Дмитрий Козлов", group: "Средняя группа", amount: "4 200 ₽", days: 12 },
  { name: "Мария Смирнова", group: "Старшая группа", amount: "3 800 ₽", days: 3 },
];

export default function Dashboard() {
  return (
    <div className="p-6 lg:p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-cormorant text-4xl font-light text-foreground">
            Добрый день, <span className="gold-text italic">Администратор</span>
          </h1>
          <p className="text-muted-foreground font-golos mt-1 text-sm">Пятница, 17 апреля 2026</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg gold-gradient text-background font-golos text-sm font-medium hover:opacity-90 transition-all">
          <Icon name="Plus" size={15} />
          Новое занятие
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`stat-card rounded-xl p-5 bg-gradient-to-br ${stat.color}`}
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center">
                <Icon name={stat.icon} size={17} className="text-gold" />
              </div>
            </div>
            <p className="font-cormorant text-3xl font-semibold text-foreground">{stat.value}</p>
            <p className="font-golos text-xs text-muted-foreground mt-0.5">{stat.label}</p>
            <p className="font-golos text-xs text-gold mt-1">{stat.delta}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Groups */}
        <div className="lg:col-span-2 card-glass rounded-xl p-6 transition-all duration-200">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-cormorant text-2xl font-medium text-foreground">Активные группы</h2>
            <button className="text-xs text-gold hover:text-gold-light font-golos transition-colors">Все группы →</button>
          </div>
          <div className="space-y-3">
            {recentGroups.map((group) => (
              <div key={group.name} className="flex items-center gap-4 p-3 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] transition-all border border-transparent hover:border-border cursor-pointer">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">🩰</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-golos text-sm font-medium text-foreground truncate">{group.name}</p>
                  <p className="font-golos text-xs text-muted-foreground">{group.time}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="flex items-center gap-1.5 justify-end">
                    <div className="w-16 h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full gold-gradient transition-all"
                        style={{ width: `${group.attendance}%` }}
                      />
                    </div>
                    <span className="font-golos text-xs text-gold">{group.attendance}%</span>
                  </div>
                  <p className="font-golos text-xs text-muted-foreground mt-0.5">{group.students} учеников</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-5">
          {/* Today lessons */}
          <div className="card-glass rounded-xl p-5 transition-all duration-200">
            <h2 className="font-cormorant text-xl font-medium text-foreground mb-4">Сегодня</h2>
            <div className="space-y-2">
              {upcomingLessons.map((lesson) => (
                <div key={lesson.group} className="flex items-center gap-3 py-2 border-b border-border/50 last:border-0">
                  <div className="text-center flex-shrink-0">
                    <p className="font-cormorant text-lg font-semibold text-gold leading-none">{lesson.time}</p>
                    <p className="font-golos text-[10px] text-muted-foreground">{lesson.hall}</p>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-golos text-xs font-medium text-foreground truncate">{lesson.group}</p>
                    <p className="font-golos text-[10px] text-muted-foreground">{lesson.students} чел.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Overdue payments */}
          <div className="card-glass rounded-xl p-5 transition-all duration-200">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="font-cormorant text-xl font-medium text-foreground">Просроченные</h2>
              <span className="text-[10px] px-2 py-0.5 rounded-full badge-overdue font-golos">{overduePayments.length}</span>
            </div>
            <div className="space-y-3">
              {overduePayments.map((p) => (
                <div key={p.name} className="flex items-center justify-between gap-2">
                  <div>
                    <p className="font-golos text-xs font-medium text-foreground">{p.name}</p>
                    <p className="font-golos text-[10px] text-muted-foreground">{p.group} · {p.days} дн.</p>
                  </div>
                  <span className="font-golos text-xs text-destructive font-medium">{p.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}