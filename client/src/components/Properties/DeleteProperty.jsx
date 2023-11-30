import { useState } from "react";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import MyProperties from "./MyProperties";

function DeleteProperty() {
  const location = useLocation();
  const item = location.state.item;
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/properties/delete/${item.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            property: {
              id: item.id,
            },
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();

        toast.success("Property deleted with success");
      } else {
        toast.error("Error deleting property");
        setError("Identifiants invalides");

        console.log(error.message);
      }
    } catch (error) {
      toast.error("An error occurred during property delete");
      console.log(error.message);
    }
  };

  return <MyProperties />;
}

export default DeleteProperty;
