import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MyNavbar from "./Components/MyNavbar";
import Home from "./Components/Home";
import { Container } from "react-bootstrap";
import MyFooter from "./Components/MyFooter";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CityDetails from "./Components/CityDetails";
import NotFound from "./Components/NotFound";
function App() {
  return (
    <div className="App">
      <Container>
        <BrowserRouter>
          <MyNavbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/details/:latLon" element={<CityDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <MyFooter />
        </BrowserRouter>
      </Container>
    </div>
  );
}

export default App;
