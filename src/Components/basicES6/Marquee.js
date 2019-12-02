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
                //position: 'absolute',
                transform: 'translateX('+left+'px)'
            }}>
                <h1>Selamat datang di {masjid.name}  |  Untuk menjaga ketenangan, mohon non-aktifkan HP Anda.  |  Selamat datang di {masjid.name}  |  Jaga dan awasi barang bawaan Anda.</h1>
            </div>
        );
    }

};

export default Marquee;