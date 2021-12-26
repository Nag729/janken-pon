import { CopyIcon } from "@chakra-ui/icons";
import { Box, Heading, IconButton, Input, useToast } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";
import { copyToClipboard } from "../../helpers/copy-to-clipboard";
import { useName } from "../../hooks/useName";
import styles from "../../styles/Home.module.css";

const ParticipantBadge = dynamic(
  () => import("../../components/uiParts/ParticipantBadge"),
  {
    ssr: false,
  }
);

const Room = () => {
  const router = useRouter();
  const toast = useToast();

  const { roomId } = router.query;
  const { name } = useName();

  const url = `${process.env.NEXT_PUBLIC_DOMAIN}${process.env.NEXT_PUBLIC_ROOM_PAGE_URL}/${roomId}`;

  const copyUrl = async () => {
    await copyToClipboard(url);

    toast({
      title: "URL is copied.",
      status: "success",
      duration: 1500,
      isClosable: true,
    });
  };

  return (
    <section className={styles.container}>
      <main className={styles.main}>
        <Box my="4">
          {/* Heading */}
          <Heading size="xl" my="4" textAlign="center" color="gray.700">
            参加者にリンクを共有しよう 🙌
          </Heading>

          {/* Link for Copy */}
          <Box mt="6" mb="4" display="flex" gap="4" alignItems="center">
            <Input
              w="640px"
              size="lg"
              fontWeight="bold"
              color="gray.500"
              value={url}
              readOnly
              textAlign="center"
            />
            <IconButton
              colorScheme="blue"
              size="lg"
              aria-label="Copy"
              icon={<CopyIcon />}
              onClick={copyUrl}
            ></IconButton>
          </Box>
        </Box>

        <Box my="4">
          {/* Heading */}
          <Heading size="xl" my="4" textAlign="center" color="gray.700">
            ただいまの参加者 👀
          </Heading>

          {/* Participants Badge */}
          <Box my="4" display="flex" gap="4" alignItems="center">
            {/* TODO: 他の参加者のバッジを表示する */}
            <ParticipantBadge name={name} />

            {/* TODO: 「じゃんけんをはじめる」ボタン */}
          </Box>
        </Box>
      </main>
    </section>
  );
};

export default Room;
