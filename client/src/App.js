import "./App.css";
import Footer from "./components/footer";
import Header from "./components/header/header";
import Router from "./router";

function App() {
  return (
    <div className="App d-flex flex-column vh-100">
      <Header />
      <Router />
      <Footer />
    </div>
  );
}

export default App;
