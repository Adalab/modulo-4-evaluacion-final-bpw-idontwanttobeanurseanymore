import "./App.scss";
import Form from "./components/Form";
//Tardis API Inspector como posible nombre

export default function App() {
  return (
    <div>
      <header>
        <h1>Doctor Who API Project</h1>
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