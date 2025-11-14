
import React, { useState, useEffect, useCallback } from 'react';
import { Task } from './types';
import { WelcomeModal } from './components/WelcomeModal';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showWelcome, setShowWelcome] = useState(false);

  // Load tasks from localStorage on initial render
  useEffect(() => {
    try {
      const storedTasks = localStorage.getItem('tasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }

      const hasVisited = localStorage.getItem('hasVisited');
      if (!hasVisited) {
        setShowWelcome(true);
      }
    } catch (error) {
      console.error("Failed to load tasks from localStorage", error);
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error("Failed to save tasks to localStorage", error);
    }
  }, [tasks]);

  // Handle Notifications
  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted" && Notification.permission !== "denied") {
      Notification.requestPermission();
    }

    const interval = setInterval(() => {
      const now = new Date();
      tasks.forEach(task => {
        if (!task.completed && !task.notificationSent) {
          const taskDateTime = new Date(`${task.date}T${task.time}`);
          const diffMinutes = (taskDateTime.getTime() - now.getTime()) / (1000 * 60);

          if (diffMinutes > 0 && diffMinutes <= 10) {
            new Notification('Lembrete de Tarefa', {
              body: `${task.name} começa em aproximadamente 10 minutos.`,
              icon: '/favicon.ico' 
            });
            
            setTasks(prevTasks =>
              prevTasks.map(t =>
                t.id === task.id ? { ...t, notificationSent: true } : t
              )
            );
          }
        }
      });
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [tasks]);

  const handleAddTask = useCallback((task: Omit<Task, 'id' | 'completed' | 'notificationSent'>) => {
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      completed: false,
      notificationSent: false,
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
  }, []);

  const handleToggleComplete = useCallback((id: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  const handleDeleteTask = useCallback((id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  }, []);
  
  const handleCloseWelcome = () => {
    localStorage.setItem('hasVisited', 'true');
    setShowWelcome(false);
  };

  return (
    <div className="min-h-screen">
      {showWelcome && <WelcomeModal onClose={handleCloseWelcome} />}
      <header className="bg-white dark:bg-gray-800/50 backdrop-blur-lg shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white tracking-tight">
                Agendador de Tarefas
            </h1>
            <p className="text-center text-gray-500 dark:text-gray-400 mt-1">Seu assistente pessoal para o dia a dia.</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <TaskForm onAddTask={handleAddTask} />
        <TaskList
          tasks={tasks}
          onToggleComplete={handleToggleComplete}
          onDelete={handleDeleteTask}
        />
      </main>

      <footer className="text-center py-6 text-sm text-gray-500 dark:text-gray-400">
        <p>Feito com ❤️ para simplificar sua vida.</p>
      </footer>
    </div>
  );
};

export default App;
