"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "@/services/api";

export default function NovoPaciente() {
  const router = useRouter();
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
      alert("Paciente cadastrado com sucesso!");
      router.push("/");
    } catch (err: any) {
      alert(`Ocorreram os seguintes erros:\n${err.message || "Erro desconhecido ao cadastrar."}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="ghost" size="sm" className="text-slate-500">
            &larr; Voltar
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Novo Paciente</h2>
          <p className="text-sm text-slate-500">Preencha os dados básicos do paciente.</p>
        </div>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <Input label="Nome Completo" name="nome" placeholder="Ex: João da Silva" required />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="CPF" name="cpf" placeholder="000.000.000-00" required />
              <Input label="Data de Nascimento" name="dataNascimento" type="date" required />
            </div>

            <Input label="Telefone" name="telefone" placeholder="(00) 00000-0000" required />
            <Input label="E-mail" name="email" type="email" placeholder="email@exemplo.com" required />
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
            <Link href="/">
              <Button type="button" variant="ghost">Cancelar</Button>
            </Link>
            <Button type="submit" disabled={loading}>
              {loading ? "Salvando..." : "Salvar Paciente"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
