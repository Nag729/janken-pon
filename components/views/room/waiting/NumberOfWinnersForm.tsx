import {
  Box,
  Flex,
  Heading,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";

type NumberOfWinnersFormProps = {
  isHost: boolean;
  userCount: number;
  numberOfWinners: number;
  setNumberOfWinners: (numberOfWinners: number) => void;
};

export default function NumberOfWinnersForm(
  props: NumberOfWinnersFormProps
): JSX.Element {
  const maxNumberOfWinners = Math.max(1, Math.min(props.userCount - 1, 8));

  return (
    <Box>
      {/* Heading */}
      <Heading size="xl" textAlign="center" color="gray.700">
        勝つ人数は？ 🤔
      </Heading>

      {/* Number of Winners Input */}
      <Flex mt="6" justifyContent="center" alignItems="center">
        <Slider
          flex="1"
          defaultValue={1}
          min={1}
          max={maxNumberOfWinners}
          step={1}
          value={props.numberOfWinners}
          onChange={(value) => props.setNumberOfWinners(value)}
          isDisabled={!props.isHost || maxNumberOfWinners <= 1}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb fontSize="md" boxSize="36px">
            {props.numberOfWinners}
          </SliderThumb>
        </Slider>
      </Flex>
    </Box>
  );
}
