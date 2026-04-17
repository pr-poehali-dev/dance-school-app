import { useState } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import Icon from "@/components/ui/icon";

const navItems = [
  { to: "/", icon: "LayoutDashboard", label: "Дашборд" },
  { to: "/groups", icon: "Users", label: "Группы" },
  { to: "/attendance", icon: "ClipboardCheck", label: "Посещаемость" },
  { to: "/payments", icon: "CreditCard", label: "Оплата" },
  { to: "/calendar", icon: "CalendarDays", label: "Расписание" },
];

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`flex flex-col transition-all duration-300 ${collapsed ? "w-16" : "w-60"} min-h-screen bg-[hsl(220,20%,7%)] border-r border-border relative`}
      >
        {/* Logo */}
        <div className={`flex items-center gap-3 px-4 py-6 border-b border-border ${collapsed ? "justify-center" : ""}`}>
          <div className="w-9 h-9 rounded-lg gold-gradient flex items-center justify-center flex-shrink-0">
            <span className="text-lg">💃</span>
          </div>
          {!collapsed && (
            <div className="animate-fade-in">
              <p className="font-cormorant font-semibold text-lg leading-tight text-foreground">Гранд Плие</p>
              <p className="text-xs text-muted-foreground font-golos">Танцевальная школа</p>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 flex flex-col gap-1 px-2">
          {navItems.map((item) => {
            const isActive = item.to === "/" ? location.pathname === "/" : location.pathname.startsWith(item.to);
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                  isActive
                    ? "nav-item-active text-gold"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                } ${collapsed ? "justify-center" : ""}`}
              >
                <Icon name={item.icon} size={18} className={isActive ? "text-gold" : "text-muted-foreground group-hover:text-foreground"} />
                {!collapsed && (
                  <span className="font-golos text-sm font-medium">{item.label}</span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Collapse toggle */}
        <div className="p-3 border-t border-border">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all ${collapsed ? "justify-center" : ""}`}
          >
            <Icon name={collapsed ? "ChevronRight" : "ChevronLeft"} size={16} />
            {!collapsed && <span className="text-xs font-golos">Свернуть</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto scrollbar-thin">
        <Outlet />
      </main>
    </div>
  );
}