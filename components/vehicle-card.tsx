"use client"

import { Car, Gauge, Fuel } from "lucide-react"
import { Button } from "@/components/ui/button"

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

interface VehicleCardProps {
  vehicle: VehicleInfo
  onGetPrice: () => void
}

export function VehicleCard({ vehicle, onGetPrice }: VehicleCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          src={vehicle.imageUrl || "/placeholder.svg"}
          alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-5">
        <div className="mb-3">
          <h3 className="text-lg font-bold text-gray-900">
            {vehicle.year} {vehicle.make} {vehicle.model}
          </h3>
          <p className="text-sm text-blue-600 font-medium">{vehicle.trim}</p>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1.5">
            <Gauge className="w-4 h-4 text-blue-600" />
            <span>{vehicle.mileage}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Fuel className="w-4 h-4 text-blue-600" />
            <span>{vehicle.fuelType}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Car className="w-4 h-4 text-blue-600" />
            <span>{vehicle.color}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <p className="text-xs text-gray-500">Starting at</p>
            <p className="text-xl font-bold text-gray-900">{vehicle.price}</p>
          </div>
          <Button onClick={onGetPrice} className="bg-blue-600 text-white hover:bg-blue-700 font-semibold">
            Get Today's Price
          </Button>
        </div>

        <p className="text-xs text-gray-400 mt-3">Stock # {vehicle.stockNumber}</p>
      </div>
    </div>
  )
}
