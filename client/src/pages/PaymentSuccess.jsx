import React, { useEffect, useState } from "react";
import { easeOut, motion } from "motion/react";
import { FaCheckCircle } from "react-icons/fa";
import { getCurrentUser } from "../services/api";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function PaymentSuccess() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    getCurrentUser(dispatch);

    const interval = setInterval(() => {
      setSeconds((prev) => (prev > 1 ? prev - 1 : 1));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (seconds === 1) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [seconds]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 gap-4">
      <motion.div
        className="text-green-500 text-6xl"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 360 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
      >
        <FaCheckCircle />

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold text-green-600"
        >
          Payment Successful! Credits Added
        </motion.h1>

        <motion.p
          className="text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Redricting to home in {seconds} sec.....
        </motion.p>
      </motion.div>
    </div>
  );
}

export default PaymentSuccess;
