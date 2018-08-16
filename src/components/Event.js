import React, { PureComponent } from 'react';
import { Box } from 'grid-styled';

class Event extends PureComponent {
  render() {
    const { name, height, start, end, topOffset } = this.props;
    return (
      <Box
        css={{
          zIndex: 9,
          position: 'absolute',
          left: '2px',
          right: '2px',
          overflow: 'hidden',
          height: `${height}px`,
          top: `${topOffset}px`,
        }}
        bg="orange"
      >
        <span style={{ whiteSpace: 'nowrap' }}>{name}</span>
        {start.toLocaleString({ hour: 'numeric', minute: 'numeric' })}
        {end.toLocaleString({ hour: 'numeric', minute: 'numeric' })}
      </Box>
    );
  }
}


export default Event;
