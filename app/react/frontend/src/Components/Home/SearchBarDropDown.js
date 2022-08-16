import React from "react";
import { useEffect, useRef } from "react";

//search bar drop down from tutorial https://www.youtube.com/watch?v=QtJiQXfAqPg&ab_channel=HuakunShen
const SearchBarDropDown = (props) => {
    const inputID = props.inputID;
    const stops = props.stops;
    const onInputChange = props.onInputChange;
    const onEndingStopFocus = props.onEndingStopFocus;
    const settingBegStop = props.settingBegStop;
    const ulRef = useRef();
    const inputRef = useRef();
    const method = props.method;
    const compID = props.compID;

    useEffect(() => {

        ulRef.current.style.display = "none";
        // controls stop list display whether the input field is in focus or not
        // when rest of document is clicked, list disappears
        inputRef.current.addEventListener("click", (event) => {
            ulRef.current.style.display = "flex";
            event.stopPropagation();
            if (!settingBegStop) {
                onEndingStopFocus();
            }
        });
        document.addEventListener("click", (event) => {
            ulRef.current.style.display = "none";
        });
    }, []);

    return (
        <div className="search-bar-container">
            <input
                type="text"
                id={inputID}
                placeholder="stop ID or address"
                autoComplete="off"
                onChange={onInputChange}
                // onClick={(e) => { !settingBegStop && onEndingStopFocus(e) }}
                ref={inputRef}
            />
            <ul id={compID + "suggestions"} className="stop-list" ref={ulRef}>
                {stops.map((stop, index) => {
                    return (
                        <button
                            key={index}
                            className="stop-list-action"
                            type="button"
                            onClick={(e) => {
                                inputRef.current.value = stop;
                                method(stop.split(' ').pop());
                            }}
                        >
                            {stop}
                        </button>
                    );
                })}
            </ul>
        </div>
    );
};

export default SearchBarDropDown;