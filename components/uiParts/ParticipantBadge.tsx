import { SunIcon } from "@chakra-ui/icons";
import { Tag, TagLabel, TagLeftIcon } from "@chakra-ui/react";
import React from "react";

const COLOR_LIST = [
  "red",
  "orange",
  // "yellow",
  "green",
  "teal",
  "blue",
  "cyan",
  "purple",
  "pink",
] as const;
type Color = typeof COLOR_LIST[number];

const randomColor = (): Color => {
  return COLOR_LIST[Math.floor(Math.random() * COLOR_LIST.length)];
};

type ParticipantBadgeProps = {
  userName: string;
};

export default function ParticipantBadge({
  userName,
}: ParticipantBadgeProps): JSX.Element {
  return (
    <Tag
      size="lg"
      key="lg"
      variant="subtle"
      colorScheme={randomColor()}
      fontSize="1.2rem"
      fontWeight="bold"
      padding="0.8rem 1.5rem"
      borderRadius="4rem"
    >
      <TagLeftIcon w={5} h={5} as={SunIcon} />
      <TagLabel>{userName}</TagLabel>
    </Tag>
  );
}
