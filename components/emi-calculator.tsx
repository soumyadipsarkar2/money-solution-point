"use client"

import Link from "next/link"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calculator } from "lucide-react"

export default function EmiCalculator() {
  const [loanAmount, setLoanAmount] = useState(1000000)
  const [interestRate, setInterestRate] = useState(8.5)
  const [tenure, setTenure] = useState(20)
  const [emi, setEmi] = useState(0)
  const [totalInterest, setTotalInterest] = useState(0)
  const [totalPayment, setTotalPayment] = useState(0)
  const [isYears, setIsYears] = useState(true)

  useEffect(() => {
    calculateEMI()
  }, [loanAmount, interestRate, tenure, isYears])

  const calculateEMI = () => {
    const principal = loanAmount
    const ratePerMonth = interestRate / 12 / 100
    const tenureInMonths = isYears ? tenure * 12 : tenure

    if (principal > 0 && ratePerMonth > 0 && tenureInMonths > 0) {
      const emiValue =
        (principal * ratePerMonth * Math.pow(1 + ratePerMonth, tenureInMonths)) /
        (Math.pow(1 + ratePerMonth, tenureInMonths) - 1)

      const totalPaymentValue = emiValue * tenureInMonths
      const totalInterestValue = totalPaymentValue - principal

      setEmi(Math.round(emiValue))
      setTotalInterest(Math.round(totalInterestValue))
      setTotalPayment(Math.round(totalPaymentValue))
    } else {
      setEmi(0)
      setTotalInterest(0)
      setTotalPayment(0)
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value)
  }

  const handleLoanAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value.replace(/,/g, ""), 10) || 0
    setLoanAmount(value)
  }

  const handleInterestRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseFloat(e.target.value) || 0
    setInterestRate(value)
  }

  const handleTenureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value, 10) || 0
    setTenure(value)
  }

  return (
    <section className="w-full py-12 md:py-24 bg-gradient-to-r from-teal-50 to-cyan-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
          <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-2">
            <Calculator className="h-6 w-6 text-primary" />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">EMI Calculator</h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Plan your loan repayment with our easy-to-use EMI calculator
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Loan Details</CardTitle>
              <CardDescription>Adjust the values to calculate your EMI</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="loan-amount">Loan Amount</Label>
                  <span className="text-sm font-medium">{formatCurrency(loanAmount)}</span>
                </div>
                <Input
                  id="loan-amount"
                  type="text"
                  value={loanAmount.toLocaleString()}
                  onChange={handleLoanAmountChange}
                  className="mb-2"
                />
                <Slider
                  defaultValue={[loanAmount]}
                  max={10000000}
                  step={10000}
                  onValueChange={(value) => setLoanAmount(value[0])}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>₹1 Lakh</span>
                  <span>₹1 Crore</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="interest-rate">Interest Rate (%)</Label>
                  <span className="text-sm font-medium">{interestRate}%</span>
                </div>
                <Input
                  id="interest-rate"
                  type="number"
                  value={interestRate}
                  onChange={handleInterestRateChange}
                  step={0.1}
                  className="mb-2"
                />
                <Slider
                  defaultValue={[interestRate]}
                  max={20}
                  step={0.1}
                  onValueChange={(value) => setInterestRate(value[0])}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>5%</span>
                  <span>20%</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="tenure">Loan Tenure</Label>
                  <span className="text-sm font-medium">
                    {tenure} {isYears ? "Years" : "Months"}
                  </span>
                </div>
                <Input id="tenure" type="number" value={tenure} onChange={handleTenureChange} className="mb-2" />
                <Slider
                  defaultValue={[tenure]}
                  max={isYears ? 30 : 360}
                  step={isYears ? 1 : 1}
                  onValueChange={(value) => setTenure(value[0])}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{isYears ? "1 Year" : "1 Month"}</span>
                  <span>{isYears ? "30 Years" : "360 Months"}</span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Button variant={isYears ? "default" : "outline"} onClick={() => setIsYears(true)} className="flex-1">
                  Years
                </Button>
                <Button variant={!isYears ? "default" : "outline"} onClick={() => setIsYears(false)} className="flex-1">
                  Months
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-primary to-primary-foreground text-white">
            <CardHeader>
              <CardTitle>Loan Summary</CardTitle>
              <CardDescription className="text-primary-foreground/80">
                Your estimated loan repayment details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <p className="text-sm text-primary-foreground/80">Monthly EMI</p>
                  <p className="text-4xl font-bold">{formatCurrency(emi)}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-primary-foreground/80">Principal</p>
                    <p className="text-xl font-semibold">{formatCurrency(loanAmount)}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-primary-foreground/80">Interest</p>
                    <p className="text-xl font-semibold">{formatCurrency(totalInterest)}</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-primary-foreground/20">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium text-primary-foreground/80">Total Payment</p>
                  <p className="text-2xl font-bold">{formatCurrency(totalPayment)}</p>
                </div>
              </div>

              <div className="pt-4">
                <Button variant="secondary" className="w-full" asChild>
                  <Link href="/apply">Apply for This Loan</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
