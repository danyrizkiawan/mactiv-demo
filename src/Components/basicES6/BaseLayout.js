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
            sequence: {
                announce: false,
                normal: true, // change this value to true, for normal sequence
                adzan: false
            },
            delay: {
                normal: 15000,
                treshold: 300000,
                praAdzan: 300000,
                durasiAdzan: 180000,
                praIqamah: 300000,
                waktuSholat: 600000,
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
        Axios.get('http://localhost:5000/getPrayerTime')
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
                            normal: 15000,
                            treshold: result.praAdzan * 1000,
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
        if (sequence.normal) {
            console.log("Normal loop");
            this.setState({
                sequence: {
                    announce: true,
                    normal: true,
                    adzan: false
                }
            })

            setTimeout(() => {
                this.setState({
                    sequence: {
                        announce: false,
                        normal: true,
                        adzan: false
                    }
                })
            }, delay.normal);
        } else {
            if (sequence.adzan === true) {
                console.log("In Adzan loop");
            } else {
            }
        }
    }

    callSequence = (delta) => {
        let { sequence, delay } = this.state;
        var ptDuration = delay.praAdzan + delay.durasiAdzan + delay.praIqamah + delay.waktuSholat;
        if (sequence.adzan === false) {
            console.log("Start Adzan loop");
            this.setState({
                delay: {
                    normal: 15000,
                    treshold: delay.treshold,
                    praAdzan: delta * 1000,
                    durasiAdzan: delay.durasiAdzan,
                    praIqamah: delay.praIqamah,
                    waktuSholat: delay.waktuSholat,
                },
            })
            this.setState({
                sequence: {
                    announce: true,
                    normal: false,
                    adzan: true
                }
            })
            setTimeout(() => {
                this.setState({
                    sequence: {
                        announce: false,
                        normal: true,
                        adzan: false
                    }
                })
                console.log("Stop Adzan loop");
            }, ptDuration);
        }
    }

    updateIndex = (index) => {
        this.setState({
            nextPrayerIndex: index
        })
    }


    render() {
        let message, message2;
        let { prayer, sequence, delay, masjid, nextPrayerIndex } = this.state;
        if (sequence.announce) {
            message = '';
            message2 = 'd-none';
        } else {
            message = 'd-none';
            message2 = '';
        }
        return (
            <div>
                <div className={message}>
                    <SecondAnnounceLayout prayer={prayer} sequence={sequence} delay={delay} masjid={masjid} next={nextPrayerIndex} />
                </div>
                <div className={message2}>
                    <SecondLayout prayer={prayer} masjid={masjid} treshold={delay.treshold} callSequence={this.callSequence} updateIndex={this.updateIndex} />
                </div>
            </div>
        )
    }
}

export default BaseLayout;