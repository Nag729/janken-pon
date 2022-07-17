import { useClickable } from "@chakra-ui/clickable";
import { Box, Button } from "@chakra-ui/react";
import { createEmojiFromHand, RpsHand } from "../../../uiParts/RpsEmoji";

type RpsHandCardProps = {
  hand: RpsHand;
  chooseHand: (hand: RpsHand) => void;
};

const Clickable = (props: any) => {
  const clickable = useClickable(props);
  return <Box {...clickable} />;
};

export default function RpsHandCard(props: RpsHandCardProps): JSX.Element {
  const fontSize = "120px";

  return (
    <Clickable
      bg="white"
      boxShadow="xl"
      rounded="xl"
      p="8"
      overflow="hidden"
      fontSize={fontSize}
      _hover={{
        cursor: "pointer",
        boxShadow: "md",
      }}
      onClick={() => props.chooseHand(props.hand)}
    >
      {createEmojiFromHand(props.hand)}
    </Clickable>
  );
}
