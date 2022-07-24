import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Input, Button, Heading, Flex } from "@chakra-ui/react";

type JoinRoomFormProps = {
  userName: string;
  setUserName: (userName: string) => void;
  joinRoom: () => void;
};

export default function JoinRoomForm(props: JoinRoomFormProps): JSX.Element {
  const hasUserName: boolean = !!props.userName.length;

  return (
    <Box my="4">
      {/* Heading */}
      <Heading size="xl" my="4" textAlign="center" color="gray.700">
        あなたの名前は？ 👀
      </Heading>

      <Flex w="100vw" my="2" flexDirection="column" alignItems="center">
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

        {/* Join Room Button */}
        <Box w="160px" mt="8">
          <Button
            rightIcon={<ArrowForwardIcon />}
            colorScheme="blue"
            size="lg"
            width="100%"
            disabled={!hasUserName}
            onClick={props.joinRoom}
          >
            参加する
          </Button>
        </Box>
      </Flex>
    </Box>
  );
}
