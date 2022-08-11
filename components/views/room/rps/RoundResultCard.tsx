import { Box, Flex } from "@chakra-ui/react";
import { createEmojiFromHand, RpsHand } from "../../../uiParts/RpsEmoji";

type RoundRoundCardProps = {
  userName: string;
  hand: RpsHand;
  isDraw?: boolean;
  isWinner?: boolean;
};

export const RoundResultCard = (props: RoundRoundCardProps) => {
  const calculateCardProps = ({ isDraw, isWinner }: RoundRoundCardProps) => {
    if (!!isDraw) return { bg: "white", color: "gray.700", opacity: 1 };
    if (!!isWinner) return { bg: "blue.600", color: "white", opacity: 1 };
    return { bg: "white", color: "gray.500", opacity: 0.6 }; // Loser
  };
  const { bg, color, opacity } = calculateCardProps(props);

  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      w="180px"
      h="256px"
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
