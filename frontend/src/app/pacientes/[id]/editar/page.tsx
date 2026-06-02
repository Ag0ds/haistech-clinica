"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/services/api";

export default function EditarPaciente() {
  const router = useRouter();
  const params = useParams();
  const pacienteId = params.id as string;
  
  const [paciente, setPaciente] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
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
      alert("Paciente atualizado com sucesso!");
      router.push(`/pacientes/${pacienteId}`);
    } catch (err) {
      alert("Erro ao atualizar paciente.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div className="text-center p-12 text-slate-500">Carregando dados...</div>;
  }

  if (!paciente) {
    return <div className="text-center p-12 text-slate-500">Paciente não encontrado.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-4">
        <Link href={`/pacientes/${params.id}`}>
          <Button variant="ghost" size="sm" className="text-slate-500">
            &larr; Voltar
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Editar Paciente</h2>
          <p className="text-sm text-slate-500">Atualize os dados cadastrais do paciente.</p>
        </div>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <Input label="Nome Completo" name="nome" defaultValue={paciente.nome} required />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="CPF" name="cpf" defaultValue={paciente.cpf} required disabled className="opacity-70 cursor-not-allowed" title="CPF não pode ser alterado" />
              <Input label="Data de Nascimento" name="dataNascimento" type="date" defaultValue={paciente.dataNascimento} required />
            </div>

            <Input label="Telefone" name="telefone" defaultValue={paciente.telefone} required />
            <Input label="E-mail" name="email" type="email" defaultValue={paciente.email} required />
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
            <Link href={`/pacientes/${params.id}`}>
              <Button type="button" variant="ghost">Cancelar</Button>
            </Link>
            <Button type="submit" disabled={loading}>
              {loading ? "Atualizando..." : "Atualizar Paciente"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
