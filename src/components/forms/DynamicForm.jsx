import React from 'react';
import Grid from '@material-ui/core/Grid';
import { DatePicker } from 'formik-material-ui-pickers';
import { FastField as Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { DATE_FORMAT } from '../../utils';
import { LABEL_MAP } from '../../constants';

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

export default function DynamicForm(props) {
  const { typeMap } = props;
  return (
    <Grid container spacing={1}>
      {renderFields(typeMap)}
    </Grid>
  );
}
