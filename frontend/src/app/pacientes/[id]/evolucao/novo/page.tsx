"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "@/services/api";
import { useLanguage } from "@/contexts/LanguageContext";

export default function NovaEvolucao() {
  const router = useRouter();
  const params = useParams();
  const pacienteId = params?.id as string;
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      pressaoArterial: formData.get("pressaoArterial"),
      peso: parseFloat(formData.get("peso") as string),
      descricao: formData.get("descricao")
    };

    try {
      await api.createEvolucao(pacienteId, data);
      alert(t('alert.successEvolution'));
      router.push(`/pacientes/${pacienteId}`);
    } catch (err: any) {
      alert(`${t('alert.errorPrefix')}\n${err.message || t('alert.unknownEvolution')}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-4">
        <Link href={`/pacientes/${pacienteId}`}>
          <Button variant="ghost" size="sm" className="text-[var(--secondary-foreground)] hover:text-white">
            &larr; {t('evolution.back')}
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-white uppercase font-mono tracking-tight">{t('evolution.newTitle')}</h2>
          <p className="text-sm text-[var(--secondary-foreground)] font-mono tracking-widest mt-1">{t('evolution.newSubtitle')}</p>
        </div>
      </div>

      <Card className="bg-[var(--card)] border border-[var(--card-border)]" glass={false}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label={t('evolution.bp')} name="pressaoArterial" placeholder="Ex: 120/80" />
            <Input label={t('evolution.weight')} name="peso" type="number" step="0.01" placeholder="Ex: 75.5" />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-semibold text-[var(--secondary-foreground)] uppercase tracking-widest font-mono">{t('evolution.description')} *</label>
            <textarea 
              name="descricao"
              rows={6} 
              className="w-full bg-[var(--input-bg)] border border-[var(--card-border)] rounded-lg p-3 text-white focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition-all resize-none text-sm leading-relaxed"
              placeholder={t('evolution.descPlaceholder')}
              required
            ></textarea>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-[var(--card-border)]">
            <Link href={`/pacientes/${pacienteId}`}>
              <Button type="button" variant="ghost" className="font-mono text-xs tracking-widest uppercase">{t('evolution.cancel')}</Button>
            </Link>
            <Button type="submit" disabled={loading} className="font-mono text-xs tracking-widest uppercase">
              {loading ? t('evolution.saving') : t('evolution.save')}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
