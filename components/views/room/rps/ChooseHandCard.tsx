import { useClickable } from "@chakra-ui/clickable";
import { Box } from "@chakra-ui/react";
import { createEmojiFromHand, RpsHand } from "../../../uiParts/RpsEmoji";

type ChooseHandCardProps = {
  hand: RpsHand;
  chosenHand?: RpsHand;
  chooseHand: (hand: RpsHand) => void;
};

const Clickable = (props: any) => {
  const clickable = useClickable(props);
  return <Box {...clickable} />;
};

export default function ChooseHandCard(
  props: ChooseHandCardProps
): JSX.Element {
  const disabledBaseStyle = {
    pointerEvents: "none",
  };
  const disabledStyle =
    props.hand === props.chosenHand
      ? {
          ...disabledBaseStyle,
          bg: "blue.600",
        }
      : {
          ...disabledBaseStyle,
          opacity: 0.4,
        };

  return (
    <Clickable
      as="div"
      bg="white"
      boxShadow="xl"
      rounded="xl"
      p="8"
      fontSize="120px"
      disabled={props.chosenHand !== undefined}
      onClick={() => props.chooseHand(props.hand)}
      _hover={{ cursor: "pointer", boxShadow: "md" }}
      _disabled={disabledStyle}
    >
      {createEmojiFromHand(props.hand)}
    </Clickable>
  );
}
