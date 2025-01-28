import { NextResponse } from 'next/server';
import { Address, createPublicClient, createWalletClient, encodeFunctionData, Hex, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts'
import { baseSepolia } from 'viem/chains';
import { AttendanceAbi } from '../lib/Attendance';


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
  } catch (error) {
    console.log(error.message)
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}