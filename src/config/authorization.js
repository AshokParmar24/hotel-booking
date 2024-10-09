"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Authorization = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  console.log("router.pathname :>> ", router.pathname);
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Ensure the code only runs on the client side
      const token = localStorage.getItem("token");

      if (token) {
        // Redirect to dashboard if user is authenticated
        try {
          if (router.pathname === "/login") {
            router.push("/");
          } else {
            setLoading(false); // No redirect, allow children to render
          }
        } catch (error) {
          console.log("errorerrorerrorerror :>> ", error);
        }
      } else {
        // If no token, redirect to login page
        if (router.pathname !== "/login") {
          router.push("/login");
        } else {
          setLoading(false); // No redirect, allow children to render
        }
      }
    }
  }, [router]);

  if (loading) {
    return <div>Loading...</div>; // Optional loading spinner
  }

  return <>{children}</>;
};

export default Authorization;
