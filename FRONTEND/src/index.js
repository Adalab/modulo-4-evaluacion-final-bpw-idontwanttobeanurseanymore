//GET
fetch('http://localhost:4000/api/doctorwho')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));

// 1. Declaramos y rellenamos la variable 'data' con datos "falsos"
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
  .then(data => console.log(data))
  .catch(error => console.log(error))

//PUT
//prueba:
const idDoctor = 16; 
fetch(`http://localhost:4000/api/doctorwho/&{idDoctor}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    nombre: 'Sixteenth Doctor',
    actor: 'Marta Full Stack',
    numero: 16,
    temporada_inicio: 2026,
    temporada_fin: 2028
  })
})
  .then(res => res.json())
  .then(data => console.log('Actualizado:', data))
  .catch(err => console.error('Error en PUT:', err));


//DELETE
fetch(`http://localhost:4000/api/doctorwho/${idDoctor}`, {
  method: 'DELETE'
})
  .then(res => res.json())
  .then(data => console.log('Eliminado:', data))
  .catch(err => console.error('Error en DELETE:', err));
