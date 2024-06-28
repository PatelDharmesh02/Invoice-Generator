// src/InvoiceForm.js
import React, { useContext, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  IconButton,
  MenuItem,
} from "@mui/material";
import { Field, FieldArray, Formik } from "formik";
import * as Yup from "yup";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import axios from "axios";
import FileBase64 from "react-file-base64";
import { useNavigate } from "react-router-dom";
import invoiceContext from "./utils/invoiceContext";
import convertInWords from "./utils/convertInWords";

const InvoiceSchema = Yup.object().shape({
  seller_details: Yup.object().shape({
    name: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    state: Yup.string().required("Required"),
    pincode: Yup.string().required("Required"),
    pan_no: Yup.string().required("Required"),
    gst_no: Yup.string().required("Required"),
  }),
  placeOfSupply: Yup.string().required("Required"),
  billing_details: Yup.object().shape({
    name: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    state: Yup.string().required("Required"),
    pincode: Yup.string().required("Required"),
    state_code: Yup.string().required("Required"),
  }),
  shipping_details: Yup.object().shape({
    name: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    state: Yup.string().required("Required"),
    pincode: Yup.string().required("Required"),
    state_code: Yup.string().required("Required"),
  }),
  placeOfDelivery: Yup.string().required("Required"),
  order_details: Yup.object().shape({
    order_no: Yup.string().required("Required"),
    order_date: Yup.string().required("Required"),
  }),
  invoice_details: Yup.object().shape({
    invoice_no: Yup.string().required("Required"),
    invoice_code: Yup.string().required("Required"),
    invoice_date: Yup.string().required("Required"),
  }),
  reverse_charge: Yup.string().required("Required"),
  items: Yup.array().of(
    Yup.object().shape({
      description: Yup.string().required("Required"),
      unit_price: Yup.number().positive("Must be positive"),
      quantity: Yup.number().positive("Must be positive"),
      discount: Yup.number().min(0, "Must be at least 0"),
      tax_rate: Yup.number().positive("Must be positive"),
    })
  ),
  signature: Yup.string().required("Required"),
});

