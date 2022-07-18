import { Box, Flex, Heading } from "@chakra-ui/react";

// ref: https://zenn.dev/knjname/articles/20210105tryoutchakraui
export default function TheHeader(): JSX.Element {
  return (
    <Flex
      as="header"
      position="fixed"
      top={0}
      width="full"
      bg="white"
      shadow="md"
      py={4}
      px={8}
      zIndex={9}
    >
      <Box>
        <Heading size="lg" color="gray.700">
          ✌️ Janken Pon
        </Heading>
      </Box>
    </Flex>
  );
}
