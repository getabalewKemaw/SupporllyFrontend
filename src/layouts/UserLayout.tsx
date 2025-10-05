// src/layouts/UserLayout.tsx
import { type ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  children: ReactNode;
}

export default function UserLayout({ children }: Props) {
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-6 hidden md:flex flex-col">
        <h2 className="text-xl font-bold mb-6">User Dashboard</h2>
        <nav className="flex flex-col gap-4">
          <Link to="/dashboard/user" className="hover:text-purple-400">Home</Link>
          <Link to="/dashboard/user/profile" className="hover:text-purple-400">Profile</Link>
          <Link to="/dashboard/user/settings" className="hover:text-purple-400">Settings</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="bg-gray-800 p-4 flex justify-between items-center">
          <h1 className="text-lg font-semibold">Welcome Back 👋</h1>
          <button className="bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-500">
            Logout
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

