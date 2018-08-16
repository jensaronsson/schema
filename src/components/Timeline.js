import React from "react";
import { createTimeLine } from "../utils/timeline";

class TimeLine extends React.Component {
  state = {
    timeLine:
        createTimeLine(
        new Date(this.props.fromTime.getTime()),
        new Date(this.props.toTime.getTime()),
        this.props.interval
      ).map(this.props.formatter)
  };

  componentWillReceiveProps() {
    this.setState({
      timeLine: createTimeLine(
        new Date(this.props.fromTime.getTime()),
        new Date(this.props.toTime.getTime()),
        this.props.interval
      ).map(this.props.formatter)
    });
  }

  render() {
    const { children } = this.props;
    return this.state.timeLine.map((...t) => children(...t));
  }
}

export default TimeLine;
