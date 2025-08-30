// src/components/layout/Sidebar.js
import React from "react";
import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  TrophyIcon,
  CalendarIcon,
  AppLogo,
  // QuizIcon, // فرض می‌کنیم این آیکون را اضافه کرده‌اید
} from "../ui/Icons";

// دیگر نیازی به props های currentPage و setCurrentPage نداریم
function Sidebar({ currentUser }) {
  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: HomeIcon },
    { path: "/competition", label: "Competition", icon: TrophyIcon },
    { path: "/schedule", label: "Schedule", icon: CalendarIcon },
    { path: "/quiz", label: "Quiz", icon: CalendarIcon }, // آیتم جدید برای کوییز
  ];

  // استایل‌ها را برای خوانایی بهتر جدا می‌کنیم
  const baseLinkClasses =
    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-sm font-semibold";
  const activeLinkClasses = "bg-teal-50 text-teal-600";
  const inactiveLinkClasses =
    "text-slate-500 hover:bg-slate-100 hover:text-slate-800";

  return (
    <aside className="w-64 bg-white/95 backdrop-blur-sm border-r border-slate-200 h-screen p-6 flex flex-col flex-shrink-0">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center">
          <AppLogo className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-xl font-bold text-slate-800">TeamSync</h1>
      </div>
      <nav className="flex-grow">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              {/* به جای تگ <a> از NavLink استفاده می‌کنیم */}
              <NavLink
                to={item.path}
                // NavLink یک پراپرتی به نام isActive به ما می‌دهد
                className={({ isActive }) =>
                  `${baseLinkClasses} ${
                    isActive ? activeLinkClasses : inactiveLinkClasses
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto">
        <div className="p-4 bg-slate-100 rounded-lg text-center">
          <p className="text-sm font-semibold text-slate-700">Signed in as</p>
          <p className="text-teal-600 font-bold truncate">{currentUser}</p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
