/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CreatePost from './components/CreatePost';
import PostCard from './components/PostCard';
import OnlineUsers from './components/OnlineUsers';
import { Post, User } from './types';
import { Users, Bookmark, Clock, PlaySquare, Store, Hexagon } from 'lucide-react';
import { auth, db, googleProvider, handleFirestoreError, OperationType } from './firebase';
import { signInWithPopup, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';

export default function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: FirebaseUser | null) => {
      if (user) {
        setCurrentUser({
          id: user.uid,
          name: user.displayName || 'Usuario',
          avatar: user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName || 'U'}`
        });
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!currentUser) return;

    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedPosts = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          author: data.author,
          content: data.content,
          timestamp: data.timestamp || 'Justo ahora',
          likes: data.likes || 0,
          comments: data.comments || 0,
          image: data.image,
          createdAt: data.createdAt?.toMillis() || Date.now()
        } as Post;
      });
      setPosts(fetchedPosts);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'posts');
    });

    return () => unsubscribe();
  }, [currentUser]);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  const handleCreatePost = async (content: string) => {
    if (!currentUser) return;
    
    try {
      await addDoc(collection(db, 'posts'), {
        author: currentUser,
        content,
        timestamp: 'Justo ahora',
        likes: 0,
        comments: 0,
        createdAt: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'posts');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="animate-spin text-emerald-600">
          <Hexagon className="w-12 h-12" />
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
          <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-6">
            <Hexagon className="w-10 h-10 fill-current" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Bienvenido a la Red</h1>
          <p className="text-gray-500 mb-8">Conéctate con amigos y el mundo que te rodea.</p>
          <button 
            onClick={handleLogin}
            className="w-full bg-emerald-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
          >
            Iniciar sesión con Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 font-sans">
      <Header user={currentUser} />
      
      <main className="max-w-[1600px] mx-auto pt-14 flex justify-between">
        {/* Menú Lateral Izquierdo */}
        <div className="hidden xl:block w-[360px] p-4 shrink-0">
          <div className="fixed w-[320px]">
            <div className="flex items-center gap-3 p-3 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors">
              <img src={currentUser.avatar} className="w-9 h-9 rounded-full" alt="Profile" />
              <span className="font-medium text-[15px]">{currentUser.name}</span>
            </div>
            <div className="flex items-center gap-3 p-3 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors">
              <Users className="w-8 h-8 text-emerald-500" />
              <span className="font-medium text-[15px]">Comunidad</span>
            </div>
            <div className="flex items-center gap-3 p-3 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors">
              <Clock className="w-8 h-8 text-emerald-500" />
              <span className="font-medium text-[15px]">Historial</span>
            </div>
            <div className="flex items-center gap-3 p-3 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors">
              <Bookmark className="w-8 h-8 text-purple-500" />
              <span className="font-medium text-[15px]">Guardado</span>
            </div>
            <div className="flex items-center gap-3 p-3 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors">
              <Store className="w-8 h-8 text-emerald-500" />
              <span className="font-medium text-[15px]">Mercado</span>
            </div>
            <div className="flex items-center gap-3 p-3 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors">
              <PlaySquare className="w-8 h-8 text-emerald-500" />
              <span className="font-medium text-[15px]">Multimedia</span>
            </div>
          </div>
        </div>

        {/* Feed Central */}
        <div className="w-full max-w-[680px] mx-auto p-4 space-y-4">
          <CreatePost user={currentUser} onCreate={handleCreatePost} />
          {posts.length === 0 ? (
            <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
              No hay publicaciones aún. ¡Sé el primero en publicar!
            </div>
          ) : (
            posts.map(post => <PostCard key={post.id} post={post} />)
          )}
        </div>

        {/* Barra Lateral Derecha */}
        <div className="hidden lg:block w-[360px] p-4 shrink-0">
          <OnlineUsers />
        </div>
      </main>
    </div>
  );
}
