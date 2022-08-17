import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Input, Button, Heading, Flex } from "@chakra-ui/react";

type JoinRoomFormProps = {
  userName: string;
  setUserName: (userName: string) => void;
  joinRoom: () => void;
};

export default function JoinRoomForm(props: JoinRoomFormProps): JSX.Element {
  const hasUserName: boolean = !!props.userName.length;

  const pressEnterToJoin = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    if (ev.nativeEvent.isComposing || ev.key !== `Enter`) return;
    props.joinRoom();
  };

  return (
    <Box>
      {/* Sub Heading */}
      <Heading
        as="h2"
        size="lg"
        textAlign="center"
        color="blue.400"
        letterSpacing="0.2rem"
      >
        招待された部屋に参加しよう 🙌
      </Heading>

      <Flex mt="12" flexDirection="column" alignItems="center">
        {/* User Name Input */}
        <Box>
          <Input
            colorScheme="blue"
            placeholder="名前を入力"
            size="lg"
            textAlign="center"
            value={props.userName}
            onChange={(event) => props.setUserName(event.target.value)}
            onKeyDown={pressEnterToJoin}
          />
        </Box>

        {/* Join Room Button */}
        <Box mt="6">
          <Button
            rightIcon={<ArrowForwardIcon />}
            colorScheme="blue"
            size="lg"
            width="100%"
            disabled={!hasUserName}
            onClick={props.joinRoom}
          >
            じゃんけんに参加
          </Button>
        </Box>
      </Flex>
    </Box>
  );
}
