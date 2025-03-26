import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaHome, 
  FaInfoCircle, 
  FaEnvelope, 
  FaCalculator,
  FaPhone,
  FaClock,
  FaMapMarkerAlt,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaExclamationTriangle,
  FaGlobe
} from 'react-icons/fa';
import { 
  GiWaterDrop,
  GiElectric,
  GiMoneyStack,
  GiShower
} from 'react-icons/gi';

export const Navbar = () => {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  const dishwasherInfo = [
    {
      icon: <GiWaterDrop className="text-blue-400 text-2xl" />,
      title: "Water Efficiency",
      desc: "Uses only 3-5 gallons per cycle vs 20+ gallons for hand washing"
    },
    {
      icon: <GiElectric className="text-yellow-400 text-2xl" />,
      title: "Energy Saving",
      desc: "ENERGY STAR models save 25% more energy than standard models"
    },
    {
      icon: <GiMoneyStack className="text-green-400 text-2xl" />,
      title: "Cost Effective",
      desc: "Saves $40+ annually on utility bills"
    },
    {
      icon: <GiShower className="text-purple-400 text-2xl" />,
      title: "Hygienic",
      desc: "Heats water to 140°F+ for better sanitization"
    }
  ];

  return (
    <>
      <motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg border-b-2 border-yellow-400"
      >
        <div className="container mx-auto flex justify-between items-center px-6 py-4">
          
          {/* Animated Logo */}
          <motion.div 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="text-yellow-300 text-3xl font-extrabold tracking-wide cursor-pointer flex items-center gap-2"
          >
            <motion.span
              animate={{ rotate: [0, 15, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              💦
            </motion.span>
            Dishwasher
            <motion.span
              animate={{ rotate: [0, -15, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              💦
            </motion.span>
          </motion.div>

          {/* Navigation Links */}
          <ul className="hidden md:flex space-x-8">
            {[
              { 
                name: "Home", 
                icon: <FaHome className="text-lg" />, 
                action: null 
              },
              { 
                name: "About", 
                icon: <FaInfoCircle className="text-lg" />, 
                action: () => setAboutOpen(true)
              },
              { 
                name: "Contact", 
                icon: <FaEnvelope className="text-lg" />, 
                action: () => setContactOpen(true)
              },
              
            ].map((item, index) => (
              <motion.li 
                key={index} 
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group relative"
              >
                <button
                  onClick={item.action}
                  className="text-white text-lg font-semibold transition duration-300 flex items-center space-x-2"
                >
                  <span className="group-hover:text-yellow-300">{item.icon}</span>
                  <span className="group-hover:text-yellow-300">{item.name}</span>
                </button>
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-yellow-400 transition-all duration-300 group-hover:w-full" />
              </motion.li>
            ))}
          </ul>

          {/* Animated CTA Button */}
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0px 5px 15px rgba(250, 204, 21, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:flex items-center bg-yellow-400 text-gray-900 px-6 py-2 rounded-full font-bold space-x-2 shadow-lg hover:shadow-yellow-400/30 transition-all"
          >
            <span>Get Started</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              🚀
            </motion.span>
          </motion.button>
        </div>
      </motion.nav>

      {/* About Modal */}
      {aboutOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 max-w-2xl w-full mx-4 shadow-2xl border-2 border-yellow-400"
          >
            <h2 className="text-3xl font-bold text-yellow-400 mb-6 flex items-center gap-2">
              <FaInfoCircle className="text-2xl" /> Dishwasher Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dishwasherInfo.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700/70 transition-colors"
                >
                  <div className="mt-1">{item.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                    <p className="text-gray-300">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setAboutOpen(false)}
                className="bg-red-500 text-white px-6 py-2 rounded-full font-bold shadow-lg hover:bg-red-600 transition-colors"
              >
                Close
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Enhanced Contact Modal */}
      {contactOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl border-2 border-yellow-400"
          >
            <h2 className="text-3xl font-bold text-yellow-400 mb-6 flex items-center gap-2">
              <FaEnvelope className="text-2xl" /> Contact Us
            </h2>
            
            <div className="space-y-4">
              {/* Contact Information Cards */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-4 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700/70 transition-colors"
              >
                <FaPhone className="text-blue-400 text-xl" />
                <div>
                  <p className="text-white font-semibold">Phone Support</p>
                  <a href="tel:+18001234567" className="text-gray-300 hover:text-blue-400 block">
                    +1 (800) 123-4567
                  </a>
                  <span className="text-sm text-blue-400">24/7 Availability</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-4 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700/70 transition-colors"
              >
                <FaMapMarkerAlt className="text-green-400 text-xl" />
                <div>
                  <p className="text-white font-semibold">Our Location</p>
                  <p className="text-gray-300">123 Dishwasher Street</p>
                  <p className="text-gray-300">Tech City, TC 12345</p>
                  <a 
                    href="#" 
                    className="text-green-400 text-sm hover:underline flex items-center gap-1"
                  >
                    <FaGlobe className="text-sm" />
                    View on Map
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-4 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700/70 transition-colors"
              >
                <FaClock className="text-purple-400 text-xl" />
                <div>
                  <p className="text-white font-semibold">Working Hours</p>
                  <p className="text-gray-300">Mon-Fri: 9AM - 6PM (EST)</p>
                  <p className="text-gray-300">Sat: 10AM - 4PM (EST)</p>
                  <p className="text-red-400 text-sm mt-1">Closed on Sundays</p>
                </div>
              </motion.div>

              {/* Social Media Section */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 bg-gray-700/50 rounded-lg"
              >
                <h3 className="text-white font-semibold mb-3">Connect With Us</h3>
                <div className="flex justify-center gap-4">
                  <motion.a
                    whileHover={{ y: -3 }}
                    href="#"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    <FaTwitter className="text-2xl" />
                  </motion.a>
                  <motion.a
                    whileHover={{ y: -3 }}
                    href="#"
                    className="text-blue-600 hover:text-blue-400"
                  >
                    <FaFacebook className="text-2xl" />
                  </motion.a>
                  <motion.a
                    whileHover={{ y: -3 }}
                    href="#"
                    className="text-pink-500 hover:text-pink-400"
                  >
                    <FaInstagram className="text-2xl" />
                  </motion.a>
                </div>
              </motion.div>
            </div>

            <div className="mt-6 flex justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setContactOpen(false)}
                className="bg-red-500 text-white px-6 py-2 rounded-full font-bold shadow-lg hover:bg-red-600 transition-colors"
              >
                Close
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Navbar;