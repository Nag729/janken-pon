import { Flex, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";

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
      gap="4"
    >
      <Text color="white">
        ©️{" "}
        <Link color="teal.200" href="https://github.com/Nag729" isExternal>
          Nag729 😎
        </Link>
      </Text>
      <Text color="white">|</Text>
      <NextLink href="/about" passHref>
        <Link color="teal.200">Janken Pon について</Link>
      </NextLink>
    </Flex>
  );
}
