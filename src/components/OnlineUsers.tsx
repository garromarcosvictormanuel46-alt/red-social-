import { Search, MoreHorizontal, Video } from 'lucide-react';

export default function OnlineUsers() {
  const users = [
    { id: '2', name: 'Ana García', avatar: 'https://picsum.photos/seed/ana/32/32' },
    { id: '3', name: 'Carlos López', avatar: 'https://picsum.photos/seed/carlos/32/32' },
    { id: '4', name: 'María Rodríguez', avatar: 'https://picsum.photos/seed/maria/32/32' },
    { id: '5', name: 'Juan Pérez', avatar: 'https://picsum.photos/seed/juan/32/32' },
    { id: '6', name: 'Laura Martínez', avatar: 'https://picsum.photos/seed/laura/32/32' },
    { id: '7', name: 'Pedro Sánchez', avatar: 'https://picsum.photos/seed/pedro/32/32' },
  ];

  return (
    <div className="fixed w-72 pr-4">
      <div className="flex justify-between items-center mb-4 text-gray-500 px-2">
        <h3 className="font-semibold text-[15px]">Contactos</h3>
        <div className="flex gap-3">
          <Video className="w-4 h-4 cursor-pointer hover:text-gray-700" />
          <Search className="w-4 h-4 cursor-pointer hover:text-gray-700" />
          <MoreHorizontal className="w-4 h-4 cursor-pointer hover:text-gray-700" />
        </div>
      </div>
      <div className="space-y-1">
        {users.map(user => (
          <div key={user.id} className="flex items-center gap-3 p-2 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors">
            <div className="relative">
              <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full" />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-100"></div>
            </div>
            <span className="font-medium text-[15px] text-gray-900">{user.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
