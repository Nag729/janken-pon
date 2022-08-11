import { Box, useToast } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { RpsHand } from "../../components/uiParts/RpsEmoji";
import ChooseHandCardList from "../../components/views/room/rps/ChooseHandCardList";
import NextRoundButton from "../../components/views/room/rps/NextRoundButton";
import OtherUserBadgeList from "../../components/views/room/rps/OtherUserBadgeList";
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
  winnerUserNameList: string[];
};

type RpsStatus = `inBattle` | `roundSettled` | `completed`;

const RpsRoom = () => {
  const toast = useToast();
  const { socket } = useContext(SocketContext);
  const { state } = useContext(GlobalContext);

  // context state
  const userName = state.userName;
  const userNameList = state.userNameList;

  // local state
  const [rpsStatus, setRpsStatus] = useState<RpsStatus>(`inBattle`);
  const [chosenHand, setChosenHand] = useState<RpsHand | undefined>(undefined);
  const [chosenUserNameList, setChosenUserNameList] = useState<string[]>([]);
  const [roundWinnerList, setRoundWinnerList] = useState<string[]>([]);
  const [userHandList, setUserHandList] = useState<UserHand[]>([]);
  const [winnerList, setWinnerList] = useState<string[]>([]);
  // TODO: loserList もサーバーから受け取る

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

  /**
   * Socket.IO
   */
  const setBattleResult = (result: RpsBattleResult) => {
    setRoundWinnerList(result.roundResult.roundWinnerList);
    setUserHandList(result.roundResult.userHandList);
    setWinnerList(result.winnerUserNameList);
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
          {/* Rps Hand Cards */}
          <ChooseHandCardList chosenHand={chosenHand} chooseHand={chooseHand} />

          {/* Other User Status */}
          <Box my="8">
            <OtherUserBadgeList
              myName={userName}
              userNameList={userNameList}
              chosenUserNameList={chosenUserNameList}
            />
          </Box>
        </Box>
      )}

      {/* Round Settled */}
      {rpsStatus === `roundSettled` && (
        <Box my="8">
          {/* Round Result */}
          {roundWinnerList.length > 0 ? (
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
          {/* TODO: 終了画面を検討する!! */}
          {/* Round Result */}
          <RoundSettledResult
            roundWinnerList={roundWinnerList}
            userHandList={userHandList}
          />
        </Box>
      )}
    </>
  );
};

export default RpsRoom;
