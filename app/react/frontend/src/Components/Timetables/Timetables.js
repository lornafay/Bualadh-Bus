import './Timetables.css';
import React, { useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Axios from 'axios';
import { useState } from 'react';
// import {userState} from 'react';
import { Oval } from 'react-loader-spinner';
import SearchBarDropDown from '../Home/SearchBarDropDown';
import defaultStops from '../Home/stops';

const Timetables = () => {

    const [data, setDate] = useState([])
    const [stopID, setStopID] = useState('')
    const [day, setDay] = useState('')
    const [destination, setDestination] = useState('')
    const [lastStop, setLastStop] = useState('')
    const [waitingTimetable, setWaitingTimetable] = useState(false)


    useEffect(() => {
        /* REMOVE PORT FROM URL TO USE WITH DOCKER */
        Axios.get('http://127.0.0.1:8000/api/timetable/')
            .then(res => {
                console.log("Getting from server ::::", res.data)
                setDate(res.data)
            }).catch(err => console.log(err))
    }, [])

    const postData = (e) => {
        e.preventDefault();
        setWaitingTimetable(true);
        console.log(stopID);
        /* REMOVE PORT FROM URL TO USE WITH DOCKER */
        Axios.post('http://127.0.0.1:8000/api/timetable/', {
            stopID, day, destination, lastStop
        }).then(res => {
            setWaitingTimetable(false)
            console.log('Posting data', res.data)
            setDate(res.data)
        }).catch(err => console.log(err))
    }

    const array = data.map((data, index) => {
        return (
            <tr>
                <td>{data.LINEID}</td>
                <td>{data.TIME_OF_DAY}</td>
                <td>{data.destination}</td>
                <td>{data.last_stop}</td>
            </tr>
        )
    })

    const [stops, setStops] = useState(defaultStops);

    const onInputChange = (event) => {
        console.log(event.target.value);
        setStops(
            // toLowerCase makes it case insensitive
            defaultStops.filter(stop => stop.toLowerCase().includes(event.target.value.toLowerCase()))
        );
    }

    return (
        <div id='timetables'>
            <h1 title="Header" id='timetables-title'>Bus Stop Timetables</h1>
            <br></br>
            <form>
                <SearchBarDropDown
                    inputID={"timetable-input"}
                    stops={stops}
                    onInputChange={onInputChange}
                    method={setStopID}
                    compID="timetable"
                />
                <select placeholder="Enter day of week" id="days" name="days" value={day} onChange={(e) => setDay(e.target.value)}>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                </select><br></br><br></br>
                <button onClick={postData} >Search</button>
            </form>
            <br></br>
            <div id='table-scroll' className='d-sm-flex col-lg-4 offset-lg-4'>

                {!waitingTimetable && <table data-testid="timetable">
                    <tbody>
                        <tr>
                            <th width="50px">Line</th>
                            <th width="80px">Time</th>
                            <th width="80px">Destination</th>
                            <th width="80px">Last Stop</th>
                        </tr>
                        <tr>
                            <td></td>
                        </tr>
                        {array}
                    </tbody>
                </table>
                }

                {waitingTimetable && <Oval
                    className='route-loader'
                    height="45"
                    width="45"
                    radius="20"
                    color='green'
                />
                }

            </div>
        </div>
    )
};

export default Timetables;