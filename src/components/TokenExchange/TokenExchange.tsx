import { useAccount, useDisconnect } from "wagmi";
import './TokenExchange.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TokenExchange = () => {
  const { address, isConnected } = useAccount();
  const [usdtValue, setUsdtValue] = useState("");
  const [gameCoinValue, setGameCoinValue] = useState("");
  const { disconnect } = useDisconnect();
  const navigate = useNavigate();

  const handleGameCoinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const regex = /^[0-9]*\.?[0-9]*$/; // Allows only numbers and optional decimal points

    if (regex.test(value)) {
      setGameCoinValue(value);
      
      // Update USDT value based on the formula usdt = gamecoin / 1.04
      const usdt = value ? (parseFloat(value) * 1.04).toFixed(2) : "";
      setUsdtValue(usdt);
    }
  };

  const handleDisconnect = () => {
    disconnect();
    navigate("/"); // Redirect to root after disconnecting
  };

  return (
    <div className="token-exchange flex flex-col justify-center items-center p-6 bg-gray-900 min-h-screen w-full">
      {isConnected && (
        <div className="crypto-container flex flex-col gap-5 justify-center items-center w-full max-w-md">

          <div className="wallet-info flex flex-col justify-center items-center">
            <p className="text-teal-200 text-lg">Connected: {address}</p>
            <button 
              className="disconnect-btn bg-red-500 text-white py-2 px-4 mt-3 rounded-md hover:bg-red-600"
              onClick={handleDisconnect}
            >
              Disconnect Wallet
            </button>
          </div>

          <form className="exchange-form w-full bg-gray-800 p-6 rounded-md">
            <div className="form-group mb-4">
              <label className="block text-teal-200 mb-1" htmlFor="usdt">USDT</label>
              <input 
                type="text" 
                value={usdtValue}
                placeholder="USDT equivalent"
                className="w-full p-2 rounded-md"
                id="usdt"
                readOnly
              />
            </div>
            
            <div className="form-group mb-4">
              <label className="block text-teal-200 mb-1" htmlFor="game-token">Game Token</label>
              <input 
                type="text" 
                value={gameCoinValue}
                placeholder="Enter Game Token amount"
                className="w-full p-2 rounded-md"
                id="game-token"
                onChange={handleGameCoinChange}
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
      )}
    </div>
  );
};

export default TokenExchange;
