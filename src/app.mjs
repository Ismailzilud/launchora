// Launchora — a mini launchpad for GIWA Sepolia, built with the Ammora SDK.
// All protocol data below comes from the public SDK
// (@ammora-protocol/sdk@0.3.9): the reviewed auto-route V4 deployment
// pins for GIWA Sepolia, and the SDK's own launch fee-distribution
// preview function. Nothing is hardcoded from screenshots.
import {
  giwaSepoliaAutoRouteDeployment as deployment,
  previewAmmoraLaunchFeeDistribution,
} from "@ammora-protocol/sdk";

const chain = deployment.chain; // { id: 91342, name: "GIWA Sepolia", rpcUrls, blockExplorerUrl }
const RPC_URL = chain.rpcUrls[0];
const EXPLORER = chain.blockExplorerUrl;

const $ = (id) => document.getElementById(id);

function shortAddr(a) {
  return a ? a.slice(0, 6) + "…" + a.slice(-4) : "—";
}

function fmtEth(wei) {
  // wei (bigint) -> ETH string with up to 6 significant decimals
  const s = wei.toString().padStart(19, "0");
  const whole = s.slice(0, -18);
  let frac = s.slice(-18).replace(/0+$/, "");
  if (frac.length > 6) frac = frac.slice(0, 6);
  return frac ? `${whole}.${frac}` : whole;
}

// ---------- Deployment contracts (from the SDK) ----------
const contracts = [
  ["Launch Factory", deployment.contracts.launch.factory],
  ["Config Registry", deployment.contracts.launch.configRegistry],
  ["Fee Policy", deployment.contracts.launch.feePolicy],
  ["Graduation Adapter", deployment.contracts.launch.graduationAdapter],
  ["ALMM Factory", deployment.contracts.liquidityMarketMaker.factory],
  ["Fee Sharing Factory", deployment.contracts.feeSharing.factory],
];
$("contracts").innerHTML = contracts
  .map(
    ([label, addr]) =>
      `<div class="contract"><span>${label}</span><a href="${EXPLORER}/address/${addr}" target="_blank" rel="noopener">${shortAddr(addr)}</a></div>`
  )
  .join("");
$("chainName").textContent = `${chain.name} · chain ${chain.id}`;
$("slot").textContent = deployment.slot;

// ---------- Live block (direct JSON-RPC to the SDK's pinned RPC) ----------
async function refreshBlock() {
  try {
    const res = await fetch(RPC_URL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "eth_blockNumber", params: [] }),
    });
    const json = await res.json();
    $("block").textContent = Number(BigInt(json.result)).toLocaleString("en-US");
  } catch {
    $("block").textContent = "unavailable";
  }
}
refreshBlock();
setInterval(refreshBlock, 15000);

// ---------- Launch fee preview (SDK pure function) ----------
function renderFeePreview() {
  const feeEth = parseFloat($("feeAmount").value || "0");
  const creatorBps = Math.round(parseFloat($("creatorShare").value || "0") * 100);
  const hasReferral = $("referral").checked;
  $("creatorShareOut").textContent = `${(creatorBps / 100).toFixed(0)}%`;
  if (!feeEth || feeEth <= 0) return;
  const totalFee = BigInt(Math.round(feeEth * 1e6)) * 10n ** 12n; // ETH -> wei (µETH precision)
  const b = previewAmmoraLaunchFeeDistribution(totalFee, creatorBps, hasReferral);
  const rows = [
    ["Protocol", b.protocolFeeNet],
    ["Creator", b.creatorFee],
    ["Partner (launchpad)", b.partnerFee],
    ["Referral", b.referralFee],
  ];
  $("feeBreakdown").innerHTML = rows
    .map(([label, wei]) => `<div class="row"><span>${label}</span><b>${fmtEth(wei)} ETH</b></div>`)
    .join("");
}
["feeAmount", "creatorShare", "referral"].forEach((id) =>
  $(id).addEventListener("input", renderFeePreview)
);
renderFeePreview();

// ---------- ETH <-> $tAMM converter ----------
// Reference price displayed on ammora.org on 16 Nov 2026 (testnet, indicative).
const TAMM_PRICE_ETH = 0.0001970218;
function renderConvert() {
  const eth = parseFloat($("convEth").value || "0");
  $("convOut").textContent = eth > 0 ? `${(eth / TAMM_PRICE_ETH).toLocaleString("en-US", { maximumFractionDigits: 2 })} $tAMM` : "—";
}
$("convEth").addEventListener("input", renderConvert);
renderConvert();

// ---------- Connect wallet (GIWA Sepolia) ----------
$("connect").addEventListener("click", async () => {
  const eth = window.ethereum;
  if (!eth) {
    $("wallet").textContent = "No wallet found — open this page in your wallet browser.";
    return;
  }
  try {
    const accounts = await eth.request({ method: "eth_requestAccounts" });
    try {
      await eth.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x" + chain.id.toString(16) }],
      });
    } catch (e) {
      if (e && e.code === 4902) {
        await eth.request({
          method: "wallet_addEthereumChain",
          params: [{
            chainId: "0x" + chain.id.toString(16),
            chainName: chain.name,
            nativeCurrency: chain.nativeCurrency,
            rpcUrls: chain.rpcUrls,
            blockExplorerUrls: [EXPLORER],
          }],
        });
      }
    }
    $("wallet").textContent = shortAddr(accounts[0]);
  } catch {
    $("wallet").textContent = "Connection rejected";
  }
});
