import "./App.scss";
import Form from "./components/Form";

export default function App() {
  return (
    <div>
      <header>
        <h1>Tardis API Inspector</h1>
      </header>
      <main>
        <section>
          <h2>Encuentra a tus personajes favoritos de Doctor Who</h2>
          <Form></Form>
        </section>
      </main>
    </div>
  );
}