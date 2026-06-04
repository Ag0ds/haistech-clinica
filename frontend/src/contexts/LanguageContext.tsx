"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "PT" | "EN";

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  PT: {
    // Header & Sidebar
    "header.title": "HAIS Tech",
    "sidebar.dashboard": "Dashboard",
    "sidebar.patients": "Pacientes",
    "sidebar.appointments": "Consultas",
    "sidebar.settings": "Configurações",

    // Dashboard / Home
    "home.dashboard": "Dashboard",
    "home.overview": "Visão Geral",
    "home.totalPatients": "Total de Pacientes",
    "home.activeToday": "Ativos Hoje",
    "home.pendingEvolutions": "Evoluções Pendentes",
    "home.listTitle": "Pacientes Cadastrados",
    "home.listSubtitle": "Gerencie os registros de pacientes da clínica.",
    "home.newPatient": "Novo Paciente",
    "home.search": "Buscar paciente...",
    "home.name": "Nome",
    "home.cpf": "CPF",
    "home.phone": "Telefone",
    "home.actions": "Ações",
    "home.viewRecord": "Ver Prontuário",
    "home.noPatients": "Nenhum paciente cadastrado ainda.",

    // Paciente Form
    "patient.newTitle": "Novo Paciente",
    "patient.newSubtitle": "Preencha os dados básicos do paciente.",
    "patient.editTitle": "Editar Paciente",
    "patient.editSubtitle": "Atualize os dados cadastrais do paciente.",
    "patient.fullName": "Nome Completo",
    "patient.dob": "Data de Nascimento",
    "patient.address": "Endereço",
    "patient.email": "E-mail",
    "patient.save": "Salvar Paciente",
    "patient.saving": "Salvando...",
    "patient.update": "Atualizar Paciente",
    "patient.updating": "Atualizando...",
    "patient.cancel": "Cancelar",
    "patient.back": "Voltar",

    // Paciente Details
    "details.title": "Prontuário Eletrônico",
    "details.subtitle": "Histórico completo e informações do paciente.",
    "details.editData": "Editar Dados",
    "details.born": "Nascimento",
    "details.timelineTitle": "Histórico Clínico",
    "details.timelineSubtitle": "Evoluções e registros médicos do paciente ao longo do tempo.",
    "details.newEvolution": "Nova Evolução",
    "details.noEvolutions": "Nenhuma evolução clínica registrada.",
    "details.edit": "Editar",
    "details.delete": "Excluir",

    // Evolucao Form
    "evolution.newTitle": "Nova Evolução Clínica",
    "evolution.newSubtitle": "Registre os dados da consulta de hoje.",
    "evolution.editTitle": "Editar Evolução Clínica",
    "evolution.editSubtitle": "Atualize os dados desta consulta.",
    "evolution.bp": "Pressão Arterial",
    "evolution.weight": "Peso (kg)",
    "evolution.description": "Descrição / Diagnóstico",
    "evolution.descPlaceholder": "Detalhe o estado clínico do paciente...",
    "evolution.save": "Registrar Evolução",
    "evolution.saving": "Registrando...",
    "evolution.update": "Atualizar Evolução",
    "evolution.updating": "Atualizando...",
    "evolution.cancel": "Cancelar",
    "evolution.back": "Voltar ao Prontuário",
    
    // Alerts
    "alert.errorPrefix": "Ocorreram os seguintes erros:",
    "alert.unknownCreate": "Erro desconhecido ao cadastrar.",
    "alert.unknownUpdate": "Erro desconhecido ao atualizar.",
    "alert.unknownEvolution": "Erro desconhecido ao registrar evolução.",
    "alert.successCreate": "Paciente cadastrado com sucesso!",
    "alert.successUpdate": "Paciente atualizado com sucesso!",
    "alert.successEvolution": "Evolução salva e enviada para a fila RabbitMQ!",
    "alert.successEvoUpdate": "Evolução atualizada com sucesso!",
    "alert.deleteConfirm": "Tem certeza que deseja excluir esta evolução?",
    "alert.deleteError": "Erro ao excluir evolução.",
    
    // Loading
    "loading.data": "Carregando dados...",
    "loading.notFound": "Paciente não encontrado.",
    "loading.evoNotFound": "Evolução não encontrada."
  },
  EN: {
    // Header & Sidebar
    "header.title": "HAIS Tech Clinic",
    "sidebar.dashboard": "Dashboard",
    "sidebar.patients": "Patients",
    "sidebar.appointments": "Appointments",
    "sidebar.settings": "Settings",

    // Dashboard / Home
    "home.dashboard": "Dashboard",
    "home.overview": "Overview",
    "home.totalPatients": "Total Patients",
    "home.activeToday": "Active Today",
    "home.pendingEvolutions": "Pending Evolutions",
    "home.listTitle": "Registered Patients",
    "home.listSubtitle": "Manage clinic patient records.",
    "home.newPatient": "New Patient",
    "home.search": "Search patient...",
    "home.name": "Name",
    "home.cpf": "SSN / CPF",
    "home.phone": "Phone",
    "home.actions": "Actions",
    "home.viewRecord": "View Record",
    "home.noPatients": "No patients registered yet.",

    // Paciente Form
    "patient.newTitle": "New Patient",
    "patient.newSubtitle": "Fill in the patient's basic data.",
    "patient.editTitle": "Edit Patient",
    "patient.editSubtitle": "Update patient registration data.",
    "patient.fullName": "Full Name",
    "patient.dob": "Date of Birth",
    "patient.address": "Address",
    "patient.email": "Email",
    "patient.save": "Save Patient",
    "patient.saving": "Saving...",
    "patient.update": "Update Patient",
    "patient.updating": "Updating...",
    "patient.cancel": "Cancel",
    "patient.back": "Back",

    // Paciente Details
    "details.title": "Electronic Medical Record",
    "details.subtitle": "Complete history and patient information.",
    "details.editData": "Edit Data",
    "details.born": "Born",
    "details.timelineTitle": "Clinical History",
    "details.timelineSubtitle": "Evolutions and medical records over time.",
    "details.newEvolution": "New Evolution",
    "details.noEvolutions": "No clinical evolution registered.",
    "details.edit": "Edit",
    "details.delete": "Delete",

    // Evolucao Form
    "evolution.newTitle": "New Clinical Evolution",
    "evolution.newSubtitle": "Register today's consultation data.",
    "evolution.editTitle": "Edit Clinical Evolution",
    "evolution.editSubtitle": "Update this consultation data.",
    "evolution.bp": "Blood Pressure",
    "evolution.weight": "Weight (kg)",
    "evolution.description": "Description / Diagnosis",
    "evolution.descPlaceholder": "Detail the patient's clinical state...",
    "evolution.save": "Register Evolution",
    "evolution.saving": "Registering...",
    "evolution.update": "Update Evolution",
    "evolution.updating": "Updating...",
    "evolution.cancel": "Cancel",
    "evolution.back": "Back to Record",
    
    // Alerts
    "alert.errorPrefix": "The following errors occurred:",
    "alert.unknownCreate": "Unknown error creating patient.",
    "alert.unknownUpdate": "Unknown error updating patient.",
    "alert.unknownEvolution": "Unknown error registering evolution.",
    "alert.successCreate": "Patient successfully registered!",
    "alert.successUpdate": "Patient successfully updated!",
    "alert.successEvolution": "Evolution saved and sent to RabbitMQ queue!",
    "alert.successEvoUpdate": "Evolution successfully updated!",
    "alert.deleteConfirm": "Are you sure you want to delete this evolution?",
    "alert.deleteError": "Error deleting evolution.",
    
    // Loading
    "loading.data": "Loading data...",
    "loading.notFound": "Patient not found.",
    "loading.evoNotFound": "Evolution not found."
  }
};

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("PT");

  useEffect(() => {
    const savedLang = localStorage.getItem("language") as Language;
    if (savedLang === "PT" || savedLang === "EN") {
      setLanguage(savedLang);
    }
  }, []);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    // @ts-ignore
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
