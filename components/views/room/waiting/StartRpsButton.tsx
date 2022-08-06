import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";

type StartRpsProps = {
  userNameList: string[];
  disabled: boolean;
  onClick: () => void;
};

const MINIMUM_PLAYER_NUMBER = 2;

export default function StartRpsButton(props: StartRpsProps): JSX.Element {
  return (
    <Button
      rightIcon={<ArrowForwardIcon />}
      colorScheme="blue"
      size="lg"
      width="100%"
      disabled={
        props.userNameList.length < MINIMUM_PLAYER_NUMBER || props.disabled
      }
      onClick={props.onClick}
    >
      じゃんけんを始める
    </Button>
  );
}
