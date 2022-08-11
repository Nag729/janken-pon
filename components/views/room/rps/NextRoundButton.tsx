import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Button, Flex } from "@chakra-ui/react";

type NextRoundButtonProps = {
  isDisabled: boolean;
  onClick: () => void;
};

export default function NextRoundButton(
  props: NextRoundButtonProps
): JSX.Element {
  return (
    <Flex alignItems="center" justifyContent="center">
      <Button
        rightIcon={<ArrowForwardIcon />}
        colorScheme="blue"
        size="lg"
        disabled={props.isDisabled}
        onClick={props.onClick}
      >
        次のラウンドへ
      </Button>
    </Flex>
  );
}
