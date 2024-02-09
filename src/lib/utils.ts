import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type TermDepositFormSchema = {
  depositAmount: number;
  interestRate: number;
  investmentTerm: number;
  interestPaid: "monthly" | "quarterly" | "annually" | "at-maturity";
};

/**
 * Convert interest rate as percentage.
 *
 * @param interestRate
 * @returns
 */
export function convertInterestRateToPercentage(interestRate: number) {
  return interestRate / 100;
}

/**
 * Convert interest paid to a number, based on the base year value (1 = 1 year, 2 = 2 years, and so on).
 *
 * @param interestPaid
 * @returns
 */
export function convertInterestPaid(
  interestPaid: "monthly" | "quarterly" | "annually" | "at-maturity"
) {
  switch (interestPaid) {
    case "monthly":
      return 12;
    case "quarterly":
      return 4;
    case "annually":
    case "at-maturity":
      return 1;
    default:
      throw new Error("Invalid interest paid option");
  }
}

export function roundToTwoDecimalPlaces(value: number) {
  return Math.round(value * 100) / 100;
}

export function calculateFinalBalance(
  values: TermDepositFormSchema,
  interestRatePercentage: number,
  convertedInterestPaid: number
) {
  const { depositAmount, investmentTerm, interestPaid } = values;

  // Calculate the final balance, at the end of investment term.
  let totalAmount;
  switch (interestPaid) {
    case "at-maturity":
      totalAmount =
        depositAmount *
        Math.pow(
          1 + interestRatePercentage * investmentTerm,
          convertedInterestPaid
        );
      break;
    default:
      totalAmount =
        depositAmount *
        Math.pow(
          1 + interestRatePercentage / convertedInterestPaid,
          investmentTerm * convertedInterestPaid
        );
      break;
  }

  // Round the total amount to two decimal places
  return roundToTwoDecimalPlaces(totalAmount);
}

/**
 * Calculate term deposit.
 *
 * @param values
 * @returns
 */
export function calculateTermDeposit(values: TermDepositFormSchema) {
  const { depositAmount, interestRate, interestPaid } = values;

  const interestRatePercentage = convertInterestRateToPercentage(interestRate);

  const convertedInterestPaid = convertInterestPaid(interestPaid);

  // Calculate the final balance, at the end of investment term.
  const totalAmount = calculateFinalBalance(
    values,
    interestRatePercentage,
    convertedInterestPaid
  );

  // Calculate the interest earned
  const interestEarned = totalAmount - depositAmount;

  return {
    finalBalance: Math.round(totalAmount),
    totalInterestEarned: Math.round(interestEarned),
  };
}
