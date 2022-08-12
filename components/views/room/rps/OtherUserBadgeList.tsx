import { Box, Flex, Heading } from "@chakra-ui/react";
import ParticipantBadge from "../../../uiParts/ParticipantBadge";

type OtherUserBadgeListProps = {
  myName: string;
  userNameList: string[];
  chosenUserNameList: string[];
  winnerOrLoserList: string[];
};

export default function OtherUserBadgeList({
  myName,
  userNameList,
  chosenUserNameList,
  winnerOrLoserList,
}: OtherUserBadgeListProps): JSX.Element {
  const otherUserNameList = userNameList
    .filter((userName) => userName !== myName)
    .filter((userName) => !winnerOrLoserList.includes(userName));

  const chosenUserNameListWithoutMe = chosenUserNameList.filter(
    (userName) => userName !== myName
  );

  return (
    <Box>
      {/* Heading */}
      <Heading size="xl" textAlign="center" color="gray.700">
        ほかの参加者 👀
      </Heading>

      {/* User Badge */}
      <Flex mt="6" gap="4" alignItems="center" justifyContent="center">
        {otherUserNameList.map((userName) => (
          <ParticipantBadge
            key={userName}
            userName={userName}
            isDone={chosenUserNameListWithoutMe.includes(userName)}
          />
        ))}
      </Flex>
    </Box>
  );
}
