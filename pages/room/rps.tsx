import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Fragment, useContext, useEffect, useState } from "react";
import { RpsHand } from "../../components/uiParts/RpsEmoji";
import OtherUserBadgeList from "../../components/views/room/rps/OtherUserBadgeList";
import RpsHandCardList from "../../components/views/room/rps/RpsHandCardList";
import { GlobalContext } from "../../context/globalContext";
import { SocketContext } from "../../context/socketContext";
import styles from "../../styles/Home.module.css";

type BattleResult = {
  winnerList: string[];
  userHandList: {
    userName: string;
    hand: RpsHand;
  }[];
};

const RpsRoom = () => {
  const router = useRouter();
  const { roomId } = router.query as { roomId: string };

  const toast = useToast();
  const { socket } = useContext(SocketContext);
  const { state, dispatch } = useContext(GlobalContext);

  // userName
  const userName = state.userName;

  // userNameList
  const userNameList = state.userNameList;

  const [chosenHand, setChosenHand] = useState<RpsHand | undefined>(undefined);
  const [chosenUserNameList, setChosenUserNameList] = useState<string[]>([]);

  /**
   * Socket.IO
   */
  useEffect(() => {
    socket.on(`rps-hand-chosen`, (props: { userNameList: string[] }) => {
      console.log(`*** rps-hand-chosen ***`);
      console.log(props.userNameList);
      setChosenUserNameList([...props.userNameList]);
    });

    socket.on(
      `round-settled`,
      async (props: { battleResult: BattleResult }) => {
        console.log(`*** round-settled ***`);
        console.log(props.battleResult);

        // TODO: battleResult を表示する!!
      }
    );
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
        <Fragment>
          {/* Rps Hand Cards */}
          <RpsHandCardList chosenHand={chosenHand} chooseHand={chooseHand} />

          {/* Other User Status */}
          <OtherUserBadgeList
            myName={userName}
            userNameList={userNameList}
            chosenUserNameList={chosenUserNameList}
          />
        </Fragment>
      </main>
    </section>
  );
};

export default RpsRoom;
