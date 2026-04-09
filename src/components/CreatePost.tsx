import { useState } from 'react';
import { Image, Video, Smile } from 'lucide-react';
import { User } from '../types';

export default function CreatePost({ user, onCreate }: { user: User, onCreate: (content: string) => void }) {
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (content.trim()) {
      onCreate(content);
      setContent('');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <div className="flex gap-3 border-b pb-4">
        <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
        <input
          type="text"
          placeholder={`¿Qué estás pensando, ${user.name.split(' ')[0]}?`}
          className="bg-gray-100 rounded-full px-4 w-full outline-none hover:bg-gray-200 transition-colors text-gray-700"
          value={content}
          onChange={e => setContent(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
        />
      </div>
      <div className="flex justify-between pt-3">
        <button className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-lg flex-1 justify-center text-gray-600 font-medium transition-colors">
          <Video className="w-6 h-6 text-red-500" /> 
          <span className="hidden sm:inline">Video en vivo</span>
        </button>
        <button className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-lg flex-1 justify-center text-gray-600 font-medium transition-colors">
          <Image className="w-6 h-6 text-green-500" /> 
          <span className="hidden sm:inline">Foto/video</span>
        </button>
        <button className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-lg flex-1 justify-center text-gray-600 font-medium transition-colors">
          <Smile className="w-6 h-6 text-yellow-500" /> 
          <span className="hidden sm:inline">Sentimiento/actividad</span>
        </button>
      </div>
    </div>
  );
}
