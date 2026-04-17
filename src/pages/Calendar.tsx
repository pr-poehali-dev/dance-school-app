import { useState } from "react";
import Icon from "@/components/ui/icon";

const DAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const HOURS = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"];

interface Lesson {
  id: number;
  group: string;
  teacher: string;
  hall: string;
  day: number;
  startHour: number;
  duration: number;
  color: string;
  emoji: string;
}

const lessons: Lesson[] = [
  { id: 1, group: "Мурашки 1", teacher: "Е. Соколова", hall: "Зал 1", day: 0, startHour: 10, duration: 1, color: "from-rose-500/30 to-rose-600/10 border-rose-500/30", emoji: "🐜" },
  { id: 2, group: "Средняя группа", teacher: "К. Морозов", hall: "Зал 1", day: 0, startHour: 16, duration: 1.5, color: "from-amber-500/30 to-amber-600/10 border-amber-500/30", emoji: "💃" },
  { id: 3, group: "Мурашки 2", teacher: "О. Кузнецова", hall: "Зал 1", day: 1, startHour: 11, duration: 1, color: "from-violet-500/30 to-violet-600/10 border-violet-500/30", emoji: "🐜" },
  { id: 4, group: "Старшая группа", teacher: "А. Белова", hall: "Зал 1", day: 1, startHour: 18, duration: 1.5, color: "from-emerald-500/30 to-emerald-600/10 border-emerald-500/30", emoji: "🎭" },
  { id: 5, group: "Мурашки 1", teacher: "Е. Соколова", hall: "Зал 1", day: 2, startHour: 10, duration: 1, color: "from-rose-500/30 to-rose-600/10 border-rose-500/30", emoji: "🐜" },
  { id: 6, group: "Средняя группа", teacher: "К. Морозов", hall: "Зал 1", day: 2, startHour: 16, duration: 1.5, color: "from-amber-500/30 to-amber-600/10 border-amber-500/30", emoji: "💃" },
  { id: 7, group: "Мурашки 2", teacher: "О. Кузнецова", hall: "Зал 1", day: 3, startHour: 11, duration: 1, color: "from-violet-500/30 to-violet-600/10 border-violet-500/30", emoji: "🐜" },
  { id: 8, group: "Старшая группа", teacher: "А. Белова", hall: "Зал 1", day: 3, startHour: 18, duration: 1.5, color: "from-emerald-500/30 to-emerald-600/10 border-emerald-500/30", emoji: "🎭" },
  { id: 9, group: "Мурашки 1", teacher: "Е. Соколова", hall: "Зал 1", day: 4, startHour: 10, duration: 1, color: "from-rose-500/30 to-rose-600/10 border-rose-500/30", emoji: "🐜" },
];

const START_HOUR = 8;
const CELL_HEIGHT = 56;

export default function Calendar() {
  const [view, setView] = useState<"week" | "day">("week");
  const [selectedDay, setSelectedDay] = useState(0);

  const today = 3;
  const weekDates = [14, 15, 16, 17, 18, 19, 20];

  const visibleLessons = view === "week" ? lessons : lessons.filter((l) => l.day === selectedDay);

  return (
    <div className="p-6 lg:p-8 space-y-6 animate-fade-in h-screen flex flex-col">
      <div className="flex items-start justify-between flex-shrink-0">
        <div>
          <h1 className="font-cormorant text-4xl font-light text-foreground">Расписание</h1>
          <p className="text-muted-foreground font-golos mt-1 text-sm">14–20 апреля 2026</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-1 bg-muted/50 p-1 rounded-lg">
            {(["week", "day"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-3 py-1.5 rounded-md font-golos text-sm transition-all ${
                  view === v ? "bg-gold text-background font-medium" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {v === "week" ? "Неделя" : "День"}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg gold-gradient text-background font-golos text-sm font-medium hover:opacity-90 transition-all">
            <Icon name="Plus" size={15} />
            Добавить
          </button>
        </div>
      </div>

      {/* Day selector for day view */}
      {view === "day" && (
        <div className="flex gap-2 flex-shrink-0">
          {DAYS.map((d, i) => (
            <button
              key={d}
              onClick={() => setSelectedDay(i)}
              className={`flex flex-col items-center px-3 py-2 rounded-lg transition-all ${
                selectedDay === i ? "gold-gradient text-background" : "card-glass text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="font-golos text-xs">{d}</span>
              <span className={`font-cormorant text-lg font-semibold ${i === today && selectedDay !== i ? "text-gold" : ""}`}>{weekDates[i]}</span>
            </button>
          ))}
        </div>
      )}

      {/* Calendar grid */}
      <div className="flex-1 overflow-auto scrollbar-thin card-glass rounded-xl">
        <div className="flex min-w-[700px]">
          {/* Time column */}
          <div className="w-16 flex-shrink-0 pt-12">
            {HOURS.map((h) => (
              <div key={h} className="flex items-start justify-end pr-3 font-golos text-[10px] text-muted-foreground" style={{ height: `${CELL_HEIGHT}px` }}>
                {h}
              </div>
            ))}
          </div>

          {/* Days grid */}
          <div className={`flex-1 grid ${view === "week" ? "grid-cols-7" : "grid-cols-1"}`}>
            {(view === "week" ? DAYS : [DAYS[selectedDay]]).map((day, di) => {
              const dayIndex = view === "week" ? di : selectedDay;
              const dayLessons = lessons.filter((l) => l.day === dayIndex);
              const isToday = dayIndex === today;

              return (
                <div key={day} className={`relative border-l border-border/30 ${isToday ? "bg-gold/[0.02]" : ""}`}>
                  {/* Day header */}
                  <div className={`sticky top-0 z-10 flex flex-col items-center py-3 border-b border-border/30 ${
                    isToday ? "bg-[hsl(220,18%,11%)]" : "bg-[hsl(220,18%,11%)]"
                  }`}>
                    <span className="font-golos text-xs text-muted-foreground">{day}</span>
                    <span className={`font-cormorant text-xl font-semibold mt-0.5 ${
                      isToday ? "text-gold" : "text-foreground"
                    }`}>{weekDates[dayIndex]}</span>
                    {isToday && <div className="w-1 h-1 rounded-full gold-gradient mt-1" />}
                  </div>

                  {/* Hour cells */}
                  {HOURS.map((h) => (
                    <div key={h} className="border-b border-border/20" style={{ height: `${CELL_HEIGHT}px` }} />
                  ))}

                  {/* Lesson blocks */}
                  {dayLessons.map((lesson) => {
                    const top = (lesson.startHour - START_HOUR) * CELL_HEIGHT + 12;
                    const height = lesson.duration * CELL_HEIGHT - 4;

                    return (
                      <div
                        key={lesson.id}
                        className={`absolute left-1 right-1 rounded-lg bg-gradient-to-b ${lesson.color} border p-1.5 cursor-pointer hover:scale-[1.02] transition-transform overflow-hidden`}
                        style={{ top: `${top}px`, height: `${height}px` }}
                      >
                        <div className="flex items-start gap-1">
                          <span className="text-sm leading-none">{lesson.emoji}</span>
                          <div className="min-w-0">
                            <p className="font-golos text-[11px] font-semibold text-foreground truncate leading-tight">{lesson.group}</p>
                            {height > 50 && (
                              <>
                                <p className="font-golos text-[9px] text-muted-foreground truncate">{lesson.teacher}</p>
                                <p className="font-golos text-[9px] text-gold">{lesson.hall}</p>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}