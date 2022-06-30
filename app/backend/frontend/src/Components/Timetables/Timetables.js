import './Timetables.css'
import React from 'react';
import Form from 'react-bootstrap/Form';
import example from './example.jpg';

export default function Timetables() {
    return (
        <div id='timetables'>
            <h1 id='timetables-title'>Timetables</h1>
            <Form.Select size="sm" id='timetables-select'>
                <option>Select Bus Route</option>
            </Form.Select>
            <img src={ example } id='timetables-img'></img>
        </div>
    )
}