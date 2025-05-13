// Inicializar IRONGATE
if (typeof IRONGATE === 'function') {
    IRONGATE();
}

document.addEventListener('DOMContentLoaded', function() {
    // Adicionar link para o CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/public/css/grade-horarios.css';
    document.head.appendChild(link);

    // URL base da API
    const API_URL = 'https://errorsquad-server.onrender.com';

    // Função para obter o token
    function getToken() {
        return localStorage.getItem('token');
    }

    // Função para obter o ID do admin
    function getAdminId() {
        return localStorage.getItem('userId');
    }

    // Objeto para armazenar os dados da grade
    let gradeData = {
        dias: [],
        horarios: [],
        cursos: [],
        turnos: [],
        periodos: []
    };

    // Função para buscar os dados da API
    async function fetchGradeData() {
        try {
            const token = getToken();
            if (!token) {
                window.location.href = '/public/login.html';
                return;
            }

            console.log('Buscando dados da grade...');
            const response = await fetch(`${API_URL}/admin/${getAdminId()}/grade`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (!response.ok) {
                if (response.status === 401) {
                    localStorage.removeItem('token');
                    window.location.href = '/public/login.html';
                    return;
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new TypeError("A resposta não é um JSON válido!");
            }

            const result = await response.json();
            console.log('Resposta da API:', result);
            
            if (result.data && Array.isArray(result.data) && result.data.length > 0) {
                // O primeiro item do array contém todos os dados
                const dadosGrade = result.data[0];
                console.log('Dados da grade:', dadosGrade);

                // Atualizar o objeto gradeData com os dados recebidos
                gradeData = {
                    dias: dadosGrade.dias || [],
                    horarios: dadosGrade.horarios || [],
                    cursos: dadosGrade.cursos || [],
                    turnos: dadosGrade.turnos || [],
                    periodos: dadosGrade.periodos || []
                };

                console.log('Grade data atualizado:', gradeData);
                atualizarFiltros();
                preencherGrade();
        } else {
                console.error('Erro: Dados não encontrados na resposta');
                showErrorToast('Dados não encontrados na resposta da API');
            }
        } catch (error) {
            console.error('Erro ao buscar dados da grade:', error);
            showErrorToast('Erro ao carregar a grade de horários. Por favor, tente novamente mais tarde.');
        }
    }

    // Função para mostrar mensagem de erro
    function showErrorToast(message) {
        const toastContainer = document.querySelector('.toast-container');
        if (toastContainer) {
        const toast = document.createElement('div');
            toast.className = 'toast error';
        toast.innerHTML = `
                <i class="fas fa-exclamation-circle"></i>
                <span>${message}</span>
        `;
        toastContainer.appendChild(toast);
            setTimeout(() => toast.remove(), 5000);
        }
    }

    // Função para atualizar os filtros com os dados da API
    function atualizarFiltros() {
        console.log('Atualizando filtros com dados:', gradeData);
        const cursoSelect = document.querySelector('.btn-secondary:nth-child(1)');
        const nivelSelect = document.querySelector('.btn-secondary:nth-child(2)');
        const turnoSelect = document.querySelector('.btn-secondary:nth-child(3)');

        // Limpar e preencher o select de cursos
        cursoSelect.innerHTML = '';
        if (gradeData.cursos && gradeData.cursos.length > 0) {
            gradeData.cursos.forEach(curso => {
                const option = document.createElement('option');
                option.value = curso.sigla.toUpperCase();
                option.textContent = curso.nome;
                cursoSelect.appendChild(option);
            });
        } else {
            console.warn('Nenhum curso encontrado nos dados');
            // Adicionar opções padrão
            cursoSelect.innerHTML = `
                <option value="DSM">DSM</option>
                <option value="GEO">GEO</option>
                <option value="MAR">MAR</option>
            `;
        }

        // Limpar e preencher o select de níveis (mantendo os 3 níveis fixos)
        nivelSelect.innerHTML = `
            <option value="1">1º Nível</option>
            <option value="2">2º Nível</option>
            <option value="3">3º Nível</option>
        `;

        // Limpar e preencher o select de turnos
        turnoSelect.innerHTML = '';
        if (gradeData.turnos && gradeData.turnos.length > 0) {
            gradeData.turnos.forEach(turno => {
                const option = document.createElement('option');
                option.value = turno.nome.toLowerCase();
                option.textContent = `Período ${turno.nome}`;
                turnoSelect.appendChild(option);
            });
        } else {
            console.warn('Nenhum turno encontrado nos dados');
            // Adicionar opções padrão
            turnoSelect.innerHTML = `
                <option value="noturno">Período Noturno</option>
                <option value="matutino">Período Matutino</option>
                <option value="vespertino">Período Vespertino</option>
            `;
        }
    }

    // Função para criar o modal de edição
    function criarModalEdicao() {
        let modal = document.getElementById('modal-edicao');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'modal-edicao';
            modal.style.display = 'none';
            modal.innerHTML = `
                <div class="modal-content">
                    <h3>Editar Célula</h3>
                    <form id="form-edicao">
                        <div>
                            <label>Disciplina:</label>
                            <input type="text" name="disciplina" class="form-control" required />
                        </div>
                        <div>
                            <label>Docente:</label>
                            <input type="text" name="docente" class="form-control" required />
                        </div>
                        <div>
                            <label>Ambiente:</label>
                            <input type="text" name="ambiente" class="form-control" />
                        </div>
                        <div class="botoes-modal">
                            <button type="button" id="fechar-modal" class="btn-cancelar">Cancelar</button>
                            <button type="submit" class="btn-salvar">Salvar</button>
                        </div>
                    </form>
                </div>
            `;
            document.body.appendChild(modal);
        }
        return modal;
    }

    // Função para abrir o modal de edição
    function abrirModalEdicao(cell, dadosAtuais = {}) {
        const modal = criarModalEdicao();
        modal.style.display = 'block';
        const form = modal.querySelector('#form-edicao');
        form.disciplina.value = dadosAtuais.nome_disciplina || '';
        form.docente.value = dadosAtuais.nome_docente || '';
        form.ambiente.value = dadosAtuais.nome_ambiente || '';

        // Ao submeter, atualiza a célula
        form.onsubmit = function(e) {
            e.preventDefault();
            cell.innerHTML = `
                <div class="aula-item">
                    <strong>${form.disciplina.value}</strong>
                    <p>${form.docente.value}</p>
                    <small>${form.ambiente.value}</small>
                </div>
            `;
            modal.style.display = 'none';
        };
        // Botão cancelar
        modal.querySelector('#fechar-modal').onclick = function() {
            modal.style.display = 'none';
        };
    }

    // Função utilitária para remover duplicados de dias pelo nome
    function diasUnicos(dias) {
        const nomesVistos = new Set();
        return dias.filter(dia => {
            if (!dia.nome || nomesVistos.has(dia.nome)) return false;
            nomesVistos.add(dia.nome);
            return true;
        });
    }

    // Função utilitária para remover duplicados de horários pelo par hr_inicio/hr_fim
    function horariosUnicos(horarios) {
        const vistos = new Set();
        return horarios.filter(horario => {
            const inicio = horario.hr_inicio?.value || horario.hr_inicio;
            const fim = horario.hr_fim?.value || horario.hr_fim;
            const chave = `${inicio}-${fim}`;
            if (vistos.has(chave)) return false;
            vistos.add(chave);
            return true;
        });
    }

    // Função para montar dinamicamente a tabela de horários
    function montarTabelaGrade(diasGrade, horariosGrade) {
        const tbody = document.querySelector('.grade-table tbody');
        if (!tbody) return;
        tbody.innerHTML = '';
        horariosGrade.forEach((horario, horarioIndex) => {
            const tr = document.createElement('tr');
            // Primeira célula: horário
            const tdHorario = document.createElement('td');
            const hInicio = horario.hr_inicio?.value || horario.hr_inicio;
            const hFim = horario.hr_fim?.value || horario.hr_fim;
            tdHorario.textContent = `${hInicio} às ${hFim}`;
            tr.appendChild(tdHorario);
            // Células dos dias
            diasGrade.forEach((dia, diaIndex) => {
                const td = document.createElement('td');
                td.setAttribute('data-dia', diaIndex + 1);
                td.setAttribute('data-horario', horarioIndex);
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });
    }

    // Função para filtrar e ordenar horários conforme o turno selecionado
    function filtrarHorariosPorTurno(horarios, turno) {
        let filtrados = horarios;
        if (turno === 'noturno') {
            filtrados = horarios.filter(horario => {
                const inicio = horario.hr_inicio?.value || horario.hr_inicio;
                return inicio >= '18:45:00' && inicio <= '23:05:00';
            });
        } else if (turno === 'matutino') {
            filtrados = horarios.filter(horario => {
                const inicio = horario.hr_inicio?.value || horario.hr_inicio;
                return inicio >= '07:30:00' && inicio <= '12:50:00';
            });
        }
        // Ordenar do mais cedo para o mais tarde
        filtrados.sort((a, b) => {
            const aInicio = a.hr_inicio?.value || a.hr_inicio;
            const bInicio = b.hr_inicio?.value || b.hr_inicio;
            return aInicio.localeCompare(bInicio);
        });
        return filtrados;
    }

    // Função para preencher a grade com as aulas do curso selecionado
    function preencherGrade() {
        console.log('Preenchendo grade com dados:', gradeData);
        const cursoSelecionado = document.querySelector('.btn-secondary:nth-child(1)').value.toUpperCase();
        const nivelSelecionado = document.querySelector('.btn-secondary:nth-child(2)').value;
        const turnoSelecionado = document.querySelector('.btn-secondary:nth-child(3)').value.toLowerCase();

        console.log('Filtros selecionados:', { cursoSelecionado, nivelSelecionado, turnoSelecionado });

        // Usar apenas dias e horários únicos
        const diasGrade = diasUnicos(gradeData.dias || []);
        let horariosGrade = horariosUnicos(gradeData.horarios || []);

        // Filtrar horários conforme o turno selecionado
        horariosGrade = filtrarHorariosPorTurno(horariosGrade, turnoSelecionado);

        if (!diasGrade.length || !horariosGrade.length) {
            console.warn('Dias ou horários não encontrados nos dados');
            return;
        }

        // Montar a tabela dinamicamente
        montarTabelaGrade(diasGrade, horariosGrade);

        // Filtrar períodos pelo curso, nível e turno selecionados
        const periodosFiltrados = gradeData.periodos.filter(periodo => {
            const siglaCurso = (periodo.sigla_curso || '').toUpperCase();
            const nivelSemestre = (periodo.nivel_semestre || '').toString();
            const nomeTurno = (periodo.nome_turno || '').toLowerCase();
            return siglaCurso === cursoSelecionado &&
                   nivelSemestre === nivelSelecionado &&
                   nomeTurno === turnoSelecionado;
        });

        // Renderizar todas as células (mesmo sem dados)
        horariosGrade.forEach((horario, horarioIndex) => {
            diasGrade.forEach((dia, diaIndex) => {
                const cell = document.querySelector(`td[data-dia="${diaIndex + 1}"][data-horario="${horarioIndex}"]`);
                if (cell) {
                    // Procurar se existe um período para este dia/horário/turno/curso/nível
                    const periodo = periodosFiltrados.find(periodo => {
                        const nomeDia = (periodo.nome_dia || '').toLowerCase();
                        const hrInicio = periodo.hr_inicio?.value || periodo.hr_inicio || '';
                        const hrFim = periodo.hr_fim?.value || periodo.hr_fim || '';
                        const hInicio = horario.hr_inicio?.value || horario.hr_inicio;
                        const hFim = horario.hr_fim?.value || horario.hr_fim;
                        return nomeDia === dia.nome.toLowerCase() &&
                               hrInicio === hInicio &&
                               hrFim === hFim;
                    });
                    if (periodo && periodo.nome_disciplina && periodo.nome_docente) {
                        cell.innerHTML = `
                            <div class="aula-item">
                                <strong>${periodo.nome_disciplina}</strong>
                                <p>${periodo.nome_docente}</p>
                                <small>${periodo.nome_ambiente || ''}</small>
                            </div>
                        `;
                        cell.classList.add('celula-preenchida');
                        cell.onclick = () => abrirModalEdicao(cell, periodo);
                    } else {
                        // Célula vazia, mas editável
                        cell.innerHTML = '';
                        cell.classList.remove('celula-preenchida');
                        cell.onclick = () => abrirModalEdicao(cell);
                    }
                }
            });
        });

        // Atualizar a lista de docentes (apenas os preenchidos)
        const periodosPreenchidos = gradeData.periodos.filter(p => p.nome_docente);
        atualizarListaDocentes(periodosPreenchidos);
    }

    // Função para atualizar a lista de docentes
    function atualizarListaDocentes(periodos) {
        const docentesTable = document.querySelector('.docentes-table tbody');
        docentesTable.innerHTML = '';
        
        // Obter docentes únicos
        const docentesUnicos = [...new Set(periodos.map(p => p.nome_docente))];
        
        docentesUnicos.forEach(docente => {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${docente}</td>`;
            docentesTable.appendChild(tr);
        });
    }

    // Função para exportar grade para CSV
    function exportarParaCSV() {
        const cursoSelecionado = document.querySelector('.btn-secondary:nth-child(1)').value;
        const nivelSelecionado = document.querySelector('.btn-secondary:nth-child(2)').value;
        const turnoSelecionado = document.querySelector('.btn-secondary:nth-child(3)').value;

        // Filtrar os períodos
        const periodosFiltrados = gradeData.periodos.filter(periodo => 
            periodo.sigla_curso === cursoSelecionado && 
            periodo.nivel_semestre === nivelSelecionado &&
            periodo.nome_turno.toLowerCase() === turnoSelecionado
        );

        // Criar cabeçalho do CSV
        let csv = 'Dia,Hora Início,Hora Fim,Disciplina,Docente,Ambiente\n';

        // Adicionar dados
        periodosFiltrados.forEach(periodo => {
            csv += `${periodo.nome_dia},${periodo.hr_inicio},${periodo.hr_fim},${periodo.nome_disciplina},${periodo.nome_docente},${periodo.nome_ambiente}\n`;
        });

        // Criar blob e link para download
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        
        link.setAttribute('href', url);
        link.setAttribute('download', `grade_${cursoSelecionado}_${nivelSelecionado}_${turnoSelecionado}.csv`);
        link.style.visibility = 'hidden';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // Adicionar event listeners para os filtros
    document.querySelector('.btn-secondary:nth-child(1)').addEventListener('change', preencherGrade);
    document.querySelector('.btn-secondary:nth-child(2)').addEventListener('change', preencherGrade);
    document.querySelector('.btn-secondary:nth-child(3)').addEventListener('change', preencherGrade);

    // Adicionar event listener para o botão de exportar
    document.querySelector('.btn-primary').addEventListener('click', exportarParaCSV);

    // Preencher a tabela de horários
    const tbody = document.querySelector('.grade-table tbody');
    gradeData.horarios.forEach((horario, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${horario.hr_inicio} às ${horario.hr_fim}</td>
            <td data-dia="1" data-horario="${index}"></td>
            <td data-dia="2" data-horario="${index}"></td>
            <td data-dia="3" data-horario="${index}"></td>
            <td data-dia="4" data-horario="${index}"></td>
            <td data-dia="5" data-horario="${index}"></td>
        `;
        tbody.appendChild(tr);
    });

    // Buscar dados iniciais
    fetchGradeData();
}); 