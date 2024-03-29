export const LABEL_MAP = {
  'rcp_item': 'Item',
  'rcp_payee': 'Payee',
  'rcp_invoiceRef': 'Invoice Ref.',
  'rcp_amtPeso': 'Amount (PHP)',
  'rcp_amtDollar': 'Amount (USD)',
  'rcp_particulars': 'Particulars',
  'rcp_dateDue': 'Due Date',
  'rcp_dateTransmitted': 'Date Transmitted',
  'apv_dateTransaction': 'Transaction Date',
  'apv_no': 'APV No.',
  'apv_remarks': 'Remarks',
  // 'apv_dateTransmitted': 'Date Transmitted',
  // 'apv_receivedBy': 'Received By',
  'cdv_dateTransaction': 'Transaction Date',
  'cdv_no': 'CDV No.',
  'cdv_checkNo': 'Check No.',
  // 'cdv_status': 'CDV Status',
  'cdv_checkStatus': 'Check Status',
  'cdv_datePayment': 'Released Date',
  'cdv_orNo': 'OR Reference',
}

export const RCP_TYPE_MAP = {
  'rcp_item': 'string',
  'rcp_payee': 'string',
  'rcp_invoiceRef': 'string',
  'rcp_amtPeso': 'php',
  'rcp_amtDollar': 'usd',
  'rcp_particulars': 'string',
  'rcp_dateDue': 'date',
  'rcp_dateTransmitted': 'date',
};

export const APV_TYPE_MAP = {
  'apv_dateTransaction': 'date',
  'apv_no': 'string',
  'apv_remarks': 'string',
  // 'apv_dateTransmitted': 'date',
  // 'apv_receivedBy': 'string',
};

export const CDV_TYPE_MAP = {
  'cdv_dateTransaction': 'date',
  'cdv_no': 'string',
  'cdv_checkNo': 'string',
  // 'cdv_status': 'string',
};

export const PAYMENT_TYPE_MAP = {
  'cdv_checkStatus': 'string',
  'cdv_datePayment': 'date',
  'cdv_orNo': 'string',
}

export const TYPE_MAP = {
  ...RCP_TYPE_MAP,
  ...APV_TYPE_MAP,
  ...CDV_TYPE_MAP,
  ...PAYMENT_TYPE_MAP,
};

export const CDV_CHECK_STAT_FSIGNATURE = 'For signature';
export const CDV_CHECK_STAT_FRELEASE = 'For release';
export const CDV_CHECK_STAT_RELEASED = 'Released';
