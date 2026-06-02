const API_BASE_URL = 'http://localhost:8080';

export const api = {
  // --- Pacientes ---
  async getPacientes() {
    const res = await fetch(`${API_BASE_URL}/pacientes`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Falha ao carregar pacientes');
    return res.json();
  },

  async getPaciente(id: string) {
    const res = await fetch(`${API_BASE_URL}/pacientes/${id}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Falha ao carregar paciente');
    return res.json();
  },

  async createPaciente(data: any) {
    const res = await fetch(`${API_BASE_URL}/pacientes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Falha ao criar paciente');
    return res.json();
  },

  async updatePaciente(id: string, data: any) {
    const res = await fetch(`${API_BASE_URL}/pacientes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Falha ao atualizar paciente');
    return res.json();
  },

  // --- Evoluções ---
  async getEvolucoes(pacienteId: string) {
    const res = await fetch(`${API_BASE_URL}/evolucoes/paciente/${pacienteId}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Falha ao carregar evoluções');
    return res.json();
  },

  async createEvolucao(pacienteId: string, data: any) {
    const res = await fetch(`${API_BASE_URL}/evolucoes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, pacienteId: Number(pacienteId) }),
    });
    if (!res.ok) throw new Error('Falha ao registrar evolução');
    return res.json();
  },

  async updateEvolucao(evolucaoId: string, data: any) {
    const res = await fetch(`${API_BASE_URL}/evolucoes/${evolucaoId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Falha ao atualizar evolução');
    return res.json();
  },

  async deleteEvolucao(evolucaoId: string) {
    const res = await fetch(`${API_BASE_URL}/evolucoes/${evolucaoId}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Falha ao excluir evolução');
  }
};
