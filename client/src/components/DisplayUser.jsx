import { useNavigate } from "react-router-dom";

export const DisplayUser = ({ fullName, id }) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center font-bold bg-yellow-100 w-96 mt-3 rounded-md">
        <h3 className="text-black font-bold m-3 w-5 h-5 bg-yellow-400 rounded-full flex justify-center items-center text-center p-5 shadow-xl">
          {fullName[0]}
        </h3>
        <h2 className=" text-black-500 ">{fullName}</h2>
      </div>
      <button
        onClick={() => {
          navigate("/send?id=" + id + "&name=" + fullName);
        }}
        className=" flex items-center justify-center text-lg font-bold p-5 bg-yellow-400 text-black w-40 h-14 rounded-md hover:bg-yellow-200"
      >
        Send Money
      </button>
    </div>
  );
};
