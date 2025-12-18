import React from "react";
import { FiInstagram, FiTwitter, FiFacebook, FiYoutube } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-white text-black pt-16 pb-8 border-t border-gray-100">
      <div className="px-6 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-2xl font-light tracking-widest mb-6">ADIOS</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Redefining modern fashion with timeless staples. Quality, comfort,
              and style in every stitch.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-black hover:text-gray-600 transition-colors"
              >
                <FiInstagram size={20} />
              </a>
              <a
                href="#"
                className="text-black hover:text-gray-600 transition-colors"
              >
                <FiTwitter size={20} />
              </a>
              <a
                href="#"
                className="text-black hover:text-gray-600 transition-colors"
              >
                <FiFacebook size={20} />
              </a>
              <a
                href="#"
                className="text-black hover:text-gray-600 transition-colors"
              >
                <FiYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm font-semibold tracking-widest mb-6 uppercase">
              Shop
            </h3>
            <ul className="space-y-4 text-sm text-gray-500">
              <li>
                <a href="#" className="hover:text-black transition-colors">
                  New Arrivals
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition-colors">
                  Best Sellers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition-colors">
                  Denim
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition-colors">
                  Accessories
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition-colors">
                  Sale
                </a>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-sm font-semibold tracking-widest mb-6 uppercase">
              Help
            </h3>
            <ul className="space-y-4 text-sm text-gray-500">
              <li>
                <a href="#" className="hover:text-black transition-colors">
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition-colors">
                  Size Guide
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold tracking-widest mb-6 uppercase">
              Newsletter
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:outline-none focus:border-black transition-colors text-sm"
              />
              <button className="w-full bg-black text-white py-3 text-sm font-medium tracking-wide hover:bg-gray-800 transition-colors">
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} ADIOS. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-gray-400">
            <a href="#" className="hover:text-black transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-black transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-black transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
