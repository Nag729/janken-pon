import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Button, Heading, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import RpsEmoji from "../components/uiParts/RpsEmoji";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [name, setName] = useState("");
  const hasName: boolean = !!name.length;

  /**
   * Functions
   */
  const createNewRoom = () => {
    console.log(`createNewRoom`);
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {/* Emoji */}
        <Box my="2">
          <RpsEmoji fontSize="120px" />
        </Box>

        {/* title */}
        <Heading
          maxWidth="80vw"
          size="4xl"
          my="4"
          textAlign="center"
          color="gray.700"
        >
          Janken Pon !
        </Heading>

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
          <Box w="320px" my="4">
            <Input
              colorScheme="blue"
              placeholder="ニックネームを入力"
              size="lg"
              textAlign="center"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </Box>
          <Box w="240px" my="4">
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
    </div>
  );
}
