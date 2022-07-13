import './Faq.css'
import React from 'react';
import Accordion from 'react-bootstrap/Accordion'


export default function Faq() {
    return (
        <div id='faq'>
            <h1 id='faq-title'>FAQ</h1>
            <Accordion id='faq-accordion'>
              <Accordion.Item eventKey="0" id='faq-collapse'>
                <Accordion.Header>How is traffic congestion rated?</Accordion.Header>
                <Accordion.Body>
                    <p>Yes, exactly. Here you can provide immediate answers to a few common and 
                    pressing questions.</p>
                    <br />
                    <p>This will not only reduce your support tickets, but it will also reassure 
                      users - and make them more likely to click your CTA.</p>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1" id='faq-collapse'>
                <Accordion.Header>How do we predict current bus occupancy?</Accordion.Header>
                <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2" id='faq-collapse'>
                <Accordion.Header>What accessibility features does our app have?</Accordion.Header>
                <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
        </div>
    )
}