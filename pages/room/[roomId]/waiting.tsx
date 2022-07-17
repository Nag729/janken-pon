import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { Fragment, useEffect } from "react";
import JoinRoomForm from "../../../components/views/room/waiting/JoinRoomForm";
import ParticipantsList from "../../../components/views/room/waiting/ParticipantsList";
import ShareLink from "../../../components/views/room/waiting/ShareLink";
import StartRpsButton from "../../../components/views/room/waiting/StartRpsButton";
import { IsHostContext } from "../../../context/isHostContext";
import { copyToClipboard } from "../../../helpers/copy-to-clipboard";
import { useUserName } from "../../../hooks/useName";
import { useSocket } from "../../../hooks/useSocket";
import styles from "../../../styles/Home.module.css";

const Room = () => {
  const router = useRouter();
  const toast = useToast();

  const { roomId } = router.query as { roomId: string };
  const ROOM_URL = `localhost:3000/${process.env.NEXT_PUBLIC_ROOM_PAGE_URL}/${roomId}/waiting`; // FIXME:
  // const ROOM_URL = `${process.env.NEXT_PUBLIC_DOMAIN}${process.env.NEXT_PUBLIC_ROOM_PAGE_URL}/${roomId}/waiting`;

  const { state } = React.useContext(IsHostContext);
  const { userName, setUserName, loadingUser } = useUserName();
  const [userNameList, setUserNameList] = React.useState<string[]>([]);
  const [isUserReady, setIsUserReady] = React.useState<boolean>(state.isHost);

  const socket = useSocket();

  useEffect(() => {
    if (!isUserReady || loadingUser || !router.isReady || !socket) return;

    // NOTE: Join to the room.
    socket.emit(`join-to-room`, { roomId, userName });
  }, [isUserReady, loadingUser, roomId, router, socket]);

  useEffect(() => {
    if (!socket) return;

    // NOTE: update user-name list.
    socket.on(`update-user-name-list`, (props: { userNameList: string[] }) => {
      setUserNameList([...props.userNameList]);
    });
  }, [socket]);

  /**
   * Functions
   */
  const joinRoom = async () => {
    // TODO: userName が重複してないかの検証

    setIsUserReady(true);
  };

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
        {!isUserReady && (
          <JoinRoomForm
            userName={userName}
            setUserName={setUserName}
            joinRoom={joinRoom}
          />
        )}

        {isUserReady && (
          <Fragment>
            {/* Share Link */}
            <ShareLink url={ROOM_URL} onCopy={copyUrl} />

            {/* Participants List */}
            <ParticipantsList userNameList={userNameList} />

            {/* Janken Start Button */}
            <StartRpsButton userNameList={userNameList} onClick={startRps} />
          </Fragment>
        )}
      </main>
    </section>
  );
};

export default Room;
