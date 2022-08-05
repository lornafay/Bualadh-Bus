import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Footer from '../Footer'

test('Header', () => {
    render(<Footer title="Footer"/>);
    const footerElement = screen.getByTitle("Footer");
    expect(footerElement).toBeInTheDocument();
})

// test Bualadh Bus company name
test('should render the company name', () => {
    render(<Footer />);
    const companyElement = screen.getByText("© 2022 Bualadh Bus");
    expect(companyElement).toBeInTheDocument();
})