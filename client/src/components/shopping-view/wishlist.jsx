import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { removeFromWishlist } from "../../store/shop/wishlist-slice";
import { addToCart, fetchCartItems } from "../../store/shop/cart-slice";
import { useToast } from "../ui/use-toast";

const Wishlist = () => {
  const dispatch = useDispatch();
  const { items: wishlist } = useSelector((state) => state.wishlist);
  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast();

  console.log("🔍 Current User:", user); // ✅ Debug user object

  // ✅ Ensure user is logged in and has a valid _id
  if (!user || !user._id) {
    console.error("❌ User not found or ID is undefined!");
    return <div>Please log in to view your wishlist.</div>; // Return message if user is not logged in
  }

  // ✅ Remove item from wishlist
  const handleRemoveFromWishlist = (productId) => {
    dispatch(removeFromWishlist(productId));
  };

  // ✅ Add item to cart & update Redux cart state
  const handleAddToCart = (productId, stock) => {
    if (!user || !user._id) {
      toast({
        title: "Login Required",
        description: "Please log in to add items to cart.",
        variant: "destructive",
      });
      return;
    }

    if (stock === 0) {
      toast({
        title: "Out of Stock",
        description: "This item is currently unavailable.",
        variant: "destructive",
      });
      return;
    }

    console.log("🛒 Adding to Cart from Wishlist:", productId);
    console.log("👤 User ID:", user._id);

    // Ensure user._id is passed correctly to the addToCart action
    dispatch(addToCart({ userId: user._id, productId, quantity: 1 }))
      .then((data) => {
        console.log("✅ Add to Cart Response:", data?.payload);

        if (data?.payload?.success) {
          console.log("🔄 Fetching updated cart items...");

          // Fetch the latest cart items after adding an item from wishlist
          if (user && user._id) {
            dispatch(fetchCartItems(user._id)).then((updatedCart) => {
              console.log("🛍️ Updated Cart Items from Wishlist:", updatedCart?.payload);
            });
          } else {
            console.error("🚨 Cannot fetch cart, user ID is missing!");
          }

          // ✅ Remove the product from wishlist after adding to cart
          dispatch(removeFromWishlist(productId));

          toast({
            title: "Added to Cart",
            description: "The item has been added to your cart.",
            variant: "success",
          });
        } else {
          console.error("⚠️ Failed to add product to cart:", data?.payload?.message);
          toast({
            title: "Error",
            description: "Failed to add product to cart.",
            variant: "destructive",
          });
        }
      })
      .catch((err) => {
        console.error("❌ Error adding product to cart:", err);
        toast({
          title: "Something went wrong!",
          description: "Please try again later.",
          variant: "destructive",
        });
      });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>

      {wishlist.length === 0 ? (
        <p className="text-gray-600">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((product) => (
            <div key={product._id} className="border p-4 rounded-lg shadow-md">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-40 object-cover rounded"
              />
              <h2 className="text-xl font-semibold mt-2">{product.title}</h2>
              <p className="text-gray-600">{product.description}</p>

              {/* ✅ Remove from Wishlist Button */}
              <Button
                className="mt-4 w-full bg-red-600 text-white"
                onClick={() => handleRemoveFromWishlist(product._id)}
              >
                Remove from Wishlist
              </Button>

              {/* ✅ Add to Cart Button */}
              <Button
                className="mt-2 w-full bg-green-600 text-white"
                onClick={() => handleAddToCart(product._id, product.totalStock)}
              >
                Add to Cart
              </Button>
            </div>
          ))}
        </div>
      )}

      <Link to="/" className="mt-6 inline-block text-blue-600 underline">
        ← Back to Shop
      </Link>
    </div>
  );
};

export default Wishlist;
