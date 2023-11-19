"use client";

import TheSidebar from './TheSidebar'

import { useMemo } from 'react'
import { clusterApiUrl } from '@solana/web3.js';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    LedgerWalletAdapter,
    PhantomWalletAdapter,
    TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';


// import the styles
// import '@solana/wallet-adapter-react-ui/styles.css'
// require('@solana/wallet-adapter-react-ui/styles.css');

export default function MainComponent({children,
}: {
  children: React.ReactNode
}) {
    const solNetwork = WalletAdapterNetwork.Testnet;
    const endpoint = useMemo(() => clusterApiUrl(solNetwork), [solNetwork]);
    // initialise all the wallets you want to use
    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new TorusWalletAdapter(),
            new LedgerWalletAdapter()
        ],
        [solNetwork]
    );
    return (
        <div className="w-full max-w-3xl lg:max-w-4xl mx-auto">
            <ConnectionProvider endpoint={endpoint}>
                <WalletProvider wallets={wallets} autoConnect={true}>
                    <WalletModalProvider>
                        <TheSidebar />
                        <main className="flex-1 border-r border-l ml-20 md:ml-64 min-h-screen">
                            <header className="flex space-x-6 items-center justify-between px-8 py-4 border-b">
                                <div className="text-xl font-bold"></div>
                            </header>
                            { children }
                        </main>
                    </WalletModalProvider>
                </WalletProvider>
            </ConnectionProvider>
        </div>
    )
}