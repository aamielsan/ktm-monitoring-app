import React from 'react';
import FormHeader from './FormHeader';
import DynamicForm from './DynamicForm';
import DisabledForm from './DisabledForm';
import { CDV_TYPE_MAP } from '../../constants';

function Form(props) {
  const { disabled, initialValues } = props;

  if (disabled) {
    return <DisabledForm typeMap={CDV_TYPE_MAP} initialValues={initialValues} />
  }

  return (
    <DynamicForm typeMap={CDV_TYPE_MAP} />
  );
}

export default function CdvForm(props) {
  const { disabled, initialValues } = props;
  return (
    <>
      <FormHeader>CDV</FormHeader>
      <Form disabled={disabled} initialValues={initialValues} />
    </>
  )
}

