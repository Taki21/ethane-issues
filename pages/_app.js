import '@/styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css';

import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { polygonMumbai } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { 
  googleWallet,
  facebookWallet,
  githubWallet,
  discordWallet,
  twitchWallet,
  twitterWallet,
} from '@zerodev/wagmi/rainbowkit'

import { infuraProvider } from 'wagmi/providers/infura'
import { connectorsForWallets, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'

function MyApp({ Component, pageProps }) {

  const zd_id = 'b5486fa4-e3d9-450b-8428-646e757c10f6'
  const infura = ''

  const allowedChains = [polygonMumbai]

  const { chains, publicClient, webSocketPublicClient } = configureChains(
    allowedChains,
    [publicProvider()]
  )
  
  const connectors = connectorsForWallets([
    {
      groupName: 'Providers',
      wallets: [
        googleWallet({chains: chains, options: { projectId: zd_id }}),
        // enhanceWalletWithAAConnector(
        //   metaMaskWallet({ chains: [polygonMumbai], projectId: wc_project_id }),
        //   { projectId: zd_id }
        // ),
        facebookWallet({chains: chains, options: { projectId: zd_id }}),
        githubWallet({chains: chains, options: { projectId: zd_id }}),
        discordWallet({chains: chains, options: { projectId: zd_id }}),
        twitterWallet({chains: chains, options: { projectId: zd_id }}),
      ],
    },
  ]);

  const config = createConfig({
    autoConnect: false,
    connectors,
    publicClient,
    webSocketPublicClient,
  })

  return (
    <WagmiConfig config={config}>
      
        <RainbowKitProvider theme={darkTheme({
          accentColor: '#273a3a',
          fontStack: 'system'
        })} chains={chains} modalSize={'compact'}>
          <div className='bg-[#141515]'>
            <Component {...pageProps} />
          </div>
        </RainbowKitProvider>

    </WagmiConfig>
  )
}

export default MyApp
