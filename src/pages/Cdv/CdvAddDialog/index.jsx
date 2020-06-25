import React, { useState, useMemo } from 'react';
import { Formik } from 'formik';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { getInitialValues, getCdvInitialValues } from '../../../utils';
import CdvForm from '../../../components/forms/CdvForm';
import Step from './Step';
import CdvList from './CdvList';
import { saveRcp } from '../../../api';
import useSheetId from '../../../hooks/useSheetId';

const STEP_SELECT_APV = 'Verify APVs';
const STEP_INPUT_CDV = 'Enter CDV details';
const steps = [ { label: STEP_SELECT_APV }, { label: STEP_INPUT_CDV } ];

export default function CdvAddDialog(props) {
  const { open, rows, onClose, data } = props;
  const classes = useStyles();
  const [ id ] = useSheetId();
  const [ activeStep, setActiveStep ] = useState(0);
  const initialValues = useMemo(() => getCdvInitialValues(data), [data]);

  function handleNextClick() {
    setActiveStep(s => s + 1);
  }

  function handleBackClick() {
    setActiveStep(s => s - 1);
  }

  function renderContent() {
    switch (activeStep) {
      case 0:
        return <CdvList rows={rows} />;
      case 1:
        return <CdvForm />;
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
      <DialogTitle className={classes.title}>{initialValues.rcp_item}</DialogTitle>
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

const useStyles = makeStyles(() =>
  createStyles({
    title: {
      paddingBottom: 0,
    },
  }),
);
