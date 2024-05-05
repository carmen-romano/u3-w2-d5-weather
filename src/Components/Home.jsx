import { useState } from "react";
import { Form, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  const [searchText, setSearchText] = useState("");
  const [weatherCity, setWeatherCity] = useState(null);

  const fetchWeatherData = searchText => {
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${searchText}&limit=&appid=85dbaacb0481edb97a1d3f647ce586b4`
    )
      .then(response => {
        if (!response.ok) {
          throw new Error("Errore fetch");
        }
        return response.json();
      })
      .then(cityData => {
        const fetchedWeatherCity = cityData[0];
        if (fetchedWeatherCity) {
          setWeatherCity(fetchedWeatherCity);
          console.log("home fetch", cityData);
        } else {
          console.error("Nessuna città trovata");
        }
      })
      .catch(error => {
        console.error("Errore:", error);
      });
  };

  const handleSearch = e => {
    let searchText = e.target.value;

    if (searchText.includes(" ")) {
      let searchText1 = searchText.replace(/ /g, "%20");
      fetchWeatherData(searchText1);
    }
    setSearchText(searchText);
    fetchWeatherData(searchText);
  };

  return (
    <Container>
      <h3 className="fw-bold my-4">Welcome to</h3>
      <h1 className="fw-bold title-page my-4">SkyView Forecast</h1>
      <Form
        className="input-search d-flex align-items-center my-5"
        onSubmit={handleSearch}
      >
        <Form.Control
          type="search"
          placeholder="Search location..."
          className="me-2"
          aria-label="Search"
          value={searchText}
          onChange={handleSearch}
        />

        <Link
          to={
            weatherCity ? `/details/${weatherCity.lat}&${weatherCity.lon}` : "#"
          }
          className="btn btn-outline-light"
          disabled={!weatherCity}
        >
          <i className="fas fa-search"></i>
        </Link>
      </Form>
    </Container>
  );
};

export default Home;
