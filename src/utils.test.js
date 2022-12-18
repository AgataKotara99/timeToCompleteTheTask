import { secondsToHourMinuteSecond } from "./utils";

test("", () => {
    expect(secondsToHourMinuteSecond(3600)).toBe("01:00:00");
}); 