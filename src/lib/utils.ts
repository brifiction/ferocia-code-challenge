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

function calculateInterestRateInPercentage(interestRate: number) {
  return interestRate / 100;
}

function calculateTotalAmount(
  depositAmount: number,
  interestRate: number,
  interestPaid: "monthly" | "quarterly" | "annually" | "at-maturity",
  investmentTerm: number
) {
  switch (interestPaid) {
    case "monthly":
      interestRate = interestRate / 12;
      break;
    case "quarterly":
      interestRate = interestRate / 4;
      break;
    case "annually":
    case "at-maturity":
      break;
  }

  const totalAmount =
    depositAmount *
    Math.pow(
      1 + calculateInterestRateInPercentage(interestRate),
      investmentTerm
    );

  return Math.ceil(totalAmount);
}

/**
 * Calculate term deposit.
 *
 * @param values
 * @returns
 */
export function calculateTermDeposit(values: TermDepositFormSchema) {
  // Calculate the total amount at the end of the term
  const totalAmount = calculateTotalAmount(
    values.depositAmount,
    values.interestRate,
    values.interestPaid,
    values.investmentTerm
  );

  // Calculate the interest earned
  const interestEarned = totalAmount - values.depositAmount;

  return JSON.stringify(
    {
      finalBalance: values.depositAmount + interestEarned,
      totalInterestEarned: interestEarned,
    },
    null,
    2
  );
}
