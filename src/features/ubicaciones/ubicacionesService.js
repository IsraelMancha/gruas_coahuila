function obtenerUbicaciones() {
  return [
    { id: 1, name: "Piedras Negras", count: 5 },
    { id: 2, name: "Nava", count: 10 },
    { id: 3, name: "V. Carranza", count: 3 },
    { id: 4, name: "Morelos", count: 5 },
    { id: 5, name: "Acuña", count: 10 },
    { id: 6, name: "Rosita", count: 3 },
    { id: 7, name: "Múzquiz", count: 3 },
  ];
}

export { obtenerUbicaciones };

function agregarUbicacion(ubicacion) {
  const ubicaciones = obtenerUbicaciones();
  ubicaciones.push(ubicacion);
  return ubicaciones;
}

export { agregarUbicacion };
