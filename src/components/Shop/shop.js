import React, { useEffect, useState } from "react";
import instance from "../../Axios/axiosConfig";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { HiShoppingCart } from "react-icons/hi";
import { hideLoading, showLoading } from "../../redux/alertsSlice";
import { useDispatch } from "react-redux";
import { apiEndPoints } from "../../util/api";
import { RiFilter3Line } from "react-icons/ri";
const Shops = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState("");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 8;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;

  const filteredProduct = products.filter((product) => {
    const lowerCaseSearchInput = search.toLocaleLowerCase();
    return product.name.toLocaleLowerCase().includes(lowerCaseSearchInput);
  });

  const records = filteredProduct.slice(firstIndex, lastIndex);
  const numPages = Math.ceil(filteredProduct.length / recordsPerPage);
  const pageNumbers = [...Array(numPages).keys()].map((n) => n + 1);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handlePriceRange = (e) => {
    setSelectedPrice(e.target.value);
  };

  const navigate = useNavigate();
  const id = user._id;

  const goToCart = () => {
    navigate("/user/cart");
  };

  const getData = async () => {
    try {
      dispatch(showLoading());
      const response = await instance.post(apiEndPoints.userfetchProducts);
      dispatch(hideLoading());
      if (response.data.success) {
        setProducts(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const response = await instance.post(apiEndPoints.userProfileDetails);
      setUser(response.data.data);
    } catch (error) {
      console.error("Error fetching user details", error);
    }
  };

  const getSortedProduct = async () => {
    try {
      const formData = {
        selectedPrice,
      };

      if (formData) {
        const response = await instance.post(apiEndPoints.priceSort, formData);
        if (response.data.success) {
          setProducts(response.data.data);
        } else {
          toast.error("Something went wrong.");
        }
      } else {
        toast.error("Something went wrong...");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getFilteredProduct = async () => {
    try {
      const formData = {
        selectedCategory,
      };

      const response = await instance.post(
        apiEndPoints.userCatogoryFetchProducts,
        formData
      );

      if (response.data.success) {
        setProducts(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFilteredProduct();
  }, [selectedCategory]);

  useEffect(() => {
    getSortedProduct();
  }, [selectedPrice]);

  const addToCart = async (productId) => {
    try {
      if (productId && id) {
        const formData = {
          productId,
          id,
        };

        if (formData) {
          const response = await instance.post(
            apiEndPoints.userAddToCart,
            formData
          );

          if (response.data.success) {
            toast.success(response.data.message);
          } else {
            toast.error(response.data.message);
          }
        } else {
          toast.error("Something went wrong..");
        }
      } else {
        toast.error("Something went wrong...");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const detailView = (productId) => {
    navigate("/user/detailview", { state: { productId } });
  };

  const prePage = () => {
    if (currentPage !== firstIndex) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== lastIndex) {
      setCurrentPage(currentPage + 1);
    }
  };

  const changePage = (id) => {
    setCurrentPage(id);
  };

  return (
    <div>
      
      <header className="md:p-2 py-2  dark:bg-gray-100 dark:text-gray-100 w-full">
  <div className="md:mx-3 flex flex-col md:flex-row justify-between gap-4 h-auto md:h-12 p-1 bg-black md:rounded-md align-middle items-center">
    <div className="relative flex-grow-1 text-left md:flex md:items-center hidden">
      {/* Category Dropdown */}
      <div className="select-container items-center">
        <svg
          className="w-4 h-4 absolute inset-y-0 left-0 ml-2 mt-2 text-gray-500 dark:text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M9.293 11.293a1 1 0 011.414 0L12 12.586l1.293-1.293a1 1 0 111.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
        <select
          onChange={handleCategoryChange}
          name="category"
          className="appearance-none bg-white border-b-2 border-gray-300 text-black py-2 px-8 rounded-lg shadow-md leading-tight focus:outline-none focus:border-blue-500 dark:focus:border-gray-400 transition duration-300"
        >
          <option value="all">All</option>
          <option value="gain">Gain</option>
          <option value="lose">Lose</option>
        </select>
      </div>
      {/* Price Range Dropdown */}
      <div className="select-container ml-2">
        <select
          onChange={handlePriceRange}
          name="price_range"
          className="appearance-none bg-white border border-gray-300 text-black py-2 px-8 rounded-lg shadow-md leading-tight focus:outline-none focus:border-blue-500 transition duration-300"
        >
          <option value="">Filter</option>
          <option value="1">0-500</option>
          <option value="2">500-1000</option>
          <option value="3">1000-2000</option>
          <option value="4">2000-3000</option>
          <option value="5">3000-4000</option>
          <option value="6">4000-5000</option>
          <option value="7">5000-10000</option>
        </select>
      </div>
    </div>
    <div className="flex md:items-center md:space-x-4">
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
          <button
            type="submit"
            title="Search"
            className="p-1 focus:outline-none focus:ring"
          >
            <svg
              fill="currentColor"
              viewBox="0 0 512 512"
              className="w-4 h-4 text-black"
            >
              <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
            </svg>
          </button>
        </span>
        <input
          type="search"
          name="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="md:w-32 w-full py-2 pl-10 text-sm rounded-md sm:w-auto focus:outline-none bg-white dark:text-black"
        />
      </div>
      <HiShoppingCart
        className="h-10 w-10"
        onClick={() => {
          goToCart();
        }}
      />
    </div>
  </div>
</header>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 bg-black md:p-4 p-4 border-b-8 ">
        {records.map((product, index) => (
          <div
            key={index}
            className="flex flex-col w-full max-w-xs overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md hover:shadow-[0_4px_0px_rgb(0,0,0)] ease-out hover:translate-y-1 transition-all"
          >
            <a className="relative flex-shrink-0 mx-2 mt-3 flex h-60 overflow-hidden rounded-xl">
              <img
                onClick={() => {
                  detailView(product._id);
                }}
                className="object-cover w-full"
                src={`http://localhost:3001/upload/${product?.image}`}
                alt="product image"
              />
              <span className="absolute top-0 left-0 m-1 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
                {product.discount}% OFF
              </span>
            </a>
            <div className="mt-4 px-5 pb-5">
              <a href="#">
                <h5 className="text-xl tracking-tight text-slate-900">
                  {product.name}
                </h5>
              </a>
              <div className="mt-2 mb-5 flex items-center justify-between">
                <p>
                  <span className="text-3xl font-bold text-slate-900">
                    ${product.sellingPrice}
                  </span>
                  <span className="text-sm text-slate-900 line-through">
                    ${product.price}
                  </span>
                </p>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((_, i) => (
                    <svg
                      key={i}
                      aria-hidden="true"
                      className="h-5 w-5 text-yellow-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                  <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
                    5.0
                  </span>
                </div>
              </div>
              <button
                onClick={() => {
                  addToCart(product._id);
                }}
                className="flex items-center justify-center rounded-md bg-red-600 hover:animate-bounce px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 w-full focus:ring-blue-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 border-b-8 border-white">
        <div className="flex justify-center space-x-1 dark:text-gray-100">
          <button
            onClick={prePage}
            title="previous"
            type="button"
            className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow-md dark:bg-red-600 dark:border-red-800"
          >
            <svg
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          {pageNumbers.map((data, index) => (
            <button
              onClick={() => changePage(data)}
              key={index}
              type="button"
              className="inline-flex items-center justify-center w-8 h-8 text-sm font-semibold border rounded shadow-md dark:bg-red-600 dark:border-red-800"
            >
              {data}
            </button>
          ))}
          <button
            onClick={nextPage}
            title="next"
            type="button"
            className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow-md dark:bg-red-600 dark:border-red-800"
          >
            <svg
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Shops;
