import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Button } from "@chakra-ui/react";

type StartRpsProps = {
  userNameList: string[];
  disabled: boolean;
  onClick: () => void;
};

const MINIMUM_PLAYER_NUMBER = 2;

export default function StartRpsButton(props: StartRpsProps): JSX.Element {
  return (
    <Box w="320px" mt="10">
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
        このメンバーではじめる
      </Button>
    </Box>
  );
}
