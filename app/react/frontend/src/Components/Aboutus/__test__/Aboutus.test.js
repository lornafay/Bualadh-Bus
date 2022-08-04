import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Aboutus from '../Aboutus'

test('Header', () => {
    render(<Aboutus title="About Us"/>);
    const headingElement = screen.getByTitle("Header");
    expect(headingElement).toBeInTheDocument();
})

// test array that there are 4 developers

// test Pelin

// test Allen

// test Lorna

// test Lexie