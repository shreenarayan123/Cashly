import { useState, useEffect } from "react";
import axios from "axios";

export const useCurrentUser = () => {
  const [user, setUser] = useState(null);
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const currentUser = JSON.parse(localStorage.getItem("user"));
        if (!currentUser || !currentUser.userId) {
          throw new Error("No user found in localStorage");
        }
        const currentUserId = currentUser.userId;
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/${currentUserId}`
        );
        console.log(res.data.user, "res.data.user");
        setUser(res.data.user);
        setAccount(res.data.userAccount);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchUserData();
  }, []);

  return {
    user,
    account,
    loading,
    error,
  };
};

//find single user details
export const useUser = (userId) => {
  const [user, setUser] = useState(null);
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/${userId}`
        );

        setUser(res.data.user);
        setAccount(res.data.userAccount);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchUserData();
  }, [userId]);

  return {
    user,
    account,
    loading,
    error,
  };
};

export const useDeleteUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteUser = async (userId) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/user/${userId}`);
    } catch (err) {
      console.error("Error deleting user data:", err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteUser,
    loading,
    error,
  };
};
