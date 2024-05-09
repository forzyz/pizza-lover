import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const FullPizza: React.FC = () => {
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
          `https://663c289f17145c4d8c354fa0.mockapi.io/items`
        );
        setPizza(data);
      } catch (error) {
        alert("Error occured while get pizza");
        navigate("/");
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
      <Link to="/notwqeq">
        <button className="button button--outline button--add">
          <span>Back</span>
        </button>
      </Link>
    </div>
  );
};

export default FullPizza;
