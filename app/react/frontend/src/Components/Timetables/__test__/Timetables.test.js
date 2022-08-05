import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Timetables from '../Timetables'
import React from "react";

describe("Header", () => {
    test('should render the header for timetables', () => {
        render(<Timetables title="Timetables"/>);
        const headingElement = screen.getByTitle("Header");
        expect(headingElement).toBeInTheDocument();
    })
})


describe("Checks table columns", () => {
    // test column name line
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
})


// test form for user input
describe("Stop Timetable Form", () => {
    const mockStopID = jest.fn()
    const mockDay = jest.fn()
    
    // test form input
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
    
    // test table is visible to user (expect toBeVisible)
    test("should render a visible table to user", () => {
        render(<Timetables />);
        const tableElement = screen.getByTestId('timetable')
        expect(tableElement).toBeVisible();
    })
})