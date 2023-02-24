import { Box, Step, StepConnector, StepLabel, Stepper } from "@mui/material";

const steps = ["Create Quiz", "Add questions", "Publish Quiz", "Invite candidates"];

interface Props {
    activeStep: number;
}
const StepProcess = ({ activeStep }: Props) => {
    return (
        <Box py="1rem">
            <Stepper activeStep={activeStep} alternativeLabel connector={<StepConnector />}>
                {steps.map((step, index) => {
                    return (
                        <Step key={`step-${index}`}>
                            <StepLabel>{step}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
        </Box>
    );
};

export default StepProcess;
