'use client';

import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownLink,
  WalletDropdownDisconnect,
} from '@coinbase/onchainkit/wallet';
import {
  Address,
  Avatar,
  Name,
  Identity,
  EthBalance,
} from '@coinbase/onchainkit/identity';
import { Transaction, TransactionButton, TransactionSponsor, TransactionStatus, TransactionStatusAction, TransactionStatusLabel } from "@coinbase/onchainkit/transaction"
import { encodeFunctionData, Hex } from 'viem';
import { AttendanceAbi, attendenceContract } from '@/app/lib/Attendance';
import { useAccount, useChainId, useReadContract, useSwitchChain } from 'wagmi';
import { base, baseSepolia } from 'viem/chains';

export default function App({ params }: {params: {sessionId: string}}) {
    const account = useAccount()
    const {data: totalSessions} = useReadContract({
        abi: AttendanceAbi, 
        address: attendenceContract, 
        functionName: "totalSessions"
    })
    const {data: hasAttended} = useReadContract({
        abi: AttendanceAbi, 
        address: attendenceContract, 
        functionName: "hasAttended", 
        args: [BigInt(params.sessionId), account.address as Hex]
    })
    const calls = [{
        to: attendenceContract, 
        data: encodeFunctionData({
            abi: AttendanceAbi, 
            functionName: "attendSession", 
            args: [BigInt(params.sessionId)]
        })
    }]

    const chainId = useChainId()
    const {switchChain} = useSwitchChain()
    if (chainId && chainId != baseSepolia.id) {
        switchChain({chainId: baseSepolia.id})
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen font-sans dark:bg-background dark:text-white bg-white text-black">
            {!account.address ? (
                <Wallet>
                    <ConnectWallet>
                    <Avatar className="h-6 w-6" />
                    <Name />
                    </ConnectWallet>
                </Wallet>
            ) : (
                <>
                    <div className='absolute top-4 right-4'>
                        <Wallet>
                            <ConnectWallet>
                                <Avatar className="h-6 w-6" />
                                <Name />
                            </ConnectWallet>
                            <WalletDropdown>
                                <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                                    <Avatar />
                                    <Name />
                                    <Address />
                                    <EthBalance />
                                </Identity>
                                <WalletDropdownLink
                                    icon="wallet"
                                    href="https://keys.coinbase.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    >
                                    Wallet
                                </WalletDropdownLink>
                                <WalletDropdownDisconnect />
                            </WalletDropdown>
                        </Wallet>
                    </div>
                    <div className='w-1/4'>
                    {parseInt(params.sessionId) >= (totalSessions ?? 0) ? (
                        <div className='text-center'>Session does not exist.</div>
                    ) : !hasAttended ? (
                        <Transaction calls={calls}>
                            <TransactionButton text={"Attend"} />
                            <TransactionSponsor />
                            <TransactionStatus>
                                <TransactionStatusLabel />
                                <TransactionStatusAction />
                            </TransactionStatus>
                        </Transaction>  
                    ) : (
                        <div className='text-center'>You have already attended this session.</div>
                    )}
                    </div>
                </>
            )}
        </div>
    );
}