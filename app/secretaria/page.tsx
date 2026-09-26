"use client";

import { useState } from "react";

export default function SecretariaPage() {
  const [activeTab, setActiveTab] = useState("aluno");

  return (
    <div className="min-h-screen bg-black text-white selection:bg-red-500/30">
      <nav className="border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img 
              src="/logos/AgenTEC/06_agentec_logo_fundo_vermelho.png" 
              alt="AgenTEC Logo" 
              className="h-12 rounded-lg"
            />
            <h1 className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Secretaria Digital
            </h1>
          </div>
          <div className="flex gap-2 bg-white/5 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setActiveTab("aluno")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeTab === "aluno"
                  ? "bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.3)]"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              Visão Aluno
            </button>
            <button
              onClick={() => setActiveTab("master")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeTab === "master"
                  ? "bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.3)]"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              Painel Master
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto space-y-8">
          <header className="space-y-4">
            <h2 className="text-4xl font-bold tracking-tight">
              {activeTab === "aluno" ? "Portal do Aluno" : "Gestão Acadêmica"}
            </h2>
            <p className="text-gray-400 text-lg">
              {activeTab === "aluno"
                ? "Consulte suas notas, frequência e solicite documentos de forma rápida e digital."
                : "Área administrativa para lançamento de notas, faltas e gerenciamento de documentos."}
            </p>
          </header>

          {activeTab === "aluno" ? (
            <div className="grid md:grid-cols-3 gap-6">
              <DashboardCard
                title="Minhas Notas"
                description="Consulte seu boletim e histórico por semestre."
                icon="📝"
                delay="0ms"
              />
              <DashboardCard
                title="Frequência"
                description="Acompanhe suas faltas e evite risco de reprovação."
                icon="📊"
                delay="100ms"
                alert="Risco em Engenharia de Software"
              />
              <DashboardCard
                title="Documentos"
                description="Solicite históricos e declarações oficiais."
                icon="📄"
                delay="200ms"
                action="Nova Solicitação"
              />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-red-500/50 transition-colors duration-500">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <span>🎓</span> Lançamento de Notas
                </h3>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="text-sm text-gray-400">RA do Aluno</label>
                    <input type="text" className="w-full mt-1 bg-black/50 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-400">Disciplina</label>
                      <input type="text" className="w-full mt-1 bg-black/50 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all" />
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">Nota</label>
                      <input type="number" step="0.1" className="w-full mt-1 bg-black/50 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all" />
                    </div>
                  </div>
                  <button className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-lg transition-colors">
                    Lançar Nota
                  </button>
                </form>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-red-500/50 transition-colors duration-500">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <span>📂</span> Fila de Solicitações
                </h3>
                <div className="space-y-3">
                  {[
                    { aluno: "Carlos Lima", doc: "Histórico Escolar", status: "pendente" },
                    { aluno: "João Silva", doc: "Declaração de Matrícula", status: "em_analise" }
                  ].map((req, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                      <div>
                        <p className="font-medium text-sm">{req.aluno}</p>
                        <p className="text-xs text-gray-400">{req.doc}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        req.status === 'pendente' ? 'bg-yellow-500/20 text-yellow-500' : 'bg-blue-500/20 text-blue-500'
                      }`}>
                        {req.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function DashboardCard({ title, description, icon, delay, alert, action }: any) {
  return (
    <div 
      className="group relative p-6 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-red-500/50 transition-all duration-500 overflow-hidden"
      style={{ animationDelay: delay }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10 space-y-4">
        <div className="text-4xl">{icon}</div>
        <div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
        </div>
        
        {alert && (
          <div className="mt-4 px-3 py-2 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-400 text-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            {alert}
          </div>
        )}

        {action && (
          <button className="mt-4 w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 font-medium py-2 rounded-lg text-sm transition-all group-hover:border-red-500/30">
            {action}
          </button>
        )}
      </div>
    </div>
  );
}
