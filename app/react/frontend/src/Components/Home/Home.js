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
import GoogleMap from "./GoogleMap";
import { useState, useEffect } from "react";
import Axios from "axios";
import axios from "axios";

export default function Home() {

    // ********** WEATHER RELATED CODE **********

    // receive the current_weather from django
    const [weather, setWeather] = useState([]);

    useEffect(() => {
        /* WITH PORT == local; WITHOUT PORT == Docker */
        /* Axios.get("http://127.0.0.1/api/current_weather/").then((res) => */
        Axios.get("http://127.0.0.1:8000/api/current_weather/").then((res) =>
            setWeather(res.data).catch((err) => console.log(err))
        );
    }, []);


    // ********** USER INPUT RELATED CODE **********

    const [time, setTime] = useState(
        setHours(setMinutes(setSeconds(setMilliseconds(new Date(), 0), 0), 0), 0)
    );

    const [location, setLocation] = useState([]);
    const [destination, setDestination] = useState([]);
    const [receivedData, setReceivedData] = useState([]);
    const [stopArray, setStopArray] = useState([]);

    const postData = (e) => {
        e.preventDefault();
        /* Axios.post('http://127.0.0.1/api/user_input/', { */
        Axios.post('http://127.0.0.1:8000/api/user_input/', {
            time,
            location,
            destination,
        })
            .then((res) => {
                console.log("time: ", time);
                console.log("location: ", location);
                console.log("destination: ", destination);
                setReceivedData(res.data.result);
                console.log(receivedData);
                console.log(weather);
            })
            .catch((err) => {
                console.log(err);
            });
    };


    const clickHandlerDisplayRoute = (event, line) => {
        // displays the user's route when selected
        event.preventDefault();

        // method to get textual day from W3Schools https://www.w3schools.com/jsref/jsref_getday.asp
        const weekday = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
        let day = weekday[time.getDay()];
        console.log("param: ", line);
        console.log("param: ", location);
        console.log("param: ", destination);
        console.log("param: ", day);

        /* WITH PORT == local; WITHOUT PORT == Docker */
        /* Axios.get('http://127.0.0.1/api/stop_location/') */
        Axios.get('http://127.0.0.1:8000/api/stop_location/' + line + '/' + location + '/' + destination + '/' + day + '/')
            .then((res) => {
                console.log('Stop locations', res.data);

                // update the stop array with results obtained
                setStopArray(res.data['result']);

            }).catch((err) => {
                console.log(err);
            });
    }

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
                                <p id="home-section1-error">Error message</p>
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
                                            <div class='line-result-box'>
                                                <p>
                                                    <span class='r-line'>{r.line}</span>
                                                    <br />
                                                    <span class='r-time'>{r.hours}hrs {r.mins}mins</span>
                                                </p>
                                                <button class='show-route' onClick={event => clickHandlerDisplayRoute(event, r.line)}>show route</button>
                                            </div>
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
                                                Temp: {w.temp} C <br />
                                                Wind Speed: {w.wind_speed} <br />
                                                Clouds: {w.clouds}% <br />
                                                Rain: {w.rain} mm<br />
                                                Humidity: {w.humidity} %<br />
                                                <br />
                                            </p>
                                        </>
                                    );
                                })}
                            </div>
                        </div>
                        <div class="col-lg-8" id="home-section3">
                            <GoogleMap items={stopArray} />
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

