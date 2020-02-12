import React, { Component } from 'react';
import Clock2 from './Clock2';
import PrayerTimes2 from './PrayerTimes2';
import UserAvatar from 'react-user-avatar';
import Marquee from './Marquee';
import Logo from '../../Images/logo.png';

import {
    Row
} from 'reactstrap';
import Timer2 from './Timer2';

var layoutStyle = {
    rootStyle: {
        padding: '50px 50px',
        width: '100%',
        height: '100vh',
        background: 'linear-gradient(to bottom, #1E3860, #101F33)',
        overflowY: 'hidden'
    },
    topStyle: {
        marginRight: '77px',
        padding: '0',
        color: 'white',
    },
    rightStyle: {
        padding: '0',
    },
    h2Style: {
        fontFamily: 'Philosopher-Bold',
        fontSize: '40px',
        lineHeight: '.8',
        color: 'white',
        margin: '0',
        paddingTop: '0.5rem',
    },
    h1Style: {
        fontFamily: 'Philosopher-Bold',
        fontSize: '60px',
        letterSpacing: '0px',
        lineHeight: '1',
        color: '#F3D689',
        margin: '0',
    },
    prayerStyle: {
        padding: '0'
    },
    runningText: {
        position: 'fixed',
        bottom: '0',
        left: '0',
        width: '100%',
        zIndex: '99',
        background: 'white',
        borderTopLeftRadius: '30px',
        borderTopRightRadius: '30px',
        padding: '15px 0 15px 0',
        whiteSpace: 'nowrap',
        fontFamily: 'Merriweather-Bold',
        color: '#18273C',
        fontSize: '40px',
        overflowX: 'hidden',
    },
    lineStyle: {
        border: '1px solid white',
    },
    font: {
        h1: '180px',
        h2: '120px',
    },
    icon: {
        height: '120px',
        borderRadius: '20px'
    }
}
class SecondLayout extends Component {

    render() {
        const { prayer, masjid } = this.props;
        return (
            <div className="" style={layoutStyle.rootStyle}>
                <Row>
                    <div className="col-md-1 text-center pl-5">
                        <UserAvatar size="110" name="Masjid" color="#FFF"
                            src={Logo}
                        />
                    </div>
                    <div className="col-md-8 text-left">
                        <h1 className="pl-4" style={layoutStyle.h1Style}>{masjid.name}</h1>
                        <h2 className="pl-4" style={layoutStyle.h2Style}>{masjid.address}, {masjid.urban}, {masjid.subdistrict}, {masjid.city}</h2>
                    </div>
                    <div className="col-md-3 pull-right">
                        <Clock2 />
                    </div>
                </Row>
                <div>
                    <hr style={layoutStyle.lineStyle}>
                    </hr>
                </div>
                <Row className="my-5 justify-content-between">
                    <div className="col-md-4">
                        <PrayerTimes2
                            title="Shubuh"
                            time={prayer[0]}
                            size={layoutStyle.font}
                        />
                    </div>
                    <div className="col-md-4">
                        <PrayerTimes2
                            title="Shuruq"
                            time={prayer[1]}
                            size={layoutStyle.font}
                        />
                    </div>
                    <div className="col-md-4">
                        <PrayerTimes2
                            title="Dzuhur"
                            time={prayer[2]}
                            size={layoutStyle.font}
                        />
                    </div>
                </Row>
                <Row className="my-5 justify-content-between">
                    <div className="col-md-4">
                        <PrayerTimes2
                            title="Ashar"
                            time={prayer[3]}
                            size={layoutStyle.font}
                        />
                    </div>
                    <div className="d-none">
                        <Timer2
                            prayer={prayer}
                            start="#b9e6f9"
                            end="#5bb3fd"
                            callSequence={this.props.callSequence}
                            updateIndex={this.props.updateIndex}
                            treshold={this.props.treshold}
                        />
                    </div>
                    <div className="col-md-4">
                        <PrayerTimes2
                            title="Maghrib"
                            time={prayer[4]}
                            size={layoutStyle.font}
                        />
                    </div>
                    <div className="col-md-4">
                        <PrayerTimes2
                            title="Isya'"
                            time={prayer[5]}
                            size={layoutStyle.font}
                        />
                    </div>
                </Row>
                <div style={layoutStyle.runningText}>
                    <Marquee />
                </div>
            </div>
        );
    }
}


export default SecondLayout;