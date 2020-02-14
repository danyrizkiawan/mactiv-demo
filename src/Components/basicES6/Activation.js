import React, { Component } from "react";
import Background from '../../Images/bg.png';
import QR from '../../Images/qr.png';

const style = {
    rootStyle: {
        fontFamily: 'Proxima-SemiBold',
        display: 'flex',
        flexDirection: 'column',
        padding: '100px',
        width: '100%',
        height: '100vh',
        backgroundImage: `url(${Background})`,

    },
    boxStyle: {
        padding: '2rem',
        borderRadius: '50px',
        background: 'linear-gradient(to right, #c766f1, #78cbff)',
        boxShadow: '5px 5px 20px -10px rgba(0,0,0,0.75)'
    },
    h1Style: {
        fontSize: '8rem',
        color: 'white',
        margin: '0',
        textShadow: '4px 4px 15px rgba(0, 0, 0, 0.5)',
    },
    h2Style: {
        fontSize: '8rem',
        color: 'white',
        textShadow: '4px 4px 15px rgba(0, 0, 0, 0.5)',
        margin: '0',
    }
}

class Activation extends Component {

    render() {
        const serialNumber = this.props.serialNumber;
        return (
            <div
                className="text-center"
                style={style.rootStyle}
            >
                <h1
                    className="my-auto"
                    style={style.h1Style}
                >
                    Activate Mactiv Box
                </h1>
                <div className="my-auto">
                    <img src={QR} alt={serialNumber}></img>
                </div>
                {/* <div
                    className="text-center my-auto"
                    style={style.boxStyle}>
                    <h2
                        style={style.h2Style}
                    >
                        {serialNumber}
                    </h2>
                </div> */}
            </div>
        );
    }
}

Activation.propTypes = {

};

export default Activation;