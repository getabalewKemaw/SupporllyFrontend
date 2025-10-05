"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";

// Radix Dropdown
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

// Avatar component
interface AvatarProps {
  src?: string;
  fallback?: string;
  className?: string;
}

function Avatar({ src, fallback, className }: AvatarProps) {
  return src ? (
    <img src={src} className={`rounded-full ${className}`} alt="avatar" />
  ) : (
    <div className={`flex items-center justify-center bg-gray-500 text-white rounded-full ${className}`}>
      {fallback || "U"}
    </div>
  );
}

interface SidebarProps {
  className?: string;
}

// Utility for conditional classNames
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function Sidebar({ className }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "flex h-screen flex-col border-r border-gray-200 bg-white transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
        className
      )}
    >
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500">
            <Icon icon="mdi:lightning-bolt" className="h-5 w-5 text-white" />
          </div>
          {!isCollapsed && <span className="font-semibold text-black">MyApp</span>}
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-black"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <Icon icon={isCollapsed ? "mdi:chevron-right" : "mdi:chevron-left"} className="h-5 w-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-3">
        <NavItem icon="mdi:home" label="Home" isCollapsed={isCollapsed} isActive />
        <NavItem icon="mdi:chart-box" label="Analytics" isCollapsed={isCollapsed} />
        <NavItem icon="mdi:folder" label="Projects" isCollapsed={isCollapsed} />
        <NavItem icon="mdi:cog" label="Settings" isCollapsed={isCollapsed} />
      </nav>

      {/* User Profile */}
      <div className="border-t border-gray-200 p-3">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button
              className={cn(
                "flex w-full items-center gap-3 rounded-lg p-2 transition-colors hover:bg-gray-100",
                isCollapsed && "justify-center"
              )}
            >
              <Avatar src="/placeholder.svg?height=32&width=32" fallback="JD" className="h-8 w-8" />
              {!isCollapsed && (
                <div className="flex flex-col items-start text-sm">
                  <span className="font-medium text-black">John Doe</span>
                  <span className="text-xs text-gray-500">john@example.com</span>
                </div>
              )}
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content align="end" side="top" className="w-56 bg-white border rounded shadow-md p-1">
            <div className="px-2 py-1.5">
              <p className="text-sm font-medium text-black">John Doe</p>
              <p className="text-xs text-gray-500">john@example.com</p>
            </div>
            <DropdownMenu.Separator className="my-1 border-t border-gray-200" />
            <DropdownMenu.Item className="flex items-center gap-2 px-2 py-1 text-sm hover:bg-gray-100 cursor-pointer">
              <Icon icon="mdi:cog" className="h-4 w-4" />
              <span>Settings</span>
            </DropdownMenu.Item>
            <DropdownMenu.Item className="flex items-center gap-2 px-2 py-1 text-sm hover:bg-gray-100 cursor-pointer">
              <Icon icon="mdi:help-circle" className="h-4 w-4" />
              <span>Help</span>
            </DropdownMenu.Item>
            <DropdownMenu.Separator className="my-1 border-t border-gray-200" />
            <DropdownMenu.Item className="flex items-center gap-2 px-2 py-1 text-sm text-red-600 hover:bg-gray-100 cursor-pointer">
              <Icon icon="mdi:logout" className="h-4 w-4" />
              <span>Logout</span>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
    </aside>
  );
}

interface NavItemProps {
  icon: string;
  label: string;
  isCollapsed: boolean;
  isActive?: boolean;
}

function NavItem({ icon, label, isCollapsed, isActive }: NavItemProps) {
  return (
    <button
      className={cn(
        "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        isActive
          ? "bg-purple-500 text-white"
          : "text-gray-500 hover:bg-gray-100 hover:text-black",
        isCollapsed && "justify-center"
      )}
    >
      <Icon icon={icon} className="h-5 w-5 shrink-0" />
      {!isCollapsed && <span>{label}</span>}
    </button>
  );
}
