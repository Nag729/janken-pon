import { Box, Heading } from "@chakra-ui/react";

type SubTitleProps = {};

export default function SubTitle(_: SubTitleProps): JSX.Element {
  return (
    <Box my="4">
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
    </Box>
  );
}
