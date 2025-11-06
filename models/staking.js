import { BigNumber } from "ethers";

export const defaultStakingPoolData = {
  poolSize: BigNumber.from(0),
  loading: true,
};

export const defaultUserData = {
  currentStake: BigNumber.from(0),
  claimableRewardTokens: [],
  unstakedBalance: BigNumber.from(0),
  unstakedAllowance: BigNumber.from(0),
  loading: true,
};

// Voeg een default export toe zodat `import defaultStakingPoolData from '../models/staking'` geldig is
export default defaultStakingPoolData;
