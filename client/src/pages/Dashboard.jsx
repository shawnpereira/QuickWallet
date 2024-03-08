import { useState, useEffect } from "react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import axios from "axios";

export const Dashboard = () => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    try {
      axios
        .get("http://localhost:3000/api/v1/account/balance", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          const data = response.data;

          setBalance(data.balance);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } catch (error) {
      alert(error);
    }
  }, []);
  return (
    <div>
      <Appbar />
      <div className="m-8">
        <Balance Userbalance={balance} />
        <Users />
      </div>
    </div>
  );
};
