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
                icon: '',
                urban: '',
                subdistrict: '',
                city: '',
            },
            sequence: {
                announce: false,
                normal: true, // change this value to true, for normal sequence
                adzan: false
            },
            delay: {
                jadwal: 120000,
                normal: 15000, // durasi pengumuman
                treshold: [300000, 300000, 300000, 300000, 300000], // timer 
                praAdzan: [300000, 300000, 300000, 300000, 300000],
                durasiAdzan: 180000,
                praIqamah: [300000, 300000, 300000, 300000, 300000],
                waktuSholat: [600000, 600000, 600000, 600000, 600000],
                jumuah: {
                    mode: true,
                    delay: [
                        1800000,
                        900000,
                    ],
                },
                alarm: [0, 0, 0, 0, 0, 0],
            },
            prayer: [
                "00:00",
                "00:00",
                "00:00",
                "00:00",
                "00:00",
                "00:00"
            ],
        }
    }

    componentDidMount() {
        this.getMasjid();
        this.getPrayerTime();
        this.getDelay().then((duration) => {
            console.log(duration);
            this.timerID = setInterval(
                () => this.showInterrupt(),
                duration // durasi jadwal + durasi pengumuman
            );
        });
        this.timerID2 = setInterval(() => {
            this.getPrayerTime();
        }, 7200000);
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

    async getDelay() {
        await Axios.get('http://localhost:5000/getDelay')
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    const result = res.data;
                    console.log(result.durasiJadwal);
                    console.log(result.durasiPengumuman);
                    this.setState({
                        delay: {
                            jadwal: result.durasiJadwal * 1000,
                            normal: result.durasiPengumuman * 1000,
                            treshold: [
                                result.praAdzan[0] * 1000,
                                result.praAdzan[1] * 1000,
                                result.praAdzan[2] * 1000,
                                result.praAdzan[3] * 1000,
                                result.praAdzan[4] * 1000,
                            ],
                            praAdzan: [
                                result.praAdzan[0] * 1000,
                                result.praAdzan[1] * 1000,
                                result.praAdzan[2] * 1000,
                                result.praAdzan[3] * 1000,
                                result.praAdzan[4] * 1000,
                            ],
                            durasiAdzan: result.durasiAdzan * 1000,
                            praIqamah: [
                                result.praIqamah[0] * 1000,
                                result.praIqamah[1] * 1000,
                                result.praIqamah[2] * 1000,
                                result.praIqamah[3] * 1000,
                                result.praIqamah[4] * 1000,
                            ],
                            waktuSholat: [
                                result.waktuSholat[0] * 1000,
                                result.waktuSholat[1] * 1000,
                                result.waktuSholat[2] * 1000,
                                result.waktuSholat[3] * 1000,
                                result.waktuSholat[4] * 1000,
                            ],
                            jumuah: {
                                mode: result.jumuah.mode,
                                delay: [result.jumuah.delay[0] * 1000, result.jumuah.delay[1] * 1000],
                            },
                            alarm: result.alarm,
                        },
                    })
                }
            }).catch(err => {
                console.log(err);
            });
        return this.state.delay.jadwal + this.state.delay.normal;
    }

    getMasjid() {
        Axios.get('http://localhost:5000/getDataMasjid')
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    const result = res.data;
                    this.setState({
                        masjid: {
                            name: result.masjidName,
                            address: result.address,
                            icon: result.photo,
                            urban: result.kelurahan,
                            subdistrict: result.kecamatan,
                            city: result.kota,
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
                // console.log("In Normal loop");
            }
        }
    }

    callSequence = (delta) => {
        let { sequence, delay, nextPrayerIndex } = this.state;
        var ptDuration;
        if (new Date().getDay() === 5 && delay.jumuah.mode) {
            ptDuration = delay.praAdzan[nextPrayerIndex] + delay.durasiAdzan + delay.jumuah.delay[0] + delay.jumuah.delay[1];
        } else {
            ptDuration = delay.praAdzan[nextPrayerIndex] + delay.durasiAdzan + delay.praIqamah[nextPrayerIndex] + delay.waktuSholat[nextPrayerIndex];
        }
        // console.log(ptDuration);

        if (sequence.adzan === false) {
            console.log("Start Adzan loop");
            var newPraAdzan = delay.praAdzan;
            newPraAdzan[nextPrayerIndex] = delta * 1000;
            console.log(newPraAdzan);

            this.setState({
                delay: {
                    pengumuman: delay.pengumuman,
                    normal: delay.normal,
                    treshold: delay.treshold,
                    praAdzan: newPraAdzan,
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

                this.getDelay().then((duration) => {
                    console.log("Interval cleared");
                    clearInterval(this.timerID);
                    this.timerID = setInterval(
                        () => this.showInterrupt(),
                        duration // durasi jadwal + durasi pengumuman
                    );
                });
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
            // console.log("Tampilan Announce");
            message = '';
            message2 = 'd-none';
        } else {
            // console.log("Tampilan Jadwal");
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