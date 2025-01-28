import { Address } from "viem";

export const attendenceContract =
  "0xe4786c9C313Ea3263856233FB71b015D63252599" as Address;
export const AttendanceAbi = [
  {
    inputs: [
      { internalType: "uint256", name: "sessionId", type: "uint256" },
      { internalType: "address", name: "sender", type: "address" },
    ],
    name: "HasAttendedSession",
    type: "error",
  },
  {
    inputs: [
      { internalType: "uint48", name: "start", type: "uint48" },
      { internalType: "uint48", name: "end", type: "uint48" },
    ],
    name: "InvalidStartEnd",
    type: "error",
  },
  {
    inputs: [
      { internalType: "uint256", name: "sessionId", type: "uint256" },
      { internalType: "uint256", name: "totalSessions", type: "uint256" },
    ],
    name: "SessionDoesNotExist",
    type: "error",
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
      { internalType: "uint48", name: "start", type: "uint48" },
      { internalType: "uint48", name: "end", type: "uint48" },
      { internalType: "uint256", name: "totalAttended", type: "uint256" },
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
  {
    inputs: [],
    name: "totalSessions",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
] as const;
