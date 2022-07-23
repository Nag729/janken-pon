import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Fragment, useContext, useEffect, useMemo, useState } from "react";
import { RpsHand } from "../../components/uiParts/RpsEmoji";
import OtherUserBadgeList from "../../components/views/room/rps/OtherUserBadgeList";
import RoundResult, {
  UserHand,
} from "../../components/views/room/rps/RoundResult";
import ChooseHandCardList from "../../components/views/room/rps/ChooseHandCardList";
import { GlobalContext } from "../../context/globalContext";
import { SocketContext } from "../../context/socketContext";
import styles from "../../styles/Home.module.css";

type BattleResult = {
  // FIXME: roundWinnerList に rename する
  winnerList: string[];
  userHandList: UserHand[];
};

type RoundStatus = `inBattle` | `settled`;

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

  // local state
  const [chosenHand, setChosenHand] = useState<RpsHand | undefined>(undefined);
  const [chosenUserNameList, setChosenUserNameList] = useState<string[]>([]);
  const [roundStatus, setRoundStatus] = useState<RoundStatus>(`inBattle`);
  const [winnerList, setWinnerList] = useState<string[]>([]);
  const [userHandList, setUserHandList] = useState<UserHand[]>([]);

  const isInBattle = useMemo(() => roundStatus === `inBattle`, [roundStatus]);
  const isRoundSettled = useMemo(
    () => roundStatus === `settled`,
    [roundStatus]
  );

  /**
   * Socket.IO
   */
  useEffect(() => {
    socket.on(`rps-hand-chosen`, (props: { userNameList: string[] }) => {
      setChosenUserNameList([...props.userNameList]);
    });

    socket.on(
      `round-settled`,
      async (props: { battleResult: BattleResult }) => {
        setRoundStatus(`settled`);
        setWinnerList(props.battleResult.winnerList);
        setUserHandList(props.battleResult.userHandList);
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
        {/* in battle */}
        {isInBattle && (
          <Fragment>
            {/* Rps Hand Cards */}
            <ChooseHandCardList
              chosenHand={chosenHand}
              chooseHand={chooseHand}
            />

            {/* Other User Status */}
            <OtherUserBadgeList
              myName={userName}
              userNameList={userNameList}
              chosenUserNameList={chosenUserNameList}
            />
          </Fragment>
        )}

        {/* round settled */}
        {isRoundSettled && (
          <Fragment>
            {/* Round Result */}
            <RoundResult winnerList={winnerList} userHandList={userHandList} />
          </Fragment>
        )}
      </main>
    </section>
  );
};

export default RpsRoom;
