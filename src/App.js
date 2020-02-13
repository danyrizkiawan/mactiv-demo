import React, { Component } from 'react';
import './App.css';
import BaseLayout from './Components/basicES6/BaseLayout';
import Activation from './Components/basicES6/Activation';
import Axios from 'axios';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isActivated: false,
            serialNumber: ['AL20-0001-ABCD', 'XLBvtdftWH7oGwGNmAjs', 'ChXiGf5Y6LCMG67lNfwT'],
        }

    }

    componentDidMount() {
        this.checkStatus();
        this.timerID = setInterval(() => {
            if (!this.state.isActivated)
                this.checkStatus();
        }, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    checkStatus() {
        Axios.get('http://localhost:5000/getDataMasjid').then(res => {
            console.log(res.status);
            if (res.status === 200) {
                this.setState({ isActivated: true })
            }
        }).catch(err => {
            console.log("Serial Number Not Found");
        })
    }

    render() {
        const { isActivated, serialNumber } = this.state;
        return (
            <div>
                {isActivated
                    ? <BaseLayout serialNumber={
                        serialNumber[0]
                    }
                    /> : <Activation serialNumber={serialNumber[0]} />
                }
            </div>
        )
    }
}

export default App;