import { Flex, Link, Text } from "@chakra-ui/react";

// TODO: Footer の位置を修正する
export default function TheFooter(): JSX.Element {
  return (
    <Flex
      as="footer"
      position="absolute"
      bottom={0}
      left={0}
      mt={4}
      w="100vw"
      h="80px"
      justifyContent="center"
      alignItems="center"
      bg="#2D3748"
    >
      <Text color="white">
        Created by{" "}
        <Link color="teal.200" href="https://github.com/Nag729" isExternal>
          Nag729 😎
        </Link>
      </Text>
    </Flex>
  );
}
