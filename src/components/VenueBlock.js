import React, { Component } from 'react';
import { Flex } from 'grid-styled';
import styled from 'styled-components';
import Event from './Event';

const BlockWrapper = styled.div`
  @media (max-width: 900px) {
    flex: ${p => (p.expanded ? '1' : '0')} 0 40px;
  }
  border-left: 1px solid white;
  color: white;
`;

const SceneHeader = styled.div`
  height: ${p => p.height}px;
  width: 100%;
  border-bottom: 1px solid white;
  line-height: 30px;
  position: sticky;
  text-align: center;
`;

class VenueBlock extends Component {
  getDiffOffsetInPx(start, index) {
    const { timeBlockLengthInPx, timelineInterval } = this.props;
    let diff = start.diff(index, 'minutes').toObject().minutes;
    if (diff < 0) {
      diff += 24 * 60;
    }
    return (diff || 0) * (timeBlockLengthInPx / timelineInterval);
  }

  getEventLengthInPx(start, end) {
    const { timeBlockLengthInPx, timelineInterval } = this.props;
    const diff = end.diff(start, 'minutes').toObject().minutes;
    return (diff || 0) * (timeBlockLengthInPx / timelineInterval);
  }

  render() {
    const {
      expanded, events, timeOffsetInPx, name, onClick,
    } = this.props;
    return (
      <BlockWrapper
        onClick={() => onClick(name)}
        expanded={expanded}
      >
        <Flex css={{ position: 'relative' }} flexDirection="column">
          <SceneHeader height={timeOffsetInPx}>
            {!expanded
              ? name[0].toUpperCase()
              : name.toUpperCase()}
          </SceneHeader>
          {events.map(({ name: eventName, start, end }) => (
            <Event
              key={eventName}
              height={this.getEventLengthInPx(start, end)}
              topOffset={timeOffsetInPx + this.getDiffOffsetInPx(start, start.set({ hour: 8, minutes: 0 }))}
              name={eventName}
              start={start}
              end={end}
              timeOffsetInPx={timeOffsetInPx}
            />
          ))}
        </Flex>
      </BlockWrapper>
    );
  }
}
export default VenueBlock;
