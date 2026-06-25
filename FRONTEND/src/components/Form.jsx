export default function Form(){
    return(
    <div className="card">
        <div className="controls">
          <div className="search-wrapper">
            <input type="text" id="searchInput" placeholder="Buscar Doctor por nombre o actor..."></input>
          </div>
          <label className="checkbox-wrapper">
            <input type="checkbox" id="orderBy"></input>
            <span>Ordenar por</span>
          </label>
          <button className="btn-primary" id="refreshBtn">Buscar</button>
        </div>
      </div>
    )
}