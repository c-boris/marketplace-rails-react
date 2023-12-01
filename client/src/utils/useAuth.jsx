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
        id: Cookies.get("id"),
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
          id: data.user.id,
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

  const signup = async (
    email,
    password,
    password_confirmation,
    navigate,
    toast
  ) => {
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
          id: data.user.id,
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

  const updateProfile = async (newProfileData) => {
    const token = Cookies.get("token");
  
    if (!token) {
      throw new Error("Authentication token is missing");
    }
  
    try {
      // Destructure with default values to handle undefined properties
      const {
        currentPassword = "",
        email = "",
        emailConfirmation = "", // Handle emailConfirmation explicitly
        password = "",
        passwordConfirmation = "",
      } = newProfileData;
  
      const response = await fetch("http://localhost:3000/users/update_profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          user: {
            email,
            email_confirmation: emailConfirmation, // Separate state for confirmation
             password,
            password_confirmation: passwordConfirmation,
            current_password: currentPassword
          },
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
  
        // Update user data in the local state
        setUser({
          isLoggedIn: true,
          email: data.user.email,
          username: data.user.username,
          id: data.user.id,
        });
  
        // Update cookies if necessary
        Cookies.set("email", data.user.email);
        Cookies.set("username", data.user.username);
  
        return data; // You can return additional data if needed
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      throw new Error("An error occurred during profile update");
    }
  };
  
  

  return { user, login, signup, logout, updateProfile };
};

export { useAuth };
