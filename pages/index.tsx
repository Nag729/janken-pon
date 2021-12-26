import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Button, Heading, Input } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useName } from "../hooks/useName";
import styles from "../styles/Home.module.css";

/**
 * NOTE: Suppress Warning:
 * https://zenn.dev/terrierscript/articles/2020-11-03-next-js-random-value
 */
const RpsEmoji = dynamic(() => import("../components/uiParts/RpsEmoji"), {
  ssr: false,
});

export default function Home() {
  const router = useRouter();

  const { name, setName } = useName();
  const hasName: boolean = !!name.length;

  /**
   * Functions
   */
  const createNewRoom = () => {
    // NOTE: save name to local-storage
    localStorage.setItem("name", name);

    const uuid: string = uuidv4();
    router.push(`/waiting-room/${uuid}`);
  };

  return (
    <section className={styles.container}>
      <main className={styles.main}>
        {/* Emoji */}
        <Box my="2">
          <RpsEmoji fontSize="120px" />
        </Box>

        {/* Title */}
        <Heading size="4xl" my="4" textAlign="center" color="gray.700">
          Janken Pon !
        </Heading>

        {/* Sub Title */}
        <Box my="4">
          <Heading
            size="lg"
            my="4"
            textAlign="center"
            color="blue.400"
            letterSpacing="0.6rem"
          >
            オンラインで
          </Heading>
          <Heading
            size="lg"
            my="4"
            textAlign="center"
            color="blue.400"
            letterSpacing="0.6rem"
          >
            じゃんけんをしよう
          </Heading>
        </Box>

        {/* Create Room Form */}
        <Box
          w="100vw"
          my="4"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Box w="320px" my="2">
            <Input
              colorScheme="blue"
              placeholder="ニックネームを入力"
              size="lg"
              textAlign="center"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </Box>
          <Box w="160px" mt="6">
            <Button
              rightIcon={<ArrowForwardIcon />}
              colorScheme="blue"
              size="lg"
              width="100%"
              disabled={!hasName}
              onClick={createNewRoom}
            >
              部屋をつくる
            </Button>
          </Box>
        </Box>
      </main>
    </section>
  );
}
