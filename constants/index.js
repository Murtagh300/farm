export const VECHAIN_NETWORK = process.env.NEXT_PUBLIC_VECHAIN_NETWORK;
export const NUM_SECONDS_IN_A_YEAR = parseFloat(31536000);
export const VEX_ADDRESS = {
  mainnet: "0x0BD802635eb9cEB3fCBe60470D2857B86841aab6",
  testnet: "0x0BD802635eb9cEB3fCBe60470D2857B86841aab6",
};

export const WVET_ADDRESS = {
  mainnet: "0xD8CCDD85abDbF68DFEc95f06c973e87B1b5A9997",
  testnet: "0x93E5Fa8011612FAB061eF58CbAB9262d2e76407b",
};

export const CHAIN_ID = {
  mainnet: 1,
  testnet: 42,
};

export const VECHAIN_NODES = {
  mainnet: "https://mainnetc1.vechain.network/",
  testnet: "https://vethor-node-test.vechaindev.com/", // toegevoegd voor robuuste fallback
}

/**
 * stakingTokenAddress: Fill in the actual V2Pair token address (eg. VEX-VET)
 * rewardsAddress: multirewards contract address for the stakingTokenAddress
 * rewardTokens: reward tokens to be given out (eg. VEX)
 */
export const STAKING_POOLS = [
  {
    id: 1,
    description: '-',
    stakeAsset: 'VEED-VET',
    stakeAssetLogo: "/imgs/tokens/veed.png",
    stakeAssetUrlPart: "0xD8CCDD85abDbF68DFEc95f06c973e87B1b5A9997-0x67fD63f6068962937EC81AB3Ae3bF9871E524FC9",
    rewardTokens: [
      {
        name: 'VEX',
        address: {
          mainnet: "0x0BD802635eb9cEB3fCBe60470D2857B86841aab6",
          testnet: "0x7e46cAd7eB7ebc587ac36c30fE705eD77a686f60",
        },
      }
    ],
    stakingTokenAddress: {
      mainnet: "0x3A778a7B141e846c53D03BA4c1899326eE0D0c14",
      testnet: "0x3A778a7B141e846c53D03BA4c1899326eE0D0c14" // dummy value, contract doesn't exist here
    },
    rewardsAddress: {
      mainnet: "0x40b0972f74d44da2b7a5a5817f81d38e293bce9f",
      testnet: "0x40b0972f74d44da2b7a5a5817f81d38e293bce9f" // dummy value, contract doesn't exist here
    }
  },
  {
    id: 2,
    description: '-',
    stakeAsset: "VeUSD-VET",
    stakeAssetLogo: "/imgs/tokens/veusd.png",
    stakeAssetUrlPart: "0x4E17357053dA4b473e2daa2c65C2c949545724b8-0xD8CCDD85abDbF68DFEc95f06c973e87B1b5A9997",
    rewardTokens: [
      {
        name: "VEX",
        address: {
          mainnet: "0x0BD802635eb9cEB3fCBe60470D2857B86841aab6",
          testnet: "0x7e46cAd7eB7ebc587ac36c30fE705eD77a686f60",
        },
      }
    ],
    stakingTokenAddress: {
      mainnet: "0x25491130A43d43AB0951d66CdF7ddaC7B1dB681b",
      testnet: "0x25491130A43d43AB0951d66CdF7ddaC7B1dB681b" // dummy value, contract doesn't exist here
    },
    rewardsAddress: {
      mainnet: "0xf1be58861b4bcacd6c7d026ba3de994361f5d3aa",
      testnet: "0xf1be58861b4bcacd6c7d026ba3de994361f5d3aa" // dummy value, contract doesn't exist here
    }
  },
  {
    id: 3,
    description:
      '<p class="title"> <b>VEX-VET</b> </p> <p> vex-vet is a token that represents VEX deposits in the vex-vet liquidity pool. Stake your vex-vet tokens in the vex-vet staking pool to earn vex rewards ;) </p>',
    stakeAsset: "VEX-VET",
    stakeAssetLogo: "/imgs/tokens/vex.svg",
    stakeAssetUrlPart: "0xD8CCDD85abDbF68DFEc95f06c973e87B1b5A9997-0x0BD802635eb9cEB3fCBe60470D2857B86841aab6",
    rewardTokens: [
      {
        name: "VEX",
        address: {
          mainnet: "0x0BD802635eb9cEB3fCBe60470D2857B86841aab6",
          testnet: "0x7e46cAd7eB7ebc587ac36c30fE705eD77a686f60",
        },
      },
    ],
    stakingTokenAddress: {
      mainnet: "0x39cd888a1583498AD30E716625AE1a00ff51286D",
      testnet: "0x136f4e8CD2A5dda330EF1B47A102B25122bf066C",
    },
    rewardsAddress: {
      mainnet: "0x538f8890a383c44e59df4c7263d96ca8048da2c7",
      testnet: "0x03ec9c93ed8a0dd68a9a4ac868c06fae3eecad01",
    },
  },
  {
    id: 4,
    description: "-",
    stakeAsset: "WOV-VET",
    stakeAssetLogo: "/imgs/tokens/wov.png",
    stakeAssetUrlPart: "0x170F4BA8e7ACF6510f55dB26047C83D13498AF8A-0xD8CCDD85abDbF68DFEc95f06c973e87B1b5A9997",
    rewardTokens: [
      {
        name: "WOV",
        address: {
          mainnet: "0x170F4BA8e7ACF6510f55dB26047C83D13498AF8A",
          testnet: "0xa9d948658eDFf0273deE1D610F2552b6954f77e8",
        },
      },
      {
        name: "VEX",
        address: {
          mainnet: "0x0BD802635eb9cEB3fCBe60470D2857B86841aab6",
          testnet: "0x7e46cAd7eB7ebc587ac36c30fE705eD77a686f60",
        },
      }
    ],
    stakingTokenAddress: {
      mainnet: "0xD86bed355d9d6A4c951e96755Dd0c3cf004d6CD0",
      testnet: "0x0000000000000000000000000000456E65726779",
    },
    rewardsAddress: {
      mainnet: "0xa8d1a1c88329320234581e203474fe19b99473d3",
      testnet: "0x8d6b6445e0428304a330ce2502203cc49654f314",
    },
  },
  {
    id: 5,
    description: "-",
    stakeAsset: "MVG-VET",
    stakeAssetLogo: "/imgs/tokens/mvg.png",
    stakeAssetUrlPart: "0x99763494A7B545f983ee9Fe02a3b5441c7EF1396-0xD8CCDD85abDbF68DFEc95f06c973e87B1b5A9997",
    rewardTokens: [
      {
        name: "VEX",
        address: {
          mainnet: "0x0BD802635eb9cEB3fCBe60470D2857B86841aab6",
          testnet: "0x7e46cAd7eB7ebc587ac36c30fE705eD77a686f60",
        },
      }
    ],
    stakingTokenAddress: {
      mainnet: "0xa051Db301625039C0d5fd9a1F5A41fc57fE5a709",
      testnet: "0x0000000000000000000000000000456E65726779",
    },
    rewardsAddress: {
      mainnet: "0x2ec0e35f377d6607516e7dbd8023b145bba3bd3b",
      testnet: "0x8d6b6445e0428304a330ce2502203cc49654f314",
    },
  },
  {
    id: 6,
    description: "-",
    stakeAsset: "SHA-VET",
    stakeAssetLogo: "/imgs/tokens/sha.png",
    stakeAssetUrlPart: "0x5db3C8A942333f6468176a870dB36eEf120a34DC-0xD8CCDD85abDbF68DFEc95f06c973e87B1b5A9997",
    rewardTokens: [
      {
        name: "VEX",
        address: {
          mainnet: "0x0BD802635eb9cEB3fCBe60470D2857B86841aab6",
          testnet: "0x7e46cAd7eB7ebc587ac36c30fE705eD77a686f60",
        },
      }
    ],
    stakingTokenAddress: {
      mainnet: "0xa14A5bDD5AB3D51062c5B243a2e6Fb0949fee2F3",
      testnet: "0x0000000000000000000000000000456E65726779",
    },
    rewardsAddress: {
      mainnet: "0x03e3dc7c1ce03679d4bf8b942a8e48c0175f26fe",
      testnet: "0x8d6b6445e0428304a330ce2502203cc49654f314",
    },
  },
  {
    id: 7,
    description: "-",
    stakeAsset: "HAI-VET",
    stakeAssetLogo: "/imgs/tokens/hai.png",
    stakeAssetUrlPart: "0xaCc280010B2EE0efc770BCE34774376656D8cE14-0xD8CCDD85abDbF68DFEc95f06c973e87B1b5A9997",
    rewardTokens: [
      {
        name: "VEX",
        address: {
          mainnet: "0x0BD802635eb9cEB3fCBe60470D2857B86841aab6",
          testnet: "0x7e46cAd7eB7ebc587ac36c30fE705eD77a686f60",
        },
      }
    ],
    stakingTokenAddress: {
      mainnet: "0x2a0455D09c38c22824aD5225e0B56bD1D2D31561",
      testnet: "0x0000000000000000000000000000456E65726779",
    },
    rewardsAddress: {
      mainnet: "0xbf3d59a37d2f7894563b2f4b1e0d6551b64c15d6",
      testnet: "0x8d6b6445e0428304a330ce2502203cc49654f314",
    },
  },
  {
    id: 8,
    description: "-",
    stakeAsset: "OCE-VET",
    stakeAssetLogo: "/imgs/tokens/oce.png",
    stakeAssetUrlPart: "0x0CE6661b4ba86a0EA7cA2Bd86a0De87b0B860F14-0xD8CCDD85abDbF68DFEc95f06c973e87B1b5A9997",
    rewardTokens: [
      {
        name: "VEX",
        address: {
          mainnet: "0x0BD802635eb9cEB3fCBe60470D2857B86841aab6",
          testnet: "0x7e46cAd7eB7ebc587ac36c30F e705eD77a686f60",
        },
      }
    ],
    stakingTokenAddress: {
      mainnet: "0x06475FdE6209A089dD59EBf248480F918c859920",
      testnet: "0x0000000000000000000000000000456E65726779",
    },
    rewardsAddress: {
      mainnet: "0x451257d6bf44f58861554eabb06d4616219beacb",
      testnet: "0x8d6b6445e0428304a330ce2502203cc49654f314",
    },
  },
  {
    id: 9,
    description: "-",
    stakeAsset: "JUR-VET",
    stakeAssetLogo: "/imgs/tokens/jur.png",
    stakeAssetUrlPart: "0x46209D5e5a49C1D403F4Ee3a0A88c3a27E29e58D-0xD8CCDD85abDbF68DFEc95f06c973e87B1b5A9997",
    rewardTokens: [
      {
        name: "VEX",
        address: {
          mainnet: "0x0BD802635eb9cEB3fCBe60470D2857B86841aab6",
          testnet: "0x7e46cAd7eB7ebc587ac36c30fE705eD77a686f60",
        },
      }
    ],
    stakingTokenAddress: {
      mainnet: "0x3310a78e395d7642F3f5F816afA451E991948cE7",
      testnet: "0x0000000000000000000000000000456E65726779",
    },
    rewardsAddress: {
      mainnet: "0xcc6c8c98d6c47133b0f13f8b234aaeb538437048",
      testnet: "0x8d6b6445e0428304a330ce2502203cc49654f314",
    },
  },
];

export const API_BASE_URL = "https://api.vexchange.io/";
export const API_ENDPOINT = "v1/tokens";
