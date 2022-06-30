import './Aboutus.css'
import React from 'react';

export default function Aboutus() {
    return (
        <div id='aboutus'>
            <h1 id='aboutus-title'>About Us</h1>
            <table id='person1'>
                <tr>
                    <td>
                        <img src='https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg' id='person-img'></img>
                    </td>
                    <td id='person1-info'>
                        <tr>
                            <h3>PERSON 1</h3>
                        </tr>
                        <tr>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                            culpa qui officia deserunt mollit anim id est laborum.
                        </tr>
                    </td>
                </tr>
            </table>
            <table id='person2'>
                <tr>
                    <td id='person2-info'>
                        <tr>
                            <h3>PERSON 2</h3>
                        </tr>
                        <tr>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                            culpa qui officia deserunt mollit anim id est laborum.
                        </tr>
                    </td>
                    <td>
                        <img src='https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg' id='person-img'></img>
                    </td>
                </tr>
            </table>
        </div>
    )
}