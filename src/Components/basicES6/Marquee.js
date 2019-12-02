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
            right: ''
        }
    }

    componentDidMount() {
        this.getMasjid();
        this.setState({
            right: '0px'
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

    runningText() {
        let right = this.state.right;

        this.setState({
            right: right
        })
    }

    render() {
        const { masjid, right } = this.state;
        return (
            <div style={{
                //position: 'absolute',
                transform: 'translateX('+right+')',
                whiteSpace: 'nowrap',
            }}>
                <h1>Selamat datang di {masjid.name}  |  Untuk menjaga ketenangan, mohon non-aktifkan HP Anda.  |  Selamat datang di {masjid.name}  |  Jaga dan awasi barang bawaan Anda.</h1>
            </div>
        );
    }

};

export default Marquee;