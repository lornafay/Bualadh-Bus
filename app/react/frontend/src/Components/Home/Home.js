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
import { useState, useEffect, useRef, useCallBack } from "react";
import Axios from "axios";
import axios from "axios";
import { Oval } from 'react-loader-spinner';
import defaultStops from "./stops";
import SearchBarDropDown from "./SearchBarDropDown";


const Home = () => {

    // ********** WEATHER RELATED CODE **********

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
    const [location, setLocation] = useState("");
    const [destination, setDestination] = useState("");
    const [receivedData, setReceivedData] = useState([]);
    const [error, setError] = useState(false);
    const [waitingPrediction, setWaitingPrediction] = useState(false);
    const [waitingRoute, setWaitingRoute] = useState(false);


    const postData = (e) => {
        setWaitingPrediction(true);
        setStopArray([]);
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
                setWaitingPrediction(false);
                if (res.data.error == 'error') {
                    setError(true);
                } else {
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

    const [stopArray, setStopArray] = useState([]);
    const clickHandlerDisplayRoute = (event, line) => {
        // displays the user's route when selected
        event.preventDefault();
        setWaitingRoute(true);

        // method to get textual day from W3Schools https://www.w3schools.com/jsref/jsref_getday.asp
        const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let day = weekday[time.getDay()];
        console.log("param: ", line);
        console.log("param: ", location);
        console.log("param: ", destination);
        console.log("param: ", day);

        let locationArr = location.split(" ");
        let locationNum = locationArr[locationArr.length - 1];

        let destinationArr = destination.split(" ");
        let destinationNum = destinationArr[destinationArr.length - 1];

        /* REMOVE PORT TO USE WITH DOCKER */
        Axios.get('http://127.0.0.1:8000/api/stop_location/' + line + '/' + locationNum + '/' + destinationNum + '/' + day + '/')
            .then((res) => {
                console.log('Stop locations', res.data);
                setWaitingRoute(false);
                // update the stop array with results obtained
                setStopArray(res.data['result']);

            }).catch((err) => {
                console.log(err);
            });
    }

    const [stops, setStops] = useState(defaultStops);

    const onInputChange = (event) => {
        console.log(event.target.value);
        setStops(
            // toLowerCase makes it case insensitive
            defaultStops.filter(stop => stop.toLowerCase().includes(event.target.value.toLowerCase()))
        );
    }


    return (
        <div id="home">
            <div className="container-fluid">
                <section>
                    <div className="d-sm-flex">
                        <div className="col-lg-3 p-2">
                            <div id="home-section1">
                                <h3 id="home-section-title" title="Header">Route Planner</h3>
                                <Form className="user-input-form">
                                    <DatePicker
                                        className="date-picker"
                                        selected={time}
                                        onChange={(date) => setTime(date)}
                                        showTimeSelect
                                        minDate={new Date()}
                                        maxDate={addWeeks(new Date(), 1)}
                                        timeFormat="HH:mm"
                                        dateFormat="MMMM d, yyyy h:mm aa"
                                    />

                                    <SearchBarDropDown
                                        inputID={"location-input"}
                                        stops={stops}
                                        onInputChange={onInputChange}
                                        method={setLocation}
                                        compID={"input"}
                                    />
                                    <SearchBarDropDown
                                        inputID={"destination-input"}
                                        stops={stops}
                                        onInputChange={onInputChange}
                                        method={setDestination}
                                        compID={"input"}
                                    />
                                    <Button
                                        className="submit-button"
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
                                <div id='prediction-results' data-testid="prediction">
                                    {waitingPrediction && <Oval
                                        className="prediction-loader"
                                        height="60"
                                        width="60"
                                        radius="9"
                                        color='green'
                                    />
                                    }
                                    {error && <p id="home-section1-error">Error. Please try again or pick a different route.</p>}
                                    {receivedData.map((r) => {
                                        return (
                                            <>
                                                <div className='line-result-box'>
                                                    <table>
                                                        <tr>
                                                            <td className='result-table-item'><span id='r-line'>{r.line}</span></td>
                                                            <td className='result-table-item'><span id='r-time'>{r.hours}hr {r.mins}min</span></td>
                                                        </tr>
                                                    </table>

                                                    {!waitingRoute && <button className='show-route' onClick={event => clickHandlerDisplayRoute(event, r.line)}>Show Route</button>}
                                                    {waitingRoute && <Oval
                                                        className='route-loader'
                                                        height="45"
                                                        width="45"
                                                        radius="20"
                                                        color='green'
                                                    />
                                                    }
                                                </div>
                                            </>
                                        );
                                    })}
                                </div>
                            </div>
                            <div id="home-section2" data-testid="weather">
                                {weather.map((w) => {
                                    return (
                                        <p>Just so you know, current temp is {w.temp} C, clouds are
                                            at {w.clouds}%, humidity is {w.humidity}%, and rainfall is {w.rain}mm.</p>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="col-lg-9" id="home-section3" data-testid="map">
                            <GoogleMap items={stopArray} />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Home;