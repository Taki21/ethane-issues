import { Inter } from 'next/font/google'
import { Wallet } from './Wallet'
import { ECDSAProvider, getRPCProviderOwner } from '@zerodev/sdk'
import { ZeroDevWeb3Auth } from '@zerodev/web3auth';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  async function sendEther() {
    const zeroDevWeb3Auth = ZeroDevWeb3Auth.getInstance([process.env.REACT_APP_ZERODEV_PROJECT_ID || 'b5486fa4-e3d9-450b-8428-646e757c10f6'])
    const ecdsaProvider = await ECDSAProvider.init({
        projectId: 'b5486fa4-e3d9-450b-8428-646e757c10f6',
        owner: getRPCProviderOwner(zeroDevWeb3Auth.provider)
    })
    
    const txn = await ecdsaProvider.sendUserOperation([
        {
            target: '0xBE9DDD6B4F58479abccA4f76A4271BF71A2a5dfD',
            data: '0x',
            value: 0
        }
    ])
    console.log(txn);
  }

  return (
    <main className={`flex w-full min-h-screen flex-col items-center p-24 ${inter.className}`}>
      <Wallet />
      <div className='flex flex-col items-center justify-center pt-4'>
        <h1 className='text-[#6b9999] text-3xl font-bold mb-4'>ZeroDev SDK: RainbowKit Provider ETH Transfer</h1>
        <h2 className='text-[#7a7a7a] text-xl font-bold mb-4'>Transfers 0 ETH. In our own setup, we have set it to sponsor all txs.</h2>
        <button className='bg-[#6b9999] text-white font-bold py-2 px-4 rounded-lg' onClick={sendEther}>Send Tx</button>
      </div>
    </main>
  )
}
