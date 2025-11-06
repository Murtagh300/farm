// v5/v6 compatibele default-waarden voor numerieke grootheden.
// - v5: gebruikt BigNumber.from()
// - v6 of geen BigNumber: valt terug op native BigInt(0)

let _bnFrom = null;
try {
  // ethers v5 (named export)
  _bnFrom = require("ethers").BigNumber?.from;
  // eslint-disable-next-line no-empty
} catch {}
if (!_bnFrom) {
  try {
    // v5 (modulaire package) – aanwezig in v5 dependency tree
    _bnFrom = require("@ethersproject/bignumber").BigNumber?.from;
    // eslint-disable-next-line no-empty
  } catch {}
}

const toBN = (v) => {
  if (_bnFrom) return _bnFrom(v);
  // v6 fallback (zonder BigNumber): gebruik BigInt als placeholder
  // Let op: downstream code die .sub()/.mod() verwacht moet hier niet op losgelaten worden,
  // maar voor "0" defaults is dit veilig tot echte on-chain waarden geladen zijn.
  return BigInt(v);
};

export const defaultStakingPoolData = {
  poolSize: toBN(0),
  loading: true,
};

export const defaultUserData = {
  currentStake: toBN(0),
  claimableRewardTokens: [],
  unstakedBalance: toBN(0),
  unstakedAllowance: toBN(0),
  loading: true,
};
