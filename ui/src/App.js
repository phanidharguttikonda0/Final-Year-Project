import "./App.css";
import Authentication from "./components/Authentication";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/authentication" element={<Authentication />} />
      </Routes>
    </div>
  );
}

export default App;
