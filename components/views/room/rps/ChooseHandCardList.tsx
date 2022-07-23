import { Box, Flex, Heading } from "@chakra-ui/react";
import { RpsHand, RPS_HAND_TYPE_LIST } from "../../../uiParts/RpsEmoji";
import ChooseHandCard from "./ChooseHandCard";

type ChooseHandCardProps = {
  chosenHand?: RpsHand;
  chooseHand: (hand: RpsHand) => void;
};

export default function ChooseHandCardList(
  props: ChooseHandCardProps
): JSX.Element {
  return (
    <Box my="4">
      {/* Heading */}
      <Heading size="xl" my="4" textAlign="center" color="gray.700">
        どの手を出す？ 🤔
      </Heading>

      {/* Choose Rps Hand */}
      <Flex mt="6" mb="4" gap="12" alignItems="center">
        {RPS_HAND_TYPE_LIST.map((hand) => (
          <ChooseHandCard
            key={hand}
            hand={hand}
            chosenHand={props.chosenHand}
            chooseHand={props.chooseHand}
          />
        ))}
      </Flex>
    </Box>
  );
}
