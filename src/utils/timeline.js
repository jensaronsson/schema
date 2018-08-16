export const createTimeLine = (
  fromTime,
  toTime,
  interval,
  inclusive = true
) => {
  let minutes = (toTime - fromTime) / 1000 / 60;
  if (inclusive) {
    minutes = minutes + interval;
  }
  const timeline = [];

  for (var i = 0; i < minutes / interval; i++) {
    fromTime.setMinutes(fromTime.getMinutes() + interval);
    timeline.push(new Date(fromTime));
  }
  return timeline;
};

export const leadingZero = i => (i < 10 ? `0${i}` : i);
export const formatTime = time =>
  `${leadingZero(time.getHours())}:${leadingZero(time.getMinutes())}`;
