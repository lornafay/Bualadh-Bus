import './Aboutus.css'
import React from 'react';
import Pelin from './Pelin.png';
import Lorna from './Lorna.png';
import Allen from './Allen.png';
import Lexie from './Lexie.png';

export default function Aboutus() {
    return (
        <div id='aboutus'>
            <h1 id='aboutus-title'>About Us</h1>
            <table id='person1'>
                <tr>
                    <td>
                        <img src={ Pelin } id='person-img'></img>  
                    </td>
                    <td id='person1-info'>
                        <tr>
                            <h3>Pelin</h3>
                        </tr>
                        <tr>
                            Pelin coordinates our meetings and guides our group.
                            Her strengths include predictive modeling and supply/production planning from her 6 years of experience in her former career.
                        </tr>
                    </td>
                </tr>
            </table>
            <table id='person2'>
                <tr>
                    <td id='person2-info'>
                        <tr>
                            <h3>Lorna</h3>
                        </tr>
                        <tr>
                            Lorna maintains and simplifies our codebase, and leads testing + integration.
                            Her strengths include backend development is her forte, and she's now assisting testing research in UCD’s Complex Software Lab.

                        </tr>
                    </td>
                    <td>
                    <img src={ Lorna } id='person-img'></img>
                    </td>
                </tr>
            </table>
            <table id='person1'>
                <tr>
                    <td>
                        <img src={ Allen } id='person-img'></img>  
                    </td>
                    <td id='person1-info'>
                        <tr>
                            <h3>Allen</h3>
                        </tr>
                        <tr>
                            Allen formulates presentations and leads in our documentation and code standards.
                            His strengths include database theory, as well as backend development with experience in previous applications.
                        </tr>
                    </td>
                </tr>
            </table>
            <table id='person2'>
                <tr>
                    <td id='person2-info'>
                        <tr>
                            <h3>Lexie</h3>
                        </tr>
                        <tr>
                            Lexie is responsible for user evaluation and stories, and facilitates the user interface.
                            Her strengths include: data analysis and database management, as well as report writing.
                        </tr>
                    </td>
                    <td>
                    <img src={ Lexie } id='person-img'></img>
                    </td>
                </tr>
            </table>
        </div>
    )
}