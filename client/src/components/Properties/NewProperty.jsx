import { useState } from "react";
import { useAtom } from "jotai";
import { userAtom } from "../../utils/atom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PropertyForm from "./PropertyForm";

function NewProperty() {
  const [user, setUser] = useAtom(userAtom);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/properties`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          property: {
            user_id: user.id,
            title: title,
            price: price,
            city: city,
            description: description,
          },
        }),
      });

      if (response.ok) {
        const data = await response.json();

        Cookies.set("token", response.headers.get("Authorization"));

        navigate("/");
        toast.success("Property created successfully!");
      } else {
        toast.error("Error creating property");
      }
    } catch (error) {
      toast.error("An error occurred during property creation");
    }
  };

  return (
    <>
      <PropertyForm
        viewTitle={"Create a new property"}
        title={title}
        setTitle={setTitle}
        price={price}
        setPrice={setPrice}
        city={city}
        setCity={setCity}
        description={description}
        setDescription={setDescription}
        handleSubmit={handleSubmit}
        action={"Create"}
      />
    </>
  );
}

export default NewProperty;
