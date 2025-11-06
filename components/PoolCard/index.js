import { useCallback, useMemo } from "react";
import { Tooltip } from "react-tippy";
import { formatAmount, formatBigNumber } from "../../utils";
import { useAppContext } from "../../context/app";
import { useTransactions } from "../../context/transactions";
import {
  Subtitle,
  BaseIndicator,
  SecondaryText,
  TooltipContainer,
  PrimaryText,
} from "../../design";
import colors from "../../design/colors";
import useTextAnimation from "../../hooks/useTextAnimation";
import useTokenAllowance from "../../hooks/useTokenAllowance";
import CapBar from "../CapBar";
import Image from "next/image";
import HelpInfo from "../HelpInfo";
import {
  ButtonsContainer,
  ClaimableTokenAmount,
  ClaimableTokenPill,
  ClaimableTokenPillContainer,
  LogoContainer,
  PoolCardFooter,
  PoolCardFooterButton,
  PoolCardInfoContainer,
  PoolSubtitle,
  PoolTitle,
  Wrapper,
} from "./styled";
import { formatEther } from "ethers/lib/utils";

export default function PoolCard({
  stakingPoolData,
  vaultOption,
  setIsStakeAction,
  setShowApprovalModal,
  setShowClaimModal,
  setShowActionModal,
}) {
  const { transactions } = useTransactions();
  const { account, initAccount } = useAppContext();
  const { tokenAllowance } = useTokenAllowance(vaultOption);

  // TurtleLabs accent (subtle brand nod)
  const color = colors.orange; // keep existing theme wiring
  const turtleAccentGradient =
    "linear-gradient(90deg, rgba(0,229,160,1) 0%, rgba(0,179,255,1) 100%)";

  const currentStakeInUsd = useMemo(() => {
    if (
      !stakingPoolData.poolData.tvlInUsd ||
      stakingPoolData.poolData.tvlInUsd.eq(0) ||
      !stakingPoolData.userData.currentStake
    )
      return;

    return stakingPoolData.poolData.tvlInUsd
      .mul(stakingPoolData.userData.currentStake)
      .div(stakingPoolData.poolData.poolSize);
  }, [stakingPoolData]);

  const ongoingTransaction = useMemo(() => {
    const ongoingTx = (transactions || []).find(
      (currentTx) =>
        ["stakingApproval", "stake", "unstake", "rewardClaim"].includes(
          currentTx.type
        ) &&
        currentTx.stakeAsset === vaultOption.stakeAsset &&
        !currentTx.status
    );

    if (!ongoingTx) return undefined;
    return ongoingTx.type;
  }, [transactions, vaultOption?.stakeAsset]);

  const actionLoadingTextBase = useMemo(() => {
    switch (ongoingTransaction) {
      case "stake":
        return "Staking";
      case "stakingApproval":
        return "Approving";
      case "unstake":
        return "Unstaking";
      case "rewardClaim":
        return "Claiming";
      default:
        return "Loading";
    }
  }, [ongoingTransaction]);

  const renderUnstakeBalance = useCallback(() => {
    if (!account) return "---";
    return formatEther(stakingPoolData.userData.unstakedBalance);
  }, [account, stakingPoolData]);

  const primaryActionLoadingText = useTextAnimation(Boolean(ongoingTransaction), {
    texts: [
      actionLoadingTextBase,
      `${actionLoadingTextBase} .`,
      `${actionLoadingTextBase} ..`,
      `${actionLoadingTextBase} ...`,
    ],
    interval: 250,
  });

  const hasClaimable = useMemo(() => {
    try {
      const list = stakingPoolData?.userData?.claimableRewardTokens || [];
      return list.some((t) => {
        const key = Object.keys(t)[0];
        return key ? !t[key].isZero() : false;
      });
    } catch {
      return false;
    }
  }, [stakingPoolData]);

  const claimPill = useMemo(() => {
    return (
      <ClaimableTokenPillContainer
        onClick={() => {
          setShowClaimModal(true);
        }}
      >
        {stakingPoolData.userData.claimableRewardTokens.map(
          (claimableRewardToken) => {
            const name = Object.keys(claimableRewardToken)[0];
            const amount = claimableRewardToken[name];

            return (
              <ClaimableTokenPill
                key={name}
                color={color}
                style={{
                  border: "1px solid rgba(0,179,255,0.25)",
                  background:
                    "linear-gradient(180deg, rgba(0,229,160,0.10) 0%, rgba(0,179,255,0.10) 100%)",
                  backdropFilter: "blur(2px)",
                }}
              >
                <BaseIndicator
                  size={8}
                  color={color}
                  className="mr-2"
                  style={{ marginRight: "5px" }}
                />
                <Subtitle className="mr-2">{name} to claim</Subtitle>
                <ClaimableTokenAmount
                  color={color}
                  style={{ marginLeft: "8px" }}
                >
                  {account ? formatBigNumber(amount) : "---"}
                </ClaimableTokenAmount>
              </ClaimableTokenPill>
            );
          }
        )}
      </ClaimableTokenPillContainer>
    );
  }, [account, color, stakingPoolData, setShowClaimModal]);

  const stakingPoolButtons = useMemo(() => {
    if (!account) {
      return (
        <ButtonsContainer>
          <PoolCardFooterButton
            role="button"
            color={colors.orange}
            onClick={() => {
              initAccount();
            }}
            active={false}
          >
            CONNECT WALLET
          </PoolCardFooterButton>
        </ButtonsContainer>
      );
    }

    const showApprove = tokenAllowance.lt(
      stakingPoolData.userData.unstakedBalance
    );
    const showUnstake = stakingPoolData.userData.currentStake.gt(0);

    return (
      <ButtonsContainer>
        {/* APPROVE or STAKE */}
        {showApprove ? (
          <PoolCardFooterButton
            role="button"
            color={color}
            onClick={() => {
              setShowApprovalModal(true);
            }}
            active={ongoingTransaction === "stakingApproval"}
          >
            {ongoingTransaction === "stakingApproval"
              ? primaryActionLoadingText
              : "APPROVE"}
          </PoolCardFooterButton>
        ) : (
          <PoolCardFooterButton
            role="button"
            color={color}
            onClick={() => {
              setShowActionModal(true);
              setIsStakeAction(true);
            }}
            active={ongoingTransaction === "stake"}
          >
            {ongoingTransaction === "stake"
              ? primaryActionLoadingText
              : "DO NOT STAKE"}
          </PoolCardFooterButton>
        )}

        {/* CLAIM */}
        <PoolCardFooterButton
          role="button"
          color={color}
          onClick={() => {
            setShowClaimModal(true);
          }}
          active={ongoingTransaction === "rewardClaim"}
          hidden={!hasClaimable}
        >
          {ongoingTransaction === "rewardClaim"
            ? primaryActionLoadingText
            : hasClaimable
            ? "CLAIM"
            : "CLAIM INFO"}
        </PoolCardFooterButton>

        {/* UNSTAKE */}
        <PoolCardFooterButton
          role="button"
          color={color}
          onClick={() => {
            setShowActionModal(true);
            setIsStakeAction(false);
          }}
          active={ongoingTransaction === "unstake"}
          hidden={!showUnstake}
        >
          {ongoingTransaction === "unstake"
            ? primaryActionLoadingText
            : "UNSTAKE"}
        </PoolCardFooterButton>
      </ButtonsContainer>
    );
  }, [
    account,
    color,
    hasClaimable,
    ongoingTransaction,
    primaryActionLoadingText,
    setIsStakeAction,
    setShowActionModal,
    setShowApprovalModal,
    setShowClaimModal,
    stakingPoolData,
    tokenAllowance,
    initAccount,
  ]);

  return (
    <Wrapper color={color} style={{ position: "relative", overflow: "hidden" }}>
      {/* TurtleLabs accent bar */}
      <div
        style={{
          height: 3,
          width: "100%",
          background: turtleAccentGradient,
        }}
      />

      <div className="d-flex flex-wrap w-100 p-3">
        <div className="d-flex w-100 justify-content-between" style={{ gap: 12 }}>
          {/* Card Title */}
          <div className="d-flex align-items-center">
            <LogoContainer>
              <Image
                src={vaultOption.stakeAssetLogo}
                alt={vaultOption.stakeAsset}
                width={40}
                height={37}
              />
            </LogoContainer>
            <div className="d-flex flex-column">
              <div className="d-flex align-items-center">
                <PoolTitle>{vaultOption.stakeAsset}</PoolTitle>
                <Tooltip
                  interactive
                  position="top"
                  trigger="mouseenter"
                  html={
                    <TooltipContainer>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: vaultOption.description,
                        }}
                      />
                    </TooltipContainer>
                  }
                >
                  <HelpInfo aria-label="Vault information">i</HelpInfo>
                </Tooltip>
              </div>
              <PoolSubtitle>
                Your Unstaked Balance: {renderUnstakeBalance()}
              </PoolSubtitle>
            </div>
          </div>

          {/* TurtleLabs Takeover badge (brand wink) */}
          <div
            aria-label="TurtleLabs Takeover"
            title="TurtleLabs Takeover ;)"
            style={{
              alignSelf: "flex-start",
              padding: "6px 10px",
              borderRadius: 999,
              border: "1px solid rgba(0,179,255,0.35)",
              background:
                "linear-gradient(180deg, rgba(0,229,160,0.12) 0%, rgba(0,179,255,0.12) 100%)",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 0.3,
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              userSelect: "none",
              whiteSpace: "nowrap",
            }}
          >
            <span role="img" aria-hidden>
              🐢
            </span>
            <PrimaryText style={{ margin: 0 }}>TurtleLabs Takeover ;)</PrimaryText>
          </div>
        </div>

        {/* Pool info */}
        <PoolCardInfoContainer color={color} style={{ marginTop: 8 }}>
          <span>Est. APR:</span>
          <strong>
            {stakingPoolData.poolData.farmEndTimestamp ? (
              Math.floor(Date.now() / 1000) >
              stakingPoolData.poolData.farmEndTimestamp ? (
                "0.00%"
              ) : (
                stakingPoolData.poolData.apr &&
                `${formatAmount(formatEther(stakingPoolData.poolData.apr))}%`
              )
            ) : (
              "Loading..."
            )}
          </strong>
        </PoolCardInfoContainer>

        {/* Claimable Pill */}
        {claimPill}

        <div className="w-100 mt-4">
          <CapBar
            current={currentStakeInUsd}
            cap={stakingPoolData.poolData.tvlInUsd}
            copies={{
              current: "Your Current Stake",
              cap: "Pool Size",
            }}
            labelConfig={{
              fontSize: 14,
            }}
            statsConfig={{
              fontSize: 14,
            }}
            barConfig={{
              height: 8,
              extraClassNames: "my-2",
              radius: 2,
              // subtle brand accent on the bar via class override is handled in styled, keep config minimal
            }}
            vaultOption={vaultOption}
            stakingPoolData={stakingPoolData}
            account={account}
          />
        </div>

       
      </div>

      <PoolCardFooter>{stakingPoolButtons}</PoolCardFooter>
    </Wrapper>
  );
}
