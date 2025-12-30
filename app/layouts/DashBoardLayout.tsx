"use client";

import React, { useState, useRef, useEffect, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, X } from "lucide-react";

/* ---------------- Sidebar Routes ---------------- */
const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Channel Management", href: "/dashboard/channel-management" },
  { label: "Content Scheduling", href: "/dashboard/content-scheduling" },
  { label: "Content Library", href: "/dashboard/content-library" },
];

const SYSTEM_ITEMS = [
  { label: "Moderation", href: "/dashboard/moderation" },
  { label: "Analytics", href: "/dashboard/analytics" },
  { label: "User Management", href: "/dashboard/users" },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
  panelName : string
}

const DashBoardLayout = ({ children , panelName }: DashboardLayoutProps) => {
  const pathname = usePathname();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  /* Close dropdown on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r p-6 transform transition-transform duration-300
        lg:relative lg:translate-x-0
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Close button (mobile) */}
        <div className="flex justify-end lg:hidden mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Logo */}
        <div className="mb-6 flex items-center gap-2">
          <span className="text-3xl">🌈</span>
          <div>
            <p className="text-xl font-bold text-slate-800">Kind Children</p>
            <p className="text-sm text-slate-500">For your children</p>
          </div>
        </div>

        <Separator className="mb-4" />

        {/* NAVIGATION */}
        <nav className="flex flex-col gap-1 text-sm">
          {NAV_ITEMS.map((item) => (
            <NavItem
              key={item.href}
              href={item.href}
              active={pathname === item.href}
              onClick={() => setIsSidebarOpen(false)}
            >
              {item.label}
            </NavItem>
          ))}

          <p className="mt-4 mb-1 text-xs font-semibold text-slate-400 uppercase">
            System
          </p>

          {SYSTEM_ITEMS.map((item) => (
            <NavItem
              key={item.href}
              href={item.href}
              active={pathname === item.href}
              onClick={() => setIsSidebarOpen(false)}
            >
              {item.label}
            </NavItem>
          ))}
        </nav>
      </aside>

      {/* Overlay (mobile) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* MAIN CONTENT */}
      <div className="flex flex-1 flex-col">
        {/* TOP BAR */}
        <header className="flex h-14 items-center justify-between border-b bg-white px-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>

            <h1 className="text-lg font-semibold text-slate-800">
             {panelName}
            </h1>
          </div>

          {/* USER DROPDOWN */}
          <div
            ref={dropdownRef}
            className="relative flex items-center gap-3 rounded-full px-2 py-1 hover:bg-slate-100 cursor-pointer"
            onClick={() => setIsDropdownOpen((p) => !p)}
          >
            <span className="hidden sm:block text-sm font-medium text-slate-700">
              Fahim
            </span>

            <Avatar className="h-8 w-8 ring-2 ring-purple-100">
              <AvatarImage src="/avatar.png" />
              <AvatarFallback className="bg-purple-500 text-white">
                F
              </AvatarFallback>
            </Avatar>

            {/* <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 bg-green-500 rounded-full ring-2 ring-white" /> */}

            {isDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-40 rounded-md border bg-white shadow-md z-50">
                <Link
                  href="/dashboard/profile"
                  className="block px-4 py-2 text-sm hover:bg-slate-100"
                >
                  Profile
                </Link>
                <button className="w-full text-left px-4 py-2 text-sm hover:bg-slate-100">
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashBoardLayout;

/* ---------------- Nav Item ---------------- */

interface NavItemProps {
  href: string;
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
}
const NavItem = ({ href, children, active, onClick }: NavItemProps) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`rounded-md px-3 py-2 transition
        ${
          active
            ? "bg-purple-100 text-purple-700 font-semibold"
            : "text-slate-600 hover:bg-slate-100"
        }`}
    >
      {children}
    </Link>
  );
};
