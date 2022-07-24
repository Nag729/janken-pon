import { CopyIcon } from "@chakra-ui/icons";
import { Box, Button, Heading } from "@chakra-ui/react";

type ShareLinkProps = {
  onCopy: () => void;
};

export default function ShareLink(props: ShareLinkProps): JSX.Element {
  return (
    <Box
      my="12"
      display="flex"
      flexDirection="column"
      gap="6"
      alignItems="center"
    >
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
    </Box>
  );
}
