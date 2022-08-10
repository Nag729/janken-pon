import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Button, Tooltip } from "@chakra-ui/react";

type StartRpsProps = {
  userNameList: string[];
  isHost: boolean;
  onClick: () => void;
};

const MINIMUM_PLAYER_NUMBER = 2;

export default function StartRpsButton(props: StartRpsProps): JSX.Element {
  return (
    <Tooltip
      label="ホストに委ねましょう 🙏"
      hasArrow
      shouldWrapChildren
      mt="6"
      isDisabled={props.isHost}
    >
      <Button
        rightIcon={<ArrowForwardIcon />}
        colorScheme="blue"
        size="lg"
        width="100%"
        disabled={
          props.userNameList.length < MINIMUM_PLAYER_NUMBER || !props.isHost
        }
        onClick={props.onClick}
      >
        じゃんけんを始める
      </Button>
    </Tooltip>
  );
}
