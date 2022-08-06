import { CopyIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";

type ShareLinkProps = {
  onCopy: () => void;
};

export default function ShareLink(props: ShareLinkProps): JSX.Element {
  return (
    <Flex flexDirection="column" alignItems="center" gap="6">
      {/* Heading */}
      <Heading size="xl" textAlign="center" color="gray.700">
        リンクを共有しよう 🙌
      </Heading>

      {/* Link for Copy */}
      <Box>
        <Button
          rightIcon={<CopyIcon />}
          colorScheme="blue"
          variant="outline"
          size="lg"
          width="100%"
          aria-label="Copy"
          onClick={props.onCopy}
        >
          共有リンクをコピー
        </Button>
      </Box>
    </Flex>
  );
}
