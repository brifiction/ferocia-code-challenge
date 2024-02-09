// import { useState } from "react";
import "./App.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { calculateTermDeposit } from "@/lib/utils";

function App() {
  const validateSchema = Yup.object().shape({
    depositAmount: Yup.number()
      .moreThan(0, "The deposit amount must be at least $1.")
      .required("Please enter your deposit amount."),
    interestRate: Yup.number()
      .moreThan(0, "The interest rate must be at least 0.01%.")
      .required("Please enter your interest rate."),
    investmentTerm: Yup.number()
      .moreThan(0, "The investment term must be at least 1 year.")
      .required("Please enter your investment term."),
    interestPaid: Yup.string()
      .required(
        "Please declare your interest paid monthly, quarterly, annually, or at maturity."
      )
      .oneOf(["monthly", "quarterly", "annually", "at-maturity"]),
  });

  return (
    <main className="flex h-screen items-center justify-center">
      <section>
        <Card className="w-[350px]">
          <Formik
            initialValues={{
              depositAmount: 10000,
              interestRate: 1.1,
              investmentTerm: 3,
              interestPaid: "monthly" as const,
            }}
            validationSchema={validateSchema}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(calculateTermDeposit(values));
                setSubmitting(false);
              }, 400);
            }}
          >
            {({ values, errors, isSubmitting, setFieldValue }) => (
              <Form>
                <CardHeader>
                  <CardTitle>Term deposit calculator</CardTitle>
                  <CardDescription>
                    Calculate your term deposit below.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="depositAmount">Deposit amount</Label>
                      <Input
                        type="number"
                        name="depositAmount"
                        step="any"
                        min={1}
                      />
                      <ErrorMessage
                        name="depositAmount"
                        component="div"
                        className="text-xs text-red-400"
                      />

                      <Label htmlFor="interestRate">Interest rate (%)</Label>
                      <Input
                        type="number"
                        name="interestRate"
                        step=".01"
                        min={0.01}
                      />
                      <ErrorMessage
                        name="interestRate"
                        component="div"
                        className="text-xs text-red-400"
                      />

                      <Label htmlFor="investmentTerm">
                        Investment term (years)
                      </Label>
                      <Input
                        type="number"
                        name="investmentTerm"
                        step="1"
                        min={1}
                        max={30}
                      />
                      <ErrorMessage
                        name="investmentTerm"
                        component="div"
                        className="text-xs text-red-400"
                      />

                      <Label htmlFor="interestPaid">Interest paid</Label>
                      <Select
                        name="interestPaid"
                        defaultValue={values.interestPaid}
                        onValueChange={(value) => {
                          setFieldValue("interestPaid", value);
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="I would like my interest paid" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="quarterly">Quarterly</SelectItem>
                          <SelectItem value="annually">Annually</SelectItem>
                          <SelectItem value="at-maturity">
                            At Maturity
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <ErrorMessage
                        name="interestPaid"
                        component="div"
                        className="text-xs text-red-400"
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    type="submit"
                    disabled={errors.length > 0 || isSubmitting}
                  >
                    Calculate
                  </Button>
                </CardFooter>
              </Form>
            )}
          </Formik>
        </Card>
      </section>
    </main>
  );
}

export default App;
