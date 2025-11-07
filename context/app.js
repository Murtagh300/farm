import { createContext, useRef, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { STAKING_POOLS, VECHAIN_NETWORK, VECHAIN_NODES } from "../constants";
import { userAccount } from "../utils";

const AppContext = createContext({});

export const useAppContext = () => useContext(AppContext);

export function AppStateProvider({ children }) {
  const [connex, setConnex] = useState(null);
  const [account, setAccount] = useState(null);
  const [ticker, setTicker] = useState(null);
  const [tick, setTick] = useState(null);
  const [connexStakingPools, setConnexStakingPools] = useState(null);
  const ref = useRef(connex);

  useEffect(() => {
    ref.current = connex;
  });

  useEffect(() => {
    const initConnex = async () => {
      try {
        const { Connex } = await import("@vechain/connex");

        // ---- Robuuste fallback: als env mist, val terug op mainnet
        const NET = VECHAIN_NETWORK || "mainnet";
        const nodeUrl = VECHAIN_NODES[NET] || VECHAIN_NODES.mainnet;
        const networkName = NET === "testnet" ? "test" : "main";

        if (!nodeUrl) {
          throw new Error(
            `No node URL resolved. VECHAIN_NETWORK="${VECHAIN_NETWORK}" NET="${NET}"`
          );
        }

        const _connex = new Connex({
          node: nodeUrl,
          network: networkName,
        });

        const _ticker = _connex.thor.ticker();
        setConnex(_connex);
        setTicker(_ticker);

        const saved = userAccount.get();
        if (saved) setAccount(saved);

        // ---- Veilig pools object bouwen; sla pools met ontbrekende adressen over
        const pools = {};
        STAKING_POOLS.forEach((stakingPool) => {
          const stakingAddr = stakingPool?.stakingTokenAddress?.[NET];
          const rewardsAddr = stakingPool?.rewardsAddress?.[NET];

          if (!stakingAddr || !rewardsAddr) {
            console.warn(
              `[staking] Skipping pool id=${stakingPool?.id} for NET="${NET}" — missing address(es).`
            );
            return;
          }

          try {
            pools[stakingPool.id] = {
              stakingTokenContract: _connex.thor.account(stakingAddr),
              rewardsContract: _connex.thor.account(rewardsAddr),
            };
          } catch (e) {
            console.warn(
              `[staking] Failed to init pool id=${stakingPool?.id} (NET="${NET}") — ${e}`
            );
          }
        });
        setConnexStakingPools(pools);
      } catch (error) {
        console.warn(
          `Unable to get connex: ${error?.message || error}. ` +
            `Hint: ensure NEXT_PUBLIC_VECHAIN_NETWORK is set (e.g. "mainnet") and node URL resolves.`
        );
      }
    };

    if (!connex) {
      initConnex();
    }
  }, [connex]);

  useEffect(() => {
    (async () => {
      if (ticker) {
        const _tick = await ticker.next();
        setTick(_tick);
      }
    })();
  }, [ticker, tick]);

  const initAccount = async () => {
    const _connex = ref.current;
    const sign = _connex.vendor.sign("cert", {
      purpose: "identification",
      payload: {
        type: "text",
        content: "Select account to sign certificate",
      },
    });
    try {
      const { annex } = await sign.request();
      setAccount(annex.signer);
      userAccount.set(annex.signer);
    } catch (error) {
      console.warn(`Unable to get account: ${error}`);
    }
  };

  return (
    <AppContext.Provider
      value={{
        connex,
        account,
        initAccount,
        ticker,
        tick,
        connexStakingPools,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

AppStateProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
