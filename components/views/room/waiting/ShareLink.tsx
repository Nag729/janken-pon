import { CopyIcon } from "@chakra-ui/icons";
import { Box, Heading, Input, IconButton } from "@chakra-ui/react";

type ShareLinkProps = {
  url: string;
  onCopy: () => void;
};

export default function ShareLink(props: ShareLinkProps): JSX.Element {
  return (
    <Box my="4">
      {/* Heading */}
      <Heading size="xl" my="4" textAlign="center" color="gray.700">
        参加者にリンクを共有しよう 🙌
      </Heading>

      {/* Link for Copy */}
      <Box mt="6" mb="4" display="flex" gap="4" alignItems="center">
        <Input
          w="680px"
          size="lg"
          fontWeight="bold"
          color="gray.500"
          value={props.url}
          readOnly
          textAlign="center"
        />
        <IconButton
          colorScheme="blue"
          size="lg"
          aria-label="Copy"
          icon={<CopyIcon />}
          onClick={props.onCopy}
        ></IconButton>
      </Box>
    </Box>
  );
}
