document.addEventListener('DOMContentLoaded', () => {

  const grilla = document.getElementById('grilla');
  const botones = document.querySelectorAll('.criterio');
  const buscador = document.getElementById('buscador-input');
  const sinResultados = document.getElementById('sin-resultados');

  if (!grilla) return;

  // Orden "Nuevo" = el orden en que vienen en el HTML
  const ordenOriginal = Array.from(grilla.querySelectorAll('.libro'));

  function obtenerLibros() {
    return Array.from(grilla.querySelectorAll('.libro'));
  }

  function ordenarPor(criterio) {
    let libros = obtenerLibros();

    switch (criterio) {
      case 'mayor':
        libros.sort((a, b) => Number(b.dataset.precio) - Number(a.dataset.precio));
        break;
      case 'menor':
        libros.sort((a, b) => Number(a.dataset.precio) - Number(b.dataset.precio));
        break;
      case 'puntuacion':
        libros.sort((a, b) => Number(b.dataset.puntuacion) - Number(a.dataset.puntuacion));
        break;
      default: // 'nuevo'
        libros = ordenOriginal.slice();
    }

    libros.forEach(libro => grilla.appendChild(libro));
  }

  function filtrarBusqueda() {
    const texto = buscador.value.trim().toLowerCase();
    let visibles = 0;

    obtenerLibros().forEach(libro => {
      const titulo = libro.querySelector('.titulo-libro').textContent.toLowerCase();
      const coincide = titulo.includes(texto);
      libro.style.display = coincide ? '' : 'none';
      if (coincide) visibles++;
    });

    if (sinResultados) {
      sinResultados.style.display = visibles === 0 ? 'block' : 'none';
    }
  }

  // Click en los criterios de orden
  botones.forEach(boton => {
    boton.addEventListener('click', () => {
      botones.forEach(b => b.classList.remove('activo'));
      boton.classList.add('activo');
      ordenarPor(boton.dataset.criterio);
      filtrarBusqueda(); // re-aplica el filtro de texto sobre el nuevo orden
    });
  });

  // Búsqueda en vivo
  if (buscador) {
    buscador.addEventListener('input', filtrarBusqueda);
  }

});