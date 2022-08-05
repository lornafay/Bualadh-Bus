import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Faq from '../Faq'

test('Header', () => {
    render(<Faq title="FAQ"/>);
    const headingElement = screen.getByTitle("Header");
    expect(headingElement).toBeInTheDocument();
})

// test faq 1
test('should render the first question under FAQs', () => {
    render(<Faq />);
    const questionElement = screen.getByText(/How do passengers pay for bus fare on Dublin Bus?/i);
    const answerElement = screen.getByText(/Passengers have two options to pay for bus fare:/i);
    expect(questionElement).toBeInTheDocument();
    expect(answerElement).toBeInTheDocument();
})

// test faq 2
test('should render the second question under FAQs', () => {
    render(<Faq />);
    const questionElement = screen.getByText(/How is the time estimation for your journey predicted?/i);
    const answerElement = screen.getByText(/We take a number of factors into account./i);
    expect(questionElement).toBeInTheDocument();
    expect(answerElement).toBeInTheDocument();
})

// test faq 3
test('should render the second question under FAQs', () => {
    render(<Faq />);
    const questionElement = screen.getByText(/How can passengers use the timetable feature?/i);
    const answerElement = screen.getByText(/In our timetable below/i);
    expect(questionElement).toBeInTheDocument();
    expect(answerElement).toBeInTheDocument();
})