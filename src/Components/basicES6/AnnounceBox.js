import React, { Component } from 'react';

import {
    SmokeAlert,
    ChildAlert,
    MuteAlert,
    HandBagAlert,
    JamaahAlert,
    PhoneAlert,
    BinAlert,
    AuratAlert
} from '../../Images/index';

var announceStyle = {
    rootStyle: {
        borderTopLeftRadius: '100px',
        borderTopRightRadius: '100px',
        background: 'white',
        boxShadow: '5px 5px 20px -10px rgba(0,0,0,0.75)',
    },
    h1Style: {
        fontFamily: 'Merriweather-Bold',
        fontSize: '90px',
        letterSpacing: '-2px',
        color: 'black',
        textAlign: 'left',
        margin: '0 100px'
    },
    iconStyle: {
        width: '360px'
    },
    borderLeft: {
        borderLeftStyle: 'solid',
        borderLeftWidth: '5px',
        borderLeftColor: '#E6E6E6'
    }
}

const AnnounceText = [
    "Utamakan shalat berjamaah.",
    "Untuk menjaga ketenangan, mohon non-aktifkan HP Anda.",
    "Jaga dan awasi barang bawaan Anda.",
    "Jagalah kebersihan Masjid, buang sampah pada tempatnya.",
    "Jaga dan awasi anak-anak Anda.",
    "Mohon menggunakan pakaian yang sopan dan menutup aurat.",
    "Dilarang merokok di kawasan Masjid!",
    "Dilarang berbicara ketika khotib sedang berkhutbah.",
];

const AnnounceIcon = [
    JamaahAlert,
    PhoneAlert,
    HandBagAlert,
    BinAlert,
    ChildAlert,
    AuratAlert,
    SmokeAlert,
    MuteAlert,
];

class AnnounceBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            index: 0,
        }
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.changeAnnounce()
            , 15000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    changeAnnounce() {
        let index = this.state.index;
        index = index + 1;
        if (index === (AnnounceIcon.length - 1)) {
            index = 0;
        }
        this.setState({
            index: index
        })
    }

    render() {
        let { index } = this.state;
        return (
            <div
                className="row p-5 h-100"
                style={announceStyle.rootStyle}>
                <div className="col-md-3 align-self-center">
                    <img
                        src={AnnounceIcon[index]}
                        alt="Icon"
                        style={announceStyle.iconStyle} />
                </div>
                <div
                    className="col-md-9 h-100"
                    style={announceStyle.borderLeft}>
                    <div className="row h-100">
                        <h1
                            className="align-self-center"
                            style={announceStyle.h1Style}>
                            {AnnounceText[index]}
                        </h1>
                    </div>
                </div>
            </div>
        );
    }

};

export default AnnounceBox;