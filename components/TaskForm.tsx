
import React, { useState } from 'react';
import { Task } from '../types';
import { PlusIcon } from './Icons';

interface TaskFormProps {
  onAddTask: (task: Omit<Task, 'id' | 'completed' | 'notificationSent'>) => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !date || !time) {
      alert('Por favor, preencha nome, data e horário.');
      return;
    }
    onAddTask({ name, date, time, description });
    setName('');
    setDate('');
    setTime('');
    setDescription('');
    setIsExpanded(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-lg mb-6 transition-all duration-300">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Nome da Tarefa..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            className="flex-grow bg-gray-100 dark:bg-gray-700 border-2 border-transparent focus:border-blue-500 focus:ring-0 rounded-lg px-4 py-3 transition-colors duration-300"
            required
          />
          {isExpanded && (
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="bg-gray-100 dark:bg-gray-700 border-2 border-transparent focus:border-blue-500 focus:ring-0 rounded-lg px-4 py-3 transition-colors duration-300"
                required
              />
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="bg-gray-100 dark:bg-gray-700 border-2 border-transparent focus:border-blue-500 focus:ring-0 rounded-lg px-4 py-3 transition-colors duration-300"
                required
              />
            </div>
          )}
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-5 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800">
            <PlusIcon className="w-5 h-5" />
            <span className={isExpanded ? 'inline' : 'hidden md:inline'}>Adicionar</span>
          </button>
        </div>
        {isExpanded && (
          <div className="mt-4">
            <textarea
              placeholder="Descrição (opcional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-gray-100 dark:bg-gray-700 border-2 border-transparent focus:border-blue-500 focus:ring-0 rounded-lg px-4 py-3 transition-colors duration-300"
              rows={2}
            ></textarea>
          </div>
        )}
      </form>
    </div>
  );
};
