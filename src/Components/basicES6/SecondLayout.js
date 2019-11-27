import React, { Component } from 'react';
import Clock from './Clock';
import PrayerTimes from './PrayerTimes';
import Timer from './Timer';
import Background from '../../Images/bg.png';

import {
    Row
} from 'reactstrap';

var layoutStyle = {
    rootStyle: {
        padding: '100px',
        width: '100%',
        height: '100vh',
        backgroundImage: `url(${Background})`
    },
    leftStyle: {
        width: '633px',
        height: '250px',
        marginRight: '77px',
        padding: '0'
    },
    verseStyle: {
        height: '265px',
        fontFamily: 'Mont-Regular',
        fontSize: '2.8rem',
        color: 'white'
    },
    prayerStyle: {
        width: '440px',
        marginLeft: '65px',
        marginBottom: '65px',
        marginRight: '0',
        padding: '0'
    }
}
class SecondLayout extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        const prayer = this.props.prayer;
        return (
            <div className="" style={layoutStyle.rootStyle}>
                <Row>
                    <div
                        className="my-auto"
                        style={layoutStyle.leftStyle}
                    >
                        <Clock />
                    </div>
                    <div style={layoutStyle.prayerStyle}>
                        <PrayerTimes
                            title="Shubuh"
                            time={prayer[0]}
                            start="#ff3662"
                            end="#ff9daf"
                        />
                    </div>
                    <div style={layoutStyle.prayerStyle}>
                        <PrayerTimes
                            title="Syuruq"
                            time={prayer[1]}
                            start="#ffac15"
                            end="#fffe50"
                        />
                    </div>
                </Row>
                <Row>
                    <div style={layoutStyle.leftStyle}>
                        <p style={layoutStyle.verseStyle}>
                            "Sesungguhnya shalat itu<br></br>
                            mencegah dari perbuatan<br></br>
                            keji dan mungkar."
                            <br></br>
                            <b>(QS. Al'Ankabut[29]:45)</b>
                        </p>
                    </div>
                    <div style={layoutStyle.prayerStyle}>
                        <PrayerTimes
                            title="Dzuhur"
                            time={prayer[2]}
                            start="#1ed6b4"
                            end="#8bf3dc"
                        />
                    </div>
                    <div style={layoutStyle.prayerStyle}>
                        <PrayerTimes
                            title="Ashar"
                            time={prayer[3]}
                            start="#0bc2e4"
                            end="#7be3fc"
                        />
                    </div>
                </Row>
                <Row>
                    <div style={layoutStyle.leftStyle}>
                        <Timer
                            prayer={prayer}
                            start="#b9e6f9"
                            end="#5bb3fd"
                        />
                    </div>
                    <div style={layoutStyle.prayerStyle}>
                        <PrayerTimes
                            title="Maghrib"
                            time={prayer[4]}
                            start="#4977e7"
                            end="#74caf9"
                        />
                    </div>
                    <div style={layoutStyle.prayerStyle}>
                        <PrayerTimes
                            title="Isya'"
                            time={prayer[5]}
                            start="#c766f1"
                            end="#78cbff"
                        />
                    </div>
                </Row>
            </div>
        );
    }
}


export default SecondLayout;