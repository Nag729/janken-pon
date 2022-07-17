import { Box } from "@chakra-ui/react";
import React from "react";

export const RPS_HAND_TYPE_LIST = ["rock", "scissors", "paper"] as const;
export type RpsHand = typeof RPS_HAND_TYPE_LIST[number];

type RpsEmojiProps = {
  fontSize: string;
};

const randomType = (): RpsHand => {
  return RPS_HAND_TYPE_LIST[
    Math.floor(Math.random() * RPS_HAND_TYPE_LIST.length)
  ];
};

export const createEmojiFromHand = (hand: RpsHand) => {
  if (hand === "rock") return "✊";
  if (hand === "paper") return "✋";
  if (hand === "scissors") return "✌️";
};

export default function RpsEmoji({ fontSize }: RpsEmojiProps): JSX.Element {
  const [hand] = React.useState<RpsHand>(randomType());
  return <Box fontSize={fontSize}>{createEmojiFromHand(hand)}</Box>;
}
