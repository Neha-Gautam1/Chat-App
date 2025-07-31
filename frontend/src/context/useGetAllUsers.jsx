import { useEffect, useState } from 'react';
import axios from 'axios';

export const useGetAllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAllUsers = async () => {
      setLoading(true);
      try {
        const token = JSON.parse(localStorage.getItem('messenger'))?.token;
        const response = await axios.get("http://localhost:5002/users/getuserprofile", {
  withCredentials: true // ✅ sends the cookie
});
;
        setAllUsers(response.data.filteredUsers || []);
      } catch (err) {
        console.error("Error fetching users:", err);
        setAllUsers([]);
      } finally {
        setLoading(false);
      }
    };
    getAllUsers();
  }, []);

  return [allUsers, loading];
};
