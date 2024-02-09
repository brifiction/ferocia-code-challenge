import { describe, expect, test, beforeEach } from "vitest";
import {
  convertInterestRateToPercentage,
  convertInterestPaid,
  roundToTwoDecimalPlaces,
  calculateFinalBalance,
} from "../src/lib/utils";

let mockFormData;

describe("utility functions", () => {
  beforeEach(async () => {
    mockFormData = {
      depositAmount: 10000,
      interestRate: 1.1,
      investmentTerm: 3,
      interestPaid: "annually" as const,
    };
  });

  test("convert interest rate in percentage", async () => {
    const result = convertInterestRateToPercentage(mockFormData.interestRate);
    console.log("converted interest rate (1.1) to percentage", result);
    expect(result).toBe(0.011000000000000001);
  });

  test("round by decimal two places", async () => {
    const result = roundToTwoDecimalPlaces(1.641651699993);
    console.log("round (1.4) to two decimal places", result);
    expect(result).toBe(1.64);
  });

  test("calculate final balance", async () => {
    const convertedInterestPaid = convertInterestPaid(
      mockFormData.interestPaid
    );
    const interestRatePercentage = convertInterestRateToPercentage(
      mockFormData.interestRate
    );

    const result = calculateFinalBalance(
      mockFormData,
      interestRatePercentage,
      convertedInterestPaid
    );
    console.log("calculated final balance", result);
    expect(result).toBe(10333.64);
  });
});

describe("convert interest paid", () => {
  test("convert by 'monthly'", async () => {
    const result = convertInterestPaid("monthly");
    console.log("convert interest paid by monthly", result);
    expect(result).toBe(12);
  });
  test("convert by 'quarterly'", async () => {
    const result = convertInterestPaid("quarterly");
    console.log("convert interest paid by quarterly", result);
    expect(result).toBe(4);
  });
  test("convert by 'annually'", async () => {
    const result = convertInterestPaid("annually");
    console.log("convert interest paid by annually", result);
    expect(result).toBe(1);
  });
  test("convert by 'at maturity'", async () => {
    const result = convertInterestPaid("at-maturity");
    console.log("convert interest paid by 'at maturity'", result);
    expect(result).toBe(1);
  });
});
