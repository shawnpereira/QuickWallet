

export default function Button({ label, onClick }) {
  return (
    <div>
      <button
        onClick={onClick}
        className="w-full bg-yellow-400 rounded-md text-black text-center p-2 mt-5"
      >
        {label}
      </button>
    </div>
  );
}
