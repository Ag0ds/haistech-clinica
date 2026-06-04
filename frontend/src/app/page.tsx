"use client";

import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Home() {
  const { t } = useLanguage();
  const [pacientes, setPacientes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api.getPacientes()
      .then(data => setPacientes(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const filtered = pacientes.filter((p) =>
    p.nome.toLowerCase().includes(search.toLowerCase()) || 
    p.cpf.includes(search)
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 mt-4">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white uppercase font-mono">{t('home.dashboard')}</h1>
          <p className="text-[var(--secondary-foreground)] mt-1 text-xs uppercase tracking-widest font-mono">{t('home.overview')}</p>
        </div>
        <Link href="/pacientes/novo">
          <Button className="w-full md:w-auto font-mono text-xs tracking-widest px-6 py-2 uppercase">
            + {t('home.newPatient')}
          </Button>
        </Link>
      </div>

      {/* Modern HUD Stats */}
      <div className="flex flex-wrap gap-6 bg-[var(--card)] border border-[var(--card-border)] rounded-lg p-4">
        <div className="flex-1 min-w-[120px]">
          <h3 className="text-[10px] font-semibold text-[var(--secondary-foreground)] uppercase tracking-widest font-mono">{t('home.totalPatients')}</h3>
          <p className="text-2xl font-mono text-white mt-1">{pacientes.length}</p>
        </div>
        <div className="w-px bg-[var(--card-border)] hidden md:block"></div>
        <div className="flex-1 min-w-[120px]">
          <h3 className="text-[10px] font-semibold text-[var(--secondary-foreground)] uppercase tracking-widest font-mono">{t('home.activeToday')}</h3>
          <p className="text-2xl font-mono text-[var(--primary)] mt-1">0</p>
        </div>
        <div className="w-px bg-[var(--card-border)] hidden md:block"></div>
        <div className="flex-1 min-w-[120px]">
          <h3 className="text-[10px] font-semibold text-[var(--secondary-foreground)] uppercase tracking-widest font-mono">{t('home.pendingEvolutions')}</h3>
          <p className="text-2xl font-mono text-amber-500 mt-1">0</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {/* Search */}
        <div className="relative flex items-center mb-2">
          <span className="absolute left-0 text-[var(--secondary-foreground)] text-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </span>
          <input
            type="text"
            placeholder={t('home.search').toUpperCase()}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent border-b border-[var(--card-border)] focus:border-[var(--primary)] outline-none pl-8 py-2 font-mono text-xs text-white tracking-widest placeholder:text-[var(--secondary-foreground)]/50 transition-colors"
          />
        </div>

        {/* Patient table/list */}
        <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-lg overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-[var(--card-border)] bg-[#09111e]">
            <span className="font-mono text-[10px] text-[var(--primary)] tracking-widest uppercase">{t('home.listTitle')}</span>
            <span className="font-mono text-[9px] bg-[var(--primary)] text-white px-3 py-1 tracking-widest rounded-sm">
              {filtered.length} {t('home.totalPatients').toUpperCase()}
            </span>
          </div>

          <div className="divide-y divide-[var(--card-border)]">
            {filtered.length === 0 ? (
              <div className="p-8 text-center">
                <p className="font-mono text-xs text-[var(--secondary-foreground)]">
                  {loading ? t('loading.data').toUpperCase() : t('home.noPatients').toUpperCase()}
                </p>
              </div>
            ) : (
              filtered.map((paciente) => {
                return (
                  <div
                    key={paciente.id}
                    className="w-full flex items-center p-4 hover:bg-white/5 transition-colors text-left group"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white group-hover:text-[var(--primary)] transition-colors">
                        {paciente.nome.toUpperCase()}
                      </p>
                      <p className="font-mono text-[10px] text-[var(--secondary-foreground)] mt-1 tracking-widest">
                        ID: #PT-{String(paciente.id).padStart(4, "0")} &middot; CPF: {paciente.cpf} &middot; TEL: {paciente.telefone}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      <Link href={`/pacientes/${paciente.id}`}>
                        <Button variant="ghost" size="sm" className="font-mono text-[10px] tracking-widest border border-[var(--card-border)] px-3 py-1 hover:bg-[var(--primary)] hover:text-white">
                          {t('home.viewRecord').toUpperCase()}
                        </Button>
                      </Link>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
