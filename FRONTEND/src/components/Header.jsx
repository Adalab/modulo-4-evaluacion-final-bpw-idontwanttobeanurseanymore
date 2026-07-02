export default function Header() {
  return (
    <header className="tardis-header">
      <div className="tardis-lamp">
        <div className="lamp-top"></div>
        <div className="lamp-frame">
          <div className="lamp-glass"></div>
        </div>

        <div className="lamp-base"></div>
      </div>
      <div className="tardis-frame">
        <div className="tardis-sign">
          <span className="big">POLICE</span>

          <span className="small-column">
            <span>PUBLIC</span>
            <span>CALL</span>
          </span>

          <span className="big">BOX</span>
        </div>
      </div>
    </header>
  );
}
