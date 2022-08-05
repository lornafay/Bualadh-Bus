import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Home from '../Home'
import * as axios from "axios";
import React from "react";
import axiosMock from "axios";

// test route planner container
describe("Route Planner", () => {

    test('Header', () => {
        render(<Home title="Route Planner"/>);
        const headingElement = screen.getByTitle("Header");
        expect(headingElement).toBeInTheDocument();
    })
    
    const mockTime = jest.fn()
    const mockLocation = jest.fn()
    const mockDestination = jest.fn()
    
    test("should take user input for route planner when submit button is clicked", async () => {
        render(
            <Home
                time = {''}
                setTime = {mockTime}
                location = {''}
                setLocation = {mockLocation}
                destination = {''}
                setDestination = {mockDestination}
            />);
        
        const month = ["January","February","March","April","May","June","July","August",
            "September","October","November","December"];
        const date = new Date();
        let m = month[date.getMonth()];
        let d = date.getDay();
        let y = date.getFullYear();
    
        const timeElement = screen.getByDisplayValue(m + " " + d + ", " + y + " 12:00 AM")
        const locationElement = screen.getByPlaceholderText(/Your Location/i)
        const destinationElement = screen.getByPlaceholderText(/Destination/i)
        const buttonElement = screen.getByRole("button", { name: /Submit/ })
    
        fireEvent.change(timeElement, { target: { value: "15:00:00" }})
        fireEvent.change(locationElement, { target: { value: "395" } })
        fireEvent.change(destinationElement, { target: { value: "4662" } })
        fireEvent.click(buttonElement)
    
        expect(timeElement.value).toBe("15:00:00");
        expect(locationElement.value).toBe("395");
        expect(destinationElement.value).toBe("4662");
    })
    
    // test show route on map
    
    // test error output
    test('should return weather information in display for user', async () => {
        render(<Home />);
        const weatherElement = screen.getByText(/Error Message/i);
        expect(weatherElement).toBeInTheDocument();
    })

})





// test current weather container
describe("Weather", () => {
    test('should return weather information in display for user', async () => {
        render(<Home />);
        const weatherElement = screen.getByText(/Current Weather/i);
        expect(weatherElement).toBeInTheDocument();
    })
})


// DESCRIBE BLOCK GOOGLE MAP

// test google map is visible to user
describe("Google map", () => {
    test("should render a visible Google map to user", () => {
        render(<Home />);
        const tableElement = screen.getByTestId('map')
        expect(tableElement).toBeVisible();
    })
})