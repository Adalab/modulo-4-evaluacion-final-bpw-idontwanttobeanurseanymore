//GET
fetch('http://localhost:4000/api/doctorwho')
  .then(res => res.json())
  .then(data => console.log('Datos:', data))
  .catch(err => console.error('Error en GET:', err));

//Datos "falsos" pa probar
const data = {
id_doctor: 16,
nombre: 'Sixteenth Doctor',
actor: 'Marta',
numero: 16,
temporada_inicio: 2026,
temporada_fin: 2027
};

//POST
fetch('http://localhost:4000/api/doctorwho', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
   body: JSON.stringify(data),
  })
  .then(res => res.json())
  .then(data => console.log('Añadido:', data))
  .catch(error => console.log('Error en POST:', error))

//PUT
const idDoctor = 16;

fetch(`http://localhost:4000/api/doctorwho/${idDoctor}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Doctores actualizados',
    nombre: 'Sixteenth Doctor',
    actor: 'Marta Full Stack',
    numero: 16,
    temporada_inicio: 2026,
    temporada_fin: 2028
  })
})
  .then(res => res.json())
  .then(data => {
    console.log('Actualizado:', data);
  })
  .catch(err => console.error('Error en PUT:', err));

//DELETE
fetch(`http://localhost:4000/api/doctorwho/${idDoctor}`, {
  method: 'DELETE'
})
  .then(res => res.json())
  .then(data => console.log('Eliminado:', data))
  .catch(err => console.error('Error en DELETE:', err));