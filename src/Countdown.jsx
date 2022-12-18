import React from "react";
import PropTypes from "prop-types";
import { hourMinuteToSeconds } from "./utils";
import { secondsToHourMinuteSecond } from "./utils";

import Overlay from "./Overlay";

import "./Countdown.css";


const Countdown = props => 
    {
        const eventInSeconds = hourMinuteToSeconds(props.hour, props.minute);
        const nowInSeconds = hourMinuteToSeconds(props.timeNow.hour, props.timeNow.minute) + props.timeNow.seconds;
        const diff = eventInSeconds - nowInSeconds;
        const diffText = diff > 0 ? secondsToHourMinuteSecond(diff): "tomorrow";
        return (
        <div className="countdown">
                <strong>{props.name}</strong> - {diffText}
                <div className="countdown__icons">
                    <i className="fa fa-edit" onClick={() => props.onEdit(props.id)}/>
                    <i className="fa fa-times" onClick={() => props.onRemove(props.id)}/>
                </div>
                <Overlay>
                    <h1>{props.name}</h1>
                    <p>{props.hour}:{props.minute}</p>
                </Overlay>
            </div>);
    };

Countdown.propTypes = {
    name: PropTypes.string,
    hour: PropTypes.number,
    minute: PropTypes.number,
    onEdit: PropTypes.func,
    onRemove: PropTypes.func,
    timeNow: PropTypes.shape({
        hour: PropTypes.number,
        minute: PropTypes.number,
        secund: PropTypes.number
    }),
};
export default Countdown;