import { useState, useEffect } from "react";
import axios from "axios";

export const useUserTransactions = () => {
  const [transactions, setTransactions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUserTransaction() {
      const currentUserId = JSON.parse(localStorage.getItem("user")).userId;
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/transaction/${currentUserId}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        setTransactions(res.data);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchUserTransaction();
  }, []);

  return {
    transactions,
    loading,
    error,
  };
};
