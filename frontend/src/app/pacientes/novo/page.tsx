"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "@/services/api";
import { useLanguage } from "@/contexts/LanguageContext";

export default function NovoPaciente() {
  const router = useRouter();
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);

  // Função para salvar no backend
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      nome: formData.get("nome"),
      cpf: formData.get("cpf"),
      dataNascimento: formData.get("dataNascimento"),
      telefone: formData.get("telefone"),
      email: formData.get("email")
    };

    try {
      await api.createPaciente(data);
      alert(t('alert.successCreate'));
      router.push("/");
    } catch (err: any) {
      alert(`${t('alert.errorPrefix')}\n${err.message || t('alert.unknownCreate')}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="ghost" size="sm" className="text-[var(--secondary-foreground)] hover:text-white">
            &larr; {t('patient.back')}
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-white uppercase font-mono tracking-tight">{t('patient.newTitle')}</h2>
          <p className="text-sm text-[var(--secondary-foreground)] font-mono tracking-widest mt-1">{t('patient.newSubtitle')}</p>
        </div>
      </div>

      <Card className="bg-[var(--card)] border border-[var(--card-border)]" glass={false}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <Input label={t('patient.fullName')} name="nome" placeholder="Ex: João da Silva" required />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label={t('home.cpf')} name="cpf" placeholder="000.000.000-00" required />
              <Input label={t('patient.dob')} name="dataNascimento" type="date" required />
            </div>

            <Input label={t('home.phone')} name="telefone" placeholder="(00) 00000-0000" required />
            <Input label={t('patient.email')} name="email" type="email" placeholder="email@exemplo.com" required />
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-[var(--card-border)]">
            <Link href="/">
              <Button type="button" variant="ghost" className="font-mono text-xs tracking-widest uppercase">{t('patient.cancel')}</Button>
            </Link>
            <Button type="submit" disabled={loading} className="font-mono text-xs tracking-widest uppercase">
              {loading ? t('patient.saving') : t('patient.save')}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
