import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { verifyRoomApi, verifyUserNameApi } from "../../../api/api";
import JoinRoomForm from "../../../components/views/room/waiting/JoinRoomForm";
import ParticipantsList from "../../../components/views/room/waiting/ParticipantsList";
import ShareLink from "../../../components/views/room/waiting/ShareLink";
import StartRpsButton from "../../../components/views/room/waiting/StartRpsButton";
import { GlobalContext } from "../../../context/globalContext";
import { SocketContext } from "../../../context/socketContext";
import { copyToClipboard } from "../../../helpers/copy-to-clipboard";
import { sleep } from "../../../helpers/sleep";
import styles from "../../../styles/Home.module.css";

const WaitingRoom = () => {
  const router = useRouter();
  const { roomId } = router.query as { roomId: string };
  const ROOM_URL = `${process.env.NEXT_PUBLIC_DOMAIN}/room/${roomId}/waiting`;

  const toast = useToast();
  const { socket } = useContext(SocketContext);
  const { state, dispatch } = useContext(GlobalContext);

  // userName
  const userName = state.userName;
  const setUserName = (userName: string) => {
    dispatch({ type: `SET_USER_NAME`, payload: userName });
  };

  // userNameList
  const userNameList = state.userNameList;
  const setUserNameList = (userNameList: string[]) => {
    dispatch({ type: `SET_USER_NAME_LIST`, payload: userNameList });
  };

  const [isUserReady, setIsUserReady] = useState<boolean>(state.isHost);
  const [waitForStart, setWaitForStart] = useState<boolean>(false);

  /**
   * Socket.IO
   */
  useEffect(() => {
    if (!isUserReady || !router.isReady) return;
    // NOTE: Join to the room.
    socket.emit(`room`, { roomId, userName });
  }, [isUserReady, roomId, router]);

  useEffect(() => {
    socket.on(`user-name-list-updated`, (props: { userNameList: string[] }) => {
      setUserNameList([...props.userNameList]);
    });

    socket.once(`rps-started`, async () => {
      setWaitForStart(true);
      toast({
        title: "まもなく開始します...",
        status: "success",
        duration: 1000,
      });
      await sleep(1000);

      // FIXME: 後から参加した側で roomId が取れてない問題:
      router.push(`/room/${roomId}/rps`);
    });
  }, []);

  /**
   * Functions
   */
  const joinRoom = async () => {
    const existRoom = await verifyRoomApi({ roomId });
    if (!existRoom) {
      toast({
        title: `部屋が存在しません 🥲`,
        description: `トップページに戻ります...`,
        status: `error`,
        duration: 1000,
      });
      await sleep(1000);
      router.push("/");
      return;
    }

    const isDuplicateName: boolean = await verifyUserNameApi({
      roomId,
      userName,
    });
    if (!isDuplicateName) {
      toast({
        title: `名前が重複しています 🥲`,
        description: `別の名前を入力してください`,
        status: `error`,
      });
      return;
    }

    setIsUserReady(true);
  };

  const copyUrl = async () => {
    await copyToClipboard(ROOM_URL);

    toast({
      title: `コピーしました 👍`,
      status: `success`,
      duration: 2000,
    });
  };

  const startRps = () => {
    socket.emit(`start-rps`);
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
            <ShareLink onCopy={copyUrl} />

            {/* Participants List */}
            <ParticipantsList userNameList={userNameList} />

            {/* Janken Start Button */}
            <StartRpsButton
              userNameList={userNameList}
              disabled={waitForStart}
              onClick={startRps}
            />
          </Fragment>
        )}
      </main>
    </section>
  );
};

export default WaitingRoom;
