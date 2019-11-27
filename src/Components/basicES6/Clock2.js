import React, { Component } from 'react';

const clockStyle = {
    rootStyle: {
        fontFamily: 'Philosopher-Bold',
        color: 'white',
        margin: '0',
        padding: '0',
    },
    h1Style: {
        fontSize: '110px',
        lineHeight: '0.7',
        letterSpacing: '-6px',
        margin: '0'
    },
    h2Style: {
        fontSize: '32px'
    },
}

class Clock2 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            date: new Date()
        };
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        })
    }

    addZero(number) {

        if (number < 10) {
            number = "0" + number;
        }
        return number;
    }

    convertDay(day) {
        switch (day) {
            case 1:
                return "Senin"
            case 2:
                return "Selasa"
            case 3:
                return "Rabu"
            case 4:
                return "Kamis"
            case 5:
                return "Jum'at"
            case 6:
                return "Sabtu"
            case 0:
                return "Ahad"
            default:
                break;
        }
    }

    convertMonth(month) {
        switch (month) {
            case 1:
                return "Januari"
            case 2:
                return "Februari"
            case 3:
                return "Maret"
            case 4:
                return "April"
            case 5:
                return "Mei"
            case 6:
                return "Juni"
            case 7:
                return "Juli"
            case 8:
                return "Agustus"
            case 9:
                return "September"
            case 10:
                return "Oktober"
            case 11:
                return "November"
            case 12:
                return "Desember"
            default:
                break;
        }
    }

    render() {
        const date = this.state.date;
        var hour = date.getHours();

        return (
            <div
                className="text-center"
                style={clockStyle.rootStyle}
            >
                <div className="list-inline">
                    <h1 className="list-inline-item"
                        style={clockStyle.h1Style} >
                        {this.addZero(hour)}:
                        {this.addZero(date.getMinutes())}:
                        {this.addZero(date.getSeconds())}
                    </h1>
                </div>
                <h2
                    style={clockStyle.h2Style} >
                    {this.convertDay(date.getDay())},
                    {' ' + this.addZero(date.getDate())} {this.convertMonth(date.getMonth() + 1)} {date.getFullYear()}
                </h2>
            </div>
        );
    }

};

export default Clock2;