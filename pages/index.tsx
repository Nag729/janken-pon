import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Button, Heading } from "@chakra-ui/react";
import React, { CSSProperties } from "react";
import styles from "../styles/Home.module.css";

/**
 * Styles
 */
const subTitleStyles: CSSProperties = {
  letterSpacing: "0.8rem",
};

/**
 * Functions
 */
const createNewRoom = () => {
  console.log(`createNewRoom`);
};

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {/* Nextjs logo */}
        <Box mb="2">
          {/* TODO: */}
          {/* <RpsEmoji /> */}
        </Box>

        {/* title */}
        <Heading
          maxWidth="80vw"
          size="4xl"
          my="5"
          textAlign="center"
          color="gray.600"
        >
          Janken Pon !
        </Heading>

        <Box>
          <Heading
            size="lg"
            my="5"
            textAlign="center"
            color="blue.400"
            style={subTitleStyles}
          >
            {/* <RpsEmoji /> */}
            オンラインで
          </Heading>
          <Heading
            size="lg"
            my="5"
            textAlign="center"
            color="blue.400"
            style={subTitleStyles}
          >
            じゃんけんをしよう
          </Heading>
        </Box>

        {/* link button */}
        <Box my="3">
          {/* Link */}
          <Box my="6">
            <Button
              rightIcon={<ArrowForwardIcon />}
              colorScheme="blue"
              size="lg"
              onClick={createNewRoom}
            >
              部屋を立てる
            </Button>
          </Box>
        </Box>
      </main>
    </div>
  );
}
