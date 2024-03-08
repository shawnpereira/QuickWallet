import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Loader = ({ redirect }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if a token exists in the local storage
    const token = localStorage.getItem("token");
    if (token) {
      // If a token exists, navigate the user to the route specified by the prop 'p'
      navigate("/" + redirect);
    } else {
      // If no token exists, navigate the user to the signin route
      navigate("/signin");
    }
  }, [navigate, redirect]); // Dependencies: navigate and p

  // Render a simple div with the text "Loader"
  return <div>Loader</div>;
};
