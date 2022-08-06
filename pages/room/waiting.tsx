import { Box, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Fragment, useContext, useEffect, useState } from "react";
import { verifyRoomApi, verifyUserNameApi } from "../../api/api";
import RpsEmoji from "../../components/uiParts/RpsEmoji";
import JoinRoomForm from "../../components/views/room/waiting/JoinRoomForm";
import NumberOfWinnersForm from "../../components/views/room/waiting/NumberOfWinnersForm";
import ParticipantsList from "../../components/views/room/waiting/ParticipantsList";
import ShareLink from "../../components/views/room/waiting/ShareLink";
import StartRpsButton from "../../components/views/room/waiting/StartRpsButton";
import MainTitle from "../../components/views/welcome/MainTitle";
import { GlobalContext } from "../../context/globalContext";
import { SocketContext } from "../../context/socketContext";
import {
  COPIED_TOAST_OPTIONS,
  copyToClipboard,
} from "../../helpers/copy-to-clipboard.helper";
import {
  createRoomUrl,
  invalidRoomToastOptions,
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

  // numberOfWinners
  const [numberOfWinners, setNumberOfWinners] = useState<number>(1);
  const updateNumberOfWinners = (numberOfWinners: number) => {
    setNumberOfWinners(numberOfWinners); // for host
    socket.emit(`update-number-of-winners`, { numberOfWinners });
  };

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

    socket.on(
      `number-of-winners-updated`,
      (props: { numberOfWinners: number }) => {
        !state.isHost && setNumberOfWinners(props.numberOfWinners);
      }
    );

    socket.once(`rps-started`, async () => {
      toast(RPS_START_TOAST_OPTIONS);
      await sleep(2000);
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

    const roomErrorList = await verifyRoomApi({ roomId });
    if (roomErrorList.length > 0) {
      toast(invalidRoomToastOptions(roomErrorList));
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
    socket.emit(`start-rps`, { numberOfWinners });
  };

  return (
    <section className={styles.container}>
      {!isUserReady && (
        <Fragment>
          {/* Emoji */}
          <Box my="2">
            <RpsEmoji fontSize="120px" />
          </Box>

          {/* Main Title */}
          <Box my="2">
            <MainTitle />
          </Box>

          {/* Join Room Form */}
          <Box mt="8">
            <JoinRoomForm
              userName={userName}
              setUserName={setUserName}
              joinRoom={joinRoom}
            />
          </Box>
        </Fragment>
      )}

      {isUserReady && (
        <Fragment>
          {/* Share Link */}
          <Box my="6">
            <ShareLink onCopy={copyUrl} />
          </Box>

          {/* Participants List */}
          <Box my="6">
            <ParticipantsList userNameList={userNameList} />
          </Box>

          {/* Number of Winners */}
          {userNameList.length >= 2 && (
            <Box my="6">
              <NumberOfWinnersForm
                isHost={state.isHost}
                userCount={userNameList.length}
                numberOfWinners={numberOfWinners}
                updateNumberOfWinners={updateNumberOfWinners}
              />
            </Box>
          )}

          {/* Janken Start Button */}
          <Box my="8">
            <StartRpsButton
              userNameList={userNameList}
              disabled={!state.isHost}
              onClick={startRps}
            />
          </Box>
        </Fragment>
      )}
    </section>
  );
};

export default WaitingRoom;
