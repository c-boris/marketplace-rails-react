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
    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "PATCH", // Utiliser la méthode PATCH pour la mise à jour des informations
        headers: {
          "Content-Type": "application/json",
          Authorization: Cookies.get("token"), // Assurez-vous d'inclure le jeton d'authentification
        },
        body: JSON.stringify({
          user: newProfileData,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        // Mettre à jour les données de l'utilisateur dans l'état local
        setUser({
          isLoggedIn: true,
          email: data.user.email,
          username: data.user.username,
          id: data.user.id,
        });

        // Mettre à jour les cookies si nécessaire
        Cookies.set("email", data.user.email);
        Cookies.set("username", data.user.username);

        return data; // Vous pouvez retourner des données supplémentaires si nécessaire
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
