import React from 'react';
import FormHeader from './FormHeader';
import DynamicForm from './DynamicForm';
import DisabledForm from './DisabledForm';
import { PAYMENT_TYPE_MAP } from '../../constants';

function Form(props) {
  const { disabled, initialValues } = props;

  if (disabled) {
    return <DisabledForm typeMap={PAYMENT_TYPE_MAP} initialValues={initialValues} />
  }

  return (
    <DynamicForm typeMap={PAYMENT_TYPE_MAP} />
  );
}

export default function PaymentForm(props) {
  const { disabled, initialValues } = props;
  return (
    <>
      <FormHeader>Status</FormHeader>
      <Form disabled={disabled} initialValues={initialValues} />
    </>
  )
}

