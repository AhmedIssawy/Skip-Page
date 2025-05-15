/**
 * @jest-environment jsdom
 */

import { cn, formatCurrency, formatDate, calcPrice } from "./utils"; // adjust path as needed

describe("cn (clsx + tailwind-merge)", () => {
  it("should join multiple class names", () => {
    expect(cn("foo", "bar", { baz: true, qux: false })).toBe("foo bar baz");
  });

  it("should dedupe and merge tailwind classes", () => {
    // p-1 and p-2 both set padding; merge should keep the last one
    expect(cn("p-1 p-2", "p-3")).toBe("p-3");
  });

  it("should handle undefined, null, and booleans gracefully", () => {
    // clsx filters out non-string/truthy values
    expect(cn("foo", undefined, false, "bar", null)).toBe("foo bar");
  });
});

describe("formatCurrency", () => {
  it("should format GBP correctly", () => {
    expect(formatCurrency(0)).toBe("£0.00");
    expect(formatCurrency(1234.5)).toBe("£1,234.50");
    expect(formatCurrency(1000000)).toBe("£1,000,000.00");
  });
});

describe("formatDate", () => {
  it("should format ISO date strings into en-GB date", () => {
    // 2023-01-05 => "5 Jan 2023 we could have used moment.js too"
    expect(formatDate("2023-01-05")).toBe("5 Jan 2023");
    // ensure it handles full ISO timestamp
    expect(formatDate("2021-12-31T15:30:00Z")).toBe("31 Dec 2021");
  });
});

describe("calcPrice", () => {
  it("should calculate VAT-inclusive price", () => {
    expect(calcPrice(100, 0)).toBe(100);
    expect(calcPrice(100, 20)).toBe(120);
    expect(calcPrice(250.5, 10)).toBeCloseTo(275.55, 2);
  });

  it("should work with integer and decimal inputs", () => {
    expect(calcPrice(99.99, 5)).toBeCloseTo(104.9895, 4);
  });
});
