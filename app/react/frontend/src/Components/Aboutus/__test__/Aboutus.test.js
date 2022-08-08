import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Aboutus from '../Aboutus'

test('Header', () => {
    render(<Aboutus title="About Us"/>);
    const headingElement = screen.getByTitle("Header");
    expect(headingElement).toBeInTheDocument();
})

// test array that there are 4 developers
test('should render same number as how many developers there are', () => {
    render(<Aboutus />);
    const table = screen.getAllByRole('table');
    // const row = screen.getAllByRole('tr');
    expect(table).toHaveLength(4);
    // expect(row).toHaveLength(4);
})

// test Pelin
test('should confirm that developer Pelin is in About Us', () => {
    render(<Aboutus />);
    const developerElement = screen.getAllByText(/Pelin/i);
    expect(developerElement).toHaveLength(2);
})

// test Allen
test('should confirm that developer Allen is in About Us', () => {
    render(<Aboutus />);
    const developerElement = screen.getAllByText(/Allen/i);
    expect(developerElement).toHaveLength(2);
})

// test Lorna
test('should confirm that developer Lorna is in About Us', () => {
    render(<Aboutus />);
    const developerElement = screen.getAllByText(/Lorna/i);
    expect(developerElement).toHaveLength(2);
})

// test Lexie
test('should confirm that developer Lexie is in About Us', () => {
    render(<Aboutus />);
    const developerElement = screen.getAllByText(/Lexie/i);
    expect(developerElement).toHaveLength(2);
})