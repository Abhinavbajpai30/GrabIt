import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

export const AppContext = createContext(null);
const AppContextProvider = ({children}) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isSeller, setIsSeller] = useState(null);
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [searchQuery, setSearchQuery] = useState("");

    const fetchProducts = async () => {
        setProducts(dummyProducts);
    }

    const addToCart = (itemId) => {
        let cartData = structuredClone(cartItems);
        if(cartData[itemId]) {
            cartData[itemId]++;
        } else {
            cartData[itemId] = 1;
        }
        setCartItems(cartData);
        toast.success("Added to Cart!")
    }

    const removeFromCart = (itemId) => {
        let cartData = structuredClone(cartItems);
        if(cartItems[itemId]) {
            cartData[itemId]--;
            if(cartData[itemId]<=0) {
                delete cartData[itemId];
            }
        }
        setCartItems(cartData);
        toast.success("Removed from Cart!")
    }

    const updateCartItem = (itemId, quantity) => {
        let cartData = structuredClone(cartItems);
        if(quantity===0) {
            delete cartData[itemId];
        } else {
            cartData[itemId] = quantity;
        }
        setCartItems(cartData);
        toast.success("Cart Updated!")
    }

    const totalCartItems = () => {
        let count = 0;
        for(const item in cartItems) {
            count+=cartItems[item];
        }
        return count;
    }

    const totalCartAmount = () => {
        let amount = 0;
        for(const item in cartItems) {
            let itemInfo = products.find((product) => product._id===item);
            amount+= cartItems[item]*itemInfo.offerPrice;
        }
        return amount;
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    const value = {
        navigate,
        user,
        setUser,
        isSeller,
        setIsSeller,
        showUserLogin,
        setShowUserLogin,
        products,
        cartItems,
        addToCart,
        removeFromCart,
        updateCartItem,
        totalCartItems,
        totalCartAmount,
        searchQuery,
        setSearchQuery,
    };
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;