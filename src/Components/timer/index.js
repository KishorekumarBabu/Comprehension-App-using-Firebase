import React, { Component } from "react";
import { setTimerDetails } from "../../store/actions/timerActions";
import { connect } from "react-redux";
import "./index.css";

class Timer extends Component {
  constructor() {
    super();
    this.state = { time: {}, seconds: 0, timerIsOn: false };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
    this.countUp = this.countUp.bind(this);
  }

  secondsToTime(secs) {
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      h: hours,
      m: minutes,
      s: seconds
    };
    return obj;
  }

  componentDidMount() {
    let time = this.secondsToTime(this.state.seconds);
    this.setState({ time });
    this.startTimer();
  }

  componentWillUnmount() {
    let timeTaken =
      this.state.time.m +
      ":" +
      (this.state.time.s <= 9 ? "0" + this.state.time.s : this.state.time.s);

    this.props.setTimerDetails({
      timeTaken,
      timerIsOn: false
    });
    this.pauseTimer();
  }

  startTimer() {
    this.setState({ timerIsOn: true }, () => {
      this.props.setTimerDetails({
        timerIsOn: this.state.timerIsOn
      });
    });
    this.timer = setInterval(this.countUp, 1000);
  }

  pauseTimer() {
    this.setState({ timerIsOn: false }, () => {
      this.props.setTimerDetails({
        timerIsOn: this.state.timerIsOn
      });
    });
    clearInterval(this.timer);
  }

  countUp() {
    let seconds = this.state.seconds + 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds
    });
  }

  render() {
    return (
      <div className="text-center">
        {this.state.time.m} :{" "}
        {this.state.time.s <= 9 ? "0" + this.state.time.s : this.state.time.s}
        {this.state.timerIsOn ? (
          <button
            className="waves-effect waves-light btn-flat float-right"
            onClick={this.pauseTimer}
          >
            <i className="material-icons">pause</i>
          </button>
        ) : (
          <button
            className="waves-effect waves-light btn-flat float-right"
            onClick={this.startTimer}
          >
            <i className="material-icons">play_arrow</i>
          </button>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { currentPage: state.page };
};

const mapDispatchToProps = dispatch => {
  return {
    setTimerDetails: time => dispatch(setTimerDetails(time))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timer);
