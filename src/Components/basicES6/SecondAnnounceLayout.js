import React, { Component } from "react";
import AnnounceBox from "./AnnounceBox";
import PrayerTimes2 from "./PrayerTimes2";
import Clock2 from "./Clock2";
import AnnounceTitle from "./AnnounceTitle";

const style = {
    rootStyle: {
        position: 'absolute',
        left: '0px',
        top: '0px',
        zIndex: '100',
        fontFamily: 'Philosopher-Bold',
        display: 'flex',
        flexDirection: 'column',
        padding: '50px',
        width: '100%',
        height: '100vh',
        background: 'linear-gradient(to bottom, #1E3860, #101F33)',

    },
    boxStyle: {
        height: '150px',
        padding: '0px',
    },
    line: {
        borderLeft: 'thick solid #ff0000',
        borderColor: 'white',
        borderLeftStyle: 'dashed'
    },
    h1Style: {
        fontSize: '100px',
        color: '#F3D689',
        margin: '0',
        textShadow: '4px 4px 15px rgba(0, 0, 0, 0.5)',
    },
    h2Style: {
        fontSize: '8rem',
        color: 'white',
        textShadow: '4px 4px 15px rgba(0, 0, 0, 0.5)',
        margin: '0',
    },
    font: {
        h1: '80px',
        h2: '60px',
    }
}

class SecondAnnounceLayout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            index: 0
        };

    }

    componentDidMount() {
        // Get props
        let { sequence } = this.props;
        // Check if adzan sequence
        if (sequence.adzan) {
            // If true, play sequence
            this.startSequence();
        }
    }

    startSequence() {
        let { delay } = this.props;
        let totalDelay = 0;
        const adzanAlert = new Audio("http://localhost:3000/Audios/adzan.wav");
        const iqamahAlert = new Audio("http://localhost:3000/Audios/iqamah.wav");
        console.log("Start Timer");

        this.setState({
            index: 1
        });

        totalDelay = totalDelay + delay.praAdzan;

        setTimeout(() => {
            this.setState({
                index: 2
            });
            adzanAlert.play();
            console.log("Start Adzan");
        }, totalDelay);

        totalDelay = totalDelay + delay.durasiAdzan;
        setTimeout(() => {
            this.setState({
                index: 3
            });
            console.log("Start Timer Iqamah");
        }, totalDelay);

        totalDelay = totalDelay + delay.praIqamah;
        setTimeout(() => {
            this.setState({
                index: 4
            });
            iqamahAlert.play();
            console.log("Start Shalat");
        }, totalDelay);

        totalDelay = totalDelay + delay.waktuSholat;
        setTimeout(() => {
            this.setState({
                index: 5
            });
            console.log("End Sequence");
        }, totalDelay);
    }


    render() {
        const { prayer, delay, masjid } = this.props;
        return (
            <div
                className="text-center"
                style={style.rootStyle}
            >
                <AnnounceTitle index={this.state.index} delay={delay} masjid={masjid} />
                <div
                    className="my-5"
                    style={{ height: '575px' }}>
                    <AnnounceBox />
                </div>
                <div
                    className="row text-center d-flex justify-content-between align-middle"
                    style={style.boxStyle}>
                    <div className="col-md-9 my-auto" >
                        <div className="row d-flex justify-content-around">
                            <PrayerTimes2
                                title="Shubuh"
                                time={prayer[0]}
                                size={style.font}
                            />
                            <PrayerTimes2
                                title="Dzuhur"
                                time={prayer[2]}
                                size={style.font}

                            />
                            <PrayerTimes2
                                title="Ashar"
                                time={prayer[3]}
                                size={style.font}
                            />
                            <PrayerTimes2
                                title="Maghrib"
                                time={prayer[4]}
                                size={style.font}
                            />
                            <PrayerTimes2
                                title="Isya'"
                                time={prayer[5]}
                                size={style.font}
                            />
                        </div>
                    </div>
                    <div className="col-md-3 p-0 my-auto" style={style.line} >
                        <Clock2 />
                    </div>
                </div>
            </div>
        );
    }
}


export default SecondAnnounceLayout;