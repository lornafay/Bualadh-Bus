import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Timetables from '../Timetables'

test('Header', () => {
    render(<Timetables title="Timetables"/>);
    const headingElement = screen.getByTitle("Header");
    expect(headingElement).toBeInTheDocument();
})

test('render column Line', () => {
    render(<Timetables />);
    const tableElement = screen.getByText(/Line/i);
    expect(tableElement).toBeInTheDocument();
})

// test column name time

// test column name Destination

// test column name Last Stop

// test form

// test form button

// test table set variable output for line 1182 on Sunday (length of row numbers, destination name, last stop number)

// test axios timetables for 200 response