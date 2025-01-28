import { NextResponse } from 'next/server';
import { createPublicClient, createWalletClient, encodeFunctionData, Hex, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts'
import { baseSepolia } from 'viem/chains';
import { AttendanceAbi, attendenceContract } from '@/app/lib/Attendance';

export async function GET(req: Request) {
  try {
    console.log({req})
    const { searchParams } = new URL(req.url);
    console.log({searchParams})
    
    const sessionId = searchParams.get('sessionId');
    console.log({sessionId})

    if (!sessionId) {
      return NextResponse.json({ error: 'Missing sessionId' }, { status: 400 });
    }

    const publicClient = createPublicClient({
      chain: baseSepolia,
      transport: http()
    })
    const data = await publicClient.readContract({
      address: attendenceContract,
      abi: AttendanceAbi,
      functionName: 'sessions',
      args: [BigInt(sessionId)]
    })

    console.error({data})

    const session = {
      start: parseInt(data[0].toString()),
      end: parseInt(data[1].toString()),
      totalAttended: parseInt(data[2].toString()),
      isCanceled: data[3],
      creator: data[4],
    }

    return NextResponse.json(session, { status: 200 });
  } catch (error: any) {
    console.log(error.message)
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { start, end } = body;

    if (!start || !end) {
      return NextResponse.json({ error: 'Missing start or end time' }, { status: 400 });
    }

    const privateKey = process.env.PRIVATE_KEY
    const account = privateKeyToAccount(privateKey as Hex)
    const walletClient = createWalletClient({
        account,
        chain: baseSepolia,
        transport: http()
      })

    // preparing the transaction object
    // - setting gas prices
    // signs the transaction object with the "account"
    // sends the signed transaction to a node to include in the next block
    const transactionHash = await walletClient.sendTransaction({to: attendenceContract, data: encodeFunctionData({abi: AttendanceAbi, functionName: "createSession", args: [start, end]})})

    return NextResponse.json({ transactionHash }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}