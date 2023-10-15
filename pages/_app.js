import '@/styles/globals.css'

import '@rainbow-me/rainbowkit/styles.css';
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { metaMaskWallet } from '@rainbow-me/rainbowkit/wallets'
import { enhanceWalletWithAAConnector } from '@zerodev/wagmi/rainbowkit'
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

  const zd_id = ''
  const wc_project_id = ''
  const infura = ''

  const allowedChains = [mainnet]

  const connectors = connectorsForWallets([
    {
      groupName: 'Providers',
      wallets: [
        googleWallet({chains: allowedChains, options: { projectId: zd_id }}),
        enhanceWalletWithAAConnector(
          metaMaskWallet({ chains: [mainnet], projectId: wc_project_id }),
          { projectId: zd_id }
        ),
        facebookWallet({chains: allowedChains, options: { projectId: zd_id }}),
        githubWallet({chains: allowedChains, options: { projectId: zd_id }}),
        discordWallet({chains: allowedChains, options: { projectId: zd_id }}),
        twitterWallet({chains: allowedChains, options: { projectId: zd_id }}),
      ],
    },
  ]);

  const { chains, publicClient, webSocketPublicClient } = configureChains(
    allowedChains,
    [infuraProvider({apiKey: infura})],
  )

  const config = createConfig({
    autoConnect: true,
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
