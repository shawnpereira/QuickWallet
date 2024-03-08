import { useEffect, useState } from "react";
import { DisplayUser } from "./DisplayUser";
import axios from "axios";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
      .then((response) => {
        setUsers(response.data.user);
      });
  }, [filter]);

  return (
    <div className="p-3">
      <div>
        <h3 className="text-lg font-semibold">Users</h3>
        <input
          onChange={(e) => {
            setFilter(e.target.value);
          }}
          type="text"
          placeholder="Search users..."
          className="w-full h-10 rounded-md border p-1 border-yellow-500"
        />
      </div>

      {users.map((user) => (
        <DisplayUser
          key={user._id}
          fullName={`${user.firstName} ${user.lastName}`}
          id={user._id}
        />
      ))}
    </div>
  );
};
