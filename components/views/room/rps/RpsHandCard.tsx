import { useClickable } from "@chakra-ui/clickable";
import { Box } from "@chakra-ui/react";
import { createEmojiFromHand, RpsHand } from "../../../uiParts/RpsEmoji";

type RpsHandCardProps = {
  hand: RpsHand;
  chosenHand?: RpsHand;
  chooseHand: (hand: RpsHand) => void;
};

const Clickable = (props: any) => {
  const clickable = useClickable(props);
  return <Box {...clickable} />;
};

export default function RpsHandCard(props: RpsHandCardProps): JSX.Element {
  const fontSize = "120px";
  const disabledCommonStyle = {
    pointerEvents: "none",
  };

  const disabledStyle =
    props.hand === props.chosenHand
      ? {
          ...disabledCommonStyle,
          bg: "blue.600",
        }
      : {
          ...disabledCommonStyle,
          opacity: 0.4,
        };

  return (
    <Clickable
      as="div"
      bg="white"
      boxShadow="xl"
      rounded="xl"
      p="8"
      overflow="hidden"
      fontSize={fontSize}
      disabled={props.chosenHand !== undefined}
      onClick={() => props.chooseHand(props.hand)}
      _hover={{
        cursor: "pointer",
        boxShadow: "md",
      }}
      _disabled={disabledStyle}
    >
      {createEmojiFromHand(props.hand)}
    </Clickable>
  );
}
