import { Box, Flex, Heading } from "@chakra-ui/react";
import { useMemo } from "react";
import { RpsHand } from "../../../uiParts/RpsEmoji";
import { RoundResultCard } from "./RoundResultCard";

export type UserHand = {
  userName: string;
  hand: RpsHand;
};

type RoundSettledResultProps = {
  winnerList: string[];
  userHandList: UserHand[];
};

export default function RoundSettledResult(
  props: RoundSettledResultProps
): JSX.Element {
  const displayWinners = useMemo(
    () => props.winnerList.join(", "),
    [props.winnerList]
  );
  const isWinner = (userName: string) => props.winnerList.includes(userName);

  return (
    <Box my="4">
      {/* Heading */}
      <Flex flexDirection="row" alignItems="baseline" gap={4}>
        <Heading size="xl">🎉</Heading>
        <Heading size="lg" color="gray.700">
          勝ったのは
        </Heading>
        <Heading size="2xl" color="blue.500">
          {displayWinners}
        </Heading>
        <Heading size="xl">🎉</Heading>
      </Flex>

      {/* User Hand List */}
      <Flex my="8" gap={8} alignItems="center">
        {props.userHandList.map((userHand) => (
          <RoundResultCard
            key={userHand.userName}
            userName={userHand.userName}
            hand={userHand.hand}
            isWinner={isWinner(userHand.userName)}
          />
        ))}
      </Flex>
    </Box>
  );
}
