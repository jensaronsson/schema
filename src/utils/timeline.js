export const createTimeLine = (
  fromTime,
  toTime,
  interval,
) => {
  let minutes = (toTime - fromTime) / 1000 / 60;
  const start = new Date(fromTime.getTime());
  const timeline = [];
  const iterations = minutes/interval;
  for (var i = 0; i <= iterations; i++) {
    if(i !== 0) {
      start.setMinutes(start.getMinutes() + interval);
    }
    timeline.push(new Date(start.getTime()));
  }
  return timeline;
};

export const leadingZero = i => (i < 10 ? `0${i}` : i);
export const formatTime = time =>
  `${leadingZero(time.getHours())}:${leadingZero(time.getMinutes())}`;
