import { CheckCircleIcon } from "@chakra-ui/icons";
import {
  Flex,
  Heading,
  Link,
  List,
  ListIcon,
  ListItem,
  Text,
} from "@chakra-ui/react";

export default function About() {
  const createHeader = (text: string) => {
    return (
      <Heading
        as="h1"
        size="xl"
        mt="12"
        mb="4"
        textAlign="center"
        color="blue.500"
      >
        {text}
      </Heading>
    );
  };

  const createText = (text: string) => {
    return (
      <Text mt="2" fontSize="xl" color="gray.700">
        {text}
      </Text>
    );
  };

  const createExternalLink = ({
    text,
    href,
  }: {
    text: string;
    href: string;
  }) => {
    return (
      <>
        {` `}
        <Link color="teal.500" fontWeight="bold" href={href} isExternal>
          {text}
        </Link>
        {` `}
      </>
    );
  };

  return (
    <>
      {/* About This Site */}
      <Flex flexDirection="column" alignItems="center">
        {createHeader(`Janken Pon! について`)}
        {createText(`リアルタイムなオンラインじゃんけんができます`)}
        {createText(`ちょっとした決め事などにつかっていただけると嬉しいです`)}
      </Flex>

      {/* About Developer */}
      <Flex flexDirection="column" alignItems="center">
        {createHeader(`開発者`)}
        <Text mt="2" fontSize="xl" color="gray.700">
          {createExternalLink({
            text: "@Nag729",
            href: "https://github.com/Nag729",
          })}
          が個人開発としてつくっています
        </Text>
        {createText(`普段は Web エンジニアとして働いています 😎`)}
      </Flex>

      {/* About Tech */}
      <Flex flexDirection="column" alignItems="center">
        {createHeader(`技術要素`)}
        <Text mt="2" fontSize="xl" color="gray.700">
          {createExternalLink({
            text: `Qiita に解説記事を投稿しました！`,
            href: `https://qiita.com/Nag729/items/12d7099417850b6965ed`,
          })}
        </Text>
        <List mt="8" spacing={4}>
          <ListItem fontSize="lg">
            <ListIcon as={CheckCircleIcon} color="teal.500" />
            言語は
            {createExternalLink({
              text: `TypeScript`,
              href: `https://www.typescriptlang.org/`,
            })}
          </ListItem>
          <ListItem fontSize="lg">
            <ListIcon as={CheckCircleIcon} color="teal.500" />
            フロントエンドは
            {createExternalLink({
              text: `Next.js`,
              href: `https://nextjs.org/`,
            })}
            on
            {createExternalLink({
              text: `Vercel`,
              href: `https://vercel.com/home`,
            })}
          </ListItem>
          <ListItem fontSize="lg">
            <ListIcon as={CheckCircleIcon} color="teal.500" />
            バックエンドは
            {createExternalLink({
              text: `Express`,
              href: `https://expressjs.com/ja/`,
            })}
            on
            {createExternalLink({
              text: `AWS App Runner`,
              href: `https://aws.amazon.com/jp/apprunner/`,
            })}
          </ListItem>
          <ListItem fontSize="lg">
            <ListIcon as={CheckCircleIcon} color="teal.500" />
            双方向通信は
            {createExternalLink({
              text: `Socket.IO`,
              href: `https://socket.io/`,
            })}
          </ListItem>
        </List>
      </Flex>

      {/* Inquiries */}
      <Flex flexDirection="column" alignItems="center" mb="12">
        {createHeader(`お問い合わせ`)}
        <Text mt="2" fontSize="xl" color="gray.700">
          バグの報告や要望などございましたら
          {createExternalLink({
            text: `こちらのフォーム`,
            href: `https://forms.gle/5DU9zdBSPCTAR6x87`,
          })}
          よりお問い合わせください
        </Text>
        {createText(
          `個人開発のためすぐに回答できない場合もありますが、ご了承ください 🙏`
        )}
      </Flex>
    </>
  );
}
