const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export const api = {
  // --- Auxiliar para tratamento de erros ---
  async handleResponseError(res: Response, defaultMessage: string) {
    try {
      const errorData = await res.json();
      if (Array.isArray(errorData)) {
        // É um array de erros de validação (MethodArgumentNotValid)
        const mensagens = errorData.map((e: any) => `${e.campo}: ${e.mensagem}`).join('\n');
        throw new Error(mensagens);
      } else if (errorData.erro) {
        // É uma exceção de banco de dados ou regra de negócio customizada
        throw new Error(errorData.erro);
      }
    } catch (e) {
      if (e instanceof Error && e.message !== 'Failed to parse') {
        throw e;
      }
    }
    throw new Error(defaultMessage);
  },

  // --- Pacientes ---
  async getPacientes() {
    const res = await fetch(`${API_BASE_URL}/pacientes`, { cache: 'no-store' });
    if (!res.ok) await this.handleResponseError(res, 'Falha ao carregar pacientes');
    return res.json();
  },

  async getPaciente(id: string) {
    const res = await fetch(`${API_BASE_URL}/pacientes/${id}`, { cache: 'no-store' });
    if (!res.ok) await this.handleResponseError(res, 'Falha ao carregar paciente');
    return res.json();
  },

  async createPaciente(data: any) {
    const res = await fetch(`${API_BASE_URL}/pacientes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) await this.handleResponseError(res, 'Falha ao criar paciente');
    return res.json();
  },

  async updatePaciente(id: string, data: any) {
    const res = await fetch(`${API_BASE_URL}/pacientes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) await this.handleResponseError(res, 'Falha ao atualizar paciente');
    return res.json();
  },

  // --- Evoluções ---
  async getEvolucoes(pacienteId: string) {
    const res = await fetch(`${API_BASE_URL}/evolucoes/paciente/${pacienteId}`, { cache: 'no-store' });
    if (!res.ok) await this.handleResponseError(res, 'Falha ao carregar histórico clínico');
    return res.json();
  },

  async createEvolucao(pacienteId: string, data: any) {
    const res = await fetch(`${API_BASE_URL}/evolucoes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, pacienteId: Number(pacienteId) }),
    });
    if (!res.ok) await this.handleResponseError(res, 'Falha ao registrar evolução');
    return res.json();
  },

  async updateEvolucao(evolucaoId: string, data: any) {
    const res = await fetch(`${API_BASE_URL}/evolucoes/${evolucaoId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) await this.handleResponseError(res, 'Falha ao atualizar evolução');
    return res.json();
  },

  async deleteEvolucao(evolucaoId: string) {
    const res = await fetch(`${API_BASE_URL}/evolucoes/${evolucaoId}`, {
      method: 'DELETE',
    });
    if (!res.ok) await this.handleResponseError(res, 'Falha ao excluir evolução');
  },

  // --- IA Assistant ---
  async getAnaliseIa(pacienteId: string) {
    const res = await fetch(`${API_BASE_URL}/pacientes/${pacienteId}/ia-analise`, { cache: 'no-store' });
    if (!res.ok) await this.handleResponseError(res, 'Falha ao processar análise clínica com a IA');
    return res.json();
  }
};
