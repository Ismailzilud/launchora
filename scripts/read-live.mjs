// Keyless live read against GIWA Sepolia using the Ammora SDK + viem.
// No private key, no funds: verifies the chain, the latest block, and that
// the SDK-pinned deployment contracts actually hold code on-chain.
// Run: npm run read-live
import { createPublicClient, http } from "viem";
import { giwaSepoliaAutoRouteDeployment as deployment } from "@ammora-protocol/sdk";

const client = createPublicClient({ transport: http(deployment.chain.rpcUrls[0]) });

const chainId = await client.getChainId();
const block = await client.getBlockNumber();
console.log(`chain: ${deployment.chain.name} (id ${chainId}) — matches SDK pin: ${chainId === deployment.chain.id}`);
console.log(`latest block: ${block}`);
console.log(`deployment slot: ${deployment.slot}, start block: ${deployment.startBlock}`);

const targets = [
  ["launch.factory", deployment.contracts.launch.factory],
  ["launch.configRegistry", deployment.contracts.launch.configRegistry],
  ["launch.feePolicy", deployment.contracts.launch.feePolicy],
  ["liquidityMarketMaker.factory", deployment.contracts.liquidityMarketMaker.factory],
  ["feeSharing.factory", deployment.contracts.feeSharing.factory],
];
for (const [label, address] of targets) {
  const code = await client.getCode({ address });
  console.log(`${label} ${address} code: ${code && code !== "0x" ? `${(code.length - 2) / 2} bytes` : "NONE"}`);
}
