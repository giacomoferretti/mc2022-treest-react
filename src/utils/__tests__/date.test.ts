import { formatDate, parseDate } from "../date";

describe("date", () => {
  it("parseDate:correct", () => {
    expect(parseDate("2022-02-02 02:02:02")).toStrictEqual(
      new Date(2022, 1, 2, 2, 2, 2)
    );
  });

  it("parseDate:wrong", () => {
    expect.assertions(1);
    expect(() => {
      parseDate("2022-02-02 02:02");
    }).toThrow();
  });

  it("formatDate:correct", () => {
    expect(formatDate(new Date(2022, 1, 2, 2, 2, 2))).toBe(
      "02:02:02 02/02/2022"
    );
  });

  it("formatDate:correct", () => {
    expect(formatDate(new Date(2022, 1, 2))).toBe("00:00:00 02/02/2022");
  });

  it("formatDate:correct", () => {
    expect(formatDate(new Date(0))).toBe("01:00:00 01/01/1970");
  });
});
