import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addReview, getReviews } from "@/store/shop/review-slice";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "../ui/use-toast";
import StarRatingComponent from "../common/star-rating";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Label } from "../ui/label";import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { useRef } from "react";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentImage, setCurrentImage] = useState(0)
  
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { reviews } = useSelector((state) => state.shopReview);
  const { toast } = useToast();
  const [showMagnifier, setShowMagnifier] = useState(false);
const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });
const imageRef = useRef(null);

const MAGNIFIER_SIZE = 200; // Magnifier size
const ZOOM = 2;
const handleMouseMove = (e) => {
  if (!imageRef.current) return;

  const rect = imageRef.current.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  setMagnifierPosition({ x, y });
};

  useEffect(() => {
    if (open && productDetails?._id) {
      dispatch(getReviews(productDetails._id));
    }
  }, [open, productDetails, dispatch]);

  function handleRatingChange(getRating) {
    setRating(getRating);
  }

  function handleAddToCart(getCurrentProductId) {
    if (!user?._id) {
      toast({
        title: "Login Required",
        description: "Please log in to add items to cart.",
        variant: "destructive",
      });
      return;
    }

    console.log("Attempting to add to cart...");
    console.log("User ID:", user._id);
    console.log("Product ID:", getCurrentProductId);

    dispatch(addToCart({ userId: user._id, productId: getCurrentProductId, quantity: 1 }))
      .then((data) => {
        console.log("Add to Cart Response:", data?.payload);

        if (data?.payload?.success) {
          console.log("Fetching updated cart items for UserID:", user._id);
          dispatch(fetchCartItems(user._id))
            .then(() => console.log("Cart updated successfully!"))
            .catch((err) => console.error("Error fetching cart items:", err));

          toast({
            title: "Added to Cart",
            description: "The product has been added to your cart.",
            variant: "success",
          });
        } else {
          console.error("Failed to add product to cart:", data?.payload?.message);
          toast({
            title: "Error",
            description: "Failed to add product to cart.",
            variant: "destructive",
          });
        }
      })
      .catch((err) => {
        console.error("Error adding product to cart:", err);
        toast({
          title: "Something went wrong!",
          description: "Please try again later.",
          variant: "destructive",
        });
      });
  }

  async function handleAddReview() {
    if (!user?._id) {
      toast({
        title: "Login Required",
        description: "Please log in to submit a review.",
        variant: "destructive",
      });
      return;
    }

    if (!reviewMsg.trim() || rating === 0) {
      toast({
        title: "Incomplete Review",
        description: "Please add a review message and select a rating.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("Submitting review...");
      const response = await dispatch(
        addReview({
          productId: productDetails?._id,
          userId: user._id,
          userName: user?.userName || "Anonymous",
          reviewMessage: reviewMsg.trim(),
          reviewValue: rating,
        })
      );

      console.log("Review Response:", response.payload);

      if (response.payload?.success) {
        setRating(0);
        setReviewMsg("");
        await dispatch(getReviews(productDetails?._id));
        toast({
          title: "Review Added",
          description: "Your review has been successfully submitted!",
          variant: "success",
        });
      } else {
        throw new Error(response.payload?.message || "Failed to add review");
      }
    } catch (error) {
      console.error("Review submission failed:", error);
      toast({
        title: "Error",
        description: "Failed to add review. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + (reviewItem.reviewValue || 0), 0) / reviews.length
      : 0;

  return (
    <Dialog open={open} onOpenChange={() => setOpen(false)}>
      <DialogContent
        className="grid sm:grid-cols-[50%_1fr] max-w-[90vw] sm:max-w-[85vw] lg:max-w-[75vw] overflow-y-auto max-h-[100vh]"
      >
        {/* Product Image (Left) */}
        <div className="relative">
  <Swiper
    modules={[Navigation, Pagination]}
    navigation
    pagination={{ clickable: true }}
    className="rounded-lg overflow-hidden"
    onSlideChange={(swiper) => setCurrentImage(swiper.activeIndex)}
  >
    {productDetails?.images?.map((img, index) => (
      <SwiperSlide key={index}>
        <div
          className="relative"
          onMouseEnter={() => setShowMagnifier(true)}
          onMouseLeave={() => setShowMagnifier(false)}
          onMouseMove={handleMouseMove}
          ref={index === currentImage ? imageRef : null}
        >
          <img
            src={img || "/placeholder.svg"}
            alt={productDetails?.title}
            className="w-full object-cover aspect-square"
          />
          {showMagnifier && index === currentImage && (
            <div
              className="absolute pointer-events-none"
              style={{
                width: `${MAGNIFIER_SIZE}px`,
                height: `${MAGNIFIER_SIZE}px`,
                left: `${magnifierPosition.x - MAGNIFIER_SIZE / 2}px`,
                top: `${magnifierPosition.y - MAGNIFIER_SIZE / 2}px`,
                border: "2px solid #fff",
                borderRadius: "50%",
                overflow: "hidden",
                boxShadow: "0 0 10px rgba(0,0,0,0.3)",
                zIndex: 50,
              }}
            >
              <img
                src={img || "/placeholder.svg"}
                alt={productDetails?.title}
                style={{
                  width: `${imageRef.current?.offsetWidth * ZOOM}px`,
                  height: `${imageRef.current?.offsetHeight * ZOOM}px`,
                  maxWidth: "none",
                  maxHeight: "none",
                  position: "absolute",
                  left: `${-magnifierPosition.x * ZOOM + MAGNIFIER_SIZE / 2}px`,
                  top: `${-magnifierPosition.y * ZOOM + MAGNIFIER_SIZE / 2}px`,
                }}
              />
            </div>
          )}
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
</div>

        {/* Product Details (Right) */}
        <div className="overflow-y-auto max-h-[85vh]">
          <h1 className="text-3xl font-bold">{productDetails?.title || "Product Title"}</h1>
          <p className="text-lg text-gray-600 my-4">{productDetails?.description || "No description available."}</p>

          {/* Star Rating & Average */}
          <div className="flex items-center gap-3 mb-5">
            <StarRatingComponent rating={averageReview} className="flex gap-1" />
            <span className="text-gray-600 text-lg">({averageReview.toFixed(2)})</span>
          </div>

          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-3"
            onClick={() => handleAddToCart(productDetails?._id)}
          >
            Add to Cart
          </Button>

          <Separator className="my-6" />

          {/* Customer Reviews */}
          <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
          <div className="max-h-[300px] overflow-y-auto pr-2 space-y-3">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review._id} className="border p-4 rounded-lg shadow-sm bg-gray-50">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{review.userName[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{review.userName}</p>
                      <StarRatingComponent rating={review.reviewValue} className="flex gap-1" />
                    </div>
                  </div>
                  <p className="mt-2 text-gray-600">{review.reviewMessage}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No reviews yet.</p>
            )}
          </div>

          {/* Add Review Form */}
          <div className="mt-10 flex flex-col gap-4 bg-gray-100 p-5 rounded-lg shadow-md">
            <Label className="text-lg font-semibold">Your Review</Label>
            <div className="flex gap-2">
              <StarRatingComponent rating={rating} handleRatingChange={handleRatingChange} className="flex gap-1" />
            </div>
            <Input value={reviewMsg} onChange={(e) => setReviewMsg(e.target.value)} placeholder="Write a review..." className="text-lg p-3" />
            <Button onClick={handleAddReview} disabled={isSubmitting || !reviewMsg.trim()} className="bg-green-600 hover:bg-green-700 text-lg py-3">
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
