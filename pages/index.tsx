import { Box } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import CreateRoomForm from "../components/views/welcome/CreateRoomForm";
import MainTitle from "../components/views/welcome/MainTitle";
import SubTitle from "../components/views/welcome/SubTitle";
import { useName } from "../hooks/useName";
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
  const { name, setName } = useName();

  /**
   * Functions
   */
  const createNewRoom = () => {
    localStorage.setItem("name", name);
    router.push(`/room/${uuidv4()}/waiting`);
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
          name={name}
          setName={setName}
          createNewRoom={createNewRoom}
        />
      </main>
    </section>
  );
}
