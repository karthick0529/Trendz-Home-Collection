import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { remove } from "../redux/Slices/CartSlice";
import toast from "react-hot-toast";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  function removeItem() {
    // dispatch(remove(item._id));
    dispatch(remove(item.id));
    toast.error("Item Removed");
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 border-b border-gray-300 p-4">
      {/* Product Image */}
      <div className="flex-shrink-0">
        <img
          className="rounded-md w-full h-40 md:h-48 lg:h-64 object-cover"
          // src={`http://localhost:5000/files/${item.image}`}
          // src={`https://trendz-home-collection.onrender.com/files/${item.image}`}
          src={item.image}
          alt={item.name}
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col justify-between flex-grow">
        <div className="flex-grow">
          {/* <p className="text-lg font-bold">{item.name}</p> */}
          <p className="text-lg font-bold">{item.title}</p>
          <p className="text-sm text-gray-600 mb-2">
            {item.description.split(" ").slice(0, 10).join(" ") + "..."}
          </p>
        </div>
        {/* Price and Remove Button */}
        <div className="flex justify-between items-center mt-2">
          <p className="text-gray-900 font-bold text-lg">₹{item.price}</p>
          <div
            onClick={removeItem}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-red-300 cursor-pointer hover:bg-red-400 transition duration-300"
          >
            <MdDelete className="text-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

