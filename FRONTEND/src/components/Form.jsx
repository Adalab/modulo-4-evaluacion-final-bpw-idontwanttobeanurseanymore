import { useState } from "react";

export default function Form() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);

  const search = async () => {
    try {
      const res = await fetch(
        `http://localhost:4000/api/doctorwho/search?q=${query}`,
      );
      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="card">
      <div className="controls">
        <div className="search-wrapper">
          <input
            type="text"
            value={query}
            id="searchInput"
            onChange={(ev) => setQuery(ev.target.value)}
            placeholder="Buscar Doctor por nombre o actor..."></input>
        </div>
        <p>
          *Solo busca por nombre (ej.: tenth doctor) y tienes que hacer click
        </p>
        <button className="btn-primary" onClick={search}>
          Buscar
        </button>
        {result.length > 0 && (
          <div className="results">
            {result.map((doctor) => (
              <div key={doctor.id_doctor} className="result-card">
                <h3>{doctor.nombre}</h3>
                <p>Actor: {doctor.actor}</p>
                <p>Número: {doctor.numero}</p>
                <p>
                  Temporadas: {doctor.temporada_inicio} - {doctor.temporada_fin}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
