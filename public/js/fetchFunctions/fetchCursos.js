export async function getCursos() {
  try {
      let response = await fetch('https://errorsquad-server.onrender.com/admin/1/cursos', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibm9tZSI6Ikpvw6NvIFNpbHZhIiwiaWF0IjoxNzQ2NjYzODQyLCJleHAiOjE3NDY2Njc0NDJ9.01LVOLtL4J8YiQ8C6bkhPvgm8owtGxs_rrMfsBBQ8n0'
          },
      });

      let result = await response.json();
      let data = result.data;

      if (result === 'Token inválido.'){
          return null; // Retorna os dados processados
       }
       else{
          return data
       }
  } catch (error) {
      console.error('Erro:', error);
      return null; // Retorna null em caso de erro
  }
}

export async function getCursoById(id) {
  try {
      let response = await fetch('https://errorsquad-server.onrender.com/admin/1/cursos', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibm9tZSI6Ikpvw6NvIFNpbHZhIiwiaWF0IjoxNzQ2NjYzODQyLCJleHAiOjE3NDY2Njc0NDJ9.01LVOLtL4J8YiQ8C6bkhPvgm8owtGxs_rrMfsBBQ8n0'
          },
      });

      let result = await response.json();
      let data = result.data;

      if (result === 'Token inválido.'){
          return null; // Retorna os dados processados
       }
       else{
          return data
       }
  } catch (error) {
      console.error('Erro:', error);
      return null; // Retorna null em caso de erro
  }
}