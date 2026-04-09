import { Search, Home, Users, Bell, MessageCircle, Menu, Hexagon, LogOut } from 'lucide-react';
import { User } from '../types';
import { auth } from '../firebase';

export default function Header({ user }: { user: User }) {
  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <header className="bg-white shadow-sm fixed top-0 w-full z-50 h-14 flex items-center justify-between px-4">
      {/* Lado Izquierdo */}
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white">
          <Hexagon className="w-6 h-6 fill-current" />
        </div>
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
          <input 
            type="text" 
            placeholder="Buscar en la red..." 
            className="bg-gray-100 rounded-full py-2 pl-9 pr-4 outline-none focus:ring-2 focus:ring-emerald-500 text-sm w-64" 
          />
        </div>
      </div>

      {/* Navegación Central */}
      <div className="hidden md:flex gap-2 h-full">
        <div className="w-24 flex items-center justify-center border-b-4 border-emerald-600 cursor-pointer">
          <Home className="w-7 h-7 text-emerald-600" />
        </div>
        <div className="w-24 flex items-center justify-center hover:bg-gray-100 rounded-lg my-1 cursor-pointer transition-colors">
          <Users className="w-7 h-7 text-gray-500" />
        </div>
      </div>

      {/* Lado Derecho */}
      <div className="flex items-center gap-2">
        <div className="md:hidden w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-300">
          <Search className="w-5 h-5 text-gray-900" />
        </div>
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-300">
          <Menu className="w-5 h-5 text-gray-900" />
        </div>
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-300">
          <MessageCircle className="w-5 h-5 text-gray-900" />
        </div>
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-300">
          <Bell className="w-5 h-5 text-gray-900" />
        </div>
        <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full border border-gray-200" />
        <button onClick={handleLogout} className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-200 text-red-600 ml-2" title="Cerrar sesión">
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
