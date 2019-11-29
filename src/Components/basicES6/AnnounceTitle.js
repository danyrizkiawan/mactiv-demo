import React, { Component } from 'react';
import Timer3 from './Timer3';

var style = {
    h1Style: {
        display: 'inline',
        fontSize: '100px',
        color: '#F3D689',
        margin: '0',
        // textShadow: '4px 4px 15px rgba(0, 0, 0, 0.5)',
    },
    h2Style: {
        display: 'inline',
        color: 'white',
        fontFamily: 'Philosopher-BoldItalic',
        fontSize: '100px',
        margin: '0',
        marginLeft: '50px',
    },
}

class AnnounceTitle extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nextPrayer: [
                'SHUBUH',
                'SYURUQ',
                'DZUHUR',
                'ASHAR',
                'MAGHRIB',
                "ISYA'"
            ]
        }
    }

    render() {
        const { index, delay, masjid, next } = this.props;
        const { nextPrayer } = this.state;
        let content;
        switch (index) {
            case 0:
                content = <div><h1 style={style.h1Style}>{masjid.name}</h1></div>
                break;
            case 1:
                content = <Timer3 text={"NEXT: " + nextPrayer[next]} duration={delay.praAdzan} />
                break;
            case 2:
                content = <div><h1 style={style.h1Style}>ADZAN</h1></div>
                break;
            case 3:
                content = <Timer3 text={"IQAMAH"} duration={delay.praIqamah} />
                break;
            default:
                break;
        }
        return (
            <div>
                {content}
            </div>
        );
    }

};

export default AnnounceTitle;