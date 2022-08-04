import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Home from '../Home'
import * as axios from "axios";
import React from "react";
import axiosMock from "axios";

test('Header', () => {
    render(<Home title="Route Planner"/>);
    const headingElement = screen.getByTitle("Header");
    expect(headingElement).toBeInTheDocument();
})

// DESCRIBE BLOCK AXIOS (video 9)

// test axios user_input for 200 response code
// jest.mock("axios");
// const testData = [
//     {
//         "time": "2022-08-04 18:00:00",
//         "temp": 16.4,
//         "wind_speed": 4.7,
//         "clouds": 53.1,
//         "rain": 0.0,
//         "sea_lvl_pressure": 1019.8,
//         "humidity": 46.8,
//         "dew_pt_temp": 5.1
//     }
// ];

// test("good response", async () => {
//     axios.mockResolvedValue({ data: testData });
// })

// test axios current_weather for 200 response code

// test any other axios to be added (route map? departure times?) for 200 response code



// DESCRIBE BLOCK ROUTE PLANNER

// test Route Planner Form inputs

// test Route Planner submit button

// test Journey Time return variables (video 10, fire elements)

// est Journey Time is visible to user (toBeVisible expect, video 9)

// test show route on map

// test departure times (video 10, fire elements)

// test error output



// DESCRIBE BLOCK WEATHER

// test Current Weather output variables (video 10, fire elements)



// DESCRIBE BLOCK GOOGLE MAP

// test google map