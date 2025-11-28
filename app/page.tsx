"use client"

import { useState } from "react"
import { VehiclePriceModal } from "@/components/vehicle-price-modal"
import { VehicleCard } from "@/components/vehicle-card"
import { Search, SlidersHorizontal } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const vehicles = [
  {
    year: "2024",
    make: "Chevrolet",
    model: "Spark",
    trim: "LT Hatchback",
    color: "Black Granite",
    stockNumber: "PN0051A",
    vin: "KL8CD6S94EC539770",
    mileage: "32,450 mi",
    fuelType: "Gasoline",
    imageUrl: "/black-chevrolet-spark-hatchback-car.jpg",
    price: "$12,995",
  },
  {
    year: "2023",
    make: "Honda",
    model: "Civic",
    trim: "Sport Sedan",
    color: "Rallye Red",
    stockNumber: "HC2234B",
    vin: "2HGFE2F59PH543210",
    mileage: "18,200 mi",
    fuelType: "Gasoline",
    imageUrl: "/red-honda-civic-sedan-car.jpg",
    price: "$24,500",
  },
  {
    year: "2024",
    make: "Toyota",
    model: "RAV4",
    trim: "XLE AWD",
    color: "Lunar Rock",
    stockNumber: "TR4412C",
    vin: "2T3P1RFV5PW123456",
    mileage: "8,750 mi",
    fuelType: "Hybrid",
    imageUrl: "/gray-toyota-rav4-suv-car.jpg",
    price: "$34,800",
  },
  {
    year: "2022",
    make: "Ford",
    model: "Mustang",
    trim: "GT Premium",
    color: "Oxford White",
    stockNumber: "FM5521D",
    vin: "1FA6P8CF8N5123789",
    mileage: "22,100 mi",
    fuelType: "Gasoline",
    imageUrl: "/white-ford-mustang-gt-sports-car.jpg",
    price: "$42,750",
  },
  {
    year: "2023",
    make: "Tesla",
    model: "Model 3",
    trim: "Long Range",
    color: "Pearl White",
    stockNumber: "TM3301E",
    vin: "5YJ3E1EA1PF654321",
    mileage: "12,400 mi",
    fuelType: "Electric",
    imageUrl: "/white-tesla-model-3.png",
    price: "$38,900",
  },
  {
    year: "2024",
    make: "BMW",
    model: "X5",
    trim: "xDrive40i",
    color: "Alpine White",
    stockNumber: "BX5108F",
    vin: "5UXCR6C07P9A87654",
    mileage: "5,200 mi",
    fuelType: "Gasoline",
    imageUrl: "/white-bmw-x5-luxury-suv-car.jpg",
    price: "$62,400",
  },
]

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedVehicle, setSelectedVehicle] = useState(vehicles[0])

  const handleGetPrice = (vehicle: (typeof vehicles)[0]) => {
    setSelectedVehicle(vehicle)
    setIsModalOpen(true)
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">AutoMax Motors</h1>
              <p className="text-sm text-gray-500">Premium Pre-Owned Vehicles</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input placeholder="Search inventory..." className="pl-10 w-64 bg-gray-50 border-gray-200" />
              </div>
              <Button variant="outline" className="border-gray-200 bg-transparent">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Inventory Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Available Inventory</h2>
            <p className="text-sm text-gray-500">{vehicles.length} vehicles found</p>
          </div>
          <select className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-700">
            <option>Sort by: Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Mileage: Low to High</option>
            <option>Year: Newest</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.stockNumber} vehicle={vehicle} onGetPrice={() => handleGetPrice(vehicle)} />
          ))}
        </div>
      </section>

      {/* Modal */}
      <VehiclePriceModal vehicle={selectedVehicle} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  )
}
