import React from "react";
import PropTypes from "prop-types";
import "./EditEvent.css";

import { isValidNumberInput } from "./utils";
import { parseInputAsNumber } from "./utils";
import { isValidName } from "./utils";
import { isValidHour } from "./utils";
import { isValidMinute } from "./utils";

const EditEvent = props => {
    const isFormValid = isValidName(props.name) && isValidHour(props.hour) && isValidMinute(props.minute);
    const isFormEmpty = props.name==="" && props.hour===-1 && props.minute ===-1;
    return (
        <div className="edit-event">
            <div className="edit-event__input-group">
                <label htmlFor="name">name</label>
                <input 
                type="text" 
                id="name" 
                name="name" 
                onChange={(e) => props.onInputChange({[e.target.name]: e.target.value})} 
                value = {props.name}
                />
            </div>
            <div className="edit-event__input-group">
                <label htmlFor="hour">hour</label>
                <input 
                type="tel" 
                id="hour" 
                name="hour" 
                onKeyPress={e => isValidNumberInput(e)}
                onChange={(e) => props.onInputChange({[e.target.name]: parseInputAsNumber(e.target.value)})} 
                value = {props.hour === -1 ? "" : props.hour}
                />
            </div>
            <div className="edit-event__input-group">
                <label htmlFor="minute">minute</label>
                <input 
                type="tel" 
                id="minute" 
                name="minute"
                onKeyPress={e => isValidNumberInput(e)}
                onChange={(e) => props.onInputChange({[e.target.name]: parseInputAsNumber(e.target.value)})} 
                value = {props.minute === -1 ? "" : props.minute}
                />
            </div>
            <button disabled={!isFormValid} onClick={() => props.onSave()}>OK</button>
            <button disabled={isFormEmpty} onClick={() => props.onCancel()}>Cancel</button>
        </div>
    )
};

EditEvent.propTypes = {
    name: PropTypes.string,
    hour: PropTypes.number,
    minute: PropTypes.number,
    onInputChange: PropTypes.func,
    onSave: PropTypes.func,
    onCancel: PropTypes.func
};

export default EditEvent;