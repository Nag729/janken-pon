import { Box, Flex, Heading } from "@chakra-ui/react";

type AlreadyFinishedMessageProps = {
  isWin: boolean;
};

export default function AlreadyFinishedMessage(
  props: AlreadyFinishedMessageProps
): JSX.Element {
  const color = props.isWin ? `green.500` : `red.400`;

  return (
    <Box>
      <Flex flexDirection="row" gap="4" alignItems="baseline">
        <Heading size="lg" textAlign="center" color={color}>
          あなたは
        </Heading>
        <Heading size="2xl" textAlign="center" color={color}>
          {props.isWin ? `勝ち` : `負け`}
        </Heading>
        <Heading size="lg" textAlign="center" color={color}>
          が決定しています{` `}
          {props.isWin ? `😎` : `🥲`}
        </Heading>
      </Flex>

      <Heading size="lg" mt="6" textAlign="center" color={color}>
        決着がつくまで待ちましょう 🙏
      </Heading>
    </Box>
  );
}
