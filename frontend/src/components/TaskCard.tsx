'use client';

import { Task } from '@/types';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onToggle: (taskId: string) => void;
}

export default function TaskCard({ task, onEdit, onDelete, onToggle }: TaskCardProps) {
  const isCompleted = task.status === 'completed';

  return (
    <div
      className={`group relative bg-slate-800/50 backdrop-blur-sm border rounded-2xl p-5 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/5 hover:-translate-y-0.5 ${
        isCompleted
          ? 'border-emerald-500/20 bg-emerald-500/5'
          : 'border-white/10 hover:border-violet-500/30'
      }`}
    >
      {/* Status indicator */}
      <div className={`absolute top-4 right-4 w-3 h-3 rounded-full ${
        isCompleted ? 'bg-emerald-400 shadow-lg shadow-emerald-400/50' : 'bg-amber-400 shadow-lg shadow-amber-400/50'
      }`} />

      {/* Title */}
      <h3
        className={`text-lg font-semibold pr-6 mb-2 transition-all ${
          isCompleted ? 'line-through text-slate-500' : 'text-white'
        }`}
      >
        {task.title}
      </h3>

      {/* Description */}
      {task.description && (
        <p className="text-sm text-slate-400 mb-4 line-clamp-2 leading-relaxed">
          {task.description}
        </p>
      )}

      {/* Meta */}
      <div className="flex items-center gap-2 mb-4">
        <span
          className={`text-xs px-3 py-1 rounded-full font-medium ${
            isCompleted
              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
              : 'bg-amber-500/15 text-amber-400 border border-amber-500/20'
          }`}
        >
          {isCompleted ? '✓ Completed' : '◌ Pending'}
        </span>
        <span className="text-xs text-slate-500">
          {new Date(task.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-3 border-t border-white/5">
        <button
          onClick={() => onToggle(task.id)}
          className={`flex-1 px-3 py-2 text-xs font-medium rounded-lg transition-all duration-200 ${
            isCompleted
              ? 'bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/20'
              : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20'
          }`}
        >
          {isCompleted ? 'Mark Pending' : 'Mark Done'}
        </button>
        <button
          onClick={() => onEdit(task)}
          className="px-3 py-2 text-xs font-medium text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 rounded-lg transition-all duration-200"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="px-3 py-2 text-xs font-medium text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-lg transition-all duration-200"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
