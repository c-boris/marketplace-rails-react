// useAuth.jsx
import { useEffect } from "react";
import { useAtom } from "jotai";
import Cookies from "js-cookie";
import { userAtom } from "./atom";

const useAuth = () => {
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    const token = Cookies.get("token");
    console.log("Token from cookie:", token);

    if (token) {
      setUser({
        isLoggedIn: true,
        email: Cookies.get("email"),
        username: Cookies.get("username"),
      });
    }
  }, [setUser]);

  const login = async (email, password, navigate, toast) => {
    try {
      const response = await fetch("http://localhost:3000/users/sign_in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            email: email,
            password: password,
          },
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = response.headers.get("Authorization");

        // Store token and user data in cookies
        Cookies.set("token", token);
        Cookies.set("id", data.user.id);
        Cookies.set("email", data.user.email);
        Cookies.set("username", data.user.username);

        // Set the user as logged in
        setUser({
          isLoggedIn: true,
          email: data.user.email,
          username: data.user.username,
        });

        navigate("/");
        toast.success("Login successful!");
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const signup = async (email, password, password_confirmation, navigate, toast) => {
    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            email: email,
            password: password,
            password_confirmation: password_confirmation,
          },
        }),
      });

      if (response.ok) {
        const data = await response.json();

        // Store token and user data in cookies
        Cookies.set("token", response.headers.get("Authorization"));
        Cookies.set("id", data.user.id);
        Cookies.set("email", data.user.email);
        Cookies.set("username", data.user.username);

        // Set the user as logged in
        setUser({
          isLoggedIn: true,
          email: data.user.email,
          username: data.user.username,
        });

        navigate("/");
        toast.success("Account created successfully!");
      } else {
        toast.error("Error creating account");
      }
    } catch (error) {
      toast.error("An error occurred during account creation");
    }
  };

  const logout = (navigate, toast) => {
    // Clear cookies and reset user state
    Cookies.remove("token");
    Cookies.remove("id");
    Cookies.remove("email");
    Cookies.remove("username");

    setUser({
      isLoggedIn: false,
      email: "",
      username: "",
    });

    navigate("/login");
    toast.success("Logout successful!");
  };

  return { user, login, signup, logout };
};

export { useAuth };