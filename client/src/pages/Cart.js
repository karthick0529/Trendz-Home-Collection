import { useSelector, useDispatch } from "react-redux"; // Import useDispatch
import CartItem from "../components/CartItem";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Footer from "../components/Footer";
import toast from "react-hot-toast";
import { clear } from "../redux/Slices/CartSlice"; // Import the clear action

const Cart = () => {
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch(); // Initialize dispatch
  const [totalAmount, setTotalAmount] = useState(0);

  // Separate state for each field in the shipping address form
  const [district, setDistrict] = useState("");
  const [taluka, setTaluka] = useState("");
  const [city, setCity] = useState("");
  const [road, setRoad] = useState("");
  const [post, setPost] = useState("");
  const [pin, setPin] = useState("");

  useEffect(() => {
    setTotalAmount(cart.reduce((acc, curr) => acc + curr.price, 0));
  }, [cart]);

  const handleCheckout = () => {
    // Check if all address fields are filled
    if (!district || !taluka || !city || !road || !post || !pin) {
      toast.error("Please fill in all the shipping address fields");
      return;
    }

    const shippingAddress = `${road}, ${post}, ${city}, ${taluka}, ${district}, Pin: ${pin}`;

    const options = {
      key: 'rzp_test_3WUTrpolUhcOdV', // Replace with your Razorpay test API key
      amount: totalAmount * 100, // Amount in smallest currency unit (e.g., cents)
      currency: "INR", // Currency code
      name: "Your Shop Name",
      description: "Order Summary",
      image: "https://your-logo-url.com/trendy.ipg", // Your logo URL
      handler: function (response) {
        alert(`Payment successful: ${response.razorpay_payment_id}`);
        
        // Dispatch the clear action to clear the cart
        dispatch(clear());

        // Here you can send the payment details and shipping address to your backend for verification and order processing
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
        contact: "9999999999",
      },
      notes: {
        address: shippingAddress, // Include shipping address in the payment notes
      },
      theme: {
        color: "#F37254",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex justify-center items-start max-w-6xl mx-auto p-4 flex-grow">
        {cart.length > 0 ? (
          <div className="flex flex-col md:flex-row md:justify-between gap-6">
            <div className="flex flex-col gap-4 w-full">
              {cart.map((item, index) => (
                <CartItem key={index} item={item} />
              ))}
            </div>
            <div className="bg-white rounded-lg shadow-md p-4 w-full md:w-1/3">
              <div className="flex flex-col h-full justify-between">
                <div>
                  <p className="text-gray-800 font-bold">Your Cart</p>
                  <p className="text-gray-800 font-bold text-2xl uppercase">Summary</p>
                  <p className="font-bold">Total Items: {cart.length}</p>
                </div>

                {/* Shipping Address Form */}
                <div className="mt-4">
                  <label className="font-bold text-gray-800">Shipping Address:</label>
                  <div className="flex flex-col gap-2">
                    <input
                      type="text"
                      value={road}
                      onChange={(e) => setRoad(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
                      placeholder="Road / Area"
                    />
                    <input
                      type="text"
                      value={post}
                      onChange={(e) => setPost(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
                      placeholder="Post"
                    />
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
                      placeholder="City"
                    />
                    <input
                      type="text"
                      value={taluka}
                      onChange={(e) => setTaluka(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
                      placeholder="Taluka"
                    />
                    <input
                      type="text"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
                      placeholder="District"
                    />
                    <input
                      type="text"
                      value={pin}
                      onChange={(e) => setPin(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
                      placeholder="Pin Code"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <p className="font-bold">Total Amount: ₹{totalAmount}</p>
                  <button
                    onClick={handleCheckout}
                    className="w-full px-4 py-2 mt-2 text-white font-bold rounded-md bg-gray-900 hover:bg-gray-800 transition duration-300"
                  >
                    CheckOut Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center h-full">
            <NavLink to="/">
              <div className="bg-gray-900 text-white rounded-md px-4 py-2 hover:bg-gray-800 transition duration-300">
                Shop Now
              </div>
            </NavLink>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
