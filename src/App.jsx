import React, {Component} from "react";
import uniqid from "uniqid";
import Countdown from "./Countdown";
import EditEvent from "./EditEvent";
import "./App.css";


class App extends Component{
    constructor()
    {
        super();
        this.state = {
            now:{
                hour: new Date().getHours(),
                minute: new Date().getMinutes(),
                seconds: new Date().getSeconds()
            },
            events: [
                {id: 0, name:"śniadanie", hour:7, minute: 0},
                {id: 1, name:"obiad", hour:15, minute: 0},
                {id: 2, name:"kolacja", hour:18, minute: 0}
            ],
            editedEvent:
            {
                id: uniqid(),
                name: "",
                hour: -1,
                minute: -1
            }
        };
        this.handleEditEvent = this.handleEditEvent.bind(this);
        this.handleSaveEvent = this.handleSaveEvent.bind(this);
        this.handleRemoveEvent = this.handleRemoveEvent.bind(this);
        this.handleEditInit = this.handleEditInit.bind(this);
        this.handleCancelEvent = this.handleCancelEvent.bind(this);
        this.timer = this.timer.bind(this);
    }

    timer()
    {
        this.setState({
            now:{
                hour: new Date().getHours(),
                minute: new Date().getMinutes(),
                seconds: new Date().getSeconds()
            }
        });
    }

    componentDidMount()
    {
        const storageEvents = JSON.parse(localStorage.getItem("events")) || [];
        this.setState({events:storageEvents});
        const intervalId=setInterval(this.timer, 1000);
        this.setState({intervalId:intervalId});
    }

    componentDidUnmount()
    {
        clearInterval(this.state.intervalId);
    }

    handleEditEvent(val){
        this.setState(prevState => {
            return {
                editedEvent: Object.assign(prevState.editedEvent, val)
            };
        });
    }

    handleSaveEvent()
    {
        // this.setState(prevState => (
        //     {
        //         events: [...prevState.events, prevState.editedEvent],
        //         editedEvent: 
        //     {
        //         id: uniqid(),
        //         name: "",
        //         hour: "",
        //         minute: ""
        //     }
        //     }
        // ));

        this.setState(prevState => {
            const editedEventExists = prevState.events.find(el => el.id === prevState.editedEvent.id);
            let updatedEvents;
            if(editedEventExists)
            {
                updatedEvents = prevState.events.map(el => {
                    if(el.id === prevState.editedEvent.id) return prevState.editedEvent;
                    else return el;
                });
            }
            else {
                updatedEvents = [...prevState.events, prevState.editedEvent];
            }

            return {
                events: updatedEvents,
                editedEvent: { id: uniqid(), name:"", hour:-1, minute:-1}
            }
        }, () => localStorage.setItem("events", JSON.stringify(this.state.events)));


    }

    handleRemoveEvent(id)
    {
        this.setState(prevState => ({
            events: prevState.events.filter(el => el.id !==id)
        }));
    }

    handleEditInit(id)
    {
        this.setState(prevState => ({
            editedEvent: {...prevState.events.find(el => el.id ===id)}
        }),() => localStorage.setItem("events", JSON.stringify(this.state.events)));
    }

    handleCancelEvent()
    {
        this.setState({
                editedEvent: { id: uniqid(), name:"", hour:-1, minute:-1}
        });
    }

    render()
    {
        const events = this.state.events.map(el => {
            return <Countdown 
            key={el.id}  
            name={el.name} 
            hour={el.hour} 
            minute={el.minute}
            timeNow={this.state.now}
            id={el.id} 
            onRemove={id => this.handleRemoveEvent(id)}
            onEdit={id => this.handleEditInit(id)}
            />
        })
        return(
                <div className="app">
                    {events}
                    <EditEvent
                    name={this.state.editedEvent.name}
                    hour={this.state.editedEvent.hour}
                    minute={this.state.editedEvent.minute}
                    onSave={() => this.handleSaveEvent()} 
                    onCancel={() => this.handleCancelEvent()}
                    onInputChange={val => this.handleEditEvent(val)}
                    />
                </div>
                
        )
    }
}
export default App;