import { Address } from "viem";

export const attendenceContract =
  "0xB013D55860B750043423F1052e21287356ce2bf8" as Address;
export const AttendanceAbi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "sessionId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "attendee",
        type: "address",
      },
    ],
    name: "SessionAttended",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "sessionId",
        type: "uint256",
      },
    ],
    name: "SessionCancelled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "sessionId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "creator",
        type: "address",
      },
      { indexed: false, internalType: "uint48", name: "start", type: "uint48" },
      { indexed: false, internalType: "uint48", name: "end", type: "uint48" },
    ],
    name: "SessionCreated",
    type: "event",
  },
  {
    inputs: [{ internalType: "uint256", name: "sessionId", type: "uint256" }],
    name: "attendSession",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "sessionId", type: "uint256" }],
    name: "cancelSession",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint48", name: "start", type: "uint48" },
      { internalType: "uint48", name: "end", type: "uint48" },
    ],
    name: "createSession",
    outputs: [{ internalType: "uint256", name: "sessionId", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "sessionId", type: "uint256" },
      { internalType: "address", name: "attendee", type: "address" },
    ],
    name: "hasAttended",
    outputs: [{ internalType: "bool", name: "attended", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "sessions",
    outputs: [
      { internalType: "uint256", name: "start", type: "uint256" },
      { internalType: "uint256", name: "end", type: "uint256" },
      { internalType: "uint256", name: "totalAttended", type: "uint256" },
      { internalType: "bool", name: "isCanceled", type: "bool" },
      { internalType: "address", name: "creator", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "attendee", type: "address" }],
    name: "totalAttendence",
    outputs: [{ internalType: "uint256", name: "total", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
] as const;
