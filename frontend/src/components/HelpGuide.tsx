"use client";

import { HelpCircle, X, ChevronRight } from "lucide-react";
import { useState } from "react";

interface HelpStep {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface HelpGuideProps {
  title: string;
  steps: HelpStep[];
  color?: "blue" | "yellow" | "green" | "purple";
  tips?: string[];
}

export default function HelpGuide({ title, steps, color = "blue", tips }: HelpGuideProps) {
  const [isOpen, setIsOpen] = useState(false);

  const colorClasses = {
    blue: {
      bg: "bg-blue-50",
      border: "border-blue-500",
      text: "text-blue-800",
      icon: "text-blue-600"
    },
    yellow: {
      bg: "bg-yellow-50",
      border: "border-yellow-500",
      text: "text-yellow-800",
      icon: "text-yellow-600"
    },
    green: {
      bg: "bg-green-50",
      border: "border-green-500",
      text: "text-green-800",
      icon: "text-green-600"
    },
    purple: {
      bg: "bg-purple-50",
      border: "border-purple-500",
      text: "text-purple-800",
      icon: "text-purple-600"
    }
  };

  const classes = colorClasses[color];

  return (
    <>
      {/* Help Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${classes.bg} border-l-4 ${classes.border} px-4 py-2 rounded-lg font-semibold hover:opacity-80 transition flex items-center gap-2`}
      >
        <HelpCircle className={`w-5 h-5 ${classes.icon}`} />
        Ajuda
      </button>

      {/* Help Panel */}
      {isOpen && (
        <div className={`${classes.bg} border-l-4 ${classes.border} p-6 rounded-lg shadow-lg`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-bold ${classes.text}`}>
              {title}
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className={`${classes.icon} hover:opacity-70 transition`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className={`${classes.text} space-y-4`}>
            {steps.map((step, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className={`flex-shrink-0 w-6 h-6 rounded-full ${classes.bg} ${classes.border} border-2 flex items-center justify-center text-sm font-bold ${classes.text}`}>
                  {index + 1}
                </div>
                <div>
                  <h4 className="font-semibold mb-1">{step.title}</h4>
                  <p className="text-sm opacity-90">{step.description}</p>
                </div>
              </div>
            ))}

            {tips && tips.length > 0 && (
              <div className="mt-6 pt-4 border-t border-opacity-20 border-current">
                <h4 className="font-semibold mb-2">💡 Dicas:</h4>
                <ul className="space-y-1">
                  {tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm opacity-90">
                      <ChevronRight className={`w-4 h-4 ${classes.icon} mt-0.5 flex-shrink-0`} />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

// Predefined help guides for different roles
export const AdminHelpGuide = () => (
  <HelpGuide
    title="Guia do Administrador"
    color="yellow"
    steps={[
      {
        title: "Dashboard",
        description: "Visualize estatísticas completas do hotel em tempo real, incluindo receita, ocupação e reservas."
      },
      {
        title: "Reservas",
        description: "Gerencie todas as reservas, confirme, cancele ou modifique conforme necessário."
      },
      {
        title: "Quartos",
        description: "Adicione, edite ou remova quartos e configure preços e disponibilidade."
      },
      {
        title: "Hóspedes",
        description: "Visualize informações detalhadas de todos os hóspedes e histórico de estadias."
      },
      {
        title: "Usuários",
        description: "Gerencie contas de funcionários, gerentes e suas permissões no sistema."
      },
      {
        title: "Relatórios",
        description: "Gere relatórios financeiros, de ocupação e análises de desempenho."
      }
    ]}
    tips={[
      "Use os filtros e busca para encontrar informações rapidamente",
      "Monitore regularmente as estatísticas para tomar decisões informadas",
      "Configure alertas para reservas pendentes que precisam de atenção",
      "Mantenha os dados dos quartos sempre atualizados"
    ]}
  />
);

export const StaffHelpGuide = () => (
  <HelpGuide
    title="Guia da Equipe"
    color="blue"
    steps={[
      {
        title: "Dashboard",
        description: "Visualize estatísticas gerais do hotel e acompanhe o status atual."
      },
      {
        title: "Reservas",
        description: "Gerencie reservas, confirme check-ins e atualize status conforme necessário."
      },
      {
        title: "Quartos",
        description: "Visualize disponibilidade dos quartos e atualize status de ocupação."
      },
      {
        title: "Hóspedes",
        description: "Acesse informações dos hóspedes para melhor atendimento."
      }
    ]}
    tips={[
      "Sempre confirme reservas pendentes rapidamente",
      "Mantenha informações dos hóspedes atualizadas",
      "Comunique-se com a equipe sobre mudanças importantes",
      "Use os filtros para organizar o trabalho diário"
    ]}
  />
);

export const GuestHelpGuide = () => (
  <HelpGuide
    title="Guia do Hóspede"
    color="green"
    steps={[
      {
        title: "Dashboard",
        description: "Visualize suas reservas e estatísticas pessoais de estadias."
      },
      {
        title: "Minhas Reservas",
        description: "Veja todas as suas reservas ativas e passadas com detalhes completos."
      },
      {
        title: "Recompensas",
        description: "Acompanhe seus pontos e benefícios disponíveis no programa de fidelidade."
      },
      {
        title: "Faturas",
        description: "Baixe suas faturas em PDF a qualquer momento para seus registros."
      }
    ]}
    tips={[
      "Você ganha 100 pontos de recompensa a cada estadia confirmada",
      "Baixe suas faturas imediatamente após o check-in",
      "Verifique suas próximas estadias regularmente",
      "Entre em contato se precisar de ajuda com suas reservas"
    ]}
  />
);
