import "./App.scss";
import "./styles/Header.scss";
import Form from "./components/Form";
import Header from "./components/Header";
//Tardis API Inspector como posible nombre

export default function App() {
  return (
    <div>
      <Header></Header>
      <main>
        <section className="subtitle">
          <h2>Encuentra a tus personajes favoritos de Doctor Who</h2>
          <Form></Form>
        </section>
      </main>
    </div>
  );
}
