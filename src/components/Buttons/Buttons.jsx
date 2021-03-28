import React from 'react';

import style from './Buttons.module.css';

class Buttons extends React.Component {
  state = {
    startButtonStatus: 'Start',
    isWait: false,
    waitButtonTimer: null
  }

  setStartButtonStatus = () =>{
    this.setState(prevState => ({
      startButtonStatus: prevState.startButtonStatus === 'Start' ? 'Stop' : 'Start',
    }));
  }

  handleTimerStartButton = () => {
    const { startTimer, stopTimer } = this.props;
    const { startButtonStatus, isWait } = this.state;

    if (startButtonStatus === 'Start') {
      const isResetTimer = isWait ? false : true;

      startTimer(isResetTimer);

      this.setState({
        isWait: false
      });
    } else {
      stopTimer();
    }

    this.setStartButtonStatus();
  }

  handleWaitTimerButton = () => {
    const { waitTimer } = this.props;
    const { waitButtonTimer, startButtonStatus } = this.state;

    const currentTime = new Date();

    if (startButtonStatus === 'Start')
      return;

    if (waitButtonTimer) {
      if (currentTime.getTime() - waitButtonTimer <= 300)
        return;
    }

    this.setState({
      startButtonStatus: 'Start',
      isWait: true,
      waitButtonTimer: currentTime.getTime()
    });

    waitTimer();
  }

  handleResetButton = () => {
    const { resetTimer } = this.props;

    this.setState({
      startButtonStatus: 'Start'
    });

    resetTimer();
  }

  render() {
    const { startButtonStatus } = this.state;
    
    return(
      <div className={style.buttons}>
        <button onClick={this.handleTimerStartButton}>{startButtonStatus}</button>
        <button onClick={this.handleWaitTimerButton}>Wait</button>
        <button onClick={this.handleResetButton}>Reset</button>
      </div>
    );
  }
}

export default Buttons;