export const calculateNetAmount = (unit_price, qunatity, discount) => {
  const amount = Math.round(qunatity * unit_price);
  const discountAmount = Math.round(amount * (discount / 100));
  return amount - discountAmount;
};

export const calculateTotalAmount = (net_amount, tax_rate) => {
  const taxAmount = Math.round(net_amount * (tax_rate / 100));
  return net_amount + taxAmount;
};
