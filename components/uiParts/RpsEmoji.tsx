import { Box } from "@chakra-ui/react";
import React from "react";

const RPS_TYPE_LIST = ["rock", "paper", "scissors"] as const;
type RpsType = typeof RPS_TYPE_LIST[number];

type RpsEmojiProps = {
  type?: RpsType;
  fontSize: string;
};

const randomType = (): RpsType => {
  return RPS_TYPE_LIST[Math.floor(Math.random() * RPS_TYPE_LIST.length)];
};

export default function RpsEmoji({
  type,
  fontSize,
}: RpsEmojiProps): JSX.Element {
  const [rpsType] = React.useState<RpsType>(type ?? randomType());

  const isRock = (type: RpsType) => type === "rock";
  const isPaper = (type: RpsType) => type === "paper";
  const isScissors = (type: RpsType) => type === "scissors";

  return (
    <Box fontSize={fontSize}>
      {isRock(rpsType) && "✊"}
      {isPaper(rpsType) && "✋"}
      {isScissors(rpsType) && "✌️"}
    </Box>
  );
}
