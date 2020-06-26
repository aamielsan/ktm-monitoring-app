import React from 'react';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { Select } from 'formik-material-ui';
import { DatePicker } from 'formik-material-ui-pickers';
import { FastField as Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { DATE_FORMAT } from '../../utils';
import {
  LABEL_MAP,
  CDV_CHECK_STAT_FRELEASE,
  CDV_CHECK_STAT_FSIGNATURE,
  CDV_CHECK_STAT_RELEASED,
} from '../../constants';

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

    // Lazy AF
    if (name === 'cdv_checkStatus') {
      return (
        <Grid key={name} {...gridProps}>
          <FormControl fullWidth>
            <InputLabel htmlFor={name}>{label}</InputLabel>
            <Field
                component={Select}
                name={name}
                inputProps={{ id: name }}
              >
                <MenuItem value={CDV_CHECK_STAT_FSIGNATURE}>{CDV_CHECK_STAT_FSIGNATURE}</MenuItem>
                <MenuItem value={CDV_CHECK_STAT_FRELEASE}>{CDV_CHECK_STAT_FRELEASE}</MenuItem>
                <MenuItem value={CDV_CHECK_STAT_RELEASED}>{CDV_CHECK_STAT_RELEASED}</MenuItem>
              </Field>
          </FormControl>
        </Grid>
      )
    }

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

export default function DynamicForm(props) {
  const { typeMap } = props;
  return (
    <Grid container spacing={1}>
      {renderFields(typeMap)}
    </Grid>
  );
}
