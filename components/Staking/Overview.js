import { BigNumber, utils } from "ethers";
import {useEffect, useMemo} from "react";
import { Subtitle, Title, PrimaryText } from "../../design";
import useFetchStakingPoolsData from "../../hooks/useFetchStakingPoolsData";
import useTokensInfo from "../../hooks/useTokensInfo";
import { formatAmount, formatCurrency } from "../../utils";
import { ExternalIcon } from "../Icons";
import {
  OverviewContainer,
  OverviewDescription,
  OverviewInfo,
  OverviewKPI,
  OverviewKPIContainer,
  OverviewLabel,
  OverviewTag,
  UnderlineLink,
} from "./styled";
import {VECHAIN_NETWORK, VEX_ADDRESS} from "../../constants";

export default function Overview() {
  const { tokensInfo } = useTokensInfo();
  const { poolData } = useFetchStakingPoolsData();
  const calculateTotalTvlUsd = useMemo(() => {
    let total = BigNumber.from(0);

    if (!poolData.length) return total;

    poolData.map((poolItem) => {
      total = total.add(poolItem.tvlInUsd);
    });

    return total;
  }, [poolData]);

  return (
    <OverviewContainer>
      <OverviewInfo>
        <OverviewTag>
          <Subtitle style={{ textTransform: "uppercase" }}>
            Turtlelabs Takeover ;)
          </Subtitle>
        </OverviewTag>

        <Title className="mt-3 w-100">Liquidity Mining Claim Module</Title>

        {/* Warning: do not create new stakes */}
        <div
          role="alert"
          aria-live="assertive"
          style={{
            marginTop: "12px",
            width: "100%",
            padding: "12px 16px",
            borderRadius: 8,
            border: "1px solid #a40000",
            background: "#ffe8e6",
          }}
        >
          <PrimaryText style={{ fontWeight: 800, textTransform: "uppercase", color: "#a40000" }}>
            DONT MAKE A NEW STAKE!
          </PrimaryText>
          <PrimaryText style={{ marginTop: 4, color: "#5c0000" }}>
            This tool is intended <strong>solely</strong> to unwind existing positions on the sunset Vexchange platform.
            New staking transactions are discouraged and not supported.
          </PrimaryText>
        </div>

        <OverviewDescription className="mt-3 w-100">
          As Vexchange is being sunset by the Vexchange team, TurtleLabs enables the community to withdraw
          outstanding stakes in a controlled manner. Note: this application currently works <strong>only</strong> with
          the <strong>Sync2 wallet</strong>. Functionality is provided on a best-effort basis; if you encounter issues,
          please report them in the TurtleLabs Discord.
        </OverviewDescription>
      </OverviewInfo>

      <OverviewKPIContainer>
        <OverviewKPI>
          <OverviewLabel>VEX Price</OverviewLabel>
          <Title>
            {tokensInfo === null ? "Loading..." : formatCurrency(tokensInfo[VEX_ADDRESS[VECHAIN_NETWORK]].usdPrice)}
          </Title>
        </OverviewKPI>
        <OverviewKPI>
          <OverviewLabel>Total Staked Value (USD)</OverviewLabel>
          <Title>
            {calculateTotalTvlUsd.gt(0)
              ? `$${formatAmount(utils.formatEther(calculateTotalTvlUsd))}`
              : "Loading..."}
          </Title>
        </OverviewKPI>
      </OverviewKPIContainer>
    </OverviewContainer>
  );
}
