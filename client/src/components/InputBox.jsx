export const InputBox = ({ label, val, onChange }) => {
  return (
    <div className="flex flex-col ">
      <p className="text-lg text-black-500 font-medium text-left py-2">
        {label}
      </p>
      <input
        onChange={onChange}
        type="text"
        placeholder={val}
        className="border-yellow-500 w-full px-2 py-1 border rounded "
      />
    </div>
  );
};
