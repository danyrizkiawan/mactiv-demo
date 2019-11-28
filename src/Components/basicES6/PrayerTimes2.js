import React, { Component } from 'react';

var prayerStyle = {
    h2Style: {
        fontFamily: 'Rossanova-Regular',
        fontSize: '60px',
        letterSpacing: '-2px',
        lineHeight: '.8',
        color: '#F3D689',
        margin: '0',
        paddingTop: '0.5rem',
        //textShadow: '4px 4px 15px rgba(0, 0, 0, 0.5)'
    },
    h1Style: {
        //height: '152px',
        fontFamily: 'Chapaza',
        fontSize: '80px',
        letterSpacing: '0px',
        lineHeight: '1',
        color: 'white',
        margin: '0',
        //textShadow: '4px 4px 15px rgba(0, 0, 0, 0.5)'
    }
}

class PrayerTimes2 extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var timeA = this.props.time;
        var { h1, h2 } = this.props.size;
        var time = timeA.replace(/:/g, ".");
        return (
            <div
                className="text-center">
                <h2
                    style={{
                        fontFamily: 'Rossanova-Regular',
                        fontSize: h2,
                        letterSpacing: '-5px',
                        lineHeight: '.8',
                        color: '#F3D689',
                        margin: '0',
                        marginBottom: '20px',
                        paddingTop: '0.5rem',
                        //textShadow: '4px 4px 15px rgba(0, 0, 0, 0.5)'
                    }}>
                    {this.props.title.toUpperCase()}</h2>
                <h1
                    style={{
                        fontFamily: 'Chapaza',
                        fontSize: h1,
                        lineHeight: '1',
                        color: 'white',
                        margin: '0',
                    }}>
                    {time}
                </h1>
            </div >
        );
    }

};

export default PrayerTimes2;