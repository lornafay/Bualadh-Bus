import './Faq.css'
import React from 'react';
import Accordion from 'react-bootstrap/Accordion'


export default function Faq() {
    return (
        <div id='faq'>
            <h1 id='faq-title'>FAQ</h1>
            <Accordion id='faq-accordion'>
              <Accordion.Item eventKey="0" id='faq-collapse'>
                <Accordion.Header>How do passengers pay for bus fare on Dublin Bus?</Accordion.Header>
                <Accordion.Body>
                    <p>Passengers have two options to pay for bus fare: either by exact change or by
                       using a prepaid TFI leap card. If you’re just visiting Dublin, you may think 
                       exact change is the way to go, however leap cards are only €5 and can be bought 
                       and topped up in most small shops such as Spar. For more information on leaps 
                       cards, please visit: https://about.leapcard.ie/about</p>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1" id='faq-collapse'>
                <Accordion.Header>How is the time estimation for your journey predicted?</Accordion.Header>
                <Accordion.Body>
                    <p>We take a number of factors into account. From extensive past Dublin Bus information 
                      (for example, the planned arrival time versus the actual arrival time at a bus stop), 
                      to the day of the week and even weather information such as rain or temperature, we 
                      have developed a model that predicts accurate journey time!</p>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2" id='faq-collapse'>
                <Accordion.Header>How can passengers use the timetable feature?</Accordion.Header>
                <Accordion.Body>
                    <p>In our timetable below, users can select a specific bus stop they want to 
                      see a timetable for. The timetable will include all information on buses that 
                      serve that stop, the direction the bus is heading as well as the last stop on 
                      that bus line, and the times that the buses are scheduled to arrive.</p>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
        </div>
    )
}