import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { RpsHand } from "../../../components/uiParts/RpsEmoji";
import ChooseRpsHand from "../../../components/views/room/rps/ChooseRpsHand";
import { SocketContext } from "../../../context/socketContext";
import styles from "../../../styles/Home.module.css";

const RpsRoom = () => {
  const router = useRouter();
  const { roomId } = router.query as { roomId: string };

  const toast = useToast();
  const { socket } = useContext(SocketContext);
  const [userNameList, setUserNameList] = useState<string[]>([]);
  const [chosenHand, setChosenHand] = useState<RpsHand | undefined>(undefined);

  /**
   * Socket.IO
   */
  useEffect(() => {
    socket.on(`rps-hand-chosen`, (props: { userNameList: string[] }) => {
      console.log(`*** rps-hand-chosen ***`);
      console.log(props.userNameList);
    });

    socket.on(`round-finished`, async (props: { winnerList: string[] }) => {
      console.log(`*** round-finished ***`);
      console.log(props.winnerList);
    });

    socket.on(`round-draw`, async () => {
      console.log(`*** round-draw ***`);
    });
  }, []);

  /**
   * Functions
   */
  const chooseHand = (hand: RpsHand) => {
    setChosenHand(hand);
    socket.emit(`choose-hand`, { hand });
  };

  return (
    <section className={styles.container}>
      <main className={styles.main}>
        <ChooseRpsHand chosenHand={chosenHand} chooseHand={chooseHand} />
      </main>
    </section>
  );
};

export default RpsRoom;
