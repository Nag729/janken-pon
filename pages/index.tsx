import { Box } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import { createNewRoomApi } from "../api/api";
import CreateRoomForm from "../components/views/welcome/CreateRoomForm";
import MainTitle from "../components/views/welcome/MainTitle";
import SubTitle from "../components/views/welcome/SubTitle";
import { useUserName } from "../hooks/useName";
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
  const { userName, setUserName } = useUserName();

  /**
   * Functions
   */
  const createNewRoom = async () => {
    localStorage.setItem(
      `${process.env.NEXT_PUBLIC_LOCAL_STORAGE_PREFIX}-name`,
      userName
    );

    // TODO: サーバー側から新しい roomId を取得する
    const roomId = uuidv4();
    await createNewRoomApi({ roomId, userName });
    router.push(`/room/${roomId}/waiting`);
  };

  return (
    <section className={styles.container}>
      <main className={styles.main}>
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
      </main>
    </section>
  );
}
