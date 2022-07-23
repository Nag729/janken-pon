import { Box, Flex } from "@chakra-ui/react";
import { createEmojiFromHand, RpsHand } from "../../../uiParts/RpsEmoji";

type RoundResultHandCardProps = {
  userName: string;
  hand: RpsHand;
  isWinner: boolean;
};

export const RoundResultHandCard = (props: RoundResultHandCardProps) => {
  const bg = props.isWinner ? "blue.600" : "white";
  const color = props.isWinner ? "white" : "gray.500";
  const opacity = props.isWinner ? 1 : 0.6;
  const bold = props.isWinner ? true : false;

  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      w="160px"
      bg={bg}
      opacity={opacity}
      boxShadow="xl"
      rounded="xl"
      p="4"
      overflow="hidden"
    >
      <Box fontSize="40px" color={color} bold={bold}>
        {props.userName}
      </Box>
      <Box fontSize="100px">{createEmojiFromHand(props.hand)}</Box>
    </Flex>
  );
};
