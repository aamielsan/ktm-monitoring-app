import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import MuiStep from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

export default function Step(props) {
  const { steps = [], activeStep = 0 } = props;

  return (
    <Stepper activeStep={activeStep}>
      {steps.map(({ label }) => {
        return (
          <MuiStep key={label}>
            <StepLabel>{label}</StepLabel>
          </MuiStep>
        );
      })}
    </Stepper>
  );
}
