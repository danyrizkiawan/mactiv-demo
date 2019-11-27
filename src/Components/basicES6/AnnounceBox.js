import React, { Component } from 'react';

import icon from '../../Images/smoke.png';

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
    borderLeft: {
        borderLeftStyle: 'solid',
        borderLeftWidth: '5px',
        borderLeftColor: '#E6E6E6'
    }
}

const AnnounceText = ['Dilarang merokok di kawasan Masjid!',];
const AnnounceIcon = [icon,]

class AnnounceBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            iconIndex: 0,
            textIndex: 0,
        }

    }
    render() {
        const { iconIndex, textIndex } = this.state;
        return (
            <div
                className="row p-5 h-100"
                style={announceStyle.rootStyle}>
                <div className="col-md-3 align-self-center">
                    <img
                        src={AnnounceIcon[iconIndex]}
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
                            {AnnounceText[textIndex]}
                        </h1>
                    </div>
                </div>
            </div>
        );
    }

};

export default AnnounceBox;