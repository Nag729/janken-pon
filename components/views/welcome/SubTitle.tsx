import { Heading } from "@chakra-ui/react";
import { Fragment } from "react";

type SubTitleProps = {};

export default function SubTitle(_: SubTitleProps): JSX.Element {
  return (
    <Fragment>
      <Heading
        as="h2"
        size="lg"
        my="2"
        textAlign="center"
        color="blue.400"
        letterSpacing="0.4rem"
      >
        オンラインで
      </Heading>
      <Heading
        as="h2"
        size="lg"
        my="2"
        textAlign="center"
        color="blue.400"
        letterSpacing="0.4rem"
      >
        じゃんけんしよう！
      </Heading>
    </Fragment>
  );
}
