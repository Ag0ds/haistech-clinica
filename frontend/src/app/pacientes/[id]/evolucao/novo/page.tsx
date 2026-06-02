"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useState } from "react";
import { api } from "@/services/api";

export default function NovaEvolucao() {
  const router = useRouter();
  const params = useParams();
  const pacienteId = params.id as string;
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
      alert("Evolução salva e enviada para a fila RabbitMQ!");
      router.push(`/pacientes/${pacienteId}`);
    } catch (err: any) {
      alert(`Ocorreram os seguintes erros:\n${err.message || "Erro desconhecido ao registrar evolução."}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-4">
        <Link href={`/pacientes/${params.id}`}>
          <Button variant="ghost" size="sm" className="text-slate-500">
            &larr; Voltar ao Prontuário
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Nova Evolução Clínica</h2>
          <p className="text-sm text-slate-500">Registre o acompanhamento de hoje do paciente.</p>
        </div>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Pressão Arterial" name="pressaoArterial" placeholder="Ex: 120/80" required />
              <Input label="Peso (kg)" name="peso" type="number" step="0.1" placeholder="Ex: 75.5" required />
            </div>

            <div className="flex flex-col gap-1 w-full">
              <label className="text-sm font-medium text-slate-700 ml-1">
                Descrição / Diagnóstico
              </label>
              <textarea
                name="descricao"
                className="px-4 py-2 rounded-lg border border-slate-200 bg-white/50 focus:bg-white transition-colors outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary min-h-[120px] resize-y"
                placeholder="Detalhe o estado clínico do paciente..."
                required
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
            <Link href={`/pacientes/${params.id}`}>
              <Button type="button" variant="ghost">Cancelar</Button>
            </Link>
            <Button type="submit" disabled={loading}>
              {loading ? "Salvando..." : "Salvar Evolução"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
