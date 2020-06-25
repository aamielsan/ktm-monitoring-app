import React from 'react';
import Grid from '@material-ui/core/Grid';
import { useFormikContext } from 'formik';
import Detail from './Detail';

function DetailItem(props) {
  const { data, field } = props;
  return (
    <Grid item xs={12}>
      <Detail data={data} field={field} />
    </Grid>
  );
}

export default function DisabledForm(props) {
  const { typeMap, initialValues } = props;
  const { values } = useFormikContext() || {};
  return Object.keys(typeMap).map(field => (
    <DetailItem
      key={field}
       field={field}
      data={initialValues || values || {}}
    />
  ));
}
