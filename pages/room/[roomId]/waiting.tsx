import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Button, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import ParticipantsList from "../../../components/views/room/waiting/ParticipantsList";
import ShareLink from "../../../components/views/room/waiting/ShareLink";
import { copyToClipboard } from "../../../helpers/copy-to-clipboard";
import { useUserName } from "../../../hooks/useName";
import { useSocket } from "../../../hooks/useSocket";
import styles from "../../../styles/Home.module.css";

const MINIMUM_PLAYER_NUMBER = 2;

const Room = () => {
  const router = useRouter();
  const toast = useToast();

  const { roomId } = router.query;
  const url = `localhost:3000/${process.env.NEXT_PUBLIC_ROOM_PAGE_URL}/${roomId}/waiting`; // FIXME:
  // const url = `${process.env.NEXT_PUBLIC_DOMAIN}${process.env.NEXT_PUBLIC_ROOM_PAGE_URL}/${roomId}/waiting`;

  const { userName, loading } = useUserName();
  const [userNameList, setUserNameList] = React.useState<string[]>([]);

  const socket = useSocket(
    process.env.NEXT_PUBLIC_SOCKET_URL || `http://localhost:3001`
  );

  useEffect(() => {
    if (loading || !roomId || !socket) return;
    // NOTE: Join to the room.
    socket.emit(`join`, { userName, roomId });
  }, [loading, roomId, socket]);

  useEffect(() => {
    if (!socket) return;

    socket.on(`update-user-name-list`, (userNameList: string[]) => {
      setUserNameList([...userNameList]);
    });
  }, [socket]);

  const copyUrl = async () => {
    await copyToClipboard(url);

    toast({
      title: `URL をコピーしました`,
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
        {/* TODO: 後からリンクで入ってきた人向けのフォームをつくる */}
        {/* TODO: GameMaster かどうかはサーバー側で判断する */}

        {/* Share Link */}
        <ShareLink url={url} onCopy={copyUrl} />

        {/* Participants List */}
        <ParticipantsList userNameList={userNameList} />

        {/* Janken Start Button */}
        <Box w="320px" mt="10">
          <Button
            rightIcon={<ArrowForwardIcon />}
            colorScheme="blue"
            size="lg"
            width="100%"
            disabled={userNameList.length < MINIMUM_PLAYER_NUMBER}
            onClick={startRps}
          >
            このメンバーではじめる
          </Button>
        </Box>
      </main>
    </section>
  );
};

export default Room;
