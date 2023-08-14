import React from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://64cb635c700d50e3c705d0b2.mockapi.io/items/${id}`
        );
        setPizza(data);
      } catch (error) {
        alert("Error occured while get pizza");
        navigate('/');
      }
    }

    fetchPizza();
  }, []);

  if (!pizza) {
    return "Loading...";
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="" />
      <h2>{pizza.title}</h2>
      <h4>${pizza.price}</h4>
    </div>
  );
};
