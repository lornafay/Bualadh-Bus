import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Home from '../Home'

test('Header', () => {
    render(<Home title="Route Planner"/>);
    const headingElement = screen.getByTitle("Header");
    expect(headingElement).toBeInTheDocument();
})

// test axios user_input for 200 response code

// test axios current_weather for 200 response code

// test any other axios to be added (route map? departure times?) for 200 response code

// test Route Planner Form inputs

// test Route Planner submit button

// test Journey Time return variables

// test show route on map

// test departure times

// test error output

// test Current Weather output variables

// test google map