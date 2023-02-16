import { Step, StepConnector, StepLabel, Stepper } from "@mui/material";

const steps = ["Create Quiz", "Add questions", "Publish"];

interface Props {
    activeStep: number;
}
const StepProcess = ({ activeStep }: Props) => {
    return (
        <Stepper activeStep={activeStep} alternativeLabel connector={<StepConnector />}>
            {steps.map((step, index) => {
                return (
                    <Step key={`step-${index}`}>
                        <StepLabel>{step}</StepLabel>
                    </Step>
                );
            })}
        </Stepper>
    );
};

export default StepProcess;
