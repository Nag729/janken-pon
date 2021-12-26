import { ArrowForwardIcon, CopyIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Heading,
  IconButton,
  Input,
  useToast,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { copyToClipboard } from "../../helpers/copy-to-clipboard";
import { useName } from "../../hooks/useName";
import { useSocket } from "../../hooks/useSocket";
import styles from "../../styles/Home.module.css";

const ParticipantBadge = dynamic(
  () => import("../../components/uiParts/ParticipantBadge"),
  {
    ssr: false,
  }
);

const Room = () => {
  const router = useRouter();
  const toast = useToast();

  const { roomId } = router.query;
  const url = `${process.env.NEXT_PUBLIC_DOMAIN}${process.env.NEXT_PUBLIC_ROOM_PAGE_URL}/${roomId}`;

  const { name, loading } = useName();
  const [nameList, setNameList] = React.useState<string[]>([]);

  const socket = useSocket(
    process.env.NEXT_PUBLIC_SOCKET_URL || `http://localhost:3001`
  );

  useEffect(() => {
    if (loading || !socket) return;

    // NOTE: Join to the room.
    // TODO: uuid を渡して room ごとに data を保持する
    // TODO: 部屋を立てたホストかリンクからの参加者かをどう判断するか？ -> Router の遷移元を見るのがいいかも
    socket.emit(`join`, name);
  }, [loading, socket]);

  useEffect(() => {
    if (!socket) return;

    // socket.on(`connect`, () => {
    //   console.log(`SOCKET CONNECTED! 🎉`);
    // });

    socket.on(`update-name-list`, (nameList: string[]) => {
      setNameList([...nameList]);
    });
  }, [socket]);

  const copyUrl = async () => {
    await copyToClipboard(url);

    toast({
      title: `URL is copied.`,
      status: `success`,
      duration: 1500,
      isClosable: true,
    });
  };

  const startRps = () => {
    alert(`じゃんけんを始める`);

    // TODO:
  };

  return (
    <section className={styles.container}>
      <main className={styles.main}>
        <Box my="4">
          {/* Heading */}
          <Heading size="xl" my="4" textAlign="center" color="gray.700">
            参加者にリンクを共有しよう 🙌
          </Heading>

          {/* Link for Copy */}
          <Box mt="6" mb="4" display="flex" gap="4" alignItems="center">
            <Input
              w="640px"
              size="lg"
              fontWeight="bold"
              color="gray.500"
              value={url}
              readOnly
              textAlign="center"
            />
            <IconButton
              colorScheme="blue"
              size="lg"
              aria-label="Copy"
              icon={<CopyIcon />}
              onClick={copyUrl}
            ></IconButton>
          </Box>
        </Box>

        <Box my="4">
          {/* Heading */}
          <Heading size="xl" my="4" textAlign="center" color="gray.700">
            ただいまの参加者 👀
          </Heading>

          {/* Participants Badge */}
          <Box my="4" display="flex" gap="4" alignItems="center">
            {nameList.map((name) => (
              <ParticipantBadge key={name} name={name} />
            ))}
          </Box>

          {/* Start Button */}
          <Box w="320px" mt="6">
            <Button
              rightIcon={<ArrowForwardIcon />}
              colorScheme="blue"
              size="lg"
              width="100%"
              disabled={nameList.length <= 1}
              onClick={startRps}
            >
              このメンバーではじめる
            </Button>
          </Box>
        </Box>
      </main>
    </section>
  );
};

export default Room;
