import { Flex, Link, Text } from "@chakra-ui/react";

export default function TheFooter(): JSX.Element {
  return (
    <Flex
      as="footer"
      mt="auto"
      w="100vw"
      h="64px"
      justifyContent="center"
      alignItems="center"
      bg="#2D3748"
      fontFamily="mono"
    >
      <Text color="white">
        Created by{" "}
        <Link color="teal.200" href="https://github.com/Nag729" isExternal>
          Nag729
        </Link>{" "}
        😎
      </Text>
    </Flex>
  );
}
