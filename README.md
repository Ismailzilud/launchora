# Launchora

A mini launchpad console for **GIWA Sepolia**, built with the public
**Ammora SDK** — [`@ammora-protocol/sdk@0.3.9`](https://www.npmjs.com/package/@ammora-protocol/sdk)
(the version pinned by the official Ammora partner quickstart).

**Live site:** https://ismailzilud.github.io/launchora/

## What it does

- **Deployment data from the SDK, not hardcoded.** The page imports
  `giwaSepoliaAutoRouteDeployment` from the SDK and renders the reviewed
  auto-route V4 deployment for GIWA Sepolia (chain 91342): Launch Factory,
  Config Registry, Fee Policy, Graduation Adapter, ALMM Factory and the
  Fee Sharing Factory, each linked to the GIWA Sepolia explorer.
- **Launch fee preview, computed by the SDK.** The fee-split card calls the
  SDK's own `previewAmmoraLaunchFeeDistribution(totalFee, creatorShareBps,
  hasReferral)` in the browser. Example (1 ETH fee, 70% creator share, no
  referral): Protocol 0.2 ETH · Creator 0.56 ETH · Partner 0.24 ETH ·
  Referral 0 ETH.
- **Live chain block** via JSON-RPC to the RPC endpoint pinned in the SDK's
  chain object (`https://sepolia-rpc.giwa.io`, CORS-enabled).
- **Connect wallet** with an automatic switch/add of GIWA Sepolia
  (chain params taken from the SDK chain object).
- **ETH → $tAMM converter** using the indicative reference price shown on
  ammora.org on 16 Nov 2026 (0.0001970218 ETH per $tAMM). Testnet figures,
  clearly labelled as not a quote.

## SDK integration (source)

- Browser app: [`src/app.mjs`](src/app.mjs), bundled with esbuild into
  `app.js` (`npm run build`).
- Keyless live read: [`scripts/read-live.mjs`](scripts/read-live.mjs)
  (`npm run read-live`) — uses the SDK deployment pins + viem to verify the
  chain and that the pinned contracts hold code. Verified output,
  16 Nov 2026:

```
chain: GIWA Sepolia (id 91342) — matches SDK pin: true
latest block: 41445144
deployment slot: v4-auto-route-20260917, start block: 36220000
launch.factory 0x35353a2Dab7426EcCAe6f5FB267702a542ab68fA code: 16988 bytes
launch.configRegistry 0x6d043014972b87406C4757a5f2d655A24e0b0aF9 code: 17220 bytes
launch.feePolicy 0x17B44C14F640fD429740FA3220f47a567c62725C code: 403 bytes
liquidityMarketMaker.factory 0x63c9f1cab865d708a49df5304b59e91474860bde code: 9169 bytes
feeSharing.factory 0xb6131d1f86321c3de61f0e92fe136fa82e078927 code: 1744 bytes
```

## Run locally

```bash
npm install
npm run build        # bundle src/app.mjs -> app.js
npm run read-live    # keyless on-chain verification via the SDK
# then serve the folder statically, e.g. npx serve .
```

## Notes

Built for the Ammora Season 2 Builder Mission. Testnet only: no real
assets, no signing, no transaction is ever sent by this site.
Creating an actual launch Config or issuing a token through the Ammora
contracts is a separate, wallet-signed step that a project team performs
with its own wallet, as described in the official Ammora launchpad guide.

## License

MIT
