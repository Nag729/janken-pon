import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Input, Button } from "@chakra-ui/react";

type CreateRoomFormProps = {
  userName: string;
  setUserName: (userName: string) => void;
  createNewRoom: () => void;
};

export default function CreateRoomForm(
  props: CreateRoomFormProps
): JSX.Element {
  const hasUserName: boolean = !!props.userName.length;

  return (
    <Box w="100vw" display="flex" flexDirection="column" alignItems="center">
      {/* User Name Input */}
      <Box w="240px" my="2">
        <Input
          colorScheme="blue"
          placeholder="名前を入力"
          size="lg"
          textAlign="center"
          value={props.userName}
          onChange={(event) => props.setUserName(event.target.value)}
        />
      </Box>

      {/* TODO: 何人勝つかを入力できるようにする */}

      {/* Create Room Button */}
      <Box w="160px" mt="4">
        <Button
          rightIcon={<ArrowForwardIcon />}
          colorScheme="blue"
          size="lg"
          width="100%"
          disabled={!hasUserName}
          onClick={props.createNewRoom}
        >
          部屋をつくる
        </Button>
      </Box>
    </Box>
  );
}
