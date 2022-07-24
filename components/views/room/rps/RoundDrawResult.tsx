import { Box, Flex, Heading } from "@chakra-ui/react";
import { RpsHand } from "../../../uiParts/RpsEmoji";
import { RoundResultCard } from "./RoundResultCard";

export type UserHand = {
  userName: string;
  hand: RpsHand;
};

type RoundDrawResultProps = {
  userHandList: UserHand[];
};

export default function RoundDrawResult(
  props: RoundDrawResultProps
): JSX.Element {
  return (
    <Box my="4">
      {/* Heading */}
      <Heading size="2xl" color="gray.700" textAlign="center">
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
        {props.userHandList.map((userHand) => (
          <RoundResultCard
            key={userHand.userName}
            userName={userHand.userName}
            hand={userHand.hand}
            isDraw={true}
          />
        ))}
      </Flex>
    </Box>
  );
}
