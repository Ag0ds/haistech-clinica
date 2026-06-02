"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "@/services/api";

export default function Home() {
  const [pacientes, setPacientes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getPacientes()
      .then(data => setPacientes(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Pacientes</h2>
          <p className="text-slate-500 mt-1">Gerencie os registros e acompanhamentos clínicos.</p>
        </div>
        <Link href="/pacientes/novo">
          <Button>+ Novo Paciente</Button>
        </Link>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50/50 text-slate-600 font-medium border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Nome</th>
                <th className="px-6 py-4">CPF</th>
                <th className="px-6 py-4">Data Nasc.</th>
                <th className="px-6 py-4">Telefone</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-slate-500">
                    Carregando pacientes...
                  </td>
                </tr>
              ) : pacientes.map((paciente) => (
                <tr key={paciente.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{paciente.nome}</td>
                  <td className="px-6 py-4 text-slate-500">{paciente.cpf}</td>
                  <td className="px-6 py-4 text-slate-500">{new Date(paciente.dataNascimento).toLocaleDateString('pt-BR')}</td>
                  <td className="px-6 py-4 text-slate-500">{paciente.telefone}</td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/pacientes/${paciente.id}`}>
                      <Button variant="ghost" size="sm" className="text-primary hover:text-sky-700">
                        Ver Prontuário
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!loading && pacientes.length === 0 && (
            <div className="p-12 text-center text-slate-500">
              Nenhum paciente cadastrado ainda.
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
