import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Input, Button, Flex } from "@chakra-ui/react";

type CreateRoomFormProps = {
  userName: string;
  setUserName: (userName: string) => void;
  createNewRoom: () => void;
};

export default function CreateRoomForm(
  props: CreateRoomFormProps
): JSX.Element {
  const hasUserName: boolean = !!props.userName.length;

  const pressEnterToCreateNewRoom = (
    ev: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (ev.nativeEvent.isComposing || ev.key !== `Enter`) return;
    props.createNewRoom();
  };

  return (
    <Flex flexDirection="column" alignItems="center">
      {/* User Name Input */}
      <Box>
        <Input
          colorScheme="blue"
          placeholder="名前を入力"
          size="lg"
          textAlign="center"
          value={props.userName}
          onChange={(event) => props.setUserName(event.target.value)}
          onKeyDown={pressEnterToCreateNewRoom}
        />
      </Box>

      {/* Create Room Button */}
      <Box mt="6">
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
    </Flex>
  );
}
