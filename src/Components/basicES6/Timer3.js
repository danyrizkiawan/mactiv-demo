import React, { Component } from 'react';

var style = {
    h1Style: {
        display: 'inline',
        fontSize: '100px',
        color: '#F3D689',
        margin: '0',
    },
    h2Style: {
        display: 'inline',
        color: 'white',
        fontFamily: 'Philosopher-BoldItalic',
        fontSize: '100px',
        margin: '0',
        marginLeft: '50px',
    },
}

class Timer3 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            now: 0,
        };
    }

    componentDidMount() {
        // Get Duration
        let duration = this.props.duration / 1000;
        this.setState({
            now: duration
        })

        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        // Get current timer value
        let now = this.state.now;

        now = now - 1;

        // Save all to state
        this.setState({
            now,
        });

        // Convert delta to time format and save to state
        this.setState({
            timer: this.convertToTimeFormat(now)
        })
    }

    convertToTimeFormat(second) { // don't forget the second param
        var minutes = Math.floor(second / 60);
        var seconds = second - (minutes * 60);

        if (minutes < 10) { minutes = "0" + minutes; }
        if (seconds < 10) { seconds = "0" + seconds; }
        return '-' + minutes + ':' + seconds;
    }

    addZero(number) {
        var res = "";
        if (number < 10) {
            res = "0";
        }
        return res;
    }

    render() {
        const { text } = this.props;
        const { timer } = this.state;
        return (
            <div>
                <h1 style={style.h1Style}>{text}</h1> <h2 style={style.h2Style}>{timer}</h2>
            </div>
        );
    }
}

export default Timer3;