
import React from 'react';
import { Task } from '../types';
import { TrashIcon, CheckCircleIcon, CircleIcon, WhatsAppIcon } from './Icons';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  // Adjust for timezone offset
  const userTimezoneOffset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() + userTimezoneOffset).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleComplete, onDelete }) => {
  const handleWhatsAppShare = () => {
    const formattedDate = formatDate(task.date);
    let message = `Lembrete: *${task.name}* | ${formattedDate} às ${task.time}`;
    if (task.description) {
      message += ` | ${task.description}`;
    }
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };
  
  const isPast = new Date(`${task.date}T${task.time}`) < new Date();

  return (
    <div className={`
      bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 transition-all duration-300
      ${task.completed ? 'opacity-50' : ''}
      ${isPast && !task.completed ? 'border-l-4 border-yellow-500' : ''}
    `}>
      <button onClick={() => onToggleComplete(task.id)} className="flex-shrink-0" aria-label="Marcar como concluída">
        {task.completed ? (
          <CheckCircleIcon className="w-7 h-7 text-green-500" />
        ) : (
          <CircleIcon className="w-7 h-7 text-gray-300 dark:text-gray-500" />
        )}
      </button>

      <div className="flex-grow">
        <p className={`font-semibold text-lg ${task.completed ? 'line-through text-gray-500' : 'text-gray-900 dark:text-white'}`}>
          {task.name}
        </p>
        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex flex-wrap gap-x-3 gap-y-1">
          <span>{formatDate(task.date)}</span>
          <span>às {task.time}</span>
        </div>
        {task.description && (
          <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">
            {task.description}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2 self-end sm:self-center ml-auto">
        <button
          onClick={handleWhatsAppShare}
          className="p-2 text-green-500 hover:text-green-600 hover:bg-green-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200"
          aria-label="Enviar para WhatsApp"
        >
          <WhatsAppIcon className="w-6 h-6" />
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="p-2 text-red-500 hover:text-red-600 hover:bg-red-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200"
          aria-label="Excluir tarefa"
        >
          <TrashIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
