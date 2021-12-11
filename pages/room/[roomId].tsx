import { Box, Button, Heading, Input, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";

const Room = () => {
  const router = useRouter();
  // TODO: name を URL に含めないように修正
  const { roomId, name } = router.query;

  const url = `${process.env.NEXT_PUBLIC_DOMAIN}${process.env.NEXT_PUBLIC_ROOM_PAGE_URL}/${roomId}`;

  const copyUrl = () => {
    // TODO: URL をコピー
    // TODO: toast を表示する
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
            <Button w="80px" colorScheme="blue" size="lg" onClick={copyUrl}>
              コピー
            </Button>
          </Box>
        </Box>

        <Box my="4">
          {/* Heading */}
          <Heading size="xl" my="4" textAlign="center" color="gray.700">
            ただいまの参加者 👀
          </Heading>

          {/* Participants Badge */}
          <Box my="4" display="flex" gap="4" alignItems="center">
            {/* TODO: 参加者バッジ */}

            {/* TODO: 「じゃんけんをはじめる」 */}
          </Box>
        </Box>
      </main>
    </section>
  );
};

export default Room;
