import React from 'react';
import FormHeader from './FormHeader';
import DynamicForm from './DynamicForm';
import DisabledForm from './DisabledForm';
import { APV_TYPE_MAP } from '../../constants';

function Form(props) {
  const { disabled, initialValues } = props;

  if (disabled) {
    return <DisabledForm typeMap={APV_TYPE_MAP} initialValues={initialValues} />
  }

  return (
    <DynamicForm typeMap={APV_TYPE_MAP} />
  );
}

export default function ApvForm(props) {
  const { disabled, initialValues } = props;
  return (
    <>
      <FormHeader>APV</FormHeader>
      <Form disabled={disabled} initialValues={initialValues} />
    </>
  );
}
