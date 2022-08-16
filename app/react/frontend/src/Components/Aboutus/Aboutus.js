import './Aboutus.css'
import React from 'react';
import Pelin from './Pelin.png';
import Lorna from './Lorna.png';
import Allen from './Allen.png';
import Lexie from './Lexie.png';
import Accordion from 'react-bootstrap/Accordion'

export default function Aboutus() {
  return (
    <div id='aboutus'>
      <h1 title='Header' id='aboutus-title'>About Us</h1>
      <Accordion id='about-accordion'>
        <Accordion.Item eventKey="0" id='about-collapse'>
          <Accordion.Header>Pelin - Our Coordination Lead</Accordion.Header>
          <Accordion.Body>
            <img src={Pelin} id='person-img'></img>
            <p>Pelin coordinates our meetings and guides our group.
              Her strengths include predictive modeling and
              supply/production planning from her 6 years of
              experience in her former career.</p>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1" id='about-collapse'>
          <Accordion.Header>Allen - Our Maintenance Lead</Accordion.Header>
          <Accordion.Body>
            <img src={Allen} id='person-img'></img>
            <p>Allen formulates presentations and leads in our documentation
              and code standards. His strengths include database theory, as
              well as backend development with experience in previous
              applications.</p>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2" id='about-collapse'>
          <Accordion.Header>Lorna - Our Code Lead</Accordion.Header>
          <Accordion.Body>
            <img src={Lorna} id='person-img'></img>
            <p>Lorna maintains and simplifies our codebase, and leads testing
              + integration. Her strengths include backend development (her
              forte) and she's now assisting testing research in UCD’s
              Complex Software Lab.</p>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3" id='about-collapse'>
          <Accordion.Header>Lexie - Our Customer Lead</Accordion.Header>
          <Accordion.Body>
            <img src={Lexie} id='person-img'></img>
            <p>Lexie is responsible for user evaluation and stories, and
              facilitates the user interface. Her strengths include: data
              analysis and database management, as well as report writing.</p>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
    // <div id='aboutus'>
    //     <h1 title = 'Header' id='aboutus-title'>About Us</h1>
    //     <table id='person1'>
    //         <tbody>
    //             <tr>
    //                 <td>
    //                     <img src={ Pelin } id='person-img'></img>  
    //                 </td>
    //                 <td id='person1-info'>
    //                     <h3>Pelin</h3>
    //                     <p>
    //                         Pelin coordinates our meetings and guides our group.
    //                         Her strengths include predictive modeling and supply/production planning from her 6 years of experience in her former career.
    //                     </p>
    //                 </td>
    //             </tr>
    //         </tbody>
    //     </table>
    //     <table id='person1'>
    //         <tbody>
    //             <tr>
    //             <td>
    //                 <img src={ Lorna } id='person-img'></img>
    //                 </td>
    //                 <td id='person1-info'>
    //                     <h3>Lorna</h3>
    //                     <p>
    //                         Lorna maintains and simplifies our codebase, and leads testing + integration.
    //                         Her strengths include backend development is her forte, and she's now assisting testing research in UCD’s Complex Software Lab.

    //                     </p>
    //                 </td>
    //             </tr>
    //         </tbody>
    //     </table>
    //     <table id='person1'>
    //         <tbody>
    //             <tr>
    //                 <td>
    //                     <img src={ Allen } id='person-img'></img>  
    //                 </td>
    //                 <td id='person1-info'>
    //                     <h3>Allen</h3>
    //                     <p>
    //                         Allen formulates presentations and leads in our documentation and code standards.
    //                         His strengths include database theory, as well as backend development with experience in previous applications.
    //                     </p>
    //                 </td>
    //             </tr>
    //         </tbody>
    //     </table>
    //     <table id='person1'>
    //         <tbody>
    //             <tr>
    //             <td>
    //                 <img src={ Lexie } id='person-img'></img>
    //                 </td>
    //                 <td id='person1-info'>
    //                     <h3>Lexie</h3>
    //                     <p>
    //                         Lexie is responsible for user evaluation and stories, and facilitates the user interface.
    //                         Her strengths include: data analysis and database management, as well as report writing.
    //                     </p>
    //                 </td>
    //             </tr>
    //         </tbody>
    //     </table>
    // </div>
  )
}
