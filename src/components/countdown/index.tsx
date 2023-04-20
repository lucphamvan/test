import { Flex } from "@/components";
import styled from "@emotion/styled";
import { Box } from "@mui/material";

const TimeBox = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    font-family: Oswald, sans-serif;
    color: white;
    font-size: 2rem;
    background-color: #235f41;
    padding: 0.5rem 0.75rem;
    width: 3.5rem;
    border-radius: 3px;
`;

const Text = styled(Box)`
    font-weight: 600;
    font-family: Oswald, sans-serif;
    font-size: 2rem;
    color: #235f41;
`;

interface TimeBoxProps {
    day: number;
    hour: number;
    minute: number;
    second: number;
}

const Countdown = ({ day, hour, minute, second }: TimeBoxProps) => {
    if (day + hour + minute + second <= 0) return <Text>TIME END</Text>;
    return (
        <Flex gap="1rem" width="max-content">
            {Boolean(day) && <TimeBox>{day?.toString().padStart(2, "0")}</TimeBox>}
            <TimeBox>{hour?.toString().padStart(2, "0")}</TimeBox>
            <TimeBox>{minute?.toString().padStart(2, "0")}</TimeBox>
            <TimeBox>{second?.toString().padStart(2, "0")}</TimeBox>
        </Flex>
    );
};
export default Countdown;
