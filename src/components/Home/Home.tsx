import { Link } from 'react-router-dom';
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useEffect } from "react";
import { useNetwork } from "wagmi";

const Home = () => {
  const { open } = useWeb3Modal();
  const { chain } = useNetwork();
  useEffect(() => {
    console.log("switched to " + chain?.id);
  }, [chain?.id]);

  return (
    <div className="home flex flex-col justify-center items-center gap-5">
      <Link to="/crypto-wallet">
        <button onClick={() => open({ view: "Networks" })} className="s7Button bg-green-500 py-3 px-6 rounded-md text-black">Buy with Crypto Wallet</button>
      </Link>
      <Link to="/credit-card">
        <button className="s7Button bg-green-500 py-3 px-6 rounded-md text-black">Buy with Credit Card</button>
      </Link>
    </div>
  );
}

export default Home;
