import { useState, useEffect } from "react";
import { Alert, Col, Container, Placeholder, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Temperature from "./Temperature";
import DayOfWeek from "./DayOfWeek";

const CityDetailWithDay = () => {
  const [city, setCity] = useState(null);

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();

  let coordinate = params.latLon ? params.latLon.split("&") : [];
  let lat = coordinate[0];
  let lon = coordinate[1];

  useEffect(() => {
    if (lat && lon) {
      fetchWeatherDetails(lat, lon);
    }
  }, [lat, lon]);

  const fetchWeatherDetails = (lat, lon) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=85dbaacb0481edb97a1d3f647ce586b4&cnt=9`
    )
      .then(response => {
        if (!response.ok) {
          throw new Error("Errore fetch city details ");
        }
        return response.json();
      })
      .then(cityData => {
        setCity(cityData);
        setIsLoading(false);
        console.log("dettagli", cityData);
      })
      .catch(error => {
        console.error("Errore:", error);
        setIsError(true);
        setIsLoading(false);
      });
  };

  return (
    <Container className="my-5">
      {isLoading && (
        <Col className="col-12 mb-4">
          <div className="border-0">
            <Placeholder as="h3" animation="glow">
              <Placeholder xs={12} />
            </Placeholder>
          </div>
        </Col>
      )}
      {isError && <Alert variant="danger">An error has occurred</Alert>}
      {!isLoading && !isError && (
        <Row className=" justify-content-center gap-2">
          {city &&
            city.list &&
            city.list.map((day, index) => (
              <Col md={1} key={index}>
                <img
                  className="mb-2 png-weather"
                  src={`https://openweathermap.org/img/w/${day.weather[0].icon}.png`}
                  alt="icon-weather"
                />
                <p>{day.weather[0].main} </p>
                <hr />
                <p>
                  <DayOfWeek date={day.dt_txt} />
                </p>
                <hr />
                <p className="temp">
                  <Temperature kelvin={day.main.temp} />
                </p>
              </Col>
            ))}
        </Row>
      )}
    </Container>
  );
};

export default CityDetailWithDay;
