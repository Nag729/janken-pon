import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Button, Heading, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import RpsEmoji from "../components/uiParts/RpsEmoji";
import styles from "../styles/Home.module.css";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const [name, setName] = useState("");
  const hasName: boolean = !!name.length;

  /**
   * Functions
   */
  const createNewRoom = () => {
    const uuid: string = uuidv4();
    router.push(`/room/${uuid}?name=${name}`);
  };

  return (
    <section className={styles.container}>
      <main className={styles.main}>
        {/* Emoji */}
        <Box my="2">
          <RpsEmoji fontSize="120px" />
        </Box>

        {/* Title */}
        <Heading
          maxWidth="80vw"
          size="4xl"
          my="4"
          textAlign="center"
          color="gray.700"
        >
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
              はじめる
            </Button>
          </Box>
        </Box>
      </main>
    </section>
  );
}
