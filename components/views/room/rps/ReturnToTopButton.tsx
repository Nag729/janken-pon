import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Flex, Button } from "@chakra-ui/react";

type ReturnToTopButtonProps = {
  onClick: () => void;
};

export default function ReturnToTopButton(
  props: ReturnToTopButtonProps
): JSX.Element {
  return (
    <Flex alignItems="center" justifyContent="center">
      <Button
        rightIcon={<ArrowForwardIcon />}
        colorScheme="blue"
        variant="outline"
        size="lg"
        onClick={props.onClick}
      >
        トップにもどる
      </Button>
    </Flex>
  );
}
