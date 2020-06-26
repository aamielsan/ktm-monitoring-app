import React from 'react';
import { Formik } from 'formik';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { getInitialValues } from '../../utils';
import RcpForm from '../../components/forms/RcpForm';
import ApvForm from '../../components/forms/ApvForm';
import { saveRcp } from '../../api';
import useSheetId from '../../hooks/useSheetId';

export default function ApvDialog(props) {
  const { open, onClose, data } = props;
  const classes = useStyles();
  const [ id ] = useSheetId();

  const initialValues = getInitialValues(data);

  function handleValidate(values) {
    const errors = {};

    if (!values.rcp_item) {
      errors.rcp_item = 'Required';
    }

    if (!values.apv_no) {
      errors.apv_no = 'Required';
    }

    return errors;
  }

  async function handleSubmit(data, { setSubmitting }) {
    try {
      setSubmitting(true);
      const res = await saveRcp({ id, data });
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
        validate={handleValidate}
        onSubmit={handleSubmit}
      >
        {({ submitForm, isSubmitting }) => (
          <>
            <DialogContent>
              <RcpForm disabled />
              <ApvForm />
            </DialogContent>
            <DialogActions>
              <Button disabled={isSubmitting} onClick={onClose} color="primary">
                Cancel
              </Button>
              <Button disabled={isSubmitting} onClick={submitForm} color="primary">
                Save
              </Button>
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
