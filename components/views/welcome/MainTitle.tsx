import { Heading } from "@chakra-ui/react";

type MainTitleProps = {};

export default function MainTitle(_: MainTitleProps): JSX.Element {
  return (
    <Heading size="4xl" textAlign="center" color="gray.700">
      Janken Pon !
    </Heading>
  );
}
