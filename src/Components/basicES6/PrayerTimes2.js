import React, { Component } from 'react';

class PrayerTimes2 extends Component {

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