import './Timetables.css'
import React, { useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import example from './example.jpg';
import Axios from 'axios';
import {useState} from 'react';
// import {userState} from 'react';

export default function Timetables() {

    const[data, setDate] = useState([])
    const[stopID, setStopID] = useState('')
    const[day, setDay] = useState('')
    const[direction, setDirection] = useState('')
    const[lastStop, setLastStop] = useState('')

    useEffect(() => {
        Axios.get('http://127.0.0.1:8000/api/timetable/')
        .then(res => {
            console.log("Getting from server ::::", res.data)
            setDate(res.data)
        }).catch(err => console.log(err))
    }, [])

    const postData = (e) => {
        e.preventDefault();
        Axios.post('http://127.0.0.1:8000/api/timetable/', {
            stopID, day, direction, lastStop
        }).then(res => {
            console.log('Posting data', res.data)
            setDate(res.data)
        }).catch(err => console.log(err))
    }

    const array = data.map((data, index) => {
        return (
            <tr>
                <td>{data.LINEID}</td>
                <td>{data.TIME_OF_DAY}</td>
                <td>{data.DIRECTION}</td>
                <td>{data.last_stop}</td>
            </tr>
        )
    })

    return (
        <div id='timetables'>
            <h1 id='timetables-title'>Timetables</h1>
            <br></br>
            <form>
                <label>Bus Stop ID: </label>
                <input type="text" value={stopID} onChange={(e) => setStopID(e.target.value)}/><br></br><br></br>
                <label>Day of Travel:</label>
                <input type="text" value={day} onChange={(e) => setDay(e.target.value)}/><br></br><br></br>
                <button onClick={postData} >Search</button>
            </form>
            <br></br>
            <div id='table-scroll' class='d-sm-flex col-lg-4 offset-lg-4'>
            <table>
                <tr align>
                    <th width="50px">Line</th>
                    <th width="80px">Time</th>
                    <th width="80px">Direction</th>
                    <th width="80px">Last Stop</th>
                </tr>
                <tr>
                    <td></td>
                </tr>
                {array}
            </table>
            </div>
        </div>
    )
}