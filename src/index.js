import React from "react";
import ReactDOM from "react-dom";
import groupBy from "lodash/groupBy";
import styled, { injectGlobal } from "styled-components";
import { Box, Flex } from "grid-styled";
import { DateTime } from "luxon";
import { createTimeLine, formatTime } from "./helpers";
import events from "./events";
injectGlobal`
 html * {
  box-sizing: border-box;
 }
`;
const timeOffsetInPx = 30;
const timeBlockLengthInPx = 50;
const timelineInterval = 60;
const start = new Date();
start.setHours(8);
start.setMinutes(0);
const end = new Date();
end.setDate(end.getDate() + 1);
end.setHours(3);
end.setMinutes(0);
let timeline = createTimeLine(new Date(start), end, timelineInterval).map(
  formatTime
);
// Toggla dagar
// Kolla diff funktionerna
// Fixa eventkomponent
// sätt närmaste datum aktivt.
// sticky header
const Block = styled(props => {
  return <Box {...props} />;
})`
  height: ${p => p.height}px;
  @media (max-width: 900px) {
    flex: ${p => (p.expanded ? "1" : "0")} 0 40px;
  }
  border-left: 1px solid white;
  color: white;
`;
const Filler = styled.div`
 background: transparent;
 height: ${p => p.height}px;
 border-bottom: 1px solid white;
`;

const SceneHeader = styled.div`
  height: ${p => p.height}px;
  width: 100%;
  border-bottom: 1px solid white;
  line-height: 30px;
  position: sticky;
`;

class SceneBlock extends React.Component {
  getDiffOffsetInPx(start, index, name) {
    let diff = start.diff(index, "minutes").toObject().minutes;
    if (diff < 0) {
      diff = diff + 24 * 60;
    }
    return (diff || 0) * (timeBlockLengthInPx / timelineInterval);
  }
  getEventLengthInPx(start, end) {
    let diff = end.diff(start, "minutes").values.minutes;
    return diff || 0;
  }
  render() {
    const { expanded, events } = this.props;
    return (
      <Block {...this.props}>
        <Flex css={{ position: "relative" }} flexDirection="column">
          <SceneHeader height={timeOffsetInPx}>
            {!expanded
              ? this.props.name[0].toUpperCase()
              : this.props.name.toUpperCase()}
          </SceneHeader>
          {events.map(({ name, start, end }) => {
            return (
              <Box
                css={{
                  zIndex: 9,
                  position: "absolute",
                  left: "2px",
                  right: "2px",
                  overflow: "hidden",
                  height: this.getEventLengthInPx(start, end) + "px",
                  top: `${timeOffsetInPx +
                    this.getDiffOffsetInPx(
                      start,
                      start.set({ hour: 8 }),
                      name
                    )}px `
                }}
                bg="orange"
              >
                <span style={{ whiteSpace: "nowrap" }}>{name}</span>
                {start.toLocaleString({ hour: "numeric", minute: "numeric" })}
                {end.toLocaleString({ hour: "numeric", minute: "numeric" })}
              </Box>
            );
          })}
        </Flex>
      </Block>
    );
  }
}

const formatEvents = events =>
  events.map(x => ({
    ...x,
    startTimeFormatted: x.start.toLocaleString(DateTime.TIME_24_SIMPLE),
    endTimeFormatted: x.end.toLocaleString(DateTime.TIME_24_SIMPLE)
  }));
class App extends React.Component {
  state = {
    active: "stora",
    scenes: ["stora", "klippan", "bryggan"],
    events: formatEvents(this.props.events),
    day: DateTime.local(2018, 8, 30)
  };

  setActive(color) {
    this.setState({ active: color });
  }

  render() {
    return (
      <div className="App">
        <Flex bg="black">
          <Flex flexDirection="column">
            <Filler height={timeOffsetInPx} />
            {timeline.map((x, i) => (
              <Box
                color="white"
                p={1}
                css={{
                  height: timeBlockLengthInPx + "px",
                  borderBottom: "1px solid white"
                }}
              >
                {x}
              </Box>
            ))}
          </Flex>
          {this.state.scenes.map(x => (
            <SceneBlock
              onClick={() => this.setActive(x)}
              expanded={this.state.active === x}
              width={1}
              name={x}
              height={timeline.length * timeBlockLengthInPx + timeOffsetInPx}
              events={groupBy(events, e => e.venue.toLowerCase())[x]}
            />
          ))}
        </Flex>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App events={events} />, rootElement);
