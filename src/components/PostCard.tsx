import { ThumbsUp, MessageSquare, Share2, MoreHorizontal, Globe } from 'lucide-react';
import { Post } from '../types';

export default function PostCard({ post }: { post: Post }) {
  return (
    <div className="bg-white rounded-xl shadow">
      {/* Cabecera del Post */}
      <div className="p-4 flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full cursor-pointer hover:opacity-90" />
          <div>
            <h3 className="font-semibold text-gray-900 cursor-pointer hover:underline">{post.author.name}</h3>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <span className="hover:underline cursor-pointer">{post.timestamp}</span>
              <span>·</span>
              <Globe className="w-3 h-3" />
            </div>
          </div>
        </div>
        <button className="text-gray-500 hover:bg-gray-100 p-2 rounded-full transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Contenido del Post */}
      <div className="px-4 pb-3">
        <p className="text-gray-800 text-[15px]">{post.content}</p>
      </div>

      {/* Imagen del Post (si existe) */}
      {post.image && (
        <div className="w-full bg-gray-100">
          <img src={post.image} alt="Post content" className="w-full max-h-[500px] object-cover" />
        </div>
      )}

      {/* Estadísticas del Post */}
      <div className="px-4 py-2.5 flex justify-between text-sm text-gray-500 border-b mx-4">
        <div className="flex items-center gap-1 cursor-pointer hover:underline">
          <div className="bg-emerald-600 rounded-full p-1">
            <ThumbsUp className="w-3 h-3 text-white fill-current" />
          </div>
          <span>{post.likes}</span>
        </div>
        <div className="flex gap-3">
          <span className="cursor-pointer hover:underline">{post.comments} comentarios</span>
          <span className="cursor-pointer hover:underline">0 veces compartido</span>
        </div>
      </div>

      {/* Acciones del Post */}
      <div className="px-4 py-1 flex justify-between gap-1">
        <button className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-lg flex-1 justify-center text-gray-600 font-medium transition-colors">
          <ThumbsUp className="w-5 h-5" /> Me gusta
        </button>
        <button className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-lg flex-1 justify-center text-gray-600 font-medium transition-colors">
          <MessageSquare className="w-5 h-5" /> Comentar
        </button>
        <button className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-lg flex-1 justify-center text-gray-600 font-medium transition-colors">
          <Share2 className="w-5 h-5" /> Compartir
        </button>
      </div>
    </div>
  );
}
