import { Box, Flex, Heading } from "@chakra-ui/react";
import { RpsHand } from "../../../uiParts/RpsEmoji";
import { RoundResultCard } from "./RoundResultCard";

export type UserHand = {
  userName: string;
  hand: RpsHand;
};

type RoundCompleteResultProps = {
  userNameList: string[];
  userHandList: UserHand[];
  winnerList: string[];
  loserList: string[];
};

export default function RoundCompleteResult({
  userNameList,
  userHandList,
  winnerList,
  loserList,
}: RoundCompleteResultProps): JSX.Element {
  const winOrLose = (userName: string): `win` | `lose` | undefined => {
    if (winnerList.includes(userName)) return `win`;
    if (loserList.includes(userName)) return `lose`;
    return undefined;
  };
  const findRpsHand = (userName: string): RpsHand | undefined => {
    return userHandList.find(({ userName: name }) => name === userName)?.hand;
  };

  return (
    <Box my="4">
      {/* Heading */}
      <Flex my="8" alignItems="center" justifyContent="center">
        <Heading size="lg" color="gray.700">
          決着がついた！
        </Heading>
      </Flex>

      <Flex
        flexDirection="row"
        alignItems="baseline"
        justifyContent="center"
        gap={4}
      >
        <Heading size="xl">🎉</Heading>
        <Heading size="lg" color="gray.700">
          勝ったのは
        </Heading>
        <Heading size="2xl" color="blue.500">
          {winnerList.join(", ")}
        </Heading>
        <Heading size="xl">🎉</Heading>
      </Flex>

      {/* User Hand List */}
      <Flex my="8" gap={8} alignItems="center">
        {userNameList.map((userName) => (
          <RoundResultCard
            key={userName}
            userName={userName}
            hand={findRpsHand(userName)}
            winOrLose={winOrLose(userName)}
          />
        ))}
      </Flex>
    </Box>
  );
}
