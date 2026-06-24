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
   //Uncaught ReferenceError: data is not defined
  })
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(error => console.log(error))


//PUT
fetch('http://localhost:4000/api/doctorwho/:id', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Doctores actualizados'
  })
})
  .then(res => res.json())
  .then(data => console.log(data));


//DELETE
fetch('http://localhost:4000/api/doctorwho/:id', {
  method: 'DELETE'
})
  .then(res => res.json())
  .then(data => console.log(data));
