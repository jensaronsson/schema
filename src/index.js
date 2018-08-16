import React from "react";
import ReactDOM from "react-dom";
import groupBy from "lodash/groupBy";
import styled, { injectGlobal } from "styled-components";
import { Box, Flex } from "grid-styled";
import { DateTime } from "luxon";
import { formatTime } from "./helpers";
import VenueBlock from './components/VenueBlock';
import events from "./events";
import TimeLine from "./components/Timeline";

injectGlobal`
 html * {
  box-sizing: border-box;
 }
`;

const timeOffsetInPx = 30;
const timeBlockLengthInPx = 60;
const timelineInterval = 30;

const start = new Date();
start.setHours(8);
start.setMinutes(0);
const end = new Date();
end.setDate(end.getDate() + 1);
end.setHours(4);
end.setMinutes(0);

let nStart = new Date(start.getTime());
let nEnd = new Date(end.getTime());

// Toggla dagar
// sätt närmaste datum aktivt.
// sticky header

const Filler = styled.div`
 background: transparent;
 height: ${p => p.height}px;
 border-bottom: 1px solid white;
`;

const getVenues = (events) => Array.from(new Set(events.map(x => x.venue.toLowerCase())));
  
const formatEvents = events =>
  events.map(x => ({
    ...x,
    startTimeFormatted: x.start.toLocaleString(DateTime.TIME_24_SIMPLE),
    endTimeFormatted: x.end.toLocaleString(DateTime.TIME_24_SIMPLE)
  }));
class App extends React.Component {
  state = {
    active: "stora",
    venues: getVenues(this.props.events),
    events: formatEvents(this.props.events),
    day: DateTime.local(2018, 8, 30)
  };

  setActive(venue) {
    this.setState({ active: venue });
  }

  render() {
    const { venues, active } = this.state;
    return (
      <div className="App">
        <Flex bg="black">
          <Flex flexDirection="column">
            <Filler height={timeOffsetInPx} />
            <TimeLine
              formatter={formatTime}
              fromTime={nStart}
              toTime={nEnd}
              interval={timelineInterval}
            >
              {(x, i) => (
                <Box
                  key={i}
                  color="white"
                  p={1}
                  css={{
                    height: timeBlockLengthInPx + "px",
                    borderBottom: `1px solid rgba(255,255,255, ${i % 2 !== 0 ? 1: 0.5})`
                  }}
                >
                  {i % 2 === 0 ? x : ""}
                </Box>
              )}
            </TimeLine>
          </Flex>
          {venues.map(x => (
            <VenueBlock
              key={x}
              timeBlockLengthInPx={timeBlockLengthInPx}
              timelineInterval={timelineInterval}
              timeOffsetInPx={timeOffsetInPx}
              onClick={() => this.setActive(x)}
              expanded={active === x}
              width={1}
              name={x}
              events={groupBy(events, e => e.venue.toLowerCase())[x] || []}
            />
          ))}
        </Flex>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App events={events} />, rootElement);
