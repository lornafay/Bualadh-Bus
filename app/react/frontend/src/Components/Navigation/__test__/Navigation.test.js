import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Navigation from '../Navigation';

test('Header', () => {
    render(<Navigation title="Bualadh Bus"/>);
    const headingElement = screen.getByText(/Bualadh Bus/i);
    expect(headingElement).toBeInTheDocument();
})

test('Menu-Home', () => {
    render(<Navigation title="Home"/>);
    const linkElement = screen.getByRole("navigation")
    expect(linkElement).toBeInTheDocument();
})

test('Menu-FAQ', () => {
    render(<Navigation title="FAQ"/>);
    const linkElement = screen.getByRole("navigation")
    expect(linkElement).toBeInTheDocument();
})

test('Menu-Timetables', () => {
    render(<Navigation title="Timetables"/>);
    const linkElement = screen.getByRole("navigation")
    expect(linkElement).toBeInTheDocument();
})

test('Menu-About Us', () => {
    render(<Navigation title="About Us"/>);
    const linkElement = screen.getByRole("navigation")
    expect(linkElement).toBeInTheDocument();
})