import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SuccessPage = () => {
  const [gameCoins, setGameCoins] = useState<number | null>(null);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const quantity = query.get("quantity"); // Get quantity from URL query params
    console.log(quantity);

    if (quantity) {
      setGameCoins(Number(quantity)); // Set the quantity in state
    }
  }, []);

  return (
    <div className=" flex flex-col justify-center items-center gap-10">
      <img src="/coin.png" alt="Gamecoins" className="w-24 h-24" />
      {gameCoins ? (
        <h2>
          Payment successful! <br /> You purchased {gameCoins} Gamecoins.
        </h2>
      ) : (
        <p>Loading payment details...</p>
      )}
      <Link to="/">
        <button className="s7Button bg-green-500 py-3 px-6 rounded-md text-black">
          Buy More Gamecoins
        </button>
      </Link>
    </div>
  );
};

export default SuccessPage;
