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
 * Calculate term deposit.
 *
 * @param values
 * @returns
 */
export function calculateTermDeposit(values: TermDepositFormSchema) {
  const calculatedResult = values.depositAmount * values.interestRate;
  return JSON.stringify({ result: calculatedResult, ...values }, null, 2);
}
