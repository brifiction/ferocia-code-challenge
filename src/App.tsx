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
import { Formik, Form, Field, ErrorMessage } from "formik";
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

function App() {
  const validateSchema = Yup.object().shape({
    depositAmount: Yup.number().required().min(10000).max(500000).positive(),
    interestRate: Yup.number().required().min(1.1).positive(),
    investmentTerm: Yup.number().required().min(1).max(30).positive(),
    interestPaid: Yup.string()
      .required()
      .oneOf(["monthly", "quarterly", "annually", "at-maturity"]),
  });

  return (
    <main className="flex items-center justify-center">
      <Card className="w-[350px]">
        <Formik
          initialValues={{
            depositAmount: 100000,
            interestRate: 1.1,
            investmentTerm: 3,
            interestPaid: "monthly",
          }}
          validate={validateSchema}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ isSubmitting }) => (
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
                    <Input type="number" name="depositAmount" />
                    <ErrorMessage name="depositAmount" component="div" />

                    <Label htmlFor="interestRate">Interest rate</Label>
                    <Input type="number" name="interestRate" />
                    <ErrorMessage name="interestRate" component="div" />

                    <Label htmlFor="investmentTerm">Investment term</Label>
                    <Input type="number" name="investmentTerm" />
                    <ErrorMessage name="investmentTerm" component="div" />

                    <Label htmlFor="interestPaid">Interest paid</Label>
                    <Select name="interestPaid">
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="I would like my interest paid" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                        <SelectItem value="annually">Annually</SelectItem>
                        <SelectItem value="at-maturity">At Maturity</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="submit" disabled={isSubmitting}>
                  Calculate
                </Button>
              </CardFooter>
            </Form>
          )}
        </Formik>
      </Card>
    </main>
  );
}

export default App;
