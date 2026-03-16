'use client';

import { useAuth } from '@/lib/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HomePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      router.push('/dashboard');
    }
  }, [user, isLoading, router]);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-violet-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px]" />
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-fuchsia-500/10 rounded-full blur-[80px]" />
      </div>

      {/* Hero */}
      <div className="relative flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
            Built with Next.js + Express
          </div>

          {/* Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            <span className="bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
              Manage your tasks
            </span>
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
              effortlessly
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed">
            A beautiful, secure task management app. Create, organize, and track
            your tasks with powerful search and filtering.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="w-full sm:w-auto px-8 py-4 text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 rounded-xl shadow-xl shadow-violet-500/25 transition-all hover:shadow-violet-500/40 hover:-translate-y-0.5"
            >
              Get Started Free
            </Link>
            <Link
              href="/login"
              className="w-full sm:w-auto px-8 py-4 text-sm font-semibold text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-all hover:-translate-y-0.5"
            >
              Sign In
            </Link>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-20">
            {[
              { icon: '🔒', title: 'Secure Auth', desc: 'JWT + bcrypt encryption' },
              { icon: '⚡', title: 'Real-time', desc: 'Instant updates & search' },
              { icon: '📱', title: 'Responsive', desc: 'Works on any device' },
            ].map((feature) => (
              <div
                key={feature.title}
                className="p-6 bg-slate-800/30 backdrop-blur-sm border border-white/5 rounded-2xl hover:border-violet-500/20 transition-all"
              >
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
                <p className="text-slate-500 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative py-6 text-center text-slate-600 text-sm border-t border-white/5">
        © 2026 TaskManager by Vinay Soni. All rights reserved.
      </footer>
    </div>
  );
}
