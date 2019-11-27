import React, { Component } from 'react';
import SecondLayout from './SecondLayout';
import SecondAnnounceLayout from './SecondAnnounceLayout';
import Axios from 'axios';

class BaseLayout extends Component {

    constructor(props) {
        super(props);

        this.state = {
            announce: false,
            sequence: {
                normal: false,
                adzan: false
            },
            delay: {
                normal: 15000,
                praAdzan: 300000,
                onAdzan: 180000,
                praIqamah: 120000,
                shalatDuration: 600000
            },
            prayer: [
                "00:00",
                "00:00",
                "00:00",
                "00:00",
                "00:00",
                "00:00"
            ]
        }
    }

    componentDidMount() {
        this.getPrayerTime();
        this.timerID2 = setInterval(() => {
            this.getPrayerTime();
        }, 7200000);
        this.timerID = setInterval(
            () => this.showInterrupt()
            , 135000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
        clearInterval(this.timerID2);
    }

    checkFormat(p) {
        if (p.length === 4) {
            p = '0' + p;
        }
        return p;
    }

    getPrayerTime() {
        const serialNumber = this.props.serialNumber;
        Axios.post('https://devMactiv.mybluemix.net/api/masjidBox/getPrayerTime',
            {
                serialNumber
            }).then(res => {
                console.log(res);
                if (res.status === 200) {
                    const pt = res.data;
                    this.setState({
                        prayer: [
                            this.checkFormat(pt.fajr),
                            this.checkFormat(pt.sunrise),
                            pt.zuhr,
                            pt.asr,
                            pt.maghrib,
                            pt.isya
                        ]
                    })
                }
            }).catch(err => {
                console.log("Serial Number Not Found");
            })
    }

    showInterrupt() {
        let { sequence, delay } = this.state;
        var ptDuration = delay.praAdzan + delay.onAdzan + delay.praIqamah + delay.shalatDuration;


        if (sequence.normal) {
            console.log("Normal loop");
            this.setState({
                announce: true
            })

            setTimeout(() => {
                this.setState({
                    announce: false
                })
            }, delay.normal);
        } else {
            if (sequence.adzan === false) {
                console.log("Start Adzan loop");
                this.setState({
                    announce: true,
                    sequence: {
                        normal: false,
                        adzan: true
                    }
                })
                setTimeout(() => {
                    this.setState({
                        announce: false,
                        sequence: {
                            normal: true,
                            adzan: false
                        }
                    })
                    console.log("Stop Adzan loop");
                }, ptDuration);
            } else {
                console.log("In Adzan loop");
            }
        }
    }

    render() {
        let message;
        let { announce, prayer, sequence, delay } = this.state;
        if (announce) {
            message = <SecondAnnounceLayout prayer={prayer} sequence={sequence} delay={delay} />
        }
        return (
            <div>
                {message}
                <SecondLayout prayer={prayer} />
            </div>
        )
    }
}

export default BaseLayout;