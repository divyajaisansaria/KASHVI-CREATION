"use client"

import { motion } from "framer-motion"
import { Package, Truck, CheckCircle, HelpCircle, Search } from "lucide-react"
import { useState } from "react"
import Footer from '../../components/common/Footer';
export default function TrackOrder() {
  const [orderNumber, setOrderNumber] = useState("")
  const [isTracking, setIsTracking] = useState(false)

  const handleTrack = (e) => {
    e.preventDefault()
    setIsTracking(true)
  }

  return (
    <div className="min-h-screen bg-[#f8f4f0] py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4"
      >
        {/* Track Order Form */}
        <div className="max-w-xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Track Your Order</h1>
          <p className="text-muted-foreground mb-8">
            Enter your order number to track your beautiful saree's journey to you
          </p>
          <form onSubmit={handleTrack} className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter Order Number"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
              >
                <Search className="w-4 h-4" />
                Track
              </button>
            </div>
          </form>
        </div>

        {/* Order Status */}
        {isTracking && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-semibold">Order #123456</h2>
                <p className="text-muted-foreground">Estimated Delivery: 3-5 Days</p>
              </div>
              <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                In Transit
              </span>
            </div>

            {/* Timeline */}
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex gap-4"
                >
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Package className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Order Confirmed</h3>
                    <p className="text-muted-foreground">Your order has been confirmed</p>
                    <p className="text-sm text-muted-foreground">24 December, 2023</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex gap-4"
                >
                  <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <Truck className="w-8 h-8 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">In Transit</h3>
                    <p className="text-muted-foreground">Your package is on its way</p>
                    <p className="text-sm text-muted-foreground">25 December, 2023</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex gap-4 opacity-50"
                >
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-8 h-8 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Delivered</h3>
                    <p className="text-muted-foreground">Pending delivery</p>
                    <p className="text-sm text-muted-foreground">Expected: 27 December, 2023</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}

        {/* FAQs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="max-w-2xl mx-auto mt-16"
        >
          <h2 className="text-2xl font-semibold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-start gap-4">
                <HelpCircle className="w-6 h-6 text-purple-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">How long does delivery take?</h3>
                  <p className="text-muted-foreground">
                    Standard delivery takes 3-5 business days. Express delivery options are available at checkout.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-start gap-4">
                <HelpCircle className="w-6 h-6 text-purple-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">What if I'm not home for delivery?</h3>
                  <p className="text-muted-foreground">
                    Our courier will leave a card and attempt redelivery. You can also arrange pickup from a local
                    collection point.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
      <Footer />
    </div>
  )
}

