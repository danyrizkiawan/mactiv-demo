import React from "react";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import ReactLoading from "react-loading";
import Axios from "axios";

const rootStyle = {
    padding: '100px',
    width: '100%',
    height: '100vh',
    backgroundColor: 'black'
}

export default class Loading extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            done: undefined
        }
    }
    componentDidMount() {
        setTimeout(() => {
            this.getPrayerTime();
        }, 1200);
    }

    getPrayerTime() {
        const serialNumber = this.props.serialNumber;
        const date = new Date();
        Axios.post('https://localhost:5000/getPrayerTime',
            {
                serialNumber,
                date: date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay()
            }).then(response => console.log('get')
            )
            .then(json => this.setState({ done: true }));
    }

    render() {
        return (
            <div style={rootStyle}>
                {!this.state.done ? (
                    <ReactLoading type={"bars"} color={"white"} />
                ) : (
                        <h1></h1>
                    )}
            </div>
        )
    }
}