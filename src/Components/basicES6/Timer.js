import React, { Component } from 'react';
import PrayerTimes from './PrayerTimes';

class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timer: '00:00:00',
            now: 0,
            nextPrayerIndex: 0,
            nextPrayer: [
                'Shubuh',
                'Syuruq',
                'Dzuhur',
                'Ashar',
                'Maghrib',
                "Isya'"
            ]
        };
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        // Get current time
        const hour = new Date().getHours();
        const minute = new Date().getMinutes();
        const second = new Date().getSeconds();

        // Convert current time to second
        const now = this.convertToSecond(hour, minute, second);

        // Get prayer times
        const prayers = this.props.prayer;
        const newPrayers = [];
        prayers.forEach((prayer) => {
            // Convert prayer times to second
            newPrayers.push(this.convertPrayerTime(prayer));
        });

        // Check next prayertimes
        var nextPrayerIndex = 0;
        for (let index = 0; index < newPrayers.length; index++) {
            if (now < newPrayers[index]) {
                nextPrayerIndex = index;
                break;
            }
        }

        // Save all to state
        this.setState({
            nextPrayerIndex,
            now,
            prayer: newPrayers
        });

        if (newPrayers[0] !== '0')
            this.setTimer();
    }

    setTimer() {
        // get state
        var { nextPrayerIndex,
            now,
            prayer
        } = this.state;

        // calculate delta
        var delta = prayer[nextPrayerIndex] - now;
        if (delta < 0) {
            delta = this.convertToSecond(24, 0, 0) - now + prayer[nextPrayerIndex];
        }

        // Convert delta to time format and save to state
        this.setState({
            timer: this.convertToTimeFormat(delta)
        })
    }

    convertToSecond(hour, minute, second) {
        const total = hour * 3600 + minute * 60 + second;
        return total;
    }

    convertPrayerTime(time) {
        var hour = Number(time[0] + time[1]);
        var minute = Number(time[3] + time[4]);
        return this.convertToSecond(hour, minute, 0);
    }

    convertToTimeFormat(second) {
        var sec_num = parseInt(second); // don't forget the second param
        var hours = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours < 10) { hours = "0" + hours; }
        if (minutes < 10) { minutes = "0" + minutes; }
        if (seconds < 10) { seconds = "0" + seconds; }
        return hours + ':' + minutes + ':' + seconds;
    }

    addZero(number) {
        var res = "";
        if (number < 10) {
            res = "0";
        }
        return res;
    }

    render() {
        const { start, end } = this.props;
        const { nextPrayer, nextPrayerIndex } = this.state;
        return (
            <div>
                <PrayerTimes
                    title={"next : " + nextPrayer[nextPrayerIndex]}
                    time={this.state.timer}
                    start={start}
                    end={end}
                />
            </div>
        );
    }
}

export default Timer;