// Inicializar IRONGATE
if (typeof IRONGATE === 'function') {
    IRONGATE();
}

// Importar funções da API
import { fetchGradeData, getToken, getAdminId, uploadCSV, filtrarDocentes } from './fetchfunctions/fetchGrade.js';

document.addEventListener('DOMContentLoaded', function() {
    // Adicionar link para o CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/public/css/grade-horarios.css';
    document.head.appendChild(link);

    // URL base da API
    const API_URL = 'https://errorsquad-server.onrender.com';

    // Objeto para armazenar os dados da grade
    let gradeData = {
        dias: [],
        horarios: [],
        cursos: [],
        turnos: [],
        periodos: [],
        docente: []
    };

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

    // Função para buscar e processar os dados da grade
    async function buscarDadosGrade() {
        try {
            const dadosGrade = await fetchGradeData();
            if (dadosGrade) {
                // Atualizar o objeto gradeData com os dados recebidos
                gradeData = {
                    dias: dadosGrade.dias || [],
                    horarios: dadosGrade.horarios || [],
                    cursos: dadosGrade.cursos || [],
                    turnos: dadosGrade.turnos || [],
                    periodos: dadosGrade.periodos || [],
                    docente: dadosGrade.docente || []
                };

                console.log('Grade data atualizado:', gradeData);
                atualizarFiltros();
                preencherGrade();
                atualizarListaDocentes();
            } else {
                showErrorToast('Dados não encontrados na resposta da API');
            }
        } catch (error) {
            console.error('Erro ao carregar a grade:', error);
            showErrorToast('Erro ao carregar a grade de horários. Por favor, tente novamente mais tarde.');
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

        // Limpar e preencher o select de níveis
        nivelSelect.innerHTML = '';
        const niveis = [...new Set(gradeData.periodos
            .map(p => p.nivel_semestre)
            .filter(n => n)
            .sort((a, b) => parseInt(a) - parseInt(b)))];
        if (niveis.length > 0) {
            niveis.forEach(nivel => {
                const option = document.createElement('option');
                option.value = nivel;
                option.textContent = `${nivel}º Nível`;
                nivelSelect.appendChild(option);
            });
        } else {
            console.warn('Nenhum nível encontrado nos dados');
            nivelSelect.innerHTML = `
                <option value="1">1º Nível</option>
                <option value="2">2º Nível</option>
                <option value="3">3º Nível</option>
                <option value="4">4º Nível</option>
                <option value="5">5º Nível</option>
                <option value="6">6º Nível</option>
            `;
        }

        // Limpar e preencher o select de turnos sempre com todos os turnos do backend
        turnoSelect.innerHTML = '';
        if (gradeData.turnos && gradeData.turnos.length > 0) {
            gradeData.turnos.forEach(turno => {
                const option = document.createElement('option');
                option.value = turno.nome.toLowerCase();
                option.textContent = `Período ${turno.nome}`;
                turnoSelect.appendChild(option);
            });
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

    // Função para atualizar a lista de docentes
    function atualizarListaDocentes() {
        try {
            const cursoSelecionado = document.querySelector('.btn-secondary:nth-child(1)').value;
            const nivelSelecionado = document.querySelector('.btn-secondary:nth-child(2)').value;
            const turnoSelecionado = document.querySelector('.btn-secondary:nth-child(3)').value.toLowerCase();

            // Filtrar docentes usando a função do fetchGrade.js
            const docentesFiltrados = filtrarDocentes(
                gradeData.docente,
                gradeData.periodos,
                cursoSelecionado,
                nivelSelecionado,
                turnoSelecionado
            );

            const docentesTable = document.querySelector('.docentes-table tbody');
            docentesTable.innerHTML = '';
            
            if (docentesFiltrados.length > 0) {
                docentesFiltrados.forEach(docente => {
                    const corDocente = (docente.cor && docente.cor.toLowerCase() !== '#ffffff') ? docente.cor : '#ffffff';
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>
                            <div class="docente-item" style="background-color: ${corDocente}">
                                ${docente.nome}
                            </div>
                        </td>
                    `;
                    docentesTable.appendChild(tr);
                });
            } else {
                const tr = document.createElement('tr');
                tr.innerHTML = '<td>Nenhum docente encontrado</td>';
                docentesTable.appendChild(tr);
            }
        } catch (error) {
            console.error('Erro ao atualizar lista de docentes:', error);
            showErrorToast('Erro ao carregar lista de docentes');
        }
    }

    // Função para preencher a grade com as aulas
    function preencherGrade() {
        console.log('Preenchendo grade com dados:', gradeData);
        const cursoSelecionado = document.querySelector('.btn-secondary:nth-child(1)').value.toUpperCase();
        const nivelSelecionado = document.querySelector('.btn-secondary:nth-child(2)').value;
        const turnoSelecionado = document.querySelector('.btn-secondary:nth-child(3)').value.toLowerCase();

        console.log('Filtros selecionados:', {
            curso: cursoSelecionado,
            nivel: nivelSelecionado,
            turno: turnoSelecionado
        });

        // Usar apenas dias e horários únicos
        const diasGrade = diasUnicos(gradeData.dias || []);
        // Ordenar os dias na ordem correta da semana
        const ordemDias = ['segunda', 'terca', 'terça', 'quarta', 'quinta', 'sexta', 'sabado', 'sábado', 'domingo'];
        diasGrade.sort((a, b) => {
            return ordemDias.indexOf(a.nome.toLowerCase()) - ordemDias.indexOf(b.nome.toLowerCase());
        });
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
            // Garantir que os valores sejam strings e estejam no formato correto
            const siglaCurso = String(periodo.sigla_curso || '').toUpperCase().trim();
            const nivelSemestre = String(periodo.nivel_semestre || '').trim();
            const nomeTurno = String(periodo.nome_turno || '').toLowerCase().trim();
            
            // Verificar cada condição separadamente para debug
            const cursoMatch = siglaCurso === cursoSelecionado;
            const nivelMatch = nivelSemestre === nivelSelecionado;
            const turnoMatch = nomeTurno === turnoSelecionado;
            
            const match = cursoMatch && nivelMatch && turnoMatch;

            // Log detalhado apenas para períodos que têm pelo menos uma correspondência
            if (cursoMatch || nivelMatch || turnoMatch) {
                console.log('Comparando período:', {
                    periodo: periodo,
                    siglaCurso,
                    nivelSemestre,
                    nomeTurno,
                    cursoSelecionado,
                    nivelSelecionado,
                    turnoSelecionado,
                    cursoMatch,
                    nivelMatch,
                    turnoMatch,
                    match
                });
            }
           
            return match;
        });

        console.log('Períodos filtrados:', periodosFiltrados);

        // Renderizar todas as células
        horariosGrade.forEach((horario, horarioIndex) => {
            diasGrade.forEach((dia, diaIndex) => {
                const cell = document.querySelector(`td[data-dia="${diaIndex + 1}"][data-horario="${horarioIndex}"]`);
                if (cell) {
                    // Procurar se existe um período para este dia/horário
                    const periodo = periodosFiltrados.find(periodo => {
                        const nomeDia = (periodo.nome_dia || '').toLowerCase();
                        const hrInicio = periodo.hr_inicio?.value || periodo.hr_inicio || '';
                        const hrFim = periodo.hr_fim?.value || periodo.hr_fim || '';
                        const hInicio = horario.hr_inicio?.value || horario.hr_inicio;
                        const hFim = horario.hr_fim?.value || horario.hr_fim;
                        
                        const diaMatch = nomeDia === dia.nome.toLowerCase();
                        const horarioMatch = hrInicio === hInicio && hrFim === hFim;
                        
                        if (diaMatch && horarioMatch) {
                            console.log('Encontrou período para célula:', {
                                dia: dia.nome,
                                horario: `${hInicio} - ${hFim}`,
                                periodo: periodo
                            });
                        }
                        
                        return diaMatch && horarioMatch;
                    });

                    if (periodo) {
                        // Encontrar o docente para obter a cor (case-insensitive, trim)
                        const docente = gradeData.docente.find(d => d.nome && periodo.nome_docente && d.nome.trim().toLowerCase() === periodo.nome_docente.trim().toLowerCase());
                        const corDocente = docente?.cor || '#ffffff';

                        cell.innerHTML = `
                            <div class="aula-item" style="background-color: ${corDocente}">
                                <strong>${periodo.nome_disciplina || 'Disciplina não definida'}</strong>
                                <p>${periodo.nome_docente || 'Docente não definido'}</p>
                                <small>${periodo.nome_ambiente || 'Ambiente não definido'}</small>
                            </div>
                        `;
                        cell.classList.add('celula-preenchida');
                        cell.onclick = () => abrirModalEdicao(cell, periodo);
                    } else {
                        cell.innerHTML = '';
                        cell.classList.remove('celula-preenchida');
                        cell.onclick = () => abrirModalEdicao(cell);
                    }
                }
            });
        });

        // Atualizar a lista de docentes
        atualizarListaDocentes();
    }

    // Função para exportar grade para CSV
    async function exportarParaCSV() {
        try {
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
                csv += `${periodo.nome_dia},${periodo.hr_inicio?.value || periodo.hr_inicio},${periodo.hr_fim?.value || periodo.hr_fim},${periodo.nome_disciplina},${periodo.nome_docente},${periodo.nome_ambiente}\n`;
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
        } catch (error) {
            console.error('Erro ao exportar CSV:', error);
            showErrorToast('Erro ao exportar grade para CSV');
        }
    }

    // Função para importar CSV
    async function importarCSV(file) {
        try {
            const result = await uploadCSV(file);
            if (result) {
                showErrorToast('CSV importado com sucesso!');
                // Recarregar os dados da grade
                await buscarDadosGrade();
            }
        } catch (error) {
            console.error('Erro ao importar CSV:', error);
            showErrorToast('Erro ao importar CSV');
        }
    }

    // Adicionar botão de importar CSV ao lado do botão de exportar CSV
    const exportBtn = document.querySelector('.btn-primary');
    if (exportBtn) {
        // Criar botão de importar
        const importBtn = document.createElement('button');
        importBtn.id = 'btn-importar-csv';
        importBtn.className = 'btn btn-secondary';
        importBtn.innerHTML = '<i class="fas fa-file-arrow-up"></i> Importar CSV';
        exportBtn.parentNode.insertBefore(importBtn, exportBtn.nextSibling);

        // Criar input de arquivo oculto
        const inputCSV = document.createElement('input');
        inputCSV.type = 'file';
        inputCSV.id = 'input-csv';
        inputCSV.accept = '.csv';
        inputCSV.style.display = 'none';
        exportBtn.parentNode.insertBefore(inputCSV, importBtn.nextSibling);

        // Criar feedback visual
        const feedback = document.createElement('span');
        feedback.id = 'csv-feedback';
        feedback.style.marginLeft = '10px';
        feedback.style.fontWeight = '500';
        exportBtn.parentNode.insertBefore(feedback, inputCSV.nextSibling);

        // Evento do botão de importar
        importBtn.addEventListener('click', () => {
            inputCSV.value = '';
            inputCSV.click();
        });

        // Evento do input de arquivo
        inputCSV.addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (file) {
                feedback.textContent = 'Enviando...';
                feedback.style.color = '#b71c1c';
                try {
                    await importarCSV(file);
                    feedback.textContent = 'CSV importado com sucesso!';
                    feedback.style.color = 'green';
                } catch (err) {
                    feedback.textContent = 'Erro ao importar CSV!';
                    feedback.style.color = 'red';
                }
                setTimeout(() => feedback.textContent = '', 4000);
            }
        });
    }

    // Adicionar event listeners para os filtros
    document.querySelector('.btn-secondary:nth-child(1)').addEventListener('change', () => {
        preencherGrade();
        atualizarListaDocentes();
    });
    document.querySelector('.btn-secondary:nth-child(2)').addEventListener('change', () => {
        preencherGrade();
        atualizarListaDocentes();
    });
    document.querySelector('.btn-secondary:nth-child(3)').addEventListener('change', () => {
        preencherGrade();
        atualizarListaDocentes();
    });

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
    buscarDadosGrade();
}); 