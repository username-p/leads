import React, { createContext, useState, useEffect } from "react";
import jwt from "jsonwebtoken";

const AdminContext = createContext({});

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState({});
  console.log(admin);
  const updateUser = (update) => {
    const Obj = { ...admin, ...update };
    const token = jwt.sign(Obj, "d6d82b79-5226-454c-a36d-17bc13bcd6f2");
    localStorage.removeItem("adminToken");
    localStorage.setItem("adminToken", token);
    setAdmin({ ...admin, update });
  };

  const adminContext = {
    admin,
    setAdmin,
    updateUser,
  };

  useEffect(() => {
    const storage = localStorage.getItem("adminToken");
    jwt.verify(
      storage,
      "d6d82b79-5226-454c-a36d-17bc13bcd6f2",
      (err, decoded) => {
        if (decoded) {
          setAdmin(decoded);
        }
      }
    );
  }, []);
  return (
    <AdminContext.Provider value={adminContext}>
      {children}
    </AdminContext.Provider>
  );
};

export const AdminConsumer = AdminContext.Consumer;

export default AdminContext;
