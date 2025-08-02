"use client";

import React, { useState } from "react";
import { IVendingMachine } from "./IVendingMachine";
import { ethers } from "ethers";

const contractAddress = "0xc503aa0c9a671103aee345229be28f69a5ca8563"; // Get this from run-dev-node.sh output
const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL || "");
const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY || "";
const signer = new ethers.Wallet(privateKey, provider);
const contract = new ethers.Contract(contractAddress, IVendingMachine, signer);

export default function DebugContracts() {
  const [userAddress, setUserAddress] = useState("");
  const [balance, setBalance] = useState<string | null>(null);
  const [lastCupcakeTime, setLastCupcakeTime] = useState<number | null>(null);
  const [txStatus, setTxStatus] = useState<{
    status: "none" | "pending" | "success" | "error";
    message: string;
    operation?: string;
  }>({ status: "none", message: "" });

  const handleTransaction = async (
    operation: () => Promise<any>,
    pendingMessage: string,
    successMessage: string,
    operationType: string,
  ) => {
    if (txStatus.status === "pending") return;

    try {
      setTxStatus({ status: "pending", message: pendingMessage, operation: operationType });
      await operation();
      setTxStatus({ status: "success", message: successMessage });
    } catch (error: any) {
      console.error(`Error in ${operationType}:`, error);
      setTxStatus({
        status: "error",
        message: error.reason || error.message || "Transaction failed",
      });
    }
    
    setTimeout(() => {
      setTxStatus({ status: "none", message: "" });
    }, 5000);
  };

  const checkBalance = async () => {
    if (!userAddress) {
      setTxStatus({
        status: "error",
        message: "Please enter a valid address",
      });
      return;
    }

    handleTransaction(
      async () => {
        const balance = await contract.getCupcakeBalanceFor(userAddress);
        setBalance(balance.toString());
      },
      "Checking balance...",
      `Successfully retrieved balance for ${userAddress}`,
      "checkBalance"
    );
  };

  const giveCupcake = async () => {
    if (!userAddress) {
      setTxStatus({
        status: "error",
        message: "Please enter a valid address",
      });
      return;
    }

    handleTransaction(
      async () => {
        const tx = await contract.giveCupcakeTo(userAddress);
        await tx.wait();
        const newBalance = await contract.getCupcakeBalanceFor(userAddress);
        setBalance(newBalance.toString());
        setLastCupcakeTime(Date.now());
      },
      "Giving cupcake...",
      `Successfully gave a cupcake to ${userAddress}`,
      "giveCupcake"
    );
  };

  // Helper function to determine if a button should be disabled
  const isOperationDisabled = (operation: string) => {
    return txStatus.status === "pending" && (!txStatus.operation || txStatus.operation === operation);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto py-8 px-4">
      <div className="bg-white dark:bg-gray-900/95 shadow-2xl rounded-3xl w-full max-w-5xl p-8 border border-slate-200 dark:border-blue-500/30">
        <div className="flex items-center justify-center mb-8">
          <div className="px-6 py-3 rounded-full">
            <h1 className="text-4xl font-extrabold tracking-tight text-blue-600 dark:text-cyan-400">
              🧁 Cupcake Vending Machine
            </h1>
          </div>
        </div>

        {/* Balance Display */}
        {balance !== null && (
          <div className="flex justify-center mb-10">
            <div className="bg-slate-100/80 dark:bg-blue-900/40 rounded-2xl px-8 py-6 shadow-xl border border-slate-200 dark:border-blue-500/20 backdrop-blur-md text-center">
              <div className="text-lg font-medium text-slate-600 dark:text-blue-200 mb-1">Current Balance</div>
              <div className="text-5xl font-bold text-pink-500 dark:text-pink-400">
                {balance} 🧁
              </div>
            </div>
          </div>
        )}

        {/* Transaction Status Alert */}
        {txStatus.status !== "none" && (
          <div
            className={`transition-all duration-300 alert ${
              txStatus.status === "pending"
                ? "bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-200"
                : txStatus.status === "success"
                  ? "bg-green-50 text-green-700 dark:bg-green-900/50 dark:text-green-200"
                  : "bg-red-50 text-red-700 dark:bg-red-900/50 dark:text-red-200"
            } mb-8 border ${
              txStatus.status === "pending"
                ? "border-blue-200 dark:border-blue-500/40"
                : txStatus.status === "success"
                  ? "border-green-200 dark:border-green-500/40"
                  : "border-red-200 dark:border-red-500/40"
            } shadow-lg backdrop-blur-md rounded-2xl p-4`}
          >
            <div className="flex items-center">
              {txStatus.status === "pending" && (
                <div className="h-5 w-5 border-t-2 border-b-2 border-blue-500 dark:border-blue-400 rounded-full animate-spin mr-3"></div>
              )}
              {txStatus.status === "success" && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-3 text-green-500 dark:text-green-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
              {txStatus.status === "error" && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-3 text-red-500 dark:text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
              <span className="font-medium">{txStatus.message}</span>
            </div>
          </div>
        )}

        <div className="space-y-8">
          {/* Address Input Section */}
          <div className="bg-slate-50 dark:bg-gray-800/80 rounded-2xl p-6 border border-slate-200 dark:border-blue-500/20">
            <h2 className="text-xl font-semibold text-slate-700 dark:text-blue-200 mb-4">User Operations</h2>
            <div className="flex flex-col sm:flex-row gap-6 justify-between items-center">
              <div className="w-full sm:w-2/3">
                <input
                  type="text"
                  className="input bg-white/70 dark:bg-blue-900/30 border border-slate-300 dark:border-blue-500/30 focus:border-blue-400 dark:focus:border-blue-400 focus:bg-white dark:focus:bg-blue-900/40 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-blue-300/50 w-full rounded-xl p-3"
                  placeholder="Enter Ethereum address"
                  value={userAddress}
                  onChange={e => setUserAddress(e.target.value)}
                  disabled={txStatus.status === "pending"}
                />
              </div>
              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  className={`btn border-0 shadow-lg px-4 py-2 rounded-xl font-semibold 
                    ${
                      isOperationDisabled("checkBalance")
                        ? "bg-slate-200 text-slate-400 dark:bg-blue-900/50 dark:text-blue-300/70 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 text-white transform hover:scale-105 transition-all duration-300"
                    }`}
                  onClick={checkBalance}
                  disabled={isOperationDisabled("checkBalance")}
                >
                  {txStatus.status === "pending" && txStatus.operation === "checkBalance" ? (
                    <div className="flex items-center">
                      <div className="h-5 w-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                      Checking...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                      </svg>
                      Check Balance
                    </div>
                  )}
                </button>

                <button
                  className={`btn border-0 shadow-lg px-4 py-2 rounded-xl font-semibold 
                    ${
                      isOperationDisabled("giveCupcake")
                        ? "bg-slate-200 text-slate-400 dark:bg-purple-900/50 dark:text-purple-300/70 cursor-not-allowed"
                        : "bg-purple-500 hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-500 text-white transform hover:scale-105 transition-all duration-300"
                    }`}
                  onClick={giveCupcake}
                  disabled={isOperationDisabled("giveCupcake")}
                >
                  {txStatus.status === "pending" && txStatus.operation === "giveCupcake" ? (
                    <div className="flex items-center">
                      <div className="h-5 w-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                      Giving Cupcake...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Give Cupcake
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Last Cupcake Time */}
          {lastCupcakeTime && (
            <div className="text-center">
              <div className="inline-block bg-slate-100/80 dark:bg-blue-900/20 px-4 py-2 rounded-xl text-sm text-slate-600 dark:text-blue-300 border border-slate-200 dark:border-blue-500/20">
                Last cupcake given: {new Date(lastCupcakeTime).toLocaleTimeString()}
              </div>
            </div>
          )}

          {/* Contract Info Card */}
          <div className="bg-slate-50 dark:bg-gray-800/80 rounded-2xl p-6 border border-slate-200 dark:border-blue-500/20 mt-8">
            <h3 className="text-xl font-semibold text-slate-700 dark:text-blue-200 mb-4">Contract Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/60 dark:bg-blue-900/20 rounded-xl p-4 border border-slate-200 dark:border-blue-500/10">
                <div className="text-sm font-medium text-slate-500 dark:text-blue-300 mb-1">Contract Address</div>
                <div className="font-mono text-sm text-slate-700 dark:text-blue-100 break-all">
                  {contractAddress}
                </div>
              </div>
              
              <div className="bg-white/60 dark:bg-blue-900/20 rounded-xl p-4 border border-slate-200 dark:border-blue-500/10">
                <div className="text-sm font-medium text-slate-500 dark:text-blue-300 mb-1">Network</div>
                <div className="font-mono text-sm text-slate-700 dark:text-blue-100">
                  Local Testnet ({process.env.NEXT_PUBLIC_RPC_URL})
                </div>
              </div>
              
              <div className="md:col-span-2 bg-white/60 dark:bg-blue-900/20 rounded-xl p-4 border border-slate-200 dark:border-blue-500/10">
                <div className="text-sm font-medium text-slate-500 dark:text-blue-300 mb-1">Cupcake Cooldown</div>
                <div className="font-mono text-sm text-slate-700 dark:text-blue-100">
                  5 seconds between cupcakes
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
