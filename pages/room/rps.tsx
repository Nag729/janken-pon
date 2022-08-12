import { Box, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext, useEffect, useMemo, useState } from "react";
import { RpsHand } from "../../components/uiParts/RpsEmoji";
import AlreadyFinishedMessage from "../../components/views/room/rps/AlreadyFinishedMessage";
import ChooseHandCardList from "../../components/views/room/rps/ChooseHandCardList";
import NextRoundButton from "../../components/views/room/rps/NextRoundButton";
import OtherUserBadgeList from "../../components/views/room/rps/OtherUserBadgeList";
import ReturnToTopButton from "../../components/views/room/rps/ReturnToTopButton";
import RoundDrawResult from "../../components/views/room/rps/RoundDrawResult";
import RoundSettledResult, {
  UserHand,
} from "../../components/views/room/rps/RoundSettledResult";
import { GlobalContext } from "../../context/globalContext";
import { SocketContext } from "../../context/socketContext";
import { RPS_NEXT_ROUND_TOAST_OPTIONS } from "../../helpers/rps-room/rps-room.helper";
import { sleep } from "../../helpers/sleep.helper";

type RoundResult = {
  roundWinnerList: string[];
  userHandList: UserHand[];
};

type RpsBattleResult = {
  roundResult: RoundResult;
  winnerNameList: string[];
  loserNameList: string[];
};

type RpsStatus = `inBattle` | `roundSettled` | `completed`;

const RpsRoom = () => {
  const router = useRouter();
  const toast = useToast();
  const { socket } = useContext(SocketContext);
  const { state } = useContext(GlobalContext);

  // context state
  const userName = state.userName;
  const userNameList = state.userNameList;

  // rps status
  const [rpsStatus, setRpsStatus] = useState<RpsStatus>(`inBattle`);

  // rps hand
  const [chosenHand, setChosenHand] = useState<RpsHand | undefined>(undefined);
  const [chosenUserNameList, setChosenUserNameList] = useState<string[]>([]);

  // round result
  const [roundWinnerList, setRoundWinnerList] = useState<string[]>([]);
  const [userHandList, setUserHandList] = useState<UserHand[]>([]);

  // Winner or Loser
  const [winnerList, setWinnerList] = useState<string[]>([]);
  const [loserList, setLoserList] = useState<string[]>([]);
  const winnerOrLoserList = useMemo(() => {
    return [...winnerList, ...loserList];
  }, [winnerList, loserList]);
  const isFighting = useMemo(() => {
    return !winnerOrLoserList.includes(userName);
  }, [winnerOrLoserList, userName]);

  // waiting flag
  const [waitingNextRound, setWaitingNextRound] = useState<boolean>(false);

  /**
   * Functions
   */
  const chooseHand = (hand: RpsHand) => {
    setChosenHand(hand);
    socket.emit(`choose-hand`, { hand });
  };

  const enterNextRound = () => {
    setWaitingNextRound(true);
    socket.emit(`enter-next-round`);
  };

  const returnToTop = () => {
    router.push(`/`);
  };

  /**
   * Socket.IO
   */
  const setBattleResult = (result: RpsBattleResult) => {
    setRoundWinnerList(result.roundResult.roundWinnerList);
    setUserHandList(result.roundResult.userHandList);
    setWinnerList(result.winnerNameList);
    setLoserList(result.loserNameList);
  };

  const resetBattleState = () => {
    setChosenHand(undefined);
    setChosenUserNameList([]);
    setRoundWinnerList([]);
    setUserHandList([]);
  };

  useEffect(() => {
    socket.on(`rps-hand-chosen`, (props: { userNameList: string[] }) => {
      setChosenUserNameList([...props.userNameList]);
    });

    socket.on(`round-settled`, async (props: RpsBattleResult) => {
      setRpsStatus(`roundSettled`);
      setBattleResult(props);
    });

    socket.on(`next-round-entered`, async () => {
      setWaitingNextRound(true);
      toast(RPS_NEXT_ROUND_TOAST_OPTIONS);
      await sleep(1000);

      setRpsStatus(`inBattle`);
      resetBattleState();
      setWaitingNextRound(false);
    });

    socket.on(`rps-completed`, async (props: RpsBattleResult) => {
      setRpsStatus(`completed`);
      setBattleResult(props);
    });
  }, []);

  return (
    <>
      {/* In Battle */}
      {rpsStatus === `inBattle` && (
        <Box my="8">
          <Box my="8">
            {isFighting ? (
              // Rps Hand Cards
              <ChooseHandCardList
                chosenHand={chosenHand}
                chooseHand={chooseHand}
              />
            ) : (
              // Already Finished Message
              <AlreadyFinishedMessage isWin={!!winnerList.includes(userName)} />
            )}
          </Box>

          {/* Other User Status */}
          <Box my="12">
            <OtherUserBadgeList
              myName={userName}
              userNameList={userNameList}
              chosenUserNameList={chosenUserNameList}
              winnerOrLoserList={winnerOrLoserList}
            />
          </Box>
        </Box>
      )}

      {/* Round Settled */}
      {rpsStatus === `roundSettled` && (
        <Box my="8">
          {/* Round Result */}
          {roundWinnerList.length > 0 ? (
            // TODO: winner, loser をリストに入れる
            <RoundSettledResult
              roundWinnerList={roundWinnerList}
              userHandList={userHandList}
            />
          ) : (
            <RoundDrawResult userHandList={userHandList} />
          )}

          {/* Next Round Button */}
          <Box my="12">
            <NextRoundButton
              isDisabled={waitingNextRound}
              onClick={enterNextRound}
            />
          </Box>
        </Box>
      )}

      {/* Completed */}
      {rpsStatus === `completed` && (
        <Box my="8">
          {/* Round Result */}
          <RoundSettledResult
            roundWinnerList={roundWinnerList}
            userHandList={userHandList}
          />

          {/* Return to Top Button */}
          <Box my="12">
            <ReturnToTopButton onClick={returnToTop} />
          </Box>
        </Box>
      )}
    </>
  );
};

export default RpsRoom;
