import { useState } from "react";

const CreditCard = () => {
  const [gameCoins, setGameCoins] = useState<string>("");
  const [usdValue, setUsdValue] = useState<string>("");

  const handleGameTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const coinValue = e.target.value;

    const regex = /^\d*$/;

    if (regex.test(coinValue)) {
      setGameCoins(coinValue);

      if (!isNaN(Number(coinValue))) {
        const usdEquivalent = Number(coinValue) * 1.04;
        setUsdValue(usdEquivalent.toFixed(2));
      } else {
        setUsdValue("");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('https://s7-server-kjjo.onrender.com/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          price: parseFloat(usdValue),
          qnty: parseInt(gameCoins)
        }),
      });

      const session = await response.json();
      if (session.url) {
        window.location.href = session.url;
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
    }
  };

  return (
    <div className="credit-card flex flex-col justify-center items-center gap-5">
      <form
        className="exchange-form w-full bg-gray-800 p-6 rounded-md"
        onSubmit={handleSubmit}
      >
        <div className="form-group mb-4">
          <label className="block text-teal-200 mb-1" htmlFor="game-token">
            Game Coins
          </label>
          <input
            type="text"
            value={gameCoins}
            onChange={handleGameTokenChange}
            placeholder="Enter Game Coins"
            className="w-full p-2 text-white rounded-md"
            id="game-token"
          />
        </div>

        <div className="form-group mb-4">
          <label className="block text-teal-200 mb-1" htmlFor="usdt">
            USD
          </label>
          <input
            type="text"
            value={usdValue}
            readOnly
            placeholder="Equivalent USD amount"
            className="w-full p-2 text-white rounded-md"
            id="usdt"
          />
        </div>

        <button
          type="submit"
          className="submit-btn w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreditCard;
