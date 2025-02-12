import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { filterOptions } from "@/config";
import { HeartIcon, Clock } from "lucide-react";

function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) {
  const findLabel = (category, id) => {
    const option = filterOptions[category]?.find(opt => opt.id === id);
    return option?.label || id;
  };

  const colorToClass = {
    "Red": "bg-red-500",
    "Blue": "bg-blue-500", 
    "Green": "bg-green-500",
    "Black": "bg-black",
    "White": "bg-white border-2 border-[#b2996c]/20",
    "Pink": "bg-pink-500",
    "Yellow": "bg-yellow-400",
    "Gold": "bg-[#b2996c]",
    "Purple": "bg-purple-500",
    "Orange": "bg-orange-500",
    "Brown": "bg-amber-800",
    "Beige": "bg-[#F5F5DC]",
    "Silver": "bg-gray-300",
    "Gray": "bg-gray-500",
    "Teal": "bg-teal-500",
    "Maroon": "bg-red-900",
    "Turquoise": "bg-cyan-400",
    "Lavender": "bg-purple-300",
    "Ivory": "bg-[#FFFFF0] border-2 border-[#b2996c]/20"
  };

  const colorLabel = findLabel("Color", product?.color);
  const currentDate = new Date().toLocaleString();

  return (
    <Card className="w-full max-w-sm mx-auto group hover:shadow-xl transition-all duration-300 border border-[#b2996c]/10 bg-white rounded-lg overflow-hidden shadow-lg hover:scale-105">
      <div 
        onClick={() => handleGetProductDetails(product?._id)}
        className="cursor-pointer relative overflow-hidden"
      >
        {/* Image Container */}
        <div className="relative group-hover:scale-105 transition-transform duration-500">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[320px] object-cover rounded-t-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a373b]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Status Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product?.totalStock === 0 ? (
              <Badge className="bg-red-600 text-white px-3 py-1 rounded-md shadow-md">
                Out Of Stock
              </Badge>
            ) : product?.totalStock < 10 ? (
              <Badge className="bg-orange-500 text-white px-3 py-1 rounded-md shadow-md">
                {`Only ${product?.totalStock} left`}
              </Badge>
            ) : null}
          </div>

          {/* Action Buttons */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <button className="p-2 bg-white/90 rounded-full hover:bg-[#b2996c] hover:text-white transition-colors duration-200 shadow-lg">
              <HeartIcon size={18} />
            </button>
          </div>
        </div>

        <CardContent className="p-4 space-y-4">
          {/* Title */}
          <h2 className="text-xl font-semibold text-[#0a373b] line-clamp-2 leading-tight">
          {product?.designNumber}
          </h2>
          <h3 className="text-xl font-semibold text-[#0a373b] line-clamp-2  leading-tight">
          {product?.title}
          </h3>
          
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="bg-[#F8F4F0] text-sm text-[#0a373b] border-[#b2996c]/30 hover:bg-[#b2996c]/10 rounded-lg shadow-sm">
              {findLabel("Category", product?.category)}
            </Badge>
            <Badge variant="outline" className="bg-[#F8F4F0] text-sm text-[#0a373b] border-[#b2996c]/30 hover:bg-[#b2996c]/10 rounded-lg shadow-sm">
              {findLabel("Occasion", product?.occasion)}
            </Badge>
          </div>

          {/* Details */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2 bg-[#F8F4F0] px-3 py-1 rounded-full">
              <div className={`w-3 h-3 rounded-full ${colorToClass[colorLabel] || "bg-gray-200"} shadow-sm`} />
              <span className="text-sm text-[#0a373b]/80 font-medium">{colorLabel}</span>
            </div>
            <Badge variant="outline" className="bg-[#F8F4F0] text-sm text-[#0a373b] border-[#b2996c]/30 rounded-lg shadow-sm">
              {findLabel("Fabric", product?.fabric)}
            </Badge>
          </div>

          {/* Timestamp
          <div className="flex items-center gap-1.5 text-xs text-[#0a373b]/60">
            <Clock size={12} />
            <span>Last updated: {currentDate}</span>
          </div> */}
        </CardContent>
      </div>

      <CardFooter className="p-4 pt-0">
        <Button
          disabled={product?.totalStock === 0}
          onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
          className="w-full bg-[#0a373b] hover:bg-[#0a373b]/90 text-white disabled:bg-gray-200 disabled:text-gray-500 rounded-lg shadow-md transition-colors duration-200"
        >
          {product?.totalStock === 0 ? "Out Of Stock" : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;