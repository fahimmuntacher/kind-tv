"use client";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, X } from "lucide-react";

const DashBoardLayout = ({ children }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white p-6 border-r transition-transform duration-300 lg:relative lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close button on mobile */}
        <div className="flex justify-end lg:hidden mb-4">
          <Button variant="ghost" onClick={() => setIsSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Logo */}
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🌈</span>
            <div>
              <span className="text-xl font-bold text-slate-800">
                Kind Children
              </span>
              <p className="text-sm text-slate-500">For your children</p>
            </div>
          </div>
        </div>

        <Separator className="mb-4" />

        {/* Navigation */}
        <nav className="flex flex-col gap-1 text-sm">
          <NavItem active>Dashboard</NavItem>
          <NavItem>Channel Management</NavItem>
          <NavItem>Content Scheduling</NavItem>
          <NavItem>Content Library</NavItem>

          <p className="mt-4 mb-1 text-xs font-semibold text-slate-400 uppercase">
            System
          </p>

          <NavItem>Moderation</NavItem>
          <NavItem>Analytics</NavItem>
          <NavItem>User Management</NavItem>
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* MAIN */}
      <div className="flex flex-1 flex-col">
        {/* Topbar */}
        <header className="flex h-14 items-center justify-between border-b bg-white px-6">
          {/* Left */}
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
              Admin Dashboard
            </h1>
          </div>

          {/* Right - User */}
          <div
            ref={dropdownRef}
            className="relative flex items-center gap-3 rounded-full px-2 py-1 hover:bg-slate-100 transition cursor-pointer"
          >
            <span className="hidden sm:block text-sm font-medium text-slate-700">
              Fahim
            </span>

            <div onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              <Avatar className="h-8 w-8 ring-2 ring-purple-100">
                <AvatarImage src="/avatar.png" alt="User Avatar" />
                <AvatarFallback className="bg-purple-500 text-white">
                  F
                </AvatarFallback>
              </Avatar>

              {/* Online indicator */}
              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white" />
            </div>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-40 rounded-md border bg-white shadow-md z-50">
                <button
                  className="w-full px-4 py-2 text-left text-sm hover:bg-slate-100"
                  onClick={() => alert("Go to Profile")}
                >
                  Profile
                </button>
                <button
                  className="w-full px-4 py-2 text-left text-sm hover:bg-slate-100"
                  onClick={() => alert("Logout")}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashBoardLayout;

/* ---------------- Helper Component ---------------- */
const NavItem = ({ children, active = false }) => {
  return (
    <div
      className={`rounded-md px-3 py-2 cursor-pointer transition ${
        active
          ? "bg-purple-100 text-purple-700 font-semibold"
          : "text-slate-600 hover:bg-slate-100"
      }`}
    >
      {children}
    </div>
  );
};
            