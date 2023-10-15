import { ConnectButton } from '@rainbow-me/rainbowkit';
export const Wallet = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus ||
            authenticationStatus === 'authenticated');
        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button className='font-IBM border-[1px] border-[#2d2d2d] md:border-l-0 border-l-[1px] md:rounded-l-none rounded-l-lg rounded-r-lg px-4 text-[#6b9999] h-10 text-xs' onClick={openConnectModal} type="button">
                    CONNECT WALLET
                  </button>
                );
              }
              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }
              return (
                <div className='font-IBM text-[#7a7a7a] h-10 text-xs' style={{ display: 'flex' }}>
                  <div className='h-10 hidden md:flex justify-center items-center border-[1px] border-r-0 rounded-l-lg border-l-[1px] border-[#2d2d2d]'>
                    <h1 className='px-4 text-[#6b9999] flex items-center justify-center'>
                        <svg className='mr-1 -ml-1' stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 320 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z"></path></svg>
                        {account.displayBalance
                        ? account.displayBalance
                        : ''}
                    </h1>
                  </div>
                  <button className='px-4 border-[1px] border-[#2d2d2d] rounded-lg md:rounded-none md:rounded-r-lg tracking-wide flex items-center justify-center' onClick={openAccountModal} type="button">
                    <svg className='mr-2' stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M1.5 3a.5.5 0 00-.5.5v2h5a.5.5 0 01.5.5c0 .253.08.644.306.958.207.288.557.542 1.194.542.637 0 .987-.254 1.194-.542.226-.314.306-.705.306-.958a.5.5 0 01.5-.5h5v-2a.5.5 0 00-.5-.5h-13zM15 6.5h-4.551a2.678 2.678 0 01-.443 1.042C9.613 8.088 8.963 8.5 8 8.5c-.963 0-1.613-.412-2.006-.958A2.679 2.679 0 015.551 6.5H1v6a.5.5 0 00.5.5h13a.5.5 0 00.5-.5v-6zm-15-3A1.5 1.5 0 011.5 2h13A1.5 1.5 0 0116 3.5v9a1.5 1.5 0 01-1.5 1.5h-13A1.5 1.5 0 010 12.5v-9z" clip-rule="evenodd"></path></svg>
                    {account.address.substring(0,4).toUpperCase() + '․․․' + account.address.substring(account.address.length - 4, account.address.length).toUpperCase()}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};