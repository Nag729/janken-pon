import { Box, useToast } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useContext } from "react";
import { createNewRoomApi, generateNewRoomId } from "../api/api";
import CreateRoomForm from "../components/views/welcome/CreateRoomForm";
import MainTitle from "../components/views/welcome/MainTitle";
import SubTitle from "../components/views/welcome/SubTitle";
import { GlobalContext } from "../context/globalContext";
import {
  isUserNameTooLong,
  USER_NAME_TOO_LONG_TOAST_OPTIONS,
} from "../helpers/user-name/user-name.helper";
import styles from "../styles/Home.module.css";

/**
 * NOTE: Suppress Warning:
 * https://zenn.dev/terrierscript/articles/2020-11-03-next-js-random-value
 */
const RpsEmoji = dynamic(() => import("../components/uiParts/RpsEmoji"), {
  ssr: false,
});

export default function Home() {
  const router = useRouter();
  const { state, dispatch } = useContext(GlobalContext);
  const toast = useToast();

  // userName
  const userName = state.userName;
  const setUserName = (userName: string) => {
    dispatch({ type: `SET_USER_NAME`, payload: userName });
  };

  /**
   * Functions
   */
  const createNewRoom = async () => {
    if (isUserNameTooLong(userName)) {
      toast(USER_NAME_TOO_LONG_TOAST_OPTIONS);
      return;
    }

    const roomId: string = await generateNewRoomId();
    await createNewRoomApi({ roomId });

    dispatch({ type: `SWITCH_TO_HOST` });
    router.push(`/room/waiting?roomId=${roomId}`);
  };

  return (
    <section className={styles.container}>
      {/* Emoji */}
      <Box my="2">
        <RpsEmoji fontSize="120px" />
      </Box>

      {/* Main Title */}
      <MainTitle />

      {/* Sub Title */}
      <SubTitle />

      {/* Create Room Form */}
      <CreateRoomForm
        userName={userName}
        setUserName={setUserName}
        createNewRoom={createNewRoom}
      />
    </section>
  );
}
