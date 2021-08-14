import "./App.css";
import Footer from "./components/footer";
import Header from "./components/header";
import Router from "./router";

function App() {
  return (
    <div className="App">
      <Header />
      <Router />
      <Footer />
    </div>
  );
}

export default App;
