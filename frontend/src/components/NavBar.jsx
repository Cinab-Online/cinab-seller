import React, { useState, useEffect } from "react";
import Image from "../assets/cinablogo.png";
import { Link } from "react-router-dom";
import { selectCurrentUser, selectUserRoles } from "../reducers/AuthReducers";
import { useStateContext } from "../contexts/ContextProvider";
import { HiCog, HiLogout, HiViewGrid } from "react-icons/hi";
import { Dropdown, Sidebar } from "flowbite-react";

import { BiLogIn, BiSun, BiMoon } from "react-icons/bi"; // Import the icons you need from react-icons
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
} from "react-icons/hi";

export default function NavBar({ handleLogout }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const [companyName, setCompanyName] = useState("Company Name");
  const [companyEmail, setCompanyEmail] = useState("companyEmail@gmail.com");
  const userRole = useSelector(selectUserRoles);
  const currentUser = useSelector(selectCurrentUser);

  const {
    currentMode,
    setMode, // Function to toggle mode
  } = useStateContext();

  useEffect(() => {
    if (currentUser) {
      setCompanyEmail(currentUser.vendor.companyEMail);
      setCompanyName(currentUser.name);
    }
  }, [currentUser]);

  const MenuItem = ({ to, icon, label }) => (
    <li className="mt-4 px-2 ">
      <button
        onClick={() => {
          navigate(to);
        }}
        className="flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700"
      >
        {icon &&
          React.cloneElement(icon, {
            className:
              "flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400  group-hover:text-gray-900 dark:group-hover:text-white",
          })}
        <span className="flex-1 ms-3 whitespace-nowrap text-gray-900 font-medium text-lg dark:text-primary-50">
          {label}
        </span>
      </button>
    </li>
  );
  const handleDashboard = () => {
    navigate("/dashboard/vendor");
  };

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-primary-50 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                onClick={toggleSidebar}
                aria-expanded={isSidebarOpen}
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>

              <Link to="https://flowbite.com" className="flex ms-2 md:me-24">
                <img src={Image} className="h-8  me-3  " alt="FlowBite Logo" />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  Cinab-Seller
                </span>
              </Link>
            </div>

            <div className="flex items-center">
              <div className="flex items-center ms-3">
                {/* Moon and Sun for dark and balck mode */}

                <div>
                  <button
                    className="text-gray-800 dark:text-yellow-300 text-3xl mr-4 mt-2"
                    onClick={() => {
                      setMode({
                        target: {
                          value: currentMode === "Light" ? "Dark" : "Light",
                        },
                      });
                    }}
                  >
                    {currentMode === "Dark" ? <BiSun /> : <BiMoon />}
                  </button>
                </div>
                <Dropdown
                  label=""
                  dismissOnClick={false}
                  renderTrigger={() => (
                    <button
                      type="button"
                      className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    >
                      <img
                        className="w-8 h-8 rounded-full"
                        src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                        alt="userphoto"
                      />
                    </button>
                  )}
                >
                  <Dropdown.Header>
                    <span className="block text-sm">{companyName}</span>
                    <span className="block truncate text-sm font-medium">
                      {companyEmail}{" "}
                    </span>
                  </Dropdown.Header>
                  <Dropdown.Item icon={HiViewGrid} onClick={handleDashboard}>
                    Dashboard
                  </Dropdown.Item>
                  <Dropdown.Item icon={HiCog}>Settings</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item icon={HiLogout} onClick={handleLogout}>
                    Sign out
                  </Dropdown.Item>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <Sidebar
        aria-label="Sidebar with multi-level dropdown example"
        className="fixed top-0 overflow-auto scrollbar-hidden left-0 z-40 w-56  h-screen pt-20 transition-transform -translate-x-full bg-primary-50 border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <Sidebar.Items className="overflow-auto scrollbar-hidden">
          <Sidebar.ItemGroup>
            <Sidebar.Item icon={HiChartPie}>
              <Link to="/dashboard/vendor"> Dashboard</Link>
            </Sidebar.Item>
            <Sidebar.Collapse icon={HiShoppingBag} label="Manage Products">
              <Sidebar.Item>
                <Link to="/dashboard/products">All Products</Link>
              </Sidebar.Item>
              <Sidebar.Item>
                <Link to="/dashboard/productform">Add Product</Link>
              </Sidebar.Item>
              <Sidebar.Item>
                <Link to="/dashboard/pending-products">Pending Products</Link>
              </Sidebar.Item>
            </Sidebar.Collapse>

            <Sidebar.Collapse icon={HiShoppingBag} label="Manage Orders">
              <Sidebar.Item>
                <Link to="/dashboard/orders">All Orders</Link>{" "}
              </Sidebar.Item>
              <Sidebar.Item>
                <Link to="/dashboard/pending-orders">
                  Pending Orders
                  <sup className="w-4 h-4 bg-blue-100 p-3 inline-flex justify-center items-center rounded-full">
                    3
                  </sup>
                </Link>{" "}
              </Sidebar.Item>
              <Sidebar.Item>
                <Link to="/dashboard/packaged-orders">
                  Packaged Orders
                  <sup className="w-4 h-4 bg-blue-100 p-3 inline-flex justify-center items-center rounded-full">
                    3
                  </sup>
                </Link>{" "}
              </Sidebar.Item>
              <Sidebar.Item>
                <Link to="/dashboard/rejected-orders">
                  Rejected Orders
                  <sup className="w-4 h-4 bg-blue-100 p-3 inline-flex justify-center items-center rounded-full">
                    3
                  </sup>
                </Link>{" "}
              </Sidebar.Item>
              <Sidebar.Item>
                <Link to="/dashboard/cleared-orders">Cleared Orders</Link>{" "}
              </Sidebar.Item>
            </Sidebar.Collapse>

            <Sidebar.Collapse icon={HiShoppingBag} label="Manage Vendors">
              <Sidebar.Item>
                <Link to="/dashboard/all-vendors">All Vendors</Link>{" "}
              </Sidebar.Item>
              <Sidebar.Item>
                <Link to="/dashboard/registered-vendors">
                  Registered Vendors
                </Link>
              </Sidebar.Item>
              <Sidebar.Item>
                <Link to="/dashboard/pending-vendors">
                  Pending Vendors{" "}
                  <sup className="w-4 h-4 bg-blue-100 p-3 inline-flex justify-center items-center rounded-full">
                    3
                  </sup>{" "}
                </Link>{" "}
              </Sidebar.Item>{" "}
              <Sidebar.Item>
                <Link to="/dashboard/declined-vendors">Rejected Vendors</Link>{" "}
              </Sidebar.Item>
            </Sidebar.Collapse>

            <Sidebar.Item href="#" icon={HiArrowSmRight}>
              <Link to="/login">Login</Link>{" "}
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>

      {/* <aside
        id="logo-sidebar"
        className="fixed top-0 overflow-auto scrollbar-hidden left-0 z-40 w-56 h-screen pt-20 transition-transform -translate-x-full bg-primary-50 border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <div className="flex-1 px-3 space-y-1 bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
          <ul className="pb-2 space-y-2">
            <li>
              <Link
                to="/dashboard/vendor"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ms-3">Dashboard</span>
              </Link>
            </li>
            <li>


              
              <button
                type="button"
                className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                aria-controls="dropdown-product"
                data-collapse-toggle="dropdown-product"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 20"
                >
                  <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
                </svg>
                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                  Manage Products
                </span>
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <ul id="dropdown-product" className="hidden py-2 space-y-2">
                <li>
                  <Link
                    to="/dashboard/products"
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    All Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/productform"
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Add Product
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/pending-products"
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Pending Products
                  </Link>
                </li>
              </ul>
            </li>

            <li></li>

            <li>
              <button
                type="button"
                className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                aria-controls="dropdown-orders"
                data-collapse-toggle="dropdown-orders"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 21"
                >
                  <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                </svg>
                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                  Manage Orders
                </span>
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <ul id="dropdown-orders" className="hidden py-2 space-y-2">
                <li>
                  <Link
                    to="/dashboard/orders"
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    All Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/pending-orders"
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Pending Orders{" "}
                    <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                      3
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/cleared-orders"
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Cleared Orders
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <button
                type="button"
                className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                aria-controls="dropdown-vendor"
                data-collapse-toggle="dropdown-vendor"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 21"
                >
                  <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                </svg>
                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                  Manage Vendors
                </span>
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <ul id="dropdown-vendor" className="hidden py-2 space-y-2">
                <li>
                  <Link
                    to="/dashboard/all-vendors"
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    All Vendors
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/registered-vendors"
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Registered Vendors
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/pending-vendors"
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Pending Vendors{" "}
                    <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-1 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                      3
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/declined-vendors"
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Rejected Vendors
                  </Link>
                </li>
              </ul>
            </li>
            <MenuItem to="/login" icon={<BiLogIn />} label="Sign In" />
          </ul>
        </div>
      </aside> */}
    </>
  );
}
