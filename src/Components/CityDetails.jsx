import { useState, useEffect } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Row,
  Spinner,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import Temperature from "./Temperature";
import Speed from "./Speed";
import SunsetAndSunrise from "./SunsetAndSunrise";
import TimeZone from "./TimeZone";
import CityDetailWithDay from "./CityDetailsWithDay";
import VisibilityCalc from "./VisibilityCalc";

const CityDetails = () => {
  const [city, setCity] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  console.log(params);
  console.log(typeof params);
  let coordinate = params.latLon ? params.latLon.split("-") : [];
  const handleButtonClick = () => {
    setIsVisible(!isVisible);
  };

  console.log(coordinate);
  let lat = parseFloat(coordinate[0]);
  let lon = parseFloat(coordinate[1]);
  console.log("LAT:", lat);
  console.log("LON:", lon);
  useEffect(() => {
    if (lat && lon) {
      fetchWeatherDetails(lat, lon);
    }
  }, [lat, lon]);

  const fetchWeatherDetails = (lat, lon) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=85dbaacb0481edb97a1d3f647ce586b4`
    )
      .then(response => {
        if (!response.ok) {
          throw new Error("Errore fetch");
        }
        return response.json();
      })
      .then(cityData => {
        setCity(cityData);
        console.log(cityData);
        console.log(cityData.weather[0].icon);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Errore:", error);
        setIsError(true);
        setIsLoading(false);
      });
  };

  return (
    <Container className="my-5">
      {isLoading && <Spinner animation="grow" variant="info" />}
      {isError && <Alert variant="danger">An error has occurred</Alert>}
      {city && !isLoading && !isError && (
        <>
          <div className="d-flex justify-content-between my-5 citydetails ">
            <Col>
              <h2>
                {city.name}, {city.sys.country}
              </h2>
              <TimeZone time={city.timezone} />
            </Col>
            <Col>
              <Card.Img
                className="mb-2 png-weather"
                src={`https://openweathermap.org/img/w/${city.weather[0].icon}.png`}
                alt="icon-weather"
              />
              <div>
                <h2>Weather</h2>
                <h3>{city.weather[0].description}</h3>
              </div>
            </Col>
          </div>
          <Row>
            <Col md={4}>
              <Card className="card-details-city-left">
                <Card.Body>
                  <Card.Title className="fw-bold fs-2 mt-3">
                    Current Temperature
                  </Card.Title>
                  <hr />
                  <Card.Img
                    className="mb-2 png-weather"
                    src={`https://openweathermap.org/img/w/${city.weather[0].icon}.png`}
                    alt="icon-weather"
                  />
                  <div className="my-4">
                    <h2>
                      <Temperature kelvin={city.main.temp} />
                    </h2>
                  </div>
                  <div className="d-flex justify-content-evenly my-4">
                    <p>
                      min: <Temperature kelvin={city.main.temp_min} />
                    </p>
                    <p>
                      max: <Temperature kelvin={city.main.temp_max} />
                    </p>
                  </div>

                  <Card.Text>
                    wind speed:
                    <Speed speed={city.wind.speed} />
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={8}>
              <Card className="card-details-city-right">
                <Card.Body>
                  <Card.Title className="fw-bold fs-2 mt-3">
                    Current weather
                  </Card.Title>
                  <hr />
                  <div className="d-flex justify-content-between my-2">
                    <p>
                      <i className="fas fa-tint mx-2"></i>Humidity:
                    </p>
                    <p>{city.main.humidity} %</p>
                  </div>
                  <div className="d-flex justify-content-between my-2">
                    <p>
                      <i className="fas fa-sun mx-2"></i>Sunrise:
                    </p>
                    <p>
                      <SunsetAndSunrise time={city.sys.sunrise} />
                    </p>
                  </div>
                  <div className="d-flex justify-content-between my-2">
                    <p>
                      <i className="fas fa-cloud-sun mx-2"></i>Sunset:
                    </p>
                    <p>
                      <SunsetAndSunrise time={city.sys.sunset} />
                    </p>
                  </div>
                  <VisibilityCalc distance={city.visibility} />
                </Card.Body>
              </Card>
            </Col>
            <Col md={12}>
              <Button
                onClick={handleButtonClick}
                className="mt-4 w-100 fs-5 btn-city"
                variant="outline-trasparent"
              >
                {isVisible ? "Hide Daily Report" : "View Daily Report"}
              </Button>
              {isVisible && (
                <CityDetailWithDay lon={city.coord.lon} lat={city.coord.lan} />
              )}
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default CityDetails;
