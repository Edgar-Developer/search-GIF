let currentPage = 1;
let currenQuery = '';// Variable para almacenar la consulta actual

document.addEventListener('DOMContentLoaded', () => {
  trending();// Carga los GIFs de tendencia al inicio
  updateBtnPre()
});

button.addEventListener('click', (event) => {
  event.preventDefault();// Previene el comportamiento por defecto del botón
  const query = input.value.trim();// Obtiene el valor del input y elimina espacios en blanco al inicio y al final de la cadena de busqueda
  currentPage = 1;// Reinicia la página actual a 1 al realizar una nueva búsqueda
  pagIndicador.textContent = `Página ${currentPage}`;// Actualiza el indicador de página a 1 al iniciar una nueva búsqueda
  fetchPage({query: currenQuery, page: currentPage});
  
  
  if(query) {// Verifica si hay una consulta válida
    currenQuery = query;// Actualiza currenQuery con la consulta ingresada
    search(query);// Llama a la función de búsqueda con la consulta ingresada
      console.log('buscando', query);      
  } else {
    console.log('Ingresa una busqueda');    
  }
  updateBtnPre(); // Actualiza el estado del botón "Anterior"
  document.documentElement.scrollTop = 0; // Desplaza la página hacia arriba al realizar una búsqueda
});

function updateBtnPre() {
  if (currentPage <= 1) {
    btnPre.disabled = true; // Deshabilita el botón "Anterior" si estamos en la primera página
  } else {
    btnPre.disabled = false;
  }
}

btnNext.addEventListener('click', () => {
  currentPage++;

    fetchPage({query: currenQuery, page: currentPage});  // Llama a la función para obtener la siguiente página de resultados dependiendo de la consulta actual
    pagIndicador.textContent = `Página ${currentPage}`;
    updateBtnPre();
    document.documentElement.scrollTop = 0;
})

btnPre.addEventListener('click', () => {
  if(currentPage > 1) {
    currentPage--;
    fetchPage({query: currenQuery, page: currentPage});
    pagIndicador.textContent = `Página ${currentPage}`;
    updateBtnPre()
    document.documentElement.scrollTop = 0;
  }
})
