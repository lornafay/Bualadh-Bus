import './Timetables.css'
import React, { useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import example from './example.jpg';
import Axios from 'axios';
import {useState} from 'react';

export default function Timetables() {

    const [data, setDate] = useState([])

    useEffect(() => {
        Axios.get('http://127.0.0.1:8000/api/timetable/')
        .then(res => {
            console.log("Getting from server ::::", res.data)
            setDate(res.data)
        }).catch(err => console.log(err))
    }, [])

    const array = data.map((data, index) => {
        return (
            <tr>
                <td>{data.LINEID}</td>
                <td>{data.PLANNED_DEP_R_M5}</td>
            </tr>
        )
    })

    return (
        <div id='timetables'>
            <h1 id='timetables-title'>Timetables</h1>
            <Form.Select size="sm" id='timetables-select'>
                <option>Select Bus Route</option>
            </Form.Select>
            <table>
                <tr>
                    <th>Line</th>
                    <th>Time</th>
                </tr>
                <tr>
                    <td></td>
                </tr>
                {array}
            </table>
        </div>
    )
}