const InvoiceForm = () => {
  const [initialValues, setInitialValues] = useState({
    seller_details: {
      name: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      pan_no: "",
      gst_no: "",
    },
    placeOfSupply: "",
    billing_details: {
      name: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      state_code: "",
    },
    shipping_details: {
      name: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      state_code: "",
    },
    placeOfDelivery: "",
    order_details: {
      order_no: "",
      order_date: "",
    },
    invoice_details: {
      invoice_no: "",
      invoice_detail: "",
      invoice_date: "",
    },
    reverse_charge: "No",
    items: [
      {
        description: "",
        unit_price: 0,
        quantity: 0,
        discount: 0,
        tax_rate: 18,
      },
    ],
    signature: "",
    total_amount: 0,
    tax_amount: 0,
    amount_in_words: "",
  });

  const navigate = useNavigate();

  const { setInvoiceData } = useContext(invoiceContext);

  const handleSubmit = async (values) => {
    const totalAmount = values.items.reduce((accumulator, item) => {
      const totalBeforeDiscount = item.unit_price * item.quantity;
      const discountAmount = (totalBeforeDiscount * item.discount) / 100;
      const totalAfterDiscount = totalBeforeDiscount - discountAmount;
      return accumulator + totalAfterDiscount;
    }, 0);
    setInitialValues({ ...values, total_amount: totalAmount });
    console.log(initialValues, "here");
    const amountInWords = convertInWords(values.total_amount);
    setInitialValues({ ...values, amount_in_words: amountInWords });
    setInvoiceData(values);

    navigate("/invoice");
  };

  const handleChange = (setFieldValue) => (e) => {
    const { name, value } = e.target;
    setFieldValue(name, value);
  };

  return (
    <Container>
      <Paper sx={{ padding: 4, marginY: 4 }} elevation={3}>
        <Typography variant="h4" align="center" gutterBottom>
          Create Invoice
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={InvoiceSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleSubmit, setFieldValue, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h6">Seller Details</Typography>
                </Grid>
                {Object.keys(initialValues.seller_details).map((key) => (
                  <Grid item xs={6} sm={4} key={key}>
                    <TextField
                      fullWidth
                      name={`seller_details.${key}`}
                      label={key.replace(/_/g, " ").toUpperCase()}
                      value={values.seller_details[key]}
                      onChange={handleChange(setFieldValue)}
                      error={
                        touched.seller_details?.[key] &&
                        Boolean(errors.seller_details?.[key])
                      }
                      helperText={
                        touched.seller_details?.[key] &&
                        errors.seller_details?.[key]
                      }
                    />
                  </Grid>
                ))}
                <Grid item xs={12}>
                  <Typography variant="h6">Place Of Supply</Typography>
                </Grid>
                <Grid item xs={6} sm={4} key={"placeOfSupply"}>
                  <TextField
                    fullWidth
                    name={"placeOfSupply"}
                    label={"PLACE OF SUPPLY"}
                    value={values.placeOfSupply}
                    onChange={handleChange(setFieldValue)}
                    error={
                      touched.placeOfSupply && Boolean(errors.placeOfSupply)
                    }
                    helperText={touched.placeOfSupply && errors.placeOfSupply}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6">Billing Details</Typography>
                </Grid>
                {Object.keys(initialValues.billing_details).map((key) => (
                  <Grid item xs={6} sm={4} key={key}>
                    <TextField
                      fullWidth
                      name={`billing_details.${key}`}
                      label={key.replace(/_/g, " ").toUpperCase()}
                      value={values.billing_details[key]}
                      onChange={handleChange(setFieldValue)}
                      error={
                        touched.billing_details?.[key] &&
                        Boolean(errors.billing_details?.[key])
                      }
                      helperText={
                        touched.billing_details?.[key] &&
                        errors.billing_details?.[key]
                      }
                    />
                  </Grid>
                ))}
                <Grid item xs={12}>
                  <Typography variant="h6">Shipping Details</Typography>
                </Grid>
                {Object.keys(initialValues.shipping_details).map((key) => (
                  <Grid item xs={6} sm={4} key={key}>
                    <TextField
                      fullWidth
                      name={`shipping_details.${key}`}
                      label={key.replace(/_/g, " ").toUpperCase()}
                      value={values.shipping_details[key]}
                      onChange={handleChange(setFieldValue)}
                      error={
                        touched.shipping_details?.[key] &&
                        Boolean(errors.shipping_details?.[key])
                      }
                      helperText={
                        touched.shipping_details?.[key] &&
                        errors.shipping_details?.[key]
                      }
                    />
                  </Grid>
                ))}
                <Grid item xs={12}>
                  <Typography variant="h6">Place Of Delivery</Typography>
                </Grid>
                <Grid item xs={6} sm={4} key={"placeOfDelivery"}>
                  <TextField
                    fullWidth
                    name={"placeOfDelivery"}
                    label={"PLACE OF DELIVERY"}
                    value={values.placeOfDelivery}
                    onChange={handleChange(setFieldValue)}
                    error={
                      touched.placeOfSupply && Boolean(errors.placeOfDelivery)
                    }
                    helperText={
                      touched.placeOfDelivery && errors.placeOfDelivery
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6">Order Details</Typography>
                </Grid>
                {Object.keys(initialValues.order_details).map((key) => (
                  <Grid item xs={6} sm={4} key={key}>
                    <TextField
                      fullWidth
                      name={`order_details.${key}`}
                      label={key.replace(/_/g, " ").toUpperCase()}
                      value={values.order_details[key]}
                      onChange={handleChange(setFieldValue)}
                      error={
                        touched.order_details?.[key] &&
                        Boolean(errors.order_details?.[key])
                      }
                      helperText={
                        touched.order_details?.[key] &&
                        errors.order_details?.[key]
                      }
                    />
                  </Grid>
                ))}
                <Grid item xs={12}>
                  <Typography variant="h6">Invoice Details</Typography>
                </Grid>
                {Object.keys(initialValues.invoice_details).map((key) => (
                  <Grid item xs={6} sm={4} key={key}>
                    <TextField
                      fullWidth
                      name={`invoice_details.${key}`}
                      label={key.replace(/_/g, " ").toUpperCase()}
                      value={values.invoice_details[key]}
                      onChange={handleChange(setFieldValue)}
                      error={
                        touched.invoice_details?.[key] &&
                        Boolean(errors.invoice_details?.[key])
                      }
                      helperText={
                        touched.invoice_details?.[key] &&
                        errors.invoice_details?.[key]
                      }
                    />
                  </Grid>
                ))}
                <Grid item xs={12}>
                  <Typography variant="h6">Reverse Charge</Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    select
                    name="reverse_charge"
                    label="Reverse Charge"
                    value={values.reverse_charge}
                    onChange={handleChange(setFieldValue)}
                    error={
                      touched.reverse_charge && Boolean(errors.reverse_charge)
                    }
                    helperText={touched.reverse_charge && errors.reverse_charge}
                  >
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6">Items</Typography>
                </Grid>
                <Grid item xs={12}>
                  <FieldArray name="items">
                    {({ push, remove }) => (
                      <React.Fragment>
                        {values.items.map((item, index) => (
                          <Grid
                            container
                            spacing={2}
                            key={index}
                            alignItems="start"
                            marginBottom={2}
                          >
                            {Object.keys(item).map((key) => (
                              <Grid item xs={6} sm={3} key={key}>
                                <TextField
                                  fullWidth
                                  name={`items.${index}.${key}`}
                                  label={key.replace(/_/g, " ").toUpperCase()}
                                  value={item[key]}
                                  onChange={handleChange(setFieldValue)}
                                  error={
                                    touched.items?.[index]?.[key] &&
                                    Boolean(errors.items?.[index]?.[key])
                                  }
                                  helperText={
                                    touched.items?.[index]?.[key] &&
                                    errors.items?.[index]?.[key]
                                  }
                                />
                              </Grid>
                            ))}
                            <Grid item>
                              <IconButton
                                onClick={() => remove(index)}
                                sx={{ border: "1px solid grey" }}
                              >
                                <RemoveIcon />
                              </IconButton>
                            </Grid>
                          </Grid>
                        ))}
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<AddIcon />}
                          sx={{
                            marginTop: "16px",
                            marginBottom: "16px",
                          }}
                          onClick={() =>
                            push({
                              description: "",
                              unit_price: 0,
                              quantity: 0,
                              discount: 0,
                              tax_rate: 18,
                            })
                          }
                        >
                          Add Item
                        </Button>
                      </React.Fragment>
                    )}
                  </FieldArray>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6">Signature Image</Typography>
                </Grid>
                <Grid item xs={12}>
                  <FileBase64
                    multiple={false}
                    onDone={({ base64 }) => {
                      setFieldValue("signature", base64);
                    }}
                  />
                  {values.signature && (
                    <img
                      src={values.signature}
                      alt="Signature Preview"
                      style={{ marginTop: "16px", maxWidth: "200px" }}
                    />
                  )}
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{ marginTop: "16px", marginBottom: "16px" }}
                  >
                    Create Invoice
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default InvoiceForm;
