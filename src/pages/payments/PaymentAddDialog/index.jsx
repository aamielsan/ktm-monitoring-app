import React, { useState } from 'react';
import { Formik } from 'formik';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { getInitialValues } from '../../../utils';
import PaymentForm from '../../../components/forms/PaymentForm';
import Step from './Step';
import Verify from './Verify';
import { saveRcp } from '../../../api';
import useSheetId from '../../../hooks/useSheetId';

const STEP_VERIFY = 'Verify';
const STEP_INPUT = 'Enter details';
const steps = [ { label: STEP_VERIFY }, { label: STEP_INPUT } ];

export default function PaymentAddDialog(props) {
  const { open, rows, onClose, initialValues } = props;
  const [ id ] = useSheetId();
  const [ activeStep, setActiveStep ] = useState(0);

  function handleNextClick() {
    setActiveStep(s => s + 1);
  }

  function handleBackClick() {
    setActiveStep(s => s - 1);
  }

  function renderContent() {
    switch (activeStep) {
      case 0:
        return <Verify rows={rows} />;
      case 1:
        return <PaymentForm />;
      default:
        return null;
    }
  }

  async function handleSubmit(values, { setSubmitting }) {
    try {
      setSubmitting(true);
      const tasks = rows.map(r => {
        const data = getInitialValues({ ...r, ...values });
        return saveRcp({ id, data });
      });
      const res = await Promise.all(tasks);
      console.log(res);
      onClose();
    } catch (e) {
      console.log('Error: ', e);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog fullWidth open={open} onClose={onClose}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({ submitForm, isSubmitting }) => (
          <>
            <DialogContent>
              <Step
                steps={steps}
                activeStep={activeStep}
              />
              {renderContent()}
            </DialogContent>
            <DialogActions>
              <Button disabled={isSubmitting} onClick={onClose} color="primary">
                Cancel
              </Button>
              <Button disabled={isSubmitting || activeStep === 0} onClick={handleBackClick} color="primary">
                Back
              </Button>
              {(activeStep < steps.length - 1)
                ? (
                  <Button disabled={isSubmitting} onClick={handleNextClick} color="primary">
                    Next
                  </Button>
                )
                : (
                  <Button disabled={isSubmitting} onClick={submitForm} color="primary">
                    Save
                  </Button>
              )}
            </DialogActions>
          </>
        )}
      </Formik>
    </Dialog>
  )
}
