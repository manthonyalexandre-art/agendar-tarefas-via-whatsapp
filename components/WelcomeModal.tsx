
import React from 'react';

interface WelcomeModalProps {
  onClose: () => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 md:p-8 max-w-lg w-full transform transition-all scale-95 animate-scale-in">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Bem-vindo ao Agendador Inteligente!
        </h2>
        <div className="text-gray-600 dark:text-gray-300 space-y-4">
          <p>Otimize seu dia com agendamentos fáceis e lembretes direto no WhatsApp.</p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li><strong>Adicione tarefas:</strong> Preencha o formulário para criar uma nova tarefa.</li>
            <li><strong>Receba lembretes:</strong> Uma notificação no navegador será exibida 10 minutos antes do horário.</li>
            <li><strong>Envie para o WhatsApp:</strong> Clique no ícone do WhatsApp para gerar um lembrete e enviar para qualquer contato.</li>
            <li><strong>Fique tranquilo:</strong> Suas tarefas são salvas automaticamente no seu navegador.</li>
          </ul>
          <p className="text-sm text-gray-500 dark:text-gray-400 pt-2">
            Este app funciona offline e respeita sua privacidade. Nenhum dado é enviado para servidores.
          </p>
        </div>
        <button
          onClick={onClose}
          className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
        >
          Começar a Organizar
        </button>
      </div>
      <style>{`
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-scale-in { animation: scale-in 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};
