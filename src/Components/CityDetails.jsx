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
import { Link, useParams } from "react-router-dom";
import Temperature from "./Temperature";
import Speed from "./Speed";
import SunsetAndSunrise from "./SunsetAndSunrise";
import TimeZone from "./TimeZone";
import CityDetailWithDay from "./CityDetailsWithDay";
import VisibilityCalc from "./VisibilityCalc";

const CityDetails = () => {
  const [city, setCity] = useState(null);
  const [imageCity, setImageCity] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();

  let coordinate = params.latLon ? params.latLon.split("&") : [];
  let lat = coordinate[0];
  let lon = coordinate[1];
  let cityName = coordinate[2];

  useEffect(() => {
    if (lat && lon && cityName) {
      fetchWeatherDetails(lat, lon);
      fetchWeatherImages(cityName);
    }
  }, [lat, lon, cityName]);

  const handleButtonClick = () => {
    setIsVisible(!isVisible);
  };

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
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Errore:", error);
        setIsError(true);
        setIsLoading(false);
      });
  };

  const fetchWeatherImages = cityName => {
    const unsplashKey = "KERgcYZdYcPmlA0V5KakugzkNTyPDroMg8VihDir95Y";

    fetch(
      `https://api.unsplash.com/search/photos?query=${cityName}&client_id=${unsplashKey}`
    )
      .then(response => {
        if (!response.ok) {
          throw new Error("Errore fetch");
        }
        return response.json();
      })
      .then(images => {
        const imageResults = images.results;
        if (imageResults.length > 0) {
          const firstImage = imageResults[0];
          setImageCity(firstImage);
          console.log(" immagine trovata", firstImage);
          setIsLoading(false);
        } else {
          console.error("Nessuna immagine trovata");
        }
      })
      .catch(error => {
        setIsError(true);
        setIsLoading(false);
        console.error("Errore:", error);
      });
  };

  return (
    <>
      <Container fluid className="my-2">
        <Link to={"/"} className="arrow-back">
          <i className="fas fa-chevron-left "></i>
        </Link>

        {isLoading && <Spinner animation="grow" variant="info" />}
        {isError && <Alert variant="danger">An error has occurred</Alert>}
        {city && !isLoading && !isError && imageCity && (
          <div
            className="p-3"
            style={{
              backgroundImage: `url(${imageCity ? imageCity.urls.full : ""})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPositionY: "center",
            }}
          >
            <div className="d-flex justify-content-between my-3 ">
              <Col md={3}>
                <div className="citydetails card-details-city">
                  <h3>{city.weather[0].description}</h3>
                  <h2>
                    {city.name}, {city.sys.country}
                  </h2>
                  <Card.Img
                    className="mb-2 png-weather"
                    src={`https://openweathermap.org/img/w/${city.weather[0].icon}.png`}
                    alt="icon-weather"
                  />
                  <Link
                    to={"/"}
                    className="d-block text-decoration-none link-dark my-2"
                  >
                    <i className="fas fa-map-marker-alt mx-2 " />
                    Change location
                  </Link>
                </div>
              </Col>
              <Col md={4}>
                <div className="citydetails card-details-city">
                  <TimeZone time={city.timezone} />
                </div>
              </Col>
            </div>

            <Row>
              <Col md={4}>
                <Card className="card-details-city">
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
                      <i className="fas fa-wind"> wind speed:</i>

                      <Speed speed={city.wind.speed} />
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={8}>
                <Card className="card-details-city">
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
                    <hr />
                    <VisibilityCalc distance={city.visibility} />
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        )}
      </Container>

      <Container>
        <Col md={12}>
          <Button
            onClick={handleButtonClick}
            className="mt-4 w-100 fs-5 btn-city"
            variant="outline-transparent"
          >
            {isVisible ? "Hide Daily Report" : "View Daily Report"}
          </Button>

          {isVisible && (
            <CityDetailWithDay lon={city.coord.lon} lat={city.coord.lat} />
          )}
        </Col>
      </Container>
    </>
  );
};

export default CityDetails;
