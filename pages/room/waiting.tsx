import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { verifyRoomApi, verifyUserNameApi } from "../../api/api";
import JoinRoomForm from "../../components/views/room/waiting/JoinRoomForm";
import ParticipantsList from "../../components/views/room/waiting/ParticipantsList";
import ShareLink from "../../components/views/room/waiting/ShareLink";
import StartRpsButton from "../../components/views/room/waiting/StartRpsButton";
import { GlobalContext } from "../../context/globalContext";
import { SocketContext } from "../../context/socketContext";
import {
  COPIED_TOAST_OPTIONS,
  copyToClipboard,
} from "../../helpers/copy-to-clipboard.helper";
import {
  createRoomUrl,
  NOT_EXIST_ROOM_TOAST_OPTIONS,
  RPS_START_TOAST_OPTIONS,
} from "../../helpers/rps-room/rps-room.helper";
import { sleep } from "../../helpers/sleep.helper";
import {
  isUserNameTooLong,
  USER_NAME_DUPLICATE_TOAST_OPTIONS,
  USER_NAME_TOO_LONG_TOAST_OPTIONS,
} from "../../helpers/user-name/user-name.helper";
import styles from "../../styles/Home.module.css";

const WaitingRoom = () => {
  const router = useRouter();
  const { roomId } = router.query as { roomId: string };
  const ROOM_URL = createRoomUrl(roomId);

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
  }, [isUserReady, router]);

  useEffect(() => {
    if (!router.isReady) return;

    socket.on(`user-name-list-updated`, (props: { userNameList: string[] }) => {
      setUserNameList([...props.userNameList]);
    });

    socket.once(`rps-started`, async () => {
      setWaitForStart(true);
      toast(RPS_START_TOAST_OPTIONS);
      await sleep(1000);
      router.push(`/room/rps?roomId=${roomId}`);
    });
  }, [router]);

  /**
   * Functions
   */
  const joinRoom = async () => {
    if (isUserNameTooLong(userName)) {
      toast(USER_NAME_TOO_LONG_TOAST_OPTIONS);
      return;
    }

    const existRoom = await verifyRoomApi({ roomId });
    if (!existRoom) {
      toast(NOT_EXIST_ROOM_TOAST_OPTIONS);
      await sleep(1000);
      router.push("/");
      return;
    }

    const isDuplicateName: boolean = await verifyUserNameApi({
      roomId,
      userName,
    });
    if (!isDuplicateName) {
      toast(USER_NAME_DUPLICATE_TOAST_OPTIONS);
      return;
    }

    setIsUserReady(true);
  };

  const copyUrl = async () => {
    await copyToClipboard(ROOM_URL);
    toast(COPIED_TOAST_OPTIONS);
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
