import { useState } from "react";
import Icon from "@/components/ui/icon";

const groups = [
  "Балет — Начинающие",
  "Современный танец",
  "Хореография",
  "Детская хореография",
  "Степ — Взрослые",
];

const studentsByGroup: Record<string, string[]> = {
  "Балет — Начинающие": ["Анна Петрова", "Светлана Иванова", "Ксения Романова", "Дарья Трофимова", "Полина Шувалова", "Юлия Морозова", "Татьяна Орлова", "Марина Зотова"],
  "Современный танец": ["Дмитрий Козлов", "Артём Белов", "Никита Сидоров", "Илья Фролов", "Сергей Попов", "Максим Кириллов", "Роман Егоров", "Андрей Тихонов"],
  "Хореография": ["Мария Смирнова", "Екатерина Соколова", "Ирина Волкова", "Наталья Лебедева", "Людмила Новикова", "Галина Федотова", "Валерия Щербакова", "Оксана Громова"],
  "Детская хореография": ["Иван Новиков", "Кирилл Фёдоров", "Тимур Белов", "Степан Орлов", "Глеб Сорокин", "Паша Кузнецов"],
  "Степ — Взрослые": ["Екатерина Фёдорова", "Вера Кузнецова", "Надежда Борисова", "Тамара Волкова", "Ольга Макарова"],
};

const lessonDates = ["17 апр", "15 апр", "12 апр", "10 апр", "8 апр"];

export default function Attendance() {
  const [selectedGroup, setSelectedGroup] = useState(groups[0]);
  const [selectedDate, setSelectedDate] = useState(lessonDates[0]);
  const [attendance, setAttendance] = useState<Record<string, boolean>>({});

  const students = studentsByGroup[selectedGroup] || [];

  const toggle = (name: string) => {
    setAttendance((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const markAll = (present: boolean) => {
    const next: Record<string, boolean> = {};
    students.forEach((s) => (next[s] = present));
    setAttendance(next);
  };

  const presentCount = students.filter((s) => attendance[s]).length;
  const percent = students.length ? Math.round((presentCount / students.length) * 100) : 0;

  return (
    <div className="p-6 lg:p-8 space-y-6 animate-fade-in">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-cormorant text-4xl font-light text-foreground">Посещаемость</h1>
          <p className="text-muted-foreground font-golos mt-1 text-sm">Отмечайте присутствие на занятии</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg gold-gradient text-background font-golos text-sm font-medium hover:opacity-90 transition-all">
          <Icon name="Save" size={15} />
          Сохранить
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        {/* Group selector */}
        <div className="flex items-center gap-2 card-glass rounded-lg px-4 py-2">
          <Icon name="Users" size={15} className="text-gold flex-shrink-0" />
          <select
            className="bg-transparent font-golos text-sm text-foreground outline-none cursor-pointer"
            value={selectedGroup}
            onChange={(e) => { setSelectedGroup(e.target.value); setAttendance({}); }}
          >
            {groups.map((g) => <option key={g} value={g} className="bg-[#0f1117]">{g}</option>)}
          </select>
        </div>

        {/* Date selector */}
        <div className="flex gap-1">
          {lessonDates.map((d) => (
            <button
              key={d}
              onClick={() => setSelectedDate(d)}
              className={`px-3 py-2 rounded-lg font-golos text-xs transition-all ${
                selectedDate === d
                  ? "gold-gradient text-background font-medium"
                  : "card-glass text-muted-foreground hover:text-foreground"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Student list */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between mb-1">
            <h2 className="font-cormorant text-xl font-medium text-foreground">{selectedGroup}</h2>
            <div className="flex gap-2">
              <button onClick={() => markAll(true)} className="text-xs px-3 py-1.5 rounded-lg badge-present font-golos hover:opacity-80 transition-all">
                Все присутствуют
              </button>
              <button onClick={() => markAll(false)} className="text-xs px-3 py-1.5 rounded-lg badge-absent font-golos hover:opacity-80 transition-all">
                Сбросить
              </button>
            </div>
          </div>

          <div className="card-glass rounded-xl overflow-hidden">
            {students.map((student, i) => {
              const isPresent = attendance[student];
              return (
                <div
                  key={student}
                  onClick={() => toggle(student)}
                  className={`flex items-center gap-4 p-4 cursor-pointer transition-all border-b border-border/40 last:border-0 hover:bg-white/[0.03] ${
                    isPresent ? "bg-emerald-500/5" : ""
                  }`}
                >
                  <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 transition-all ${
                    isPresent
                      ? "gold-gradient"
                      : "border border-border bg-transparent"
                  }`}>
                    {isPresent && <Icon name="Check" size={12} className="text-background" />}
                  </div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-cormorant font-bold flex-shrink-0 ${
                    isPresent ? "gold-gradient text-background" : "bg-white/5 text-muted-foreground"
                  }`}>
                    {student.charAt(0)}
                  </div>
                  <span className={`font-golos text-sm flex-1 ${isPresent ? "text-foreground" : "text-muted-foreground"}`}>
                    {student}
                  </span>
                  <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-golos font-medium flex-shrink-0 ${
                    isPresent ? "badge-present" : "badge-absent"
                  }`}>
                    {isPresent ? "Присутствует" : "Отсутствует"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats panel */}
        <div className="space-y-4">
          {/* Circle stat */}
          <div className="card-glass rounded-xl p-6 text-center">
            <div className="relative w-28 h-28 mx-auto mb-4">
              <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
                <circle
                  cx="50" cy="50" r="42" fill="none"
                  stroke="url(#goldGrad)" strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 42}`}
                  strokeDashoffset={`${2 * Math.PI * 42 * (1 - percent / 100)}`}
                  style={{ transition: "stroke-dashoffset 0.5s ease" }}
                />
                <defs>
                  <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#C9A84C" />
                    <stop offset="100%" stopColor="#E8C97A" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-cormorant text-3xl font-bold text-foreground">{percent}%</span>
              </div>
            </div>
            <p className="font-cormorant text-lg font-medium text-foreground">Посещаемость</p>
            <p className="font-golos text-xs text-muted-foreground mt-1">{selectedDate} · {selectedGroup}</p>
          </div>

          {/* Counts */}
          <div className="grid grid-cols-2 gap-3">
            <div className="card-glass rounded-xl p-4 text-center">
              <p className="font-cormorant text-3xl font-bold text-emerald-400">{presentCount}</p>
              <p className="font-golos text-xs text-muted-foreground mt-1">Присутствуют</p>
            </div>
            <div className="card-glass rounded-xl p-4 text-center">
              <p className="font-cormorant text-3xl font-bold text-red-400">{students.length - presentCount}</p>
              <p className="font-golos text-xs text-muted-foreground mt-1">Отсутствуют</p>
            </div>
          </div>

          {/* History */}
          <div className="card-glass rounded-xl p-5">
            <h3 className="font-cormorant text-lg font-medium text-foreground mb-3">История занятий</h3>
            <div className="space-y-2">
              {[
                { date: "15 апр", present: 11, total: students.length },
                { date: "12 апр", present: 13, total: students.length },
                { date: "10 апр", present: 10, total: students.length },
                { date: "8 апр", present: 14, total: students.length },
              ].map((h) => (
                <div key={h.date} className="flex items-center gap-3">
                  <span className="font-golos text-xs text-muted-foreground w-12">{h.date}</span>
                  <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full gold-gradient"
                      style={{ width: `${Math.round((h.present / h.total) * 100)}%` }}
                    />
                  </div>
                  <span className="font-golos text-xs text-gold w-8 text-right">{Math.round((h.present / h.total) * 100)}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
