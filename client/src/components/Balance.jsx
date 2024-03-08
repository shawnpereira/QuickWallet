export const Balance = ({ Userbalance }) => {
  return (
    <div className="mt-3 p-5 ">
      <h2 className=" flex items-center justify-center text-lg font-bold p-5 bg-yellow-400 text-black w-40 h-14 rounded-md hover:bg-yellow-200">
        <p className="p-2">Wallet</p>
      </h2>
      <h3 className="text-xl mt-3 font-bold">
        Balance: <span className="font-semibold"> ₹ {Userbalance}</span>{" "}
      </h3>
    </div>
  );
};
