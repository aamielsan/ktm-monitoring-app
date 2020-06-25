import React from 'react';
import FormHeader from './FormHeader';
import DynamicForm from './DynamicForm';
import DisabledForm from './DisabledForm';
import { RCP_TYPE_MAP } from '../../constants';

function Form(props) {
  const { disabled, initialValues } = props;

  if (disabled) {
    return <DisabledForm initialValues={initialValues} typeMap={RCP_TYPE_MAP} />
  }

  return (
    <DynamicForm typeMap={RCP_TYPE_MAP} />
  );
}

export default function RcpForm(props) {
  const { disabled, initialValues } = props;
  return (
    <>
      <FormHeader />
      <Form disabled={disabled} initialValues={initialValues} />
    </>
  );
}
