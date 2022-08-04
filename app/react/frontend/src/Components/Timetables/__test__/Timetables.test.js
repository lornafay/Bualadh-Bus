import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Timetables from '../Timetables'
import * as axios from "axios";
import React from "react";
import axiosMock from "axios";
// import Fetch from "./Fetch";

test('Header', () => {
    render(<Timetables title="Timetables"/>);
    const headingElement = screen.getByTitle("Header");
    expect(headingElement).toBeInTheDocument();
})



// DESCRIBE BLOCK COLUMNS (video 9)

test('should render column name Line', () => {
    render(<Timetables />);
    const tableElement = screen.getByText(/Line/i);
    expect(tableElement).toBeInTheDocument();
})

// test column name time

test('should render column name Time', () => {
    render(<Timetables />);
    const tableElement = screen.getByText("Time");
    expect(tableElement).toBeInTheDocument();
})

// test column name Destination

test('should render column name Destination', () => {
    render(<Timetables />);
    const tableElement = screen.getByText(/Destination/i);
    expect(tableElement).toBeInTheDocument();
})

// test column name Last Stop

test('should render column name Last Stop', () => {
    render(<Timetables />);
    const tableElement = screen.getByText(/Last Stop/i);
    expect(tableElement).toBeInTheDocument();
})




// DESCRIBE BLOCK FORM

// test form

const mockStopID = jest.fn()
const mockDay = jest.fn()

test("should input when search button is clicked", async () => {
    render(
        <Timetables 
            day = {''}
            setDay={mockDay}
            stopID = {''}
            setStopID={mockStopID}
        />);
    
    const dayElement = screen.getByPlaceholderText(/Enter day of week/i );
    const buttonElement = screen.getByRole("button", { name: /Search/ })
    const stopElement = screen.getByPlaceholderText(/Enter Bus Stop/i );

    fireEvent.change(stopElement, { target: { value: "395" } })
    fireEvent.change(dayElement, { target: { value: "Sunday" } })
    fireEvent.click(buttonElement)
    
    expect(dayElement.value).toBe("Sunday");
    expect(stopElement.value).toBe("395")
})



// DESCRIBE BLOCK TABLE

// test table is visible to user (expect toBeVisible)
test("should render a visible table to user", () => {
    render(<Timetables />);
    const tableElement = screen.getByTestId('timetable')
    expect(tableElement).toBeVisible();
})


// test axios timetables for 200 response

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