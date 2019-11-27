import React, { Component } from 'react';
import './App.css';
import BaseLayout from './Components/basicES6/BaseLayout';
import Activation from './Components/basicES6/Activation';
import Axios from 'axios';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isActivated: true,
            serialNumber: ['CSyn5tSKH5HMLH8bQ0FS', 'XLBvtdftWH7oGwGNmAjs', 'ChXiGf5Y6LCMG67lNfwT'],
            key: ['qGbfNNmNukoibRyjukXEr', '8pv0gcip20xUfvZf1n55', 'dB7y8XPlYNJUhSJ51w0q']
        }

    }

    componentDidMount() {
        // this.timerID = setInterval(() => {
        //     if (!this.state.isActivated)
        //         this.checkStatus();
        // }
        //     , 5000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    checkStatus() {
        const serialNumber = this.state.serialNumber;
        Axios.post('https://devMactiv.mybluemix.net/api/masjidBox/sync', {
            serialNumber: serialNumber[0],
            force: 1
        }).then(res => {
            console.log(res);
            if (res.data.masjidId) {
                this.setState({ isActivated: true })
            }
        }).catch(err => {
            console.log("Serial Number Not Found");
        })
    }

    render() {
        const { isActivated, serialNumber, key } = this.state;
        return (
            <div>
                {isActivated
                    ? <BaseLayout serialNumber={
                        serialNumber[0]
                    }
                    /> : <Activation serialNumber={key[0]} />
                }
            </div>
        )
    }
}

export default App;