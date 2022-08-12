import { Box, Flex } from "@chakra-ui/react";
import { createEmojiFromHand, RpsHand } from "../../../uiParts/RpsEmoji";

type RoundRoundCardProps = {
  userName: string;
  hand?: RpsHand;
  winOrLose?: `win` | `lose`;
};

export const RoundResultCard = (props: RoundRoundCardProps) => {
  const calculateCardProps = (winOrLose?: `win` | `lose`) => {
    if (winOrLose === `win`)
      return { bg: "blue.600", color: "white", opacity: 1 };
    if (winOrLose === `lose`)
      return { bg: "white", color: "gray.500", opacity: 0.6 };
    return { bg: "white", color: "gray.700", opacity: 1 };
  };
  const { bg, color, opacity } = calculateCardProps(props.winOrLose);

  const createEmoji = (hand?: RpsHand, winOrLose?: `win` | `lose`) => {
    if (!!hand) return createEmojiFromHand(hand);
    if (winOrLose === `win`) return `🏆`;
    if (winOrLose === `lose`) return `🥲`;
    return `🤔`;
  };
  const emoji = createEmoji(props.hand, props.winOrLose);

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
      <Box fontSize="120px">{emoji}</Box>
    </Flex>
  );
};
