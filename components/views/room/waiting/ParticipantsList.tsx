import { Heading, Box } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { Fragment } from "react";

const ParticipantBadge = dynamic(
  () => import("../../../uiParts/ParticipantBadge"),
  {
    ssr: false,
  }
);

type ParticipantsListProps = {
  userNameList: string[];
};

export default function ParticipantsList(
  props: ParticipantsListProps
): JSX.Element {
  return (
    <Fragment>
      {/* Heading */}
      <Heading size="xl" my="4" textAlign="center" color="gray.700">
        ただいまの参加者 👀
      </Heading>

      {/* Participants Badge */}
      <Box my="2" display="flex" gap="4" alignItems="center">
        {props.userNameList.map((userName) => (
          <ParticipantBadge key={userName} userName={userName} />
        ))}
      </Box>
    </Fragment>
  );
}
