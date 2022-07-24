import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Fragment, useContext, useEffect, useMemo, useState } from "react";
import { RpsHand } from "../../components/uiParts/RpsEmoji";
import OtherUserBadgeList from "../../components/views/room/rps/OtherUserBadgeList";
import RoundSettledResult, {
  UserHand,
} from "../../components/views/room/rps/RoundSettledResult";
import ChooseHandCardList from "../../components/views/room/rps/ChooseHandCardList";
import { GlobalContext } from "../../context/globalContext";
import { SocketContext } from "../../context/socketContext";
import styles from "../../styles/Home.module.css";
import RoundDrawResult from "../../components/views/room/rps/RoundDrawResult";

type RoundResult = {
  roundWinnerList: string[];
  userHandList: UserHand[];
};

type RoundStatus = `inBattle` | `settled`;

const RpsRoom = () => {
  const router = useRouter();
  const { roomId } = router.query as { roomId: string };

  const toast = useToast();
  const { socket } = useContext(SocketContext);
  const { state } = useContext(GlobalContext);

  // userName
  const userName = state.userName;

  // userNameList
  const userNameList = state.userNameList;

  // local state
  const [chosenHand, setChosenHand] = useState<RpsHand | undefined>(undefined);
  const [chosenUserNameList, setChosenUserNameList] = useState<string[]>([]);
  const [roundStatus, setRoundStatus] = useState<RoundStatus>(`inBattle`);
  const [roundWinnerList, setRoundWinnerList] = useState<string[]>([]);
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

    socket.on(`round-settled`, async (props: { roundResult: RoundResult }) => {
      setRoundStatus(`settled`);
      setRoundWinnerList(props.roundResult.roundWinnerList);
      setUserHandList(props.roundResult.userHandList);
    });

    socket.on(
      `rps-completed`,
      async (props: {
        roundResult: RoundResult;
        winnerUserNameList: string[];
      }) => {
        console.log(`*** rps-completed ***`);
        console.log(props.roundResult);
        console.log(props.winnerUserNameList);

        setRoundStatus(`settled`);
        setRoundWinnerList(props.roundResult.roundWinnerList);
        setUserHandList(props.roundResult.userHandList);
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
            {roundWinnerList.length > 0 ? (
              <RoundSettledResult
                roundWinnerList={roundWinnerList}
                userHandList={userHandList}
              />
            ) : (
              <RoundDrawResult userHandList={userHandList} />
            )}
          </Fragment>
        )}

        {/* next round */}
        {/* TODO: 次のラウンドへ進むボタンを置く */}
      </main>
    </section>
  );
};

export default RpsRoom;
