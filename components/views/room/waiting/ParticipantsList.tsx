import { Flex, Heading } from "@chakra-ui/react";
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
      <Heading as="h2" size="xl" textAlign="center" color="gray.700">
        ただいまの参加者 👀
      </Heading>

      {/* Participants Badge */}
      <Flex
        mt="6"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        gap="4"
      >
        {props.userNameList.map((userName) => (
          <ParticipantBadge key={userName} userName={userName} />
        ))}
      </Flex>
    </Fragment>
  );
}
