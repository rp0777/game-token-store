import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";

import { WagmiConfig } from "wagmi";
import { arbitrum, mainnet, bscTestnet } from "wagmi/chains";

// Replace this project ID with yours
// from cloud.walletconnect.com
const projectId = "2a2a5978a58aad734d13a2d194ec469a";

const chains: any = [mainnet, arbitrum, bscTestnet];

const wagmiConfig: any = defaultWagmiConfig({
  projectId,
  chains,
  metadata: {
    name: "test",
  },
});

createWeb3Modal({
  chains,
  projectId,
  wagmiConfig,
});

createRoot(document.getElementById('root')!).render(
  <StrictMode> 
    <BrowserRouter>
      <WagmiConfig config={wagmiConfig}>
        <App />
      </WagmiConfig>
    </BrowserRouter>
  </StrictMode>,
)
