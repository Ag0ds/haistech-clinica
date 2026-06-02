"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/services/api";

export default function ProntuarioPaciente() {
  const params = useParams();
  const pacienteId = params.id as string;
  
  const [paciente, setPaciente] = useState<any>(null);
  const [evolucoes, setEvolucoes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.getPaciente(pacienteId),
      api.getEvolucoes(pacienteId)
    ])
      .then(([pacienteData, evolucoesData]) => {
        setPaciente(pacienteData);
        setEvolucoes(evolucoesData);
      })
      .catch(err => console.error("Erro ao carregar dados", err))
      .finally(() => setLoading(false));
  }, [pacienteId]);

  if (loading) {
    return <div className="text-center p-12 text-slate-500">Carregando prontuário...</div>;
  }

  if (!paciente) {
    return <div className="text-center p-12 text-slate-500">Paciente não encontrado.</div>;
  }
  
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-4 mb-4">
        <Link href="/">
          <Button variant="ghost" size="sm" className="text-slate-500">
            &larr; Voltar
          </Button>
        </Link>
        <div>
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Prontuário Clínico</h2>
          <p className="text-slate-500 mt-1">Acompanhamento detalhado do paciente.</p>
        </div>
      </div>

      <Card className="bg-gradient-to-r from-sky-50 to-white">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900">{paciente.nome}</h3>
            <div className="text-sm text-slate-500 mt-2 grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-2">
              <p><strong className="font-semibold text-slate-700">CPF:</strong> {paciente.cpf}</p>
              <p><strong className="font-semibold text-slate-700">Nascimento:</strong> {new Date(paciente.dataNascimento).toLocaleDateString('pt-BR')}</p>
              <p><strong className="font-semibold text-slate-700">Contato:</strong> {paciente.telefone}</p>
            </div>
          </div>
          <Link href={`/pacientes/${params.id}/editar`}>
            <Button variant="secondary" size="sm">Editar Cadastro</Button>
          </Link>
        </div>
      </Card>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-slate-800">Histórico de Evoluções</h3>
          <Link href={`/pacientes/${params.id}/evolucao/novo`}>
            <Button>+ Adicionar Evolução</Button>
          </Link>
        </div>

        <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
          {evolucoes.map((evolucao, index) => (
            <div key={evolucao.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-primary text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                📄
              </div>
              <Card className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] hover:shadow-lg transition-shadow duration-300">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-bold text-sky-700">{new Date(evolucao.dataEvolucao).toLocaleDateString('pt-BR')}</span>
                  <div className="flex gap-3 text-xs text-slate-500 font-medium">
                    <span className="bg-slate-100 px-2 py-1 rounded-md">PA: {evolucao.pressaoArterial}</span>
                    <span className="bg-slate-100 px-2 py-1 rounded-md">{evolucao.peso} kg</span>
                  </div>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">{evolucao.descricao}</p>
              </Card>
            </div>
          ))}
          {evolucoes.length === 0 && (
             <div className="text-center text-slate-500 italic py-8">Nenhuma evolução registrada ainda.</div>
          )}
        </div>
      </div>
    </div>
  );
}
