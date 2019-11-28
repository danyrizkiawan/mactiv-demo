import React, { Component } from 'react';
import SecondLayout from './SecondLayout';
import SecondAnnounceLayout from './SecondAnnounceLayout';
import Axios from 'axios';

class BaseLayout extends Component {

    constructor(props) {
        super(props);

        this.state = {
            masjid: {
                name: '',
                address: '',
                icon: ''
            },
            announce: false,
            sequence: {
                normal: true, // change this value to true, for normal sequence
                adzan: false
            },
            delay: {
                normal: 15000,
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
        this.getMasjid();
        this.getPrayerTime();
        this.getDelay();
        this.timerID2 = setInterval(() => {
            this.getPrayerTime();
        }, 7200000);
        this.timerID = setInterval(
            () => this.showInterrupt()
            , 13500
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
        Axios.get('http://localhost:5000/getPrayerTime')
            // Axios.post('https://devMactiv.mybluemix.net/api/masjidBox/getPrayerTime',
            //     {
            //         serialNumber
            //     })
            .then(res => {
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
                console.log(err);
            })
    }

    getDelay() {
        Axios.get('http://localhost:5000/getDelay')
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    const result = res.data;
                    this.setState({
                        delay: {
                            praAdzan: result.praAdzan * 1000,
                            durasiAdzan: result.durasiAdzan * 1000,
                            praIqamah: result.praIqamah * 1000,
                            waktuSholat: result.waktuSholat * 1000,
                        },
                    })
                }
                console.log(this.state.delay);

            }).catch(err => {
                console.log(err);
            })
    }
    getMasjid() {
        Axios.get('http://localhost:5000/getDataMasjid')
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    const result = res.data;
                    this.setState({
                        masjid: {
                            name: result.nama,
                            address: result.alamat,
                            icon: result.icon,
                        },
                    })
                }

            }).catch(err => {
                console.log(err);
            })
    }

    showInterrupt() {
        let { sequence, delay } = this.state;
        var ptDuration = delay.praAdzan + delay.durasiAdzan + delay.praIqamah + delay.waktuSholat;


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
        let { announce, prayer, sequence, delay, masjid } = this.state;
        if (announce) {
            message = <SecondAnnounceLayout prayer={prayer} sequence={sequence} delay={delay} masjid={masjid} />
        }
        return (
            <div>
                {message}
                <SecondLayout prayer={prayer} masjid={masjid} />
            </div>
        )
    }
}

export default BaseLayout;