import React from 'react';
import style from './Timer.module.css'

class Timer extends React.Component {
  render(){
    const { time } = this.props;
    return(
      <div className={style.timer}><p>Timer:</p>
        <div className={style.timer_screen}>
          <span>{(time.hour < 10)? "0" + time.hour : time.hour}</span>
          <span>{(time.min < 10)? "0" + time.min : time.min}</span>
          <span>{(time.sec < 10)? "0" + time.sec : time.sec}</span>
        </div>
      </div>
    )
  }
}

export default Timer;