import { Box, Flex } from "@chakra-ui/react";
import { createEmojiFromHand, RpsHand } from "../../../uiParts/RpsEmoji";

type RoundRoundCardProps = {
  userName: string;
  hand: RpsHand;
  isDraw?: boolean;
  isWinner?: boolean;
};

export const RoundResultCard = (props: RoundRoundCardProps) => {
  const calcCardProps = ({ isDraw, isWinner }: RoundRoundCardProps) => {
    if (!!isDraw) {
      // Draw
      return { bg: "white", color: "gray.700", opacity: 1 };
    }

    if (!!isWinner) {
      // Winner
      return { bg: "blue.600", color: "white", opacity: 1 };
    }

    // Loser
    return { bg: "white", color: "gray.500", opacity: 0.6 };
  };
  const { bg, color, opacity } = calcCardProps(props);

  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      w="180px"
      h="240px"
      bg={bg}
      opacity={opacity}
      boxShadow="xl"
      rounded="xl"
      py="8"
      px="4"
    >
      <Box fontSize="24px" color={color}>
        {props.userName}
      </Box>
      <Box fontSize="120px">{createEmojiFromHand(props.hand)}</Box>
    </Flex>
  );
};
