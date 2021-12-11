import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Button, Stack } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

type LinkButtonProps = {
  href: string;
  children: React.ReactNode;
};

export default function LinkButton(props: LinkButtonProps): JSX.Element {
  return (
    <NextLink href={props.href}>
      <Stack>
        <Button rightIcon={<ArrowForwardIcon />} colorScheme="teal" size="lg">
          {props.children}
        </Button>
      </Stack>
    </NextLink>
  );
}
