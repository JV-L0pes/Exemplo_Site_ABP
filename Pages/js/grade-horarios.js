document.addEventListener('DOMContentLoaded', function() {
    // Dados de exemplo (posteriormente serão carregados da API)
    const horarios = [
        { inicio: '18:45', fim: '19:35' },
        { inicio: '19:35', fim: '20:25' },
        { inicio: '20:25', fim: '21:15' },
        { inicio: '21:25', fim: '22:15' },
        { inicio: '22:15', fim: '23:05' }
    ];

    // Disciplinas para DSM (1° nível)
    const disciplinasDSM = [
        { id: 1, nome: 'Algoritmos e Lógica de Programação', tipo: 'tecnicas', professor: 'Prof. Esp. Henrique Duarte Borges Louro' },
        { id: 2, nome: 'Desenvolvimento Web I', tipo: 'desenvolvimento', professor: 'Prof. Dr. Arley Ferreira de Souza' },
        { id: 3, nome: 'Matemática para Computação', tipo: 'matematica', professor: 'Prof. Dr. Fabrício Galende Marques de Carvalho' },
        { id: 4, nome: 'Design Digital', tipo: 'estrutura', professor: 'Prof. Esp. André Olímpio' },
        { id: 5, nome: 'Engenharia de Software I', tipo: 'engenharia', professor: 'Prof. Esp. Henrique Duarte Borges Louro' },
        { id: 6, nome: 'Sistemas Operacionais', tipo: 'bd', professor: 'Profa. Esp. Lucineide Nunes Pimenta' }
    ];

    // Disciplinas para DSM (2° nível)
    const disciplinasDSM2 = [
        { id: 7, nome: 'Programação Orientada a Objetos', tipo: 'tecnicas', professor: 'Prof. Esp. Henrique Duarte Borges Louro' },
        { id: 8, nome: 'Desenvolvimento Web II', tipo: 'desenvolvimento', professor: 'Prof. Dr. Arley Ferreira de Souza' },
        { id: 9, nome: 'Banco de Dados', tipo: 'matematica', professor: 'Prof. Dr. Fabrício Galende Marques de Carvalho' },
        { id: 10, nome: 'Estrutura de Dados', tipo: 'estrutura', professor: 'Prof. Esp. André Olímpio' },
        { id: 11, nome: 'Engenharia de Software II', tipo: 'engenharia', professor: 'Prof. Esp. Henrique Duarte Borges Louro' },
        { id: 12, nome: 'Redes de Computadores', tipo: 'bd', professor: 'Profa. Esp. Lucineide Nunes Pimenta' }
    ];

    // Disciplinas para DSM (3° nível)
    const disciplinasDSM3 = [
        { id: 13, nome: 'Desenvolvimento Mobile', tipo: 'tecnicas', professor: 'Prof. Esp. Henrique Duarte Borges Louro' },
        { id: 14, nome: 'Programação Web Avançada', tipo: 'desenvolvimento', professor: 'Prof. Dr. Arley Ferreira de Souza' },
        { id: 15, nome: 'Inteligência Artificial', tipo: 'matematica', professor: 'Prof. Dr. Fabrício Galende Marques de Carvalho' },
        { id: 16, nome: 'Cloud Computing', tipo: 'estrutura', professor: 'Prof. Esp. André Olímpio' },
        { id: 17, nome: 'DevOps', tipo: 'engenharia', professor: 'Prof. Esp. Henrique Duarte Borges Louro' },
        { id: 18, nome: 'Segurança da Informação', tipo: 'bd', professor: 'Profa. Esp. Lucineide Nunes Pimenta' }
    ];

    // Disciplinas para GEO (1° nível)
    const disciplinasGEO = [
        { id: 19, nome: 'Cartografia Básica', tipo: 'tecnicas', professor: 'Prof. Dr. João Silva' },
        { id: 20, nome: 'Geologia Introdutória', tipo: 'desenvolvimento', professor: 'Profa. Dra. Maria Santos' },
        { id: 21, nome: 'Matemática Aplicada', tipo: 'matematica', professor: 'Prof. Dr. Fabrício Galende Marques de Carvalho' },
        { id: 22, nome: 'Topografia I', tipo: 'estrutura', professor: 'Prof. Dr. Pedro Oliveira' },
        { id: 23, nome: 'Sensoriamento Remoto', tipo: 'engenharia', professor: 'Profa. Dra. Ana Costa' },
        { id: 24, nome: 'Sistemas de Inf. Geográfica', tipo: 'bd', professor: 'Prof. Dr. Carlos Mendes' }
    ];

    // Disciplinas para GEO (2° nível)
    const disciplinasGEO2 = [
        { id: 25, nome: 'Cartografia Digital', tipo: 'tecnicas', professor: 'Prof. Dr. João Silva' },
        { id: 26, nome: 'Geoprocessamento', tipo: 'desenvolvimento', professor: 'Profa. Dra. Maria Santos' },
        { id: 27, nome: 'Topografia II', tipo: 'matematica', professor: 'Prof. Dr. Fabrício Galende Marques de Carvalho' },
        { id: 28, nome: 'Geodésia', tipo: 'estrutura', professor: 'Prof. Dr. Pedro Oliveira' },
        { id: 29, nome: 'Fotogrametria', tipo: 'engenharia', professor: 'Profa. Dra. Ana Costa' },
        { id: 30, nome: 'SIG Avançado', tipo: 'bd', professor: 'Prof. Dr. Carlos Mendes' }
    ];

    // Disciplinas para GEO (3° nível)
    const disciplinasGEO3 = [
        { id: 31, nome: 'Geomática', tipo: 'tecnicas', professor: 'Prof. Dr. João Silva' },
        { id: 32, nome: 'Sensoriamento Remoto Avançado', tipo: 'desenvolvimento', professor: 'Profa. Dra. Maria Santos' },
        { id: 33, nome: 'Análise Espacial', tipo: 'matematica', professor: 'Prof. Dr. Fabrício Galende Marques de Carvalho' },
        { id: 34, nome: 'Geomarketing', tipo: 'estrutura', professor: 'Prof. Dr. Pedro Oliveira' },
        { id: 35, nome: 'Geoinformação', tipo: 'engenharia', professor: 'Profa. Dra. Ana Costa' },
        { id: 36, nome: 'Geotecnologias', tipo: 'bd', professor: 'Prof. Dr. Carlos Mendes' }
    ];

    // Disciplinas para MAR (1° nível)
    const disciplinasMAR = [
        { id: 37, nome: 'Introdução ao Meio Ambiente', tipo: 'tecnicas', professor: 'Prof. Dr. Roberto Lima' },
        { id: 38, nome: 'Climatologia Básica', tipo: 'desenvolvimento', professor: 'Profa. Dra. Juliana Martins' },
        { id: 39, nome: 'Matemática Aplicada', tipo: 'matematica', professor: 'Prof. Dr. Fabrício Galende Marques de Carvalho' },
        { id: 40, nome: 'Geologia Básica', tipo: 'estrutura', professor: 'Prof. Dr. Fernando Costa' },
        { id: 41, nome: 'Recursos Hídricos', tipo: 'engenharia', professor: 'Prof. Dr. Ricardo Santos' },
        { id: 42, nome: 'Sistemas Ambientais', tipo: 'bd', professor: 'Profa. Dra. Patricia Oliveira' }
    ];

    // Disciplinas para MAR (2° nível)
    const disciplinasMAR2 = [
        { id: 43, nome: 'Gestão de Recursos Hídricos', tipo: 'tecnicas', professor: 'Prof. Dr. Roberto Lima' },
        { id: 44, nome: 'Climatologia e Meteorologia', tipo: 'desenvolvimento', professor: 'Profa. Dra. Juliana Martins' },
        { id: 45, nome: 'Hidrologia Aplicada', tipo: 'matematica', professor: 'Prof. Dr. Fabrício Galende Marques de Carvalho' },
        { id: 46, nome: 'Geologia Ambiental', tipo: 'estrutura', professor: 'Prof. Dr. Fernando Costa' },
        { id: 47, nome: 'Saneamento Ambiental', tipo: 'engenharia', professor: 'Prof. Dr. Ricardo Santos' },
        { id: 48, nome: 'Legislação Ambiental', tipo: 'bd', professor: 'Profa. Dra. Patricia Oliveira' }
    ];

    // Disciplinas para MAR (3° nível)
    const disciplinasMAR3 = [
        { id: 49, nome: 'Gestão de Bacias Hidrográficas', tipo: 'tecnicas', professor: 'Prof. Dr. Roberto Lima' },
        { id: 50, nome: 'Recuperação de Áreas Degradadas', tipo: 'desenvolvimento', professor: 'Profa. Dra. Juliana Martins' },
        { id: 51, nome: 'Qualidade da Água', tipo: 'matematica', professor: 'Prof. Dr. Fabrício Galende Marques de Carvalho' },
        { id: 52, nome: 'Sistemas de Gestão Ambiental', tipo: 'estrutura', professor: 'Prof. Dr. Fernando Costa' },
        { id: 53, nome: 'Energias Renováveis', tipo: 'engenharia', professor: 'Prof. Dr. Ricardo Santos' },
        { id: 54, nome: 'Gestão de Resíduos', tipo: 'bd', professor: 'Profa. Dra. Patricia Oliveira' }
    ];

    const salas = [
        { id: 1, nome: 'Sala 101', tipo: 'sala' },
        { id: 2, nome: 'Lab 01', tipo: 'laboratorio' },
        { id: 3, nome: 'Lab 02', tipo: 'laboratorio' },
        { id: 4, nome: 'Sala 102', tipo: 'sala' },
        { id: 5, nome: 'Lab 03', tipo: 'laboratorio' },
        { id: 6, nome: 'Sala 103', tipo: 'sala' }
    ];

    // Grade de horários para DSM (1° nível)
    const aulasDSM = [
        { dia: 1, horario: 0, disciplina: disciplinasDSM[0] }, // Segunda, 18:45
        { dia: 1, horario: 1, disciplina: disciplinasDSM[0] }, // Segunda, 19:35
        { dia: 1, horario: 2, disciplina: disciplinasDSM[0] }, // Segunda, 20:25
        { dia: 1, horario: 3, disciplina: disciplinasDSM[3] }, // Segunda, 21:25
        { dia: 1, horario: 4, disciplina: disciplinasDSM[3] }, // Segunda, 22:15

        { dia: 2, horario: 0, disciplina: disciplinasDSM[1] }, // Terça
        { dia: 2, horario: 1, disciplina: disciplinasDSM[1] },
        { dia: 2, horario: 2, disciplina: disciplinasDSM[1] },
        { dia: 2, horario: 3, disciplina: disciplinasDSM[4] },
        { dia: 2, horario: 4, disciplina: disciplinasDSM[4] },

        { dia: 3, horario: 0, disciplina: disciplinasDSM[2] }, // Quarta
        { dia: 3, horario: 1, disciplina: disciplinasDSM[2] },
        { dia: 3, horario: 2, disciplina: disciplinasDSM[2] },
        { dia: 3, horario: 3, disciplina: disciplinasDSM[5] },
        { dia: 3, horario: 4, disciplina: disciplinasDSM[5] },

        { dia: 4, horario: 0, disciplina: disciplinasDSM[3] }, // Quinta
        { dia: 4, horario: 1, disciplina: disciplinasDSM[3] },
        { dia: 4, horario: 2, disciplina: disciplinasDSM[3] },
        { dia: 4, horario: 3, disciplina: disciplinasDSM[0] },
        { dia: 4, horario: 4, disciplina: disciplinasDSM[0] },

        { dia: 5, horario: 0, disciplina: disciplinasDSM[4] }, // Sexta
        { dia: 5, horario: 1, disciplina: disciplinasDSM[4] },
        { dia: 5, horario: 2, disciplina: disciplinasDSM[4] },
        { dia: 5, horario: 3, disciplina: disciplinasDSM[1] },
        { dia: 5, horario: 4, disciplina: disciplinasDSM[1] }
    ];

    // Grade de horários para DSM (2° nível)
    const aulasDSM2 = [
        { dia: 1, horario: 0, disciplina: disciplinasDSM2[0] },
        { dia: 1, horario: 1, disciplina: disciplinasDSM2[0] },
        { dia: 1, horario: 2, disciplina: disciplinasDSM2[0] },
        { dia: 1, horario: 3, disciplina: disciplinasDSM2[3] },
        { dia: 1, horario: 4, disciplina: disciplinasDSM2[3] },

        { dia: 2, horario: 0, disciplina: disciplinasDSM2[1] },
        { dia: 2, horario: 1, disciplina: disciplinasDSM2[1] },
        { dia: 2, horario: 2, disciplina: disciplinasDSM2[1] },
        { dia: 2, horario: 3, disciplina: disciplinasDSM2[4] },
        { dia: 2, horario: 4, disciplina: disciplinasDSM2[4] },

        { dia: 3, horario: 0, disciplina: disciplinasDSM2[2] },
        { dia: 3, horario: 1, disciplina: disciplinasDSM2[2] },
        { dia: 3, horario: 2, disciplina: disciplinasDSM2[2] },
        { dia: 3, horario: 3, disciplina: disciplinasDSM2[5] },
        { dia: 3, horario: 4, disciplina: disciplinasDSM2[5] },

        { dia: 4, horario: 0, disciplina: disciplinasDSM2[3] },
        { dia: 4, horario: 1, disciplina: disciplinasDSM2[3] },
        { dia: 4, horario: 2, disciplina: disciplinasDSM2[3] },
        { dia: 4, horario: 3, disciplina: disciplinasDSM2[0] },
        { dia: 4, horario: 4, disciplina: disciplinasDSM2[0] },

        { dia: 5, horario: 0, disciplina: disciplinasDSM2[4] },
        { dia: 5, horario: 1, disciplina: disciplinasDSM2[4] },
        { dia: 5, horario: 2, disciplina: disciplinasDSM2[4] },
        { dia: 5, horario: 3, disciplina: disciplinasDSM2[1] },
        { dia: 5, horario: 4, disciplina: disciplinasDSM2[1] }
    ];

    // Grade de horários para DSM (3° nível)
    const aulasDSM3 = [
        { dia: 1, horario: 0, disciplina: disciplinasDSM3[0] },
        { dia: 1, horario: 1, disciplina: disciplinasDSM3[0] },
        { dia: 1, horario: 2, disciplina: disciplinasDSM3[0] },
        { dia: 1, horario: 3, disciplina: disciplinasDSM3[3] },
        { dia: 1, horario: 4, disciplina: disciplinasDSM3[3] },

        { dia: 2, horario: 0, disciplina: disciplinasDSM3[1] },
        { dia: 2, horario: 1, disciplina: disciplinasDSM3[1] },
        { dia: 2, horario: 2, disciplina: disciplinasDSM3[1] },
        { dia: 2, horario: 3, disciplina: disciplinasDSM3[4] },
        { dia: 2, horario: 4, disciplina: disciplinasDSM3[4] },

        { dia: 3, horario: 0, disciplina: disciplinasDSM3[2] },
        { dia: 3, horario: 1, disciplina: disciplinasDSM3[2] },
        { dia: 3, horario: 2, disciplina: disciplinasDSM3[2] },
        { dia: 3, horario: 3, disciplina: disciplinasDSM3[5] },
        { dia: 3, horario: 4, disciplina: disciplinasDSM3[5] },

        { dia: 4, horario: 0, disciplina: disciplinasDSM3[3] },
        { dia: 4, horario: 1, disciplina: disciplinasDSM3[3] },
        { dia: 4, horario: 2, disciplina: disciplinasDSM3[3] },
        { dia: 4, horario: 3, disciplina: disciplinasDSM3[0] },
        { dia: 4, horario: 4, disciplina: disciplinasDSM3[0] },

        { dia: 5, horario: 0, disciplina: disciplinasDSM3[4] },
        { dia: 5, horario: 1, disciplina: disciplinasDSM3[4] },
        { dia: 5, horario: 2, disciplina: disciplinasDSM3[4] },
        { dia: 5, horario: 3, disciplina: disciplinasDSM3[1] },
        { dia: 5, horario: 4, disciplina: disciplinasDSM3[1] }
    ];

    // Grade de horários para GEO (1° nível)
    const aulasGEO = [
        { dia: 1, horario: 0, disciplina: disciplinasGEO[0] },
        { dia: 1, horario: 1, disciplina: disciplinasGEO[0] },
        { dia: 1, horario: 2, disciplina: disciplinasGEO[0] },
        { dia: 1, horario: 3, disciplina: disciplinasGEO[3] },
        { dia: 1, horario: 4, disciplina: disciplinasGEO[3] },

        { dia: 2, horario: 0, disciplina: disciplinasGEO[1] },
        { dia: 2, horario: 1, disciplina: disciplinasGEO[1] },
        { dia: 2, horario: 2, disciplina: disciplinasGEO[1] },
        { dia: 2, horario: 3, disciplina: disciplinasGEO[4] },
        { dia: 2, horario: 4, disciplina: disciplinasGEO[4] },

        { dia: 3, horario: 0, disciplina: disciplinasGEO[2] },
        { dia: 3, horario: 1, disciplina: disciplinasGEO[2] },
        { dia: 3, horario: 2, disciplina: disciplinasGEO[2] },
        { dia: 3, horario: 3, disciplina: disciplinasGEO[5] },
        { dia: 3, horario: 4, disciplina: disciplinasGEO[5] },

        { dia: 4, horario: 0, disciplina: disciplinasGEO[3] },
        { dia: 4, horario: 1, disciplina: disciplinasGEO[3] },
        { dia: 4, horario: 2, disciplina: disciplinasGEO[3] },
        { dia: 4, horario: 3, disciplina: disciplinasGEO[0] },
        { dia: 4, horario: 4, disciplina: disciplinasGEO[0] },

        { dia: 5, horario: 0, disciplina: disciplinasGEO[4] },
        { dia: 5, horario: 1, disciplina: disciplinasGEO[4] },
        { dia: 5, horario: 2, disciplina: disciplinasGEO[4] },
        { dia: 5, horario: 3, disciplina: disciplinasGEO[1] },
        { dia: 5, horario: 4, disciplina: disciplinasGEO[1] }
    ];

    // Grade de horários para GEO (2° nível)
    const aulasGEO2 = [
        { dia: 1, horario: 0, disciplina: disciplinasGEO2[0] },
        { dia: 1, horario: 1, disciplina: disciplinasGEO2[0] },
        { dia: 1, horario: 2, disciplina: disciplinasGEO2[0] },
        { dia: 1, horario: 3, disciplina: disciplinasGEO2[3] },
        { dia: 1, horario: 4, disciplina: disciplinasGEO2[3] },

        { dia: 2, horario: 0, disciplina: disciplinasGEO2[1] },
        { dia: 2, horario: 1, disciplina: disciplinasGEO2[1] },
        { dia: 2, horario: 2, disciplina: disciplinasGEO2[1] },
        { dia: 2, horario: 3, disciplina: disciplinasGEO2[4] },
        { dia: 2, horario: 4, disciplina: disciplinasGEO2[4] },

        { dia: 3, horario: 0, disciplina: disciplinasGEO2[2] },
        { dia: 3, horario: 1, disciplina: disciplinasGEO2[2] },
        { dia: 3, horario: 2, disciplina: disciplinasGEO2[2] },
        { dia: 3, horario: 3, disciplina: disciplinasGEO2[5] },
        { dia: 3, horario: 4, disciplina: disciplinasGEO2[5] },

        { dia: 4, horario: 0, disciplina: disciplinasGEO2[3] },
        { dia: 4, horario: 1, disciplina: disciplinasGEO2[3] },
        { dia: 4, horario: 2, disciplina: disciplinasGEO2[3] },
        { dia: 4, horario: 3, disciplina: disciplinasGEO2[0] },
        { dia: 4, horario: 4, disciplina: disciplinasGEO2[0] },

        { dia: 5, horario: 0, disciplina: disciplinasGEO2[4] },
        { dia: 5, horario: 1, disciplina: disciplinasGEO2[4] },
        { dia: 5, horario: 2, disciplina: disciplinasGEO2[4] },
        { dia: 5, horario: 3, disciplina: disciplinasGEO2[1] },
        { dia: 5, horario: 4, disciplina: disciplinasGEO2[1] }
    ];

    // Grade de horários para GEO (3° nível)
    const aulasGEO3 = [
        { dia: 1, horario: 0, disciplina: disciplinasGEO3[0] },
        { dia: 1, horario: 1, disciplina: disciplinasGEO3[0] },
        { dia: 1, horario: 2, disciplina: disciplinasGEO3[0] },
        { dia: 1, horario: 3, disciplina: disciplinasGEO3[3] },
        { dia: 1, horario: 4, disciplina: disciplinasGEO3[3] },

        { dia: 2, horario: 0, disciplina: disciplinasGEO3[1] },
        { dia: 2, horario: 1, disciplina: disciplinasGEO3[1] },
        { dia: 2, horario: 2, disciplina: disciplinasGEO3[1] },
        { dia: 2, horario: 3, disciplina: disciplinasGEO3[4] },
        { dia: 2, horario: 4, disciplina: disciplinasGEO3[4] },

        { dia: 3, horario: 0, disciplina: disciplinasGEO3[2] },
        { dia: 3, horario: 1, disciplina: disciplinasGEO3[2] },
        { dia: 3, horario: 2, disciplina: disciplinasGEO3[2] },
        { dia: 3, horario: 3, disciplina: disciplinasGEO3[5] },
        { dia: 3, horario: 4, disciplina: disciplinasGEO3[5] },

        { dia: 4, horario: 0, disciplina: disciplinasGEO3[3] },
        { dia: 4, horario: 1, disciplina: disciplinasGEO3[3] },
        { dia: 4, horario: 2, disciplina: disciplinasGEO3[3] },
        { dia: 4, horario: 3, disciplina: disciplinasGEO3[0] },
        { dia: 4, horario: 4, disciplina: disciplinasGEO3[0] },

        { dia: 5, horario: 0, disciplina: disciplinasGEO3[4] },
        { dia: 5, horario: 1, disciplina: disciplinasGEO3[4] },
        { dia: 5, horario: 2, disciplina: disciplinasGEO3[4] },
        { dia: 5, horario: 3, disciplina: disciplinasGEO3[1] },
        { dia: 5, horario: 4, disciplina: disciplinasGEO3[1] }
    ];

    // Grade de horários para MAR (1° nível)
    const aulasMAR = [
        { dia: 1, horario: 0, disciplina: disciplinasMAR[0] },
        { dia: 1, horario: 1, disciplina: disciplinasMAR[0] },
        { dia: 1, horario: 2, disciplina: disciplinasMAR[0] },
        { dia: 1, horario: 3, disciplina: disciplinasMAR[3] },
        { dia: 1, horario: 4, disciplina: disciplinasMAR[3] },

        { dia: 2, horario: 0, disciplina: disciplinasMAR[1] },
        { dia: 2, horario: 1, disciplina: disciplinasMAR[1] },
        { dia: 2, horario: 2, disciplina: disciplinasMAR[1] },
        { dia: 2, horario: 3, disciplina: disciplinasMAR[4] },
        { dia: 2, horario: 4, disciplina: disciplinasMAR[4] },

        { dia: 3, horario: 0, disciplina: disciplinasMAR[2] },
        { dia: 3, horario: 1, disciplina: disciplinasMAR[2] },
        { dia: 3, horario: 2, disciplina: disciplinasMAR[2] },
        { dia: 3, horario: 3, disciplina: disciplinasMAR[5] },
        { dia: 3, horario: 4, disciplina: disciplinasMAR[5] },

        { dia: 4, horario: 0, disciplina: disciplinasMAR[3] },
        { dia: 4, horario: 1, disciplina: disciplinasMAR[3] },
        { dia: 4, horario: 2, disciplina: disciplinasMAR[3] },
        { dia: 4, horario: 3, disciplina: disciplinasMAR[0] },
        { dia: 4, horario: 4, disciplina: disciplinasMAR[0] },

        { dia: 5, horario: 0, disciplina: disciplinasMAR[4] },
        { dia: 5, horario: 1, disciplina: disciplinasMAR[4] },
        { dia: 5, horario: 2, disciplina: disciplinasMAR[4] },
        { dia: 5, horario: 3, disciplina: disciplinasMAR[1] },
        { dia: 5, horario: 4, disciplina: disciplinasMAR[1] }
    ];

    // Grade de horários para MAR (2° nível)
    const aulasMAR2 = [
        { dia: 1, horario: 0, disciplina: disciplinasMAR2[0] },
        { dia: 1, horario: 1, disciplina: disciplinasMAR2[0] },
        { dia: 1, horario: 2, disciplina: disciplinasMAR2[0] },
        { dia: 1, horario: 3, disciplina: disciplinasMAR2[3] },
        { dia: 1, horario: 4, disciplina: disciplinasMAR2[3] },

        { dia: 2, horario: 0, disciplina: disciplinasMAR2[1] },
        { dia: 2, horario: 1, disciplina: disciplinasMAR2[1] },
        { dia: 2, horario: 2, disciplina: disciplinasMAR2[1] },
        { dia: 2, horario: 3, disciplina: disciplinasMAR2[4] },
        { dia: 2, horario: 4, disciplina: disciplinasMAR2[4] },

        { dia: 3, horario: 0, disciplina: disciplinasMAR2[2] },
        { dia: 3, horario: 1, disciplina: disciplinasMAR2[2] },
        { dia: 3, horario: 2, disciplina: disciplinasMAR2[2] },
        { dia: 3, horario: 3, disciplina: disciplinasMAR2[5] },
        { dia: 3, horario: 4, disciplina: disciplinasMAR2[5] },

        { dia: 4, horario: 0, disciplina: disciplinasMAR2[3] },
        { dia: 4, horario: 1, disciplina: disciplinasMAR2[3] },
        { dia: 4, horario: 2, disciplina: disciplinasMAR2[3] },
        { dia: 4, horario: 3, disciplina: disciplinasMAR2[0] },
        { dia: 4, horario: 4, disciplina: disciplinasMAR2[0] },

        { dia: 5, horario: 0, disciplina: disciplinasMAR2[4] },
        { dia: 5, horario: 1, disciplina: disciplinasMAR2[4] },
        { dia: 5, horario: 2, disciplina: disciplinasMAR2[4] },
        { dia: 5, horario: 3, disciplina: disciplinasMAR2[1] },
        { dia: 5, horario: 4, disciplina: disciplinasMAR2[1] }
    ];

    // Grade de horários para MAR (3° nível)
    const aulasMAR3 = [
        { dia: 1, horario: 0, disciplina: disciplinasMAR3[0] },
        { dia: 1, horario: 1, disciplina: disciplinasMAR3[0] },
        { dia: 1, horario: 2, disciplina: disciplinasMAR3[0] },
        { dia: 1, horario: 3, disciplina: disciplinasMAR3[3] },
        { dia: 1, horario: 4, disciplina: disciplinasMAR3[3] },

        { dia: 2, horario: 0, disciplina: disciplinasMAR3[1] },
        { dia: 2, horario: 1, disciplina: disciplinasMAR3[1] },
        { dia: 2, horario: 2, disciplina: disciplinasMAR3[1] },
        { dia: 2, horario: 3, disciplina: disciplinasMAR3[4] },
        { dia: 2, horario: 4, disciplina: disciplinasMAR3[4] },

        { dia: 3, horario: 0, disciplina: disciplinasMAR3[2] },
        { dia: 3, horario: 1, disciplina: disciplinasMAR3[2] },
        { dia: 3, horario: 2, disciplina: disciplinasMAR3[2] },
        { dia: 3, horario: 3, disciplina: disciplinasMAR3[5] },
        { dia: 3, horario: 4, disciplina: disciplinasMAR3[5] },

        { dia: 4, horario: 0, disciplina: disciplinasMAR3[3] },
        { dia: 4, horario: 1, disciplina: disciplinasMAR3[3] },
        { dia: 4, horario: 2, disciplina: disciplinasMAR3[3] },
        { dia: 4, horario: 3, disciplina: disciplinasMAR3[0] },
        { dia: 4, horario: 4, disciplina: disciplinasMAR3[0] },

        { dia: 5, horario: 0, disciplina: disciplinasMAR3[4] },
        { dia: 5, horario: 1, disciplina: disciplinasMAR3[4] },
        { dia: 5, horario: 2, disciplina: disciplinasMAR3[4] },
        { dia: 5, horario: 3, disciplina: disciplinasMAR3[1] },
        { dia: 5, horario: 4, disciplina: disciplinasMAR3[1] }
    ];

    // Preencher a tabela de horários
    const tbody = document.querySelector('.grade-table tbody');
    horarios.forEach((horario, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${horario.inicio} às ${horario.fim}</td>
            <td data-dia="1" data-horario="${index}"></td>
            <td data-dia="2" data-horario="${index}"></td>
            <td data-dia="3" data-horario="${index}"></td>
            <td data-dia="4" data-horario="${index}"></td>
            <td data-dia="5" data-horario="${index}"></td>
        `;
        tbody.appendChild(tr);
    });

    // Função para preencher a grade com as aulas do curso selecionado
    function preencherGrade(curso, nivel) {
        // Limpar a grade atual
        document.querySelectorAll('.grade-table td[data-dia]').forEach(cell => {
            cell.innerHTML = '';
        });

        // Selecionar as aulas do curso e nível apropriados
        let aulas;
        switch(curso) {
            case 'DSM':
                aulas = nivel === '1' ? aulasDSM : 
                       nivel === '2' ? aulasDSM2 : aulasDSM3;
                break;
            case 'GEO':
                aulas = nivel === '1' ? aulasGEO : 
                       nivel === '2' ? aulasGEO2 : aulasGEO3;
                break;
            case 'MAR':
                aulas = nivel === '1' ? aulasMAR : 
                       nivel === '2' ? aulasMAR2 : aulasMAR3;
                break;
            default:
                aulas = aulasDSM;
        }

        // Preencher a grade com as aulas
        aulas.forEach(aula => {
            const cell = tbody.rows[aula.horario].cells[aula.dia];
            cell.innerHTML = `
                <div class="aula-cell ${aula.disciplina.tipo}" data-aula='${JSON.stringify(aula)}'>
                    ${aula.disciplina.nome}<br>
                    <small>${aula.disciplina.professor}</small>
                </div>
            `;
        });

        // Atualizar a lista de docentes
        const docentesTable = document.querySelector('.docentes-table tbody');
        docentesTable.innerHTML = '';
        const professoresUnicos = [...new Set(aulas.map(a => a.disciplina.professor))];
        professoresUnicos.forEach(professor => {
            const disciplina = aulas.find(a => a.disciplina.professor === professor).disciplina;
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td style="background-color: ${disciplina.tipo === 'tecnicas' ? '#e6ccff' : 
                                            disciplina.tipo === 'desenvolvimento' ? '#ffffcc' :
                                            disciplina.tipo === 'matematica' ? '#cce6ff' :
                                            disciplina.tipo === 'estrutura' ? '#e6f3ff' :
                                            disciplina.tipo === 'engenharia' ? '#ccffff' : '#ffcccc'}">${professor}</td>
            `;
            docentesTable.appendChild(tr);
        });
    }

    // Evento para mudança de curso e nível
    document.querySelectorAll('.grade-actions select').forEach(select => {
        select.addEventListener('change', function() {
            const curso = document.querySelector('.grade-actions select:first-child').value;
            const nivel = document.querySelector('.grade-actions select:nth-child(2)').value;
            preencherGrade(curso, nivel);
            console.log('Grade atualizada com sucesso!');
        });
    });

    // Preencher a grade inicial com DSM nível 1
    preencherGrade('DSM', '1');

    // Função para atualizar os selects
    function atualizarSelects(curso, nivel) {
        // Atualizar os selects com as disciplinas e professores do curso/nível atual
        atualizarSelectsDisciplinas(curso, nivel);
        atualizarSelectsProfessores(curso, nivel);
    }

    function atualizarSelectsDisciplinas(curso, nivel) {
        // Implementar lógica de atualização dos selects de disciplinas
    }

    function atualizarSelectsProfessores(curso, nivel) {
        // Implementar lógica de atualização dos selects de professores
    }

    // Adicionar eventos de clique nas células
    document.querySelectorAll('.grade-table td[data-dia]').forEach(cell => {
        cell.addEventListener('click', function() {
            if (!this.querySelector('.aula-cell')) return;
            
            const aulaAtual = this.querySelector('.aula-cell').dataset.aula;
            if (aulaAtual) {
                const aula = JSON.parse(aulaAtual);
                const curso = document.querySelector('.grade-actions select:first-child').value;
                const nivel = document.querySelector('.grade-actions select:nth-child(2)').value;
                
                // Atualizar os selects com as disciplinas e professores do curso/nível atual
                atualizarSelects(curso, nivel);
                
                // Selecionar os valores atuais
                atualizarSelectsDisciplinas(curso, nivel);
                atualizarSelectsProfessores(curso, nivel);
            }
        });
    });

    // Eventos para os filtros
    document.querySelectorAll('.grade-actions select').forEach(select => {
        select.addEventListener('change', function() {
            // Aqui você implementaria a lógica para filtrar a grade
            console.log('Filtros aplicados com sucesso!');
        });
    });

    // Evento para exportação
    document.querySelector('.btn-primary').addEventListener('click', function() {
        // Aqui você implementaria a lógica para exportar a grade
        console.log('Grade exportada com sucesso!');
    });
}); 