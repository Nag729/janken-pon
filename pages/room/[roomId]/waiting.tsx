import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Button, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import ParticipantsList from "../../../components/views/room/waiting/ParticipantsList";
import ShareLink from "../../../components/views/room/waiting/ShareLink";
import { IsHostContext } from "../../../context/isHostContext";
import { copyToClipboard } from "../../../helpers/copy-to-clipboard";
import { useUserName } from "../../../hooks/useName";
import { useSocket } from "../../../hooks/useSocket";
import styles from "../../../styles/Home.module.css";

const MINIMUM_PLAYER_NUMBER = 2;

const Room = () => {
  const router = useRouter();
  const toast = useToast();

  const { roomId } = router.query as { roomId: string };
  const ROOM_URL = `localhost:3000/${process.env.NEXT_PUBLIC_ROOM_PAGE_URL}/${roomId}/waiting`; // FIXME:
  // const ROOM_URL = `${process.env.NEXT_PUBLIC_DOMAIN}${process.env.NEXT_PUBLIC_ROOM_PAGE_URL}/${roomId}/waiting`;

  const { state } = React.useContext(IsHostContext);
  const { userName, loadingUser } = useUserName();
  const [userNameList, setUserNameList] = React.useState<string[]>([]);
  const socket = useSocket();

  useEffect(() => {
    // TODO: すぐに参加するのをやめる
    if (loadingUser || !router.isReady || !socket) return;
    // NOTE: Join to the room.
    socket.emit(`join-room`, { roomId, userName });
  }, [loadingUser, roomId, router, socket]);

  useEffect(() => {
    if (!socket) return;
    // NOTE: update user-name list.
    socket.on(`update-user-name-list`, (props: { userNameList: string[] }) => {
      setUserNameList([...props.userNameList]);
    });
  }, [socket]);

  const copyUrl = async () => {
    await copyToClipboard(ROOM_URL);

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
        <h4>isHost: {!!state.isHost ? `true` : `false`}</h4>

        {/* Share Link */}
        <ShareLink url={ROOM_URL} onCopy={copyUrl} />

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
