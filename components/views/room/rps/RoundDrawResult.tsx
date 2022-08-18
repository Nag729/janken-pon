import { Box, Flex, Heading } from "@chakra-ui/react";
import { RpsHand } from "../../../uiParts/RpsEmoji";
import { RoundResultCard } from "./RoundResultCard";

export type UserHand = {
  userName: string;
  hand: RpsHand;
};

type RoundDrawResultProps = {
  userNameList: string[];
  userHandList: UserHand[];
  winnerList: string[];
  loserList: string[];
};

export default function RoundDrawResult({
  userNameList,
  userHandList,
  winnerList,
  loserList,
}: RoundDrawResultProps): JSX.Element {
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
      <Heading as="h2" size="2xl" color="gray.700" textAlign="center">
        あいこ！
      </Heading>

      {/* User Hand List */}
      <Flex
        my="8"
        gap={8}
        alignItems="center"
        justifyContent="center"
        flexWrap="wrap"
      >
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
