import React, { Component } from 'react';
import { Observable } from 'rxjs'

import Buttons from '../Buttons/Buttons';
import Timer from '../Timer/Timer';

import style from './Stopwatch.module.css';

const defaultTimerValue = {
  hour: 0,
  min: 0,
  sec: 0,
};

class Stopwatch extends Component {
  state = {
    time: defaultTimerValue,
    intervalTimer: null,
    timerStream$: null
  }

  checkTimerUpdates = () => {
    const { time } = this.state;
    const updatedTime = { ...time };

    if(updatedTime.sec === 60){
      updatedTime.min++;
      updatedTime.sec = 0;
    }

    if(updatedTime.min === 60){
      updatedTime.hour++;
      updatedTime.min = 0;
    }

    updatedTime.sec++;

    this.setState({
      time: updatedTime
    });
  }

  startTimer = (isResetTime) => {
    if (isResetTime) {
      this.setState({
        time: defaultTimerValue
      });
    }

    const stream$ = new Observable(observer => {

      const interval = setInterval(() => observer.next(), 1000);
      
      this.setState({
        intervalTimer: interval
      });
    })

    stream$.subscribe(res => {
      this.checkTimerUpdates.call(this);
    });

    this.setState({
      timerStream$: stream$
    });
  }

  stopTimer = () => {
    const { intervalTimer } = this.state;

    if (intervalTimer) {
      clearInterval(intervalTimer);
    }

    this.setState({
      intervalTimer: null,
      timerStream$: null
    });
  }

  resetTimer = () => {
    const { intervalTimer } = this.state;

    if (intervalTimer) {
      clearInterval(intervalTimer);
    }

    this.setState({
      time: defaultTimerValue,
      intervalTimer: null,
      timerStream$: null
    });
  }

  waitTimer = () => {
    const { intervalTimer } = this.state;

    if (intervalTimer) {
      this.stopTimer();
    } else {
      this.startTimer(false)
    }
  }

  render() {
    const { time } = this.state;
    
    return(
      <div className={style.stopwatch_wrapper}>
        <Timer time={time}/>
        <Buttons 
          startTimer={this.startTimer}
          stopTimer={this.stopTimer} 
          resetTimer={this.resetTimer}
          waitTimer={this.waitTimer}
        />
      </div>
    )
  }
}

export default Stopwatch;