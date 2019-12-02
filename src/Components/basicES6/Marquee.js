import React, { Component } from 'react';
import Axios from 'axios';

class Marquee extends Component {
    constructor(props) {
        super(props);

        this.state = {
            masjid: {
                name: '',
                address: '',
                icon: ''
            },
            left: 0 
        }
    }

    componentDidMount() {
        this.getMasjid();
        this.timerID = setInterval(
            () => this.runningText(),
            10
        );
        this.timerID2 = setInterval(
            () => this.setState({left: 0}),
            135000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
        clearInterval(this.timerID2);
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

    runningText() {
        let left = this.state.left;
        left = left -(1920/2000)
        this.setState({
            left: left
        })
    }

    render() {
        const { masjid, left } = this.state;
        return (
            <div style={{
                display: 'inline-block',
                transform: 'translateX('+left+'px)',
            }}>
                <span>Selamat datang di {masjid.name}  |  Untuk menjaga ketenangan, mohon non-aktifkan HP Anda  |  Jaga dan awasi barang bawaan Anda  |  Selamat datang di {masjid.name}  |  Utamakan shalat berjamaah  |  Jagalah kebersihan Masjid, buang sampah pada tempatnya  |  Selamat datang di {masjid.name}  |  Mohon menggunakan pakaian yang sopan dan menutup aurat  |  Dilarang merokok di dalam Masjid  |  Jaga dan awasi anak-anak Anda  |  </span>
                <span>Selamat datang di {masjid.name}  |  Untuk menjaga ketenangan, mohon non-aktifkan HP Anda  |  Jaga dan awasi barang bawaan Anda  |  Selamat datang di {masjid.name}  |  Utamakan shalat berjamaah  |  Jagalah kebersihan Masjid, buang sampah pada tempatnya  |  Selamat datang di {masjid.name}  |  Mohon menggunakan pakaian yang sopan dan menutup aurat  |  Dilarang merokok di dalam Masjid  |  Jaga dan awasi anak-anak Anda  |  </span>
            </div>
        );
    }

};

export default Marquee;