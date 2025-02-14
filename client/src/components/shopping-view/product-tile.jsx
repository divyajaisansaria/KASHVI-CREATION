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
    <Card className="w-full max-w-[250px] mx-auto group transition-all duration-300 border-none bg-white overflow-hidden shadow-lg hover:shadow-xl ">
      <div 
        onClick={() => handleGetProductDetails(product?._id)}
        className="cursor-pointer relative overflow-hidden"
      >
        {/* Image Container */}
        <div className="relative overflow-hidden">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[360px] object-cover  transition-transform duration-300 transform group-hover:scale-105"
          />
          
          {/* Status Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1">
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

        <CardContent className="p-4 space-y-3">
          {/* Title and Design Number */}
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900 leading-snug line-clamp-2">
              DNo: {product?.designNumber}
            </h3>
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full">
              <div className={`w-2 h-2 rounded-full ${colorToClass[colorLabel] || "bg-gray-200"} shadow-sm`} />
              <span className="font-medium text-[12px] text-gray-700">{colorLabel}</span>
            </div>
          </div>
          
          {/* Product Title */}
          <h3 className="text-sm font-medium text-gray-900 leading-snug line-clamp-2">
            {product?.title}
          </h3>

          {/* Details - Removed Category */}
          <div className="flex flex-wrap gap-2">
            {/* Additional details can be placed here */}
          </div>
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
