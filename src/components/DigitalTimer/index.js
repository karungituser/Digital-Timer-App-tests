// Write your code here
import {Component} from 'react'
import './index.css'

const initialState = {
  isTimerRunning: false,
  timeElapsedInSeconds: 0,
  timerLimitInMinutes: 25,
}
class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onIncreaseTimerLimitInMinutes = () => {
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))
  }

  onDecreaseTimerLimitInMinutes = () => {
    const {timerLimitInMinutes} = this.state
    if (timerLimitInMinutes > 1) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      }))
    }
  }

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timeElapsedInSeconds, timerLimitInMinutes} = this.state
    const totalRemainingSeconds =
      timerLimitInMinutes * 60 - timeElapsedInSeconds

    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  onStartOrPauseTimer = () => {
    const {
      isTimerRunning,
      timeElapsedInSeconds,
      timerLimitInMinutes,
    } = this.state

    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.setState({timeElapsedInSeconds: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  incrementTimeElapsedInSeconds = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  renderTimerController = () => {
    const {isTimerRunning} = this.state

    return (
      <div className="button-container">
        <button
          className="button"
          type="button"
          onClick={this.onStartOrPauseTimer}
        >
          {isTimerRunning ? (
            <>
              <img
                src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
                alt="pause icon"
                className="play-pause-icon"
              />
              Pause
            </>
          ) : (
            <>
              <img
                src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
                alt="play icon"
                className="play-pause-icon"
              />
              Start
            </>
          )}
        </button>
        <button className="button" type="button" onClick={this.onResetTimer}>
          <>
            <img
              src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
              alt="reset icon"
              className="play-pause-icon"
            />
            Reset
          </>
        </button>
      </div>
    )
  }

  renderTimerLimitController() {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const isButtonsDisabled = timeElapsedInSeconds > 0

    return (
      <div className="timer-limit-container">
        <div>
          <p className="timer-limit">Set Timer Limit</p>
        </div>
        <div className="timer-button-container">
          <button
            type="button"
            className="setTimer-btn"
            onClick={this.onDecreaseTimerLimitInMinutes}
            disabled={isButtonsDisabled}
          >
            -
          </button>
          <p className="timer">{timerLimitInMinutes}</p>
          <button
            type="button"
            className="setTimer-btn"
            onClick={this.onIncreaseTimerLimitInMinutes}
            disabled={isButtonsDisabled}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  render() {
    const {isTimerRunning} = this.state
    const labelText = isTimerRunning ? 'Running' : 'Paused'

    return (
      <div className="timer-container">
        <div className="container">
          <h1 className="heading">Digital Timer</h1>
          <div className="timer-counter-container">
            <div className="imageTimer-container">
              <div className="timer-count">
                <h1 className="timeInMin">
                  {this.getElapsedSecondsInTimeFormat()}
                </h1>
                <p className="running-or-paused">{labelText}</p>
              </div>
            </div>
            <div>
              {this.renderTimerController()}
              {this.renderTimerLimitController()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
