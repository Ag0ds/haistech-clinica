"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { useLanguage } from "@/contexts/LanguageContext";

export default function DetalhesPaciente() {
  const router = useRouter();
  const params = useParams();
  const pacienteId = params?.id as string;
  const { t } = useLanguage();
  
  const [paciente, setPaciente] = useState<any>(null);
  const [evolucoes, setEvolucoes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [iaResponse, setIaResponse] = useState<string | null>(null);
  const [iaLoading, setIaLoading] = useState(false);

  const handleGenerateIaAnalysis = async () => {
    setIaLoading(true);
    setIaResponse(null);
    try {
      const data = await api.getAnaliseIa(pacienteId);
      setIaResponse(data.analise);
    } catch (e: any) {
      alert(`${t('alert.errorPrefix')} ${e.message}`);
    } finally {
      setIaLoading(false);
    }
  };

  const handleDeleteEvolucao = async (id: string) => {
    if (confirm(t('alert.deleteConfirm'))) {
      try {
        await api.deleteEvolucao(id);
        setEvolucoes(evolucoes.filter(e => e.id !== id));
      } catch (e) {
        alert(t('alert.deleteError'));
      }
    }
  };

  useEffect(() => {
    if (!pacienteId) return;

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
    return <div className="text-center p-12 text-slate-500">{t('loading.data')}</div>;
  }

  if (!paciente) {
    return <div className="text-center p-12 text-slate-500">{t('loading.notFound')}</div>;
  }
  
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-[var(--secondary-foreground)] hover:text-white">
              &larr; {t('patient.back')}
            </Button>
          </Link>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white uppercase font-mono">{t('details.title')}</h2>
            <p className="text-sm text-[var(--secondary-foreground)] mt-1 tracking-widest font-mono">{t('details.subtitle')}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={`/pacientes/${pacienteId}/editar`}>
            <Button variant="secondary" className="font-mono text-xs tracking-widest uppercase border-[var(--primary)] text-[var(--primary)] bg-transparent hover:bg-[var(--primary)] hover:text-white">
              {t('details.editData')}
            </Button>
          </Link>
        </div>
      </div>

      <Card className="bg-[var(--card)] border border-[var(--card-border)]" glass={false}>
        <div>
          <h3 className="text-xl font-bold text-white uppercase">{paciente.nome}</h3>
          <div className="text-sm text-[var(--secondary-foreground)] mt-2 grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-2 font-mono tracking-widest">
            <p><strong className="font-semibold text-white">CPF:</strong> {paciente.cpf}</p>
            <p><strong className="font-semibold text-white">Nascimento:</strong> {new Date(paciente.dataNascimento).toLocaleDateString('pt-BR')}</p>
            <p><strong className="font-semibold text-white">Contato:</strong> {paciente.telefone}</p>
          </div>
        </div>
      </Card>

      {/* HAIS Tech AI Assistant Card */}
      <Card className="bg-[var(--card)] border border-[var(--primary)]/50 relative overflow-hidden" glass={false}>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent opacity-50"></div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <div>
            <h3 className="text-xl font-bold text-[var(--primary)] uppercase font-mono tracking-tight flex items-center gap-2">
              <span className="animate-pulse">✨</span> {t('ai.title')}
            </h3>
            <p className="text-xs text-[var(--secondary-foreground)] font-mono tracking-widest mt-1">{t('ai.subtitle')}</p>
          </div>
          <Button 
            onClick={handleGenerateIaAnalysis} 
            disabled={iaLoading || evolucoes.length === 0}
            className="font-mono text-xs tracking-widest uppercase bg-[var(--primary)]/20 text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white border border-[var(--primary)]/50 transition-all duration-300"
          >
            {iaLoading ? t('ai.processing') : t('ai.generate')}
          </Button>
        </div>
        
        {iaLoading && (
          <div className="p-8 border border-dashed border-[var(--primary)]/30 rounded-md bg-[var(--primary)]/5 flex items-center justify-center">
            <span className="font-mono text-xs text-[var(--primary)] animate-pulse tracking-widest uppercase">Analisando histórico de evoluções...</span>
          </div>
        )}

        {iaResponse && !iaLoading && (
          <div className="p-6 border border-solid border-[var(--primary)]/20 rounded-md bg-black/40 text-[var(--foreground)] text-sm leading-relaxed font-sans">
            <div dangerouslySetInnerHTML={{ __html: iaResponse.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/### (.*?)(<br\/>|$)/g, '<h4 class="text-[var(--primary)] font-bold mt-4 mb-2 text-base">$1</h4>') }} />
          </div>
        )}
      </Card>

      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-white font-mono uppercase">{t('details.timelineTitle')}</h3>
            <p className="text-sm text-[var(--secondary-foreground)] font-mono tracking-widest">{t('details.timelineSubtitle')}</p>
          </div>
          <Link href={`/pacientes/${pacienteId}/evolucao/novo`}>
            <Button className="font-mono text-xs tracking-widest px-6 py-2 uppercase">
              <span className="mr-2 text-lg leading-none">+</span> {t('details.newEvolution')}
            </Button>
          </Link>
        </div>

        {evolucoes.length === 0 ? (
          <Card className="p-12 text-center text-[var(--secondary-foreground)] border-dashed border-[var(--card-border)] bg-transparent">
            <span className="font-mono tracking-widest uppercase text-xs">{t('details.noEvolutions')}</span>
          </Card>
        ) : (
          <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-[var(--card-border)]">
            {evolucoes.map((evo) => (
              <div key={evo.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[var(--background)] bg-[var(--primary)] text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  📄
                </div>
                <Card className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] hover:shadow-lg transition-shadow duration-300 relative bg-[var(--card)] border border-[var(--card-border)]" glass={false}>
                  <div className="flex justify-between items-start mb-2 border-b border-[var(--card-border)] pb-3">
                    <span className="font-bold text-[var(--primary)] font-mono tracking-widest">{new Date(evo.dataRegistro).toLocaleDateString('pt-BR')}</span>
                    <div className="flex gap-2">
                      <Link href={`/pacientes/${pacienteId}/evolucao/${evo.id}/editar`}>
                        <Button variant="ghost" size="sm" className="font-mono text-[10px] uppercase tracking-widest text-white hover:text-[var(--primary)]">
                          {t('details.edit')}
                        </Button>
                      </Link>
                      <Button variant="ghost" size="sm" className="font-mono text-[10px] uppercase tracking-widest text-red-500 hover:text-red-400 hover:bg-red-500/10" onClick={() => handleDeleteEvolucao(evo.id)}>
                        {t('details.delete')}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4 mt-4">
                    <div className="bg-[var(--input-bg)] p-3 rounded-md border border-[var(--card-border)]">
                      <span className="text-[10px] font-semibold text-[var(--secondary-foreground)] uppercase tracking-widest font-mono block mb-1">{t('evolution.bp')}</span>
                      <p className="font-medium text-white font-mono">{evo.pressaoArterial || '--'}</p>
                    </div>
                    <div className="bg-[var(--input-bg)] p-3 rounded-md border border-[var(--card-border)]">
                      <span className="text-[10px] font-semibold text-[var(--secondary-foreground)] uppercase tracking-widest font-mono block mb-1">{t('evolution.weight')}</span>
                      <p className="font-medium text-white font-mono">{evo.peso ? `${evo.peso} kg` : '--'}</p>
                    </div>
                  </div>

                  <div className="bg-[var(--input-bg)] p-4 rounded-md border border-[var(--card-border)] text-[var(--foreground)] whitespace-pre-wrap text-sm leading-relaxed">
                    {evo.descricao}
                  </div>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
