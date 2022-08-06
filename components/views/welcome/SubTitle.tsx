import { Heading } from "@chakra-ui/react";
import { Fragment } from "react";

type SubTitleProps = {};

export default function SubTitle(_: SubTitleProps): JSX.Element {
  return (
    <Fragment>
      <Heading
        size="lg"
        my="2"
        textAlign="center"
        color="blue.400"
        letterSpacing="0.5rem"
      >
        オンラインで
      </Heading>
      <Heading
        size="lg"
        my="2"
        textAlign="center"
        color="blue.400"
        letterSpacing="0.5rem"
      >
        じゃんけんしよう
      </Heading>
    </Fragment>
  );
}
