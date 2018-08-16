import React from "react";
import { createTimeLine } from "../utils/timeline";

class TimeLine extends React.Component {
  state = {
    timeLine:
      console.log(this.props) ||
      createTimeLine(
        this.props.fromTime,
        this.props.toTime,
        this.props.interval,
        false
      ).map(this.props.formatter)
  };

  componentWillReceiveProps() {
    console.log(this.props);
    this.setState({
      timeLine: createTimeLine(
        this.props.fromTime,
        this.props.toTime,
        this.props.interval,
        false
      )
    });
  }

  render() {
    const { children } = this.props;
    console.log(this.state);
    return this.state.timeLine.map((...t) => children(...t));
  }
}

export default TimeLine;
