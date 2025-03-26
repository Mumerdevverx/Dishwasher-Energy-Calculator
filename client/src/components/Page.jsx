import React, { useState } from "react";
import { motion } from "framer-motion";

export const Page = () => {
  const [oldUsage, setOldUsage] = useState("");
  const [newUsage, setNewUsage] = useState("");
  const [frequency, setFrequency] = useState("");
  const [costPerKWh, setCostPerKWh] = useState("");
  const [dishwasherAge, setDishwasherAge] = useState("");
  const [savings, setSavings] = useState(null);
  const [history, setHistory] = useState([]);
  const [errors, setErrors] = useState({});
  const [showHistory, setShowHistory] = useState(false);

  const validateInputs = () => {
    let newErrors = {};
    if (!oldUsage) newErrors.oldUsage = "⚠️ Enter old  Dishwasher Energy usage is missing";
    if (!newUsage) newErrors.newUsage = "⚠️ Enter new  Dishwasher Energy is missing usage";
    if (!frequency) newErrors.frequency = "⚠️ Enter frequency (cycle per year)";
    if (!costPerKWh) newErrors.costPerKWh = "⚠️ Enter Electricity cost";
    if (!dishwasherAge) newErrors.dishwasherAge = "⚠️ Select Dishwasher age";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateSavings = () => {
    if (!validateInputs()) return;

    const oldYearlyCost = parseFloat(oldUsage) * parseInt(frequency) * parseFloat(costPerKWh);
    const newYearlyCost = parseFloat(newUsage) * parseInt(frequency) * parseFloat(costPerKWh);
    const yearlySavings = oldYearlyCost - newYearlyCost;

    const result = {
      oldYearlyCost: oldYearlyCost.toFixed(2),
      newYearlyCost: newYearlyCost.toFixed(2),
      yearlySavings: yearlySavings.toFixed(2),
      age: dishwasherAge,
    };

    setSavings(result);
    setHistory([result, ...history]);
    setErrors({});
    setOldUsage("");
    setNewUsage("");
    setFrequency("");
    setCostPerKWh("");
    setDishwasherAge("");
    setShowHistory(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-300 to-gray-900 p-1 flex justify-center items-center">
      <div className="bg-gray-700 border border-gray-600 rounded-2xl shadow-2xl p-6 w-full max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 bg-gray-500 border rounded-xl p-6 shadow-lg">
            <div className="bg-gray-600 rounded-3xl shadow-2xl p-6 w-full">
              <motion.h1
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center animate-pulse text-white text-2xl font-bold p-4 bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text"
              >
                ⚡ Energy Savings Calculator ⚡
              </motion.h1>

              <div className="flex flex-col gap-1">
                <div>
                  <p className="font-semibold text-green-400 text-lg">Dishwasher Age</p>
                  <select
                    value={dishwasherAge}
                    onChange={(e) => setDishwasherAge(e.target.value)}
                    className={`p-2 w-full font-medium border rounded-xl bg-gray-200 ${
                      errors.dishwasherAge ? "border-red-500 placeholder-red-500" : "border-gray-400 text-gray-80"
                    }`}
                  >
                    <option value=""> {errors.dishwasherAge || "Select age"}</option>
                    <option value="<5 years">&lt; 5 years</option>
                    <option value="5-10 years">5-10 years</option>
                    <option value=">10 years">&gt; 10 years</option>
                  </select>
                </div>

                {[
                  { label: "Old Dishwasher Energy Usage(KWH per year)", state: oldUsage, setState: setOldUsage, error: errors.oldUsage },
                  { label: "New Dishwasher Energy Usage(KWH per year)", state: newUsage, setState: setNewUsage, error: errors.newUsage },
                  { label: " Usage Frequency(Cycles per year)", state: frequency, setState: setFrequency, error: errors.frequency },
                  { label: " Electricity Cost per KWh", state: costPerKWh, setState: setCostPerKWh, error: errors.costPerKWh }
                ].map(({ label, state, setState, error }, index) => (
                  <div key={index}>
                    <p className="font-semibold text-green-400 text-lg">{label}</p>
                    <input
                      type="number"
                      value={state}
                      min="0"
                      onChange={(e) => setState(e.target.value)}
                      placeholder={error ? error : ""}
                      className={`w-full p-2 text-lg font-medium border rounded-xl bg-gray-200 ${
                        error ? "border-red-500 placeholder-red-500" : "border-gray-400 text-white-800"
                      }`}
                    />
                  </div>
                ))}
              </div>

              <div className="flex justify-center p-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={calculateSavings}
                  className="bg-gradient-to-r from-blue-500 to-green-400 text-white font-bold text-lg rounded-full px-10 py-3 shadow-lg"
                >
                  🧮 Calculate
                </motion.button>
              </div>
            </div>
          </div>

          <div className="flex-1">
            {showHistory && history.length > 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white rounded-3xl p-6 h-full shadow-2xl border border-gray-700 backdrop-blur-lg"
              >
                <h2 className="text-2xl font-extrabold text-yellow-300 border-b pb-3 text-center">
                  📜 Calculation is Here 
                </h2>
                <div className="overflow-y-auto max-h-[500px] pr-2 mt-4">
                  {history.map((item, index) => (
                    <motion.div 
                      key={index}
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="p-3 border border-yellow-400 rounded-lg bg-gray-700 shadow-lg mb-4"
                    >
                        <p className="text-yellow-300 font-medium">🛠️ Dishwasher Age: {item.age}</p>
                      <p>💰 Old Cost: <span className="text-red-400">${item.oldYearlyCost}</span></p>
                      {/* <p>⚡ New Cost: <span className="text-green-400">${item.newYearlyCost}</span></p> */}
                      <p className="text-green-300 font-bold text-lg">🎉 Savings: ${item.yearlySavings}</p>
                      <p className="text-gray-300 italic text-sm animate-pulse">
  Allow users to enter their <span className="text-yellow-300 font-semibold">dishwasher’s age</span>,  
  <span className="text-yellow-300 font-semibold"> usage</span>, and  
  <span className="text-yellow-300 font-semibold"> electricity cost</span> to calculate savings.  
  This is the estimated annual savings based on the provided data.
</p>
                      
                      <div className="flex justify-center mt-4">
                        <button 
                          onClick={() => setHistory(history.filter((_, i) => i !== index))}
                          className="bg-red-500 text-white font-bold px-4 py-2 rounded-full shadow-md hover:bg-red-700 transition duration-300"
                        >
                           Remove
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <div className="bg-gray-800 rounded-3xl p-6 h-full flex items-center justify-center text-gray-400 border border-gray-700">
                <p className="text-center">Your calculation history will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;