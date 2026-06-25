export default function Form(){
    return(
    <div class="card">
        <div class="controls">
          <div class="search-wrapper">
            <input type="text" id="searchInput" placeholder="Buscar Doctor por nombre o actor..."></input>
          </div>
          <label class="checkbox-wrapper">
            <input type="checkbox" id="orderBy"></input>
            <span>Ordenar por</span>
          </label>
          <button class="btn-primary" id="refreshBtn">Buscar</button>
        </div>
      </div>
    )
}