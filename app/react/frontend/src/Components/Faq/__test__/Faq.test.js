import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Faq from '../Faq'

test('Header', () => {
    render(<Faq title="FAQ"/>);
    const headingElement = screen.getByTitle("Header");
    expect(headingElement).toBeInTheDocument();
})

// test array of faqs is 3

// test faq 1

// test faq 2

// test faq 3