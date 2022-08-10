import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Aboutus from '../Aboutus'

test('Header', () => {
    render(<Aboutus title="About Us"/>);
    const headingElement = screen.getByTitle("Header");
    expect(headingElement).toBeInTheDocument();
})

// test Pelin
test('should confirm that developer Pelin is in About Us', () => {
    render(<Aboutus />);
    const table = screen.getByText('Pelin - Our Coordination Lead');
    expect(table).toBeInTheDocument();
})

// test Allen
test('should confirm that developer Allen is in About Us', () => {
    render(<Aboutus />);
    const table = screen.getByText('Allen - Our Maintenance Lead');
    expect(table).toBeInTheDocument();
})

// test Lorna
test('should confirm that developer Lorna is in About Us', () => {
    render(<Aboutus />);
    const table = screen.getByText('Lorna - Our Code Lead');
    expect(table).toBeInTheDocument();
})

// test Lexie
test('should confirm that developer Lexie is in About Us', () => {
    render(<Aboutus />);
    const table = screen.getByText('Lexie - Our Customer Lead');
    expect(table).toBeInTheDocument();
})