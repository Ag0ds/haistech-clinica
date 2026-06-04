"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { useLanguage } from "@/contexts/LanguageContext";

export default function EditarPaciente() {
  const router = useRouter();
  const params = useParams();
  const pacienteId = params?.id as string;
  const { t } = useLanguage();
  
  const [paciente, setPaciente] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!pacienteId) return;

    api.getPaciente(pacienteId)
      .then(data => setPaciente(data))
      .catch(err => console.error("Erro ao carregar paciente", err))
      .finally(() => setFetching(false));
  }, [pacienteId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      nome: formData.get("nome"),
      dataNascimento: formData.get("dataNascimento"),
      telefone: formData.get("telefone"),
      email: formData.get("email")
    };

    try {
      await api.updatePaciente(pacienteId, data);
      alert(t('alert.successUpdate'));
      router.push(`/pacientes/${pacienteId}`);
    } catch (err: any) {
      alert(`${t('alert.errorPrefix')}\n${err.message || t('alert.unknownUpdate')}`);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div className="text-center p-12 text-slate-500">{t('loading.data')}</div>;
  }

  if (!paciente) {
    return <div className="text-center p-12 text-slate-500">{t('loading.notFound')}</div>;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-4">
        <Link href={`/pacientes/${pacienteId}`}>
          <Button variant="ghost" size="sm" className="text-[var(--secondary-foreground)] hover:text-white">
            &larr; {t('patient.back')}
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-white uppercase font-mono tracking-tight">{t('patient.editTitle')}</h2>
          <p className="text-sm text-[var(--secondary-foreground)] font-mono tracking-widest mt-1">{t('patient.editSubtitle')}</p>
        </div>
      </div>

      <Card className="bg-[var(--card)] border border-[var(--card-border)]" glass={false}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <Input label={t('patient.fullName')} name="nome" defaultValue={paciente.nome} required />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label={t('home.cpf')} name="cpf" defaultValue={paciente.cpf} disabled className="opacity-70 cursor-not-allowed" title="CPF não pode ser alterado" />
              <Input label={t('patient.dob')} name="dataNascimento" type="date" defaultValue={paciente.dataNascimento} disabled className="opacity-70 cursor-not-allowed" title="Data de nascimento não pode ser alterada" />
            </div>

            <Input label={t('home.phone')} name="telefone" defaultValue={paciente.telefone} required />
            <Input label={t('patient.email')} name="email" type="email" defaultValue={paciente.email} required />
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-[var(--card-border)]">
            <Link href={`/pacientes/${pacienteId}`}>
              <Button type="button" variant="ghost" className="font-mono text-xs tracking-widest uppercase">{t('patient.cancel')}</Button>
            </Link>
            <Button type="submit" disabled={loading} className="font-mono text-xs tracking-widest uppercase">
              {loading ? t('patient.updating') : t('patient.update')}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
