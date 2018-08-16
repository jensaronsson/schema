import { createTimeLine } from "./timeline";

describe("create timeline between two dates ", () => {
  it("should generate an array with times", () => {
    const start = new Date();
    start.setMinutes(0);
    start.setHours(10);
    const end = new Date();
    end.setMinutes(0);
    end.setHours(11);
    const timeLine = createTimeLine(start, end, 30);
    expect(timeLine.length).toBeGreaterThan(0);
    expect(timeLine).toHaveLength(3);
  });

  it("should generate an array with times/inclusive ", () => {
    const star = new Date();
    star.setMinutes(0);
    star.setHours(10);
    const end = new Date();
    end.setMinutes(0);
    end.setHours(11);
    const timeLine = createTimeLine(star, end, 60);
    expect(timeLine.length).toBeGreaterThan(0);
    expect(timeLine).toHaveLength(2);
  });

  it("should generate an array with times/non-inclusive ", () => {
    const star = new Date();
    star.setMinutes(0);
    star.setHours(10);
    const end = new Date();
    end.setMinutes(0);
    end.setHours(11);
    const timeLine = createTimeLine(star, end, 60, false);
    expect(timeLine.length).toBeGreaterThan(0);
    expect(timeLine).toHaveLength(1);
  });

  it("should generate an array with times/inclusive over two days", () => {
    const star = new Date();
    star.setMinutes(0);
    star.setHours(23);
    const end = new Date();
    end.setMinutes(0);
    end.setHours(0);
    end.setDate(end.getDate() + 1);
    const timeLine = createTimeLine(star, end, 60, false);
    expect(timeLine.length).toBeGreaterThan(0);
    expect(timeLine).toHaveLength(1);
  });
});
