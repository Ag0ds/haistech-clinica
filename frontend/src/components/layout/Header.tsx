import React from 'react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full glass mb-8 border-b-0">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/40">
            H
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-sky-700">
            HaisTech Clínica
          </h1>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <a href="/" className="hover:text-primary transition-colors">Pacientes</a>
          <a href="#" className="hover:text-primary transition-colors">Agendamentos</a>
          <a href="#" className="hover:text-primary transition-colors">Configurações</a>
        </nav>
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white shadow-sm flex items-center justify-center text-slate-500 font-semibold text-xs overflow-hidden">
            DR
          </div>
        </div>
      </div>
    </header>
  );
}
