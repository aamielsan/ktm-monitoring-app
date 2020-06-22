import React, { useMemo } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { DatePicker } from 'formik-material-ui-pickers';
import { Formik, FastField as Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { LABEL_MAP, RCP_TYPE_MAP, APV_TYPE_MAP, CDV_TYPE_MAP, COMMON_TYPE_MAP, TYPE_MAP } from '../constants';
import FormPanel from './FormPanel';
import { formatDate, DATE_FORMAT } from '../utils';

async function saveRcp(rcp) {
  try {
    if (!rcp) {
      return;
    }

    const res = await axios.post(process.env.REACT_APP_BACKEND_URL, rcp, {
      headers: {
        'x-api-key': process.env.REACT_APP_BACKEND_KEY,
      },
    });

    return res.data;

  } catch (e) {
    throw e;
  }
}

export default function RCPDialog(props) {
  const { open, onClose, data } = props;
  const classes = useStyles();

  const initialValues = useMemo(
    () => getInitialValues(data),
    [data]
  );

  const rcpFields = useMemo(
    () => renderFields(RCP_TYPE_MAP),
    []
  );

  const apvFields = useMemo(
    () => renderFields(APV_TYPE_MAP),
    []
  );

  const cdvFields = useMemo(
    () => renderFields(CDV_TYPE_MAP),
    []
  );

  const commonFields = useMemo(
    () => renderFields(COMMON_TYPE_MAP),
    []
  );

  async function handleSubmit(values, { setSubmitting }) {
    try {
      setSubmitting(true);
      const normalized = normalize(values);
      await saveRcp(normalized);
      setSubmitting(false);
      onClose();
    } catch (e) {
      alert(e.message);
    }
  }

  function handleValidate(values) {
    const errors = {};

    if (!values.rcp_item) {
      errors.rcp_item = 'Required';
    } else if (initialValues.rcp_item && values.rcp_item !== initialValues.rcp_item) {
      errors.rcp_item = 'Cannot be changed';
    }

    if (!values.updatedBy) {
      errors.updatedBy = 'Required';
    }

    return errors;
  }

  return (
    <Dialog fullWidth open={open} onClose={onClose}>
      <DialogTitle>{initialValues.rcp_item || 'Add'}</DialogTitle>
      <Formik
        initialValues={initialValues}
        validate={handleValidate}
        onSubmit={handleSubmit}
      >
        {({ submitForm, isSubmitting }) => (
          <>
            <DialogContent className={classes.content}>
              {/* RCP */}
              <FormPanel label="RCP">
                {rcpFields}
              </FormPanel>

              {/* APV */}
              <FormPanel label="APV">
                {apvFields}
              </FormPanel>

              {/* CDV */}
              <FormPanel label="CDV">
                {cdvFields}
              </FormPanel>
              <Box mx={2}>
                {commonFields}
              </Box>
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
  );
}

const useStyles = makeStyles(theme =>
  createStyles({
    content: {
      paddingLeft: 0,
      paddingRight: 0,
    },
    heading: {
      fontSize: theme.typography.pxToRem(16),
      fontWeight: theme.typography.fontWeightMedium,
    },
  }),
);

//
// ─── UTILS ───────────────────────────────────────────────────────────────────────────
//

function normalize(values) {
  return Object.keys(values).reduce((res, key) => {
    const isDate = TYPE_MAP[key] === 'date';
    const value = isDate ? formatDate(values[key]) : values[key];
    return {
      ...res,
      [key]: (value || '').trim(),
    }

  }, values);
}

function getInitialValues(initialValue = {}) {
  return Object.keys(TYPE_MAP).reduce((res, key) => ({
    ...res,
    [key]: initialValue[key] || null,
  }), {});
}

function renderFields(typeMap) {
  const gridProps = {
    item: true,
    xs: 12
  };

  const fieldProps = {
    fullWidth: true
  };

  return Object.keys(typeMap).map(key => {
    const name = key;
    const label = LABEL_MAP[key];
    const type = typeMap[key];

    switch (type) {
      case 'date': {
        return (
          <Grid key={name} {...gridProps}>
            <Field
              {...fieldProps}
              name={name}
              label={label}
              component={DatePicker}
              format={DATE_FORMAT}
            />
          </Grid>
        );
      }

      default: {
        return (
          <Grid key={name} {...gridProps}>
            <Field
              {...fieldProps}
              component={TextField}
              type={type}
              label={label}
              name={name}
            />
          </Grid>
        );
      }
    }
  });
}

