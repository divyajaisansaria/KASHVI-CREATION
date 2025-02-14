import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "@/store/shop/wishlist-slice";
import { toast } from "react-toastify";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { filterOptions } from "@/config";
import { HeartIcon } from "lucide-react";

function ShoppingProductTile({ product, handleGetProductDetails, handleAddtoCart }) {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist?.items || []);
  const isInWishlist = wishlist.some((item) => item._id === product?._id);
  const [liked, setLiked] = useState(isInWishlist);
  const [animateHeart, setAnimateHeart] = useState(false);

  useEffect(() => {
    setLiked(isInWishlist);
  }, [wishlist, product]);

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    
    if (liked) {
      dispatch(removeFromWishlist(product?._id));
      toast.error("Removed from Wishlist ❌");
    } else {
      dispatch(addToWishlist(product));
      toast.success("Added to Wishlist ❤️");
      setAnimateHeart(true);
      setTimeout(() => setAnimateHeart(false), 500);
    }
    
    setLiked(!liked);
  };

  const findLabel = (category, id) => {
    const option = filterOptions[category]?.find(opt => opt.id === id);
    return option?.label || id;
  };

  return (
    <Card 
      className="w-full max-w-sm mx-auto group transition-all duration-300 
                border border-[#b2996c]/10 bg-white rounded-lg overflow-hidden shadow-lg 
                hover:shadow-2xl hover:scale-110"
    >
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

          {/* Heart Button - Wishlist */}
          <button
            onClick={handleWishlistToggle}
            className={`absolute top-3 right-3 p-2 transition-all duration-300 
                      ${animateHeart ? "animate-bounce" : ""}`}
          >
            <HeartIcon size={22} fill={liked ? "red" : "none"} stroke="red" />
          </button>
        </div>

        <CardContent className="p-4 space-y-4">
          {/* Title */}
          <h2 className="text-xl font-semibold text-[#0a373b] line-clamp-2 leading-tight">
            {product?.designNumber}
          </h2>
          <h3 className="text-xl font-semibold text-[#0a373b] line-clamp-2 leading-tight">
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
              <div className="w-3 h-3 rounded-full bg-gray-300 shadow-sm" />
              <span className="text-sm text-[#0a373b]/80 font-medium">
                {findLabel("Color", product?.color)}
              </span>
            </div>
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
