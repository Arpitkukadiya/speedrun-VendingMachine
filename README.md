# 🚩 Challenge #2: 🎟 Vending Machine

> ⚠️ **Important:** Please complete **Challenge #1** first if you haven't already, as it contains essential instructions for all upcoming challenges.

🎂 Cupcake Vending Machine on Stylus 🧁

🚀 Overview
This Rust-based smart contract acts as a blockchain-powered cupcake dispenser! Users can claim cupcakes every 5 seconds and check their balances at any time. Built with the Stylus SDK, it ensures seamless integration with Rust.

✨ Features

 - 🧁 Cupcake Distribution: Users claim cupcakes if 5 seconds have passed since the last request.
 - 📊 Balance Tracking: Check your cupcake stash anytime.
 - ⏱️ Cooldown Timer: Prevents over-requesting.

🌟 Project Goals
 - 1️⃣ Smart Contract: Build a vending machine contract for cupcake claiming and tracking.
 - 2️⃣ Frontend App: Create a user-friendly interface to request cupcakes and view balances.
 - 3️⃣ Deploy: Launch on the Local Nitro-devnode.

🎉 Let's sweeten the blockchain experience! 🍩

## Checkpoint 0: 📦 Environment Setup 📚

Before you begin, you need to install the following tools:

- [Node (>= v18.17)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

Then download the challenge to your computer and install dependencies by running:

> ⚠️ IMPORTANT: Please make sure to run the below commands through WSL only. In PowerShell, you'll get an error because some files are not supported on Windows.

```sh
git clone -b vending-machine https://github.com/abhi152003/speedrun_stylus
cd speedrun_stylus
yarn install
```

> In the same terminal, after all the dependencies have installed, run the below commands to start the local devnode in Docker. You'll need to spin up the Stylus nitro devnode by running the script through commands. This script will deploy the contract and generate the ABI so you can interact with the contracts written in RUST:

Contracts will be deployed through the cargo stylus command using the pre-funded account's private key so users can perform any transaction through the frontend while interacting with the contract.

```sh
cd speedrun_stylus # if not done
cd packages
cd cargo-stylus
cd vending_machine
```

> Now open your Docker desktop and then return to your IDE and run the command below to spin up the nitro devnode in Docker. This will deploy the contract and generate the ABI so you can interact with the contracts written in RUST:

```bash
bash run-dev-node.sh
```

This command will spin up the nitro devnode in Docker. You can check it out in your Docker desktop. This will take some time to deploy the RUST contract, and then the script will automatically generate the ABI. You can view all these transactions in your terminal and Docker desktop. The Docker node is running at localhost:8547, but before running this command make sure about the below thing

## 🚨 Fixing Line Endings and Running Shell Scripts in WSL on a CRLF-Based Windows System

> ⚠️ This guide provides step-by-step instructions to resolve the Command not found error caused by CRLF line endings in shell scripts when running in a WSL environment.

---

## 🛠️ Steps to Fix the Issue

###  Convert Line Endings to LF
Shell scripts created in Windows often have `CRLF` line endings, which cause issues in Unix-like environments such as WSL. To fix this:

#### Using `dos2unix`
1. Install `dos2unix` (if not already installed):
   ```bash
   sudo apt install dos2unix
   ```

2. Convert the script's line endings:
    ```bash
   dos2unix run-dev-node.sh
   ```

3. Make the Script Executable:
    ```bash
    chmod +x run-dev-node.sh
    ```

4. Run the Script in WSL
    ```bash
    bash run-dev-node.sh
    ```

> In the same WSL terminal window or at the Docker Desktop terminal, you can easily view the details of your contract deployment, including the deployment transaction hash, which can be later used to verify the contract.

![image](https://github.com/user-attachments/assets/30bb3557-c04e-450a-925f-78043672e7ec)

![image](https://github.com/user-attachments/assets/4d99d35a-4adc-418e-b6c7-4d03490f693d)

> Then in a second WSL terminal window, you can run below commands to start your 📱 frontend:

> ⚠️ **Before running the frontend:**
> 
>    Go to the `packages/nextjs` directory:
>    ```bash
>    cd packages/nextjs
>    cp .env.example .env
>    ```


```sh
cd packages/nextjs
yarn run dev OR yarn dev

```

📱 Open [http://localhost:3000](http://localhost:3000) to see the app.

---

## 📊 Performance Tracking

Before submitting your challenge, you can run the performance tracking script to analyze your application:

1. **Navigate to the performance tracking directory:**

   ```bash
   cd packages/nextjs/services/web3
   ```

2. **Update the contract address:**
   Open the `performanceTracking.js` file and paste the contract address that was deployed on your local node. (you can get contract address same as we have mentioned above in Docker_Img)

3. **Run the performance tracking script:**
   ```bash
   node performanceTracking.js
   ```

This will provide insights about the savings when you cache your deployed contract. The output will show performance analysis similar to the image below:

![image](https://raw.githubusercontent.com/purvik6062/speedrun_stylus/refs/heads/counter/assets/performance.png)

> 📝 **Important**: Make sure to note down the **Latency Improvement** and **Gas Savings** values from the output, as you'll need to include these metrics when submitting your challenge.

---

## 💫 Checkpoint 1:  Frontend Magic

> 🌟 You'll be redirected to the below page after you complete checkpoint 0

![image](https://github.com/user-attachments/assets/113539a0-6988-427a-94c5-bc0e98d9ab26)


> Then you have to click on the debug contracts to start interacting with your contract. Click on "Debug Contracts" from the Navbar or from the Debug Contracts Div placed in the middle of the screen

![image](https://github.com/user-attachments/assets/37a608ac-bb1c-457a-becc-1eae457a838d)

The interface allows you to:

1. Send a Cupcake to a specified user address.
2. Check the balance of Cupcakes held by a specific address.
3. Display detailed contract information.
4. Show the Cupcake cooldown time period.
5. Track all transactions on the Block Explorer.


### Below are the examples of above all interactions that can be done with the `Vending Machine` smart contract written in the RUST

### 1. Cupcake
![image](https://github.com/user-attachments/assets/448ac381-0661-451e-8a64-86f7abffda92)

### 2. Balance Checking
![image](https://github.com/user-attachments/assets/a741c579-eb9d-484d-b9ef-5b88fd76a5f6)

> After that, you can easily view all of your transactions from the Block Explorer Tab

![image](https://github.com/user-attachments/assets/5e751c4a-9761-4ef1-b4e8-7f4ab443ef32)


💼 Take a quick look at your deploy script `run-dev-node.sh` in `speedrun-rust/packages/cargo-stylus/vending_machine/run-dev-node.sh`.

📝 If you want to edit the frontend, navigate to `speedrun_stylus/packages/nextjs/app` and open the specific page you want to modify. For instance: `/debug/page.tsx`. For guidance on [routing](https://nextjs.org/docs/app/building-your-application/routing/defining-routes) and configuring [pages/layouts](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts) checkout the Next.js documentation.

---

## Checkpoint 2: 💾 Deploy your contract! 🛰

🛰  You don't need to provide any specifications to deploy your contract because contracts are automatically deployed from the `run-dev-node.sh`

> You can check that below :

![image](https://github.com/user-attachments/assets/d84c4d6a-be20-426b-9c68-2c021caefb29)

The above command will automatically deploy the contract functions written inside `speedrun_stylus/packages/cargo-stylus/vending_machine/src/lib.rs`

> This local account will deploy your contracts, allowing you to avoid entering a personal private key because the deployment happens using the pre-funded account's private key.

## Checkpoint 3: 🚢 Ship your frontend! 🚁

> We are deploying all the RUST contracts at the `localhost:8547` endpoint where the nitro devnode is spinning up in Docker. You can check the network where your contract has been deployed in the frontend (http://localhost:3000):

![image](https://github.com/user-attachments/assets/bb82e696-97b9-453e-a7c7-19ebb7bd607f)

🚀 Deploy your NextJS App

```shell
vercel
```

> Follow the steps to deploy to Vercel. Once you log in (email, github, etc), the default options should work. It'll give you a public URL.

> If you want to redeploy to the same production URL you can run `yarn vercel --prod`. If you omit the `--prod` flag it will deploy it to a preview/test URL.

---

## 🚀 Deploying to Arbitrum Sepolia

If you want to deploy your Vending Machine contract to the Arbitrum Sepolia testnet, follow these steps:

1. **Run the Sepolia Deployment Script**

   Export your private key in the terminal :
   ```bash
   export PRIVATE_KEY=your_private_key_of_your_ethereum_wallet
   ```

   Open your terminal and run:
   ```bash
   cd packages/cargo-stylus/vending_machine
   bash run-sepolia-deploy.sh
   ```
   This will deploy your contract to Arbitrum Sepolia and output the contract address and transaction hash.

2. **Configure the Frontend for Sepolia**

   - Go to the `packages/nextjs` directory:
     ```bash
     cd packages/nextjs
     cp .env.example .env
     ```
   - Open the `.env` file and set the following variables:
     ```env
     NEXT_PUBLIC_RPC_URL=https://sepolia-rollup.arbitrum.io/rpc
     NEXT_PUBLIC_PRIVATE_KEY=your_private_key_of_your_ethereum_wallet
     ```
     Replace `your_private_key_of_your_ethereum_wallet` with your actual Ethereum wallet private key (never share this key publicly).

3. **Start the Frontend**

   ```bash
   yarn run dev
   ```
   Your frontend will now connect to the Arbitrum Sepolia network and interact with your deployed contract.

---

## Checkpoint 4: 📜 Contract Verification

You can verify your smart contract by running:

```bash
cargo stylus verify -e http://127.0.0.1:8547 --deployment-tx "$deployment_tx"
# here deployment_tx can be received through the docker desktop's terminal when you have depoloyed your contract using the below command:

cargo stylus deploy -e http://127.0.0.1:8547 --private-key "$your_private_key"
# here you can use pre-funded account's private-key as well
```

> It is okay if it says your contract is already verified. 


---

## ⚡️ Cache Your Deployed Contract for Faster, Cheaper Access

> 📖 Contracts deployed on Arbitrum Sepolia can use this command for gas benefits, time savings, and cheaper contract function calls. Our backend will benchmark and place bids on your behalf to ensure your contract is not evicted from the CacheManager contract, fully automating this process for you.

Before caching your contract, make sure you have installed the Smart Cache CLI globally:

```bash
npm install -g smart-cache-cli
```

After deploying your contract to Arbitrum Sepolia, you can cache your contract address using the `smart-cache` CLI. Caching your contract enables:
- 🚀 **Faster contract function calls** by reducing lookup time
- 💸 **Cheaper interactions** by optimizing access to contract data
- 🌐 **Seamless access** to your contract from any environment or system

> 💡 **Info:** Both the `<address>` and `--deployed-by` flags are **mandatory** when adding a contract to the cache.

### 📝 Simple Example

```bash
smart-cache add <CONTRACT_ADDRESS> --deployed-by <YOUR_WALLET_ADDRESS_WITH_WHOM_YOU_HAVE_DEPLOYED_CONTRACT>
```

### 🛠️ Advanced Example

```bash
smart-cache add 0xYourContractAddress \
  --deployed-by 0xYourWalletAddress \
  --network arbitrum-sepolia \
  --tx-hash 0xYourDeploymentTxHash \
  --name "YourContractName" \
  --version "1.0.0"
```

- `<CONTRACT_ADDRESS>`: The address of your deployed contract (**required**)
- `--deployed-by`: The wallet address you used to deploy the contract (**required**)
- `--network arbitrum-sepolia`: By default, contracts are cached for the Arbitrum Sepolia network for optimal benchmarking and compatibility
- `--tx-hash`, `--name`, `--version`: Optional metadata for better organization

> ⚠️ **Warning:** If you omit the required fields, the command will not work as expected.

> 💡 For more options, run `smart-cache add --help`.

For more in-depth details and the latest updates, visit the [smart-cache-cli package on npmjs.com](https://www.npmjs.com/package/smart-cache-cli).

---

## 🏁 Next Steps

Explore more challenges or contribute to this project!

> 🏃 Head to your next challenge [here](https://speedrunstylus.com/challenge/multisig-wallet).
#   s p e e d r u n - V e n d i n g M a c h i n e  
 