import React from "react";
import { useGetAllProductsQuery } from "./redux/product/productApi";
import { BsCartPlus } from "react-icons/bs";
import { IoMdHeart } from "react-icons/io";
import { ImSpinner6 } from "react-icons/im";
import { useDispatch } from "react-redux";
import { BsCartFill } from "react-icons/bs";

import {
	addToCart,
	cartsSlice,
	clearCart,
	removeItem,
} from "./redux/cart/cartSlice";
import { addWishListItem } from "./redux/wishList/wishListSlice";

import { useSelector } from "react-redux";

const App = () => {
	const dispatch = useDispatch();
	const { data: products, error, isLoading } = useGetAllProductsQuery();
	const cartItems = useSelector((state) => state.carts.cartsItems);
	const wishListItems = useSelector((state) => state.wishList.wishListiItems);

	console.log("first", cartItems);

	if (isLoading) {
		return (
			<div className="flex items-center justify-center min-h-screen text-6xl font-bold">
				<ImSpinner6 className="animate-spin" />
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex items-center justify-center min-h-screen text-lg font-semibold text-red-500 bg-red-50">
				Error occurred: {error.message}
			</div>
		);
	}

	return (
		<>
			<div className="w-full my-5 text-xl font-bold text-center">
				Managing Cart and Wishlist Items with LocalStorage and RTK Query
			</div>
			<div className="flex ml-auto w-fit">
				<div className="relative flex justify-end mt-5 mr-10 w-fit">
					<IoMdHeart className="text-red-500" size={30} />
					<span className="absolute flex items-center justify-center w-2 h-2 p-3 text-xs font-bold text-white bg-black rounded-full -right-3 -top-2">
						{wishListItems?.length}
					</span>
				</div>
				<div className="relative flex justify-end mt-5 mr-10 w-fit">
					<BsCartFill className="text-black" size={30} />
					<span className="absolute flex items-center justify-center w-2 h-2 p-3 text-xs font-bold text-white bg-red-500 rounded-full -right-3 -top-2">
						{cartItems?.length}
					</span>
				</div>
			</div>
			<div className="grid min-h-screen gap-8 p-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 bg-gradient-to-b from-gray-50 to-gray-100">
				{products?.map((product) => (
					<div
						key={product.id}
						className="relative overflow-hidden transition-transform transform bg-white border border-gray-200 shadow-lg group rounded-xl hover:scale-105 hover:shadow-2xl hover:border-transparent hover:cursor-pointer"
					>
						<div className="relative h-56 overflow-hidden rounded-t-xl ">
							<img
								src={product.image}
								alt={product.title}
								className="object-center w-full h-full p-4 transition-transform transform group-hover:scale-110"
							/>
							<div className="absolute inset-0 transition-opacity opacity-0 bg-gradient-to-t from-black via-transparent to-transparent group-hover:opacity-100" />
						</div>
						<div className="flex flex-col gap-3 p-4">
							<h3 className="text-lg font-bold text-gray-800 truncate group-hover:text-indigo-600">
								{product.id}. {product.title}
							</h3>
							<p className="text-sm text-gray-600">
								Category:{" "}
								<span className="font-medium text-gray-800">
									{product.category}
								</span>
							</p>
							<p className="text-lg font-semibold text-green-500">
								Price: ${product.price}
							</p>
							<p className="text-sm text-gray-500">
								Rating:{" "}
								<span className="font-medium">{product.rating.rate}</span> (
								{product.rating.count} reviews)
							</p>
						</div>
						<div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-gray-50 rounded-b-xl">
							<button
								type="button"
								className="flex items-center justify-center w-10 h-10 text-white transition-all duration-300 transform bg-green-500 rounded-full shadow-md hover:bg-green-600 hover:shadow-lg hover:rotate-12"
								onClick={() => dispatch(addToCart(product))}
							>
								<BsCartPlus />
							</button>
							<button
								onClick={() => dispatch(addWishListItem(product.id))}
								type="button"
								className="flex items-center justify-center w-10 h-10 text-white transition-all duration-300 transform bg-red-500 rounded-full shadow-md hover:bg-red-600 hover:shadow-lg hover:rotate-12"
							>
								<IoMdHeart />
							</button>
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export default App;
