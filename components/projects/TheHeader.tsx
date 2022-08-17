import { Box, Flex, Heading, Link } from "@chakra-ui/react";

// ref: https://zenn.dev/knjname/articles/20210105tryoutchakraui
export default function TheHeader(): JSX.Element {
  return (
    <Flex
      as="header"
      position="fixed"
      top={0}
      w="100vw"
      bg="white"
      shadow="md"
      py={4}
      px={8}
      zIndex={9}
    >
      <Box>
        <Heading as="h1" size="lg" color="gray.700">
          <Link href="/" style={{ textDecoration: "none" }}>
            ✌️ Janken Pon!
          </Link>
        </Heading>
      </Box>
    </Flex>
  );
}
