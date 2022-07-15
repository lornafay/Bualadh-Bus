// modified from https://react-bootstrap.netlify.app/components/buttons/#rb-docs-content
import React, { useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

export default function ArrivalDeparture() {
  const [radioValue, setRadioValue] = useState('1');

  const radios = [
    { name: 'Arrival', value: '1' },
    { name: 'Departure', value: '2' },
  ];

  return (
    <>
      <ButtonGroup id='home-section1-buttongroup'>
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant={idx % 2 ? 'outline-success' : 'outline-danger'}
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => setRadioValue(e.currentTarget.value)}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
    </>
  );
}