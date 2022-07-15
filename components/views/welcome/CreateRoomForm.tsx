import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Input, Button } from "@chakra-ui/react";

type CreateRoomFormProps = {
  name: string;
  setName: (name: string) => void;
  createNewRoom: () => void;
};

export default function CreateRoomForm(
  props: CreateRoomFormProps
): JSX.Element {
  const hasName: boolean = !!props.name.length;

  return (
    <Box
      w="100vw"
      my="4"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Box w="320px" my="2">
        <Input
          colorScheme="blue"
          placeholder="ニックネームを入力"
          size="lg"
          textAlign="center"
          value={props.name}
          onChange={(event) => props.setName(event.target.value)}
        />
      </Box>
      <Box w="160px" mt="6">
        <Button
          rightIcon={<ArrowForwardIcon />}
          colorScheme="blue"
          size="lg"
          width="100%"
          disabled={!hasName}
          onClick={props.createNewRoom}
        >
          部屋をつくる
        </Button>
      </Box>
    </Box>
  );
}
