import { Link, useNavigate } from "react-router-dom";
import api from "../../axios";
import { useContext } from "react";
import { LogginContext } from "../Context/LogginContext";
import { FaShoppingCart } from 'react-icons/fa';

export default function Navbar() {
  const navigate = useNavigate()
  const { isLogged, setIsLogged } = useContext(LogginContext)

  async function handleLogout() {
    try {
      const res = await api.delete("/logout")
      setIsLogged(false)
      console.log(res)
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <nav className="w-full bg-white text-black px-6 py-4 flex items-center justify-between fixed top-0 left-0 right-0 z-50">

      {/* LOGO */}
      <Link to="/">ADIOS</Link>

      <ul className="hidden md:flex items-center gap-12 text-sm tracking-widest">
        <Link to="/collections">COLLECTIONS</Link>
        <Link to="/brands">BRANDS</Link>
        <Link to="/orders">ORDERS</Link>
      </ul>

      {/* Right Side */}
      <div className="hidden md:flex items-center gap-6 text-sm tracking-widest">

        {/* Login */}
        {!isLogged && (
          <Link to="/login">Login</Link>
        )}

        {isLogged && (
          <button onClick={handleLogout}>Logout</button>
        )}

        {/* Cart */}
        <div className="border border-black px-2 py-1 rounded-sm text-xs">
          <Link to="/cart"><FaShoppingCart /></Link>
        </div>
      </div>

      {/* Mobile Menu Icon */}
      <div className="md:hidden flex flex-col gap-1 cursor-pointer">
        <span className="block w-6 h-0.5 bg-white"></span>
        <span className="block w-6 h-0.5 bg-white"></span>
        <span className="block w-6 h-0.5 bg-white"></span>
      </div>

    </nav>
  );
}
