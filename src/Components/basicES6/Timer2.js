import React, { Component } from 'react';
import PrayerTimes from './PrayerTimes';

class Timer2 extends Component {
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

        // Only if prayers exist
        if (newPrayers[0] !== '0') {
            this.setTimer();
        }
    }

    // Check Timer
    setTimer() {
        // get state
        var { nextPrayerIndex,
            now,
            prayer
        } = this.state;

        var treshold = this.props.treshold[nextPrayerIndex] / 1000;

        // calculate delta
        var delta = prayer[nextPrayerIndex] - now;
        if (delta < 0) {
            delta = this.convertToSecond(24, 0, 0) - now + prayer[nextPrayerIndex];
        }

        // Kalo mau nyoba jalanin sequence adzan, lakukan langkah berikut:
        // 1) Cari tahu nilai delta dengan --> Uncomment console.log(delta) --> save untuk refresh web
        // 2) Cari tahu delay praAdzan
        // 3) Kurangi delta dengan X agar nilai akhir delta = Y lebih besar nilai praAdzan
        // 4) Y merupakan waktu tunggu sebelum sequence dimulai, dapat diubah sesuai keinginan
        // 5) Uncomment delta --> save untuk refresh web
        //
        delta = delta - 6350; // (a) 
        console.log(delta); // (b)
        if (delta <= treshold && delta > 0) {
            if (nextPrayerIndex !== 1) {
                this.props.callSequence(delta);
            }
        }

        this.props.updateIndex(nextPrayerIndex);

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

export default Timer2;