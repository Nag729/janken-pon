import { Box, Heading } from "@chakra-ui/react";
import { RpsHand, RPS_HAND_TYPE_LIST } from "../../../uiParts/RpsEmoji";
import RpsHandCard from "./RpsHandCard";

type ChooseRpsHandProps = {
  chooseHand: (hand: RpsHand) => void;
};

export default function ChooseRpsHand(props: ChooseRpsHandProps): JSX.Element {
  return (
    <Box my="4">
      {/* Heading */}
      <Heading size="xl" my="4" textAlign="center" color="gray.700">
        どの手を出す？ 🤔
      </Heading>

      {/* Choose Rps Hand */}
      <Box mt="6" mb="4" display="flex" gap="12" alignItems="center">
        {RPS_HAND_TYPE_LIST.map((hand) => (
          <RpsHandCard key={hand} hand={hand} chooseHand={props.chooseHand} />
        ))}
      </Box>
    </Box>
  );
}
