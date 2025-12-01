"use client"

import type React from "react"

import { useState } from "react"
import { X, Car, Fuel, Gauge } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

interface VehicleInfo {
  year: string
  make: string
  model: string
  trim: string
  color: string
  stockNumber: string
  vin: string
  mileage: string
  fuelType: string
  imageUrl: string
  price: string
}

const formatCurrency = (value: number) =>
  value.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })

const getRandomUsedPrice = (vehicle: VehicleInfo) => {
  const mileageNumber = parseInt(vehicle.mileage.replace(/[^0-9]/g, ""), 10) || 0
  const basePrice = 15000
  const mileagePenalty = Math.min(Math.floor(mileageNumber / 10000) * 500, 10000)
  const randomAdjustment = Math.floor(Math.random() * 4000) // 0 - 3999
  const finalPrice = Math.max(5000, basePrice + randomAdjustment - mileagePenalty)

  return formatCurrency(finalPrice)
}

interface VehiclePriceModalProps {
  vehicle: VehicleInfo
  isOpen: boolean
  onClose: () => void
}

export function VehiclePriceModal({ vehicle, isOpen, onClose }: VehiclePriceModalProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    comments: "",
    consent: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch(
        "https://internal-api-us.shortloop.dev/api/v1/scheduling/batch-debug",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            assistantId: "692a003fc51dd95fc9c82af6",
            contact: {
              name: `${formData.firstName}`.trim(),
              phoneNo: formData.phone,
            },
            metaData: {
              email: formData.email,
            },
            callStrategy: {
              maxRetries: 1,
              bypassDuplicateCheck: true,
              ignoreWorkingHours: true,
              timezone: "America/Denver",
            },
            templateVariable: {
              year: vehicle.year,
              make: vehicle.make,
              model: vehicle.model,
              trim: vehicle.trim,
              color: vehicle.color,
              stockNumber: vehicle.stockNumber,
              vin: vehicle.vin,
              mileage: vehicle.mileage,
              fuelType: vehicle.fuelType,
              imageUrl: vehicle.imageUrl,
              price: vehicle.price,
              comments: formData.comments,
            },
          }),
        }
      )

      if (!response.ok) {
        console.error("Failed to submit pricing request", await response.text())
        return
      }

      setIsSubmitted(true)
    } catch (error) {
      console.error("Error submitting pricing request", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 text-gray-700" />
        </button>

        {isSubmitted ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-blue-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Submitted!</h2>
            <p className="text-gray-500 mb-6">{"We'll get back to you with today's best price shortly."}</p>
            <Button onClick={onClose} className="bg-blue-600 text-white hover:bg-blue-700">
              Close
            </Button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row">
            {/* Vehicle info section */}
            <div className="lg:w-2/5 p-6 bg-gray-50">
              <div className="aspect-video rounded-xl overflow-hidden mb-4 bg-white">
                <img
                  src={vehicle.imageUrl || "/placeholder.svg"}
                  alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-1">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </h3>
              <p className="text-sm text-blue-600 font-medium mb-4">{vehicle.trim}</p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                    <Car className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Color</p>
                    <p className="text-gray-900 font-medium">{vehicle.color}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                    <Gauge className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Mileage</p>
                    <p className="text-gray-900 font-medium">{vehicle.mileage}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                    <Fuel className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Fuel Type</p>
                    <p className="text-gray-900 font-medium">{vehicle.fuelType}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  Stock # <span className="text-gray-900">{vehicle.stockNumber}</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  VIN <span className="text-gray-900 font-mono text-[10px]">{vehicle.vin}</span>
                </p>
              </div>
            </div>

            {/* Form section */}
            <div className="lg:w-3/5 p-6">
              <div className="mb-6">
                <p className="text-blue-600 text-sm font-medium mb-1">Limited Time Offer</p>
                <h2 className="text-2xl font-bold text-gray-900">{"Get Today's Price"}</h2>
                <p className="text-gray-500 text-sm mt-1">Enter your details to receive our best internet price</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-gray-900 text-sm">
                      First Name *
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      placeholder="John"
                      className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-gray-900 text-sm">
                      Last Name *
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      placeholder="Doe"
                      className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-900 text-sm">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-900 text-sm">
                    Phone *
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="(555) 123-4567"
                    className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="comments" className="text-gray-900 text-sm">
                    Comments
                  </Label>
                  <Textarea
                    id="comments"
                    name="comments"
                    value={formData.comments}
                    onChange={handleChange}
                    placeholder="Any questions or specific requests?"
                    rows={3}
                    className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  />
                </div>

                <div className="flex items-start gap-3 pt-2">
                  <Checkbox
                    id="consent"
                    checked={formData.consent}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, consent: checked as boolean }))}
                    className="mt-0.5 border-gray-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                  />
                  <Label htmlFor="consent" className="text-xs text-gray-500 leading-relaxed cursor-pointer">
                    I agree to receive calls, texts, and emails regarding this vehicle. Standard messaging rates may
                    apply.
                  </Label>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting || !formData.consent}
                  className="w-full bg-blue-600 text-white hover:bg-blue-700 font-semibold py-6 text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    "Get Today's Price →"
                  )}
                </Button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
