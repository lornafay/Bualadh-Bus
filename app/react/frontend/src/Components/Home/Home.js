import "./Home.css";
import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import setSeconds from "date-fns/setSeconds";
import setMilliseconds from "date-fns/setMilliseconds";
import addWeeks from "date-fns/addWeeks";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots, faSun } from "@fortawesome/free-solid-svg-icons";
import GoogleMaps from "simple-react-google-maps";
import { useState, useEffect } from "react";
import Axios from "axios";

export default function Home() {
    // receive the current_weather from django
    const [weather, setWeather] = useState([]);
    useEffect(() => {
        /* REMOVE PORT FROM URL TO USE WITH DOCKER */
        Axios.get("http://127.0.0.1:8000/api/current_weather/").then((res) =>
            setWeather(res.data).catch((err) => console.log(err))
        );
    }, []);


  // user input
  const [time, setTime] = useState(
    setHours(setMinutes(setSeconds(setMilliseconds(new Date(), 0), 0), 0), 0)
  );
  const [location, setLocation] = useState([]);
  const [destination, setDestination] = useState([]);
  const [receivedData, setReceivedData] = useState([]);
  const [error, setError] = useState(false);

  const postData = (e) => {
    setReceivedData([]);
    setError(false);
    e.preventDefault();
    /* REMOVE PORT FROM URL TO USE WITH DOCKER */
    Axios.post("http://127.0.0.1:8000/api/user_input/", {
      time,
      location,
      destination,
    })
      .then((res) => {
        if(res.data.error == 'error'){
          setError(true);
        }else{
          console.log("time: ", time);
          console.log("location: ", location);
          console.log("destination: ", destination);
          setReceivedData(res.data.result);
          console.log(receivedData);
          console.log(weather);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div id="home">
      <div class="container-fluid">
        <section>
        <div class="d-sm-flex">
          <div class="col-lg-4 p-2">
            <div id="home-section1">
              <h3 id="home-section-title">Route Planner</h3>
              <Form>
                <DatePicker
                  selected={time}
                  onChange={(date) => setTime(date)}
                  showTimeSelect
                  minDate={new Date()}
                  maxDate={addWeeks(new Date(), 1)}
                  timeFormat="HH:mm"
                  dateFormat="MMMM d, yyyy h:mm aa"
                />
                <Form.Control
                  placeholder="Your Location"
                  name="location"
                  id="home-section1-input"
                  onChange={(e) => setLocation(e.target.value)}
                />
                <Form.Control
                  placeholder="Destination"
                  name="destination"
                  id="home-section1-input"
                  onChange={(e) => setDestination(e.target.value)}
                />
                <Button
                  variant="primary"
                  type="submit"
                  onClick={postData}
                  disabled={
                    time.length === 0 ||
                    location.length === 0 ||
                    destination.length === 0
                  }
                >
                  Submit
                </Button>
              </Form>
              {error && <p id="home-section1-error">Error message</p>}
              {/* <table>
                                <tr>
                                    <td id='home-section1-tableitem'>Font Size</td>
                                    <td id='home-section1-tableitem'>Audio</td>
                                    <td id='home-section1-tableitem'>Wheelchair Accessible</td>
                                </tr>
                            </table> */}
                                {receivedData.map((r) => {
                                    return (
                                        <>
                                            <p>
                                                Line: {r.line}
                                                <br />
                                                Hours: {r.hours}
                                                <br />
                                                Minutes: {r.mins}
                                                <br />
                                            </p>
                                        </>
                                    );
                                })}
                            </div>
                            <div id="home-section2">
                                <h3 id="home-section-title">Current Weather</h3>
                                {weather.map((w) => {
                                    return (
                                        <>
                                            <p>
                                                Temp: {w.temp} <br />
                                                Wind Speed: {w.wind_speed} <br />
                                                Clouds: {w.clouds} <br />
                                                Rain: {w.rain} <br />
                                                Humidity: {w.humidity} <br />
                                                <br />
                                            </p>
                                        </>
                                    );
                                })}
                            </div>
                        </div>
                        <div class="col-lg-8" id="home-section3">
                            <GoogleMaps
                                apiKey={"AIzaSyC0205U55u3k8w274zxOl0h5Fr15D7Nc1U"}
                                zoom={12}
                                center={{
                                    lat: 53.35014,
                                    lng: -6.266155,
                                }}
                                class="map"
                            />
                            <table id="map-table">
                                <tr>
                                    <td id="map-table-col">
                                        <Form.Check
                                            reverse
                                            label="Attractions"
                                            name="group"
                                            type="radio"
                                            id="map-check"
                                        />
                                    </td>
                                    <td id="map-table-col">
                                        <Form.Check
                                            label="Activities"
                                            name="group"
                                            type="radio"
                                            id="map-check"
                                        />
                                    </td>
                                    <td id="map-table-col">
                                        <Form.Check
                                            label="Accomodation"
                                            name="group"
                                            type="radio"
                                            id="map-check"
                                        />
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
