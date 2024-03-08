import { useNavigate } from "react-router-dom";

export const Appbar = ({ nameFirstLetter }) => {
  const navigate = useNavigate();
  function logOut() {
    localStorage.clear();
    navigate("/signin");
    window.location.reload(false);
  }
  return (
    <div className="flex items-center justify-between p-5 border-b-4 border-yellow-500">
      <h1 className="text-2xl font-bold  text-black cursor-default">
        Quick Wallet
      </h1>
      <div className="flex items-center font-bold">
        <h3 className=" text-black ">Hello,</h3>
        <div className=" cursor-pointer text-Black font-bold m-3 w-5 h-5 bg-yellow-400 rounded-full flex justify-center items-center text-center p-5 shadow-xl">
          {nameFirstLetter}
        </div>
        <div
          onClick={logOut}
          className=" cursor-pointer text-black font-bold m-3 w-24 h-5 bg-yellow-400 rounded-md flex justify-center items-center text-center p-5 shadow-xl"
        >
          Logout
        </div>
      </div>
    </div>
  );
};
