import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
} from "@mui/material";

const Invoice = ({ data }) => {
    console.log(data);
  return (
    <Box padding={2}>
      <Grid container spacing={2}>
        <Grid container spacing={2} alignItems={"end"}>
          <Grid item xs={6}>
            <Typography variant="h2">Company</Typography>
          </Grid>
          <Grid item xs={6} textAlign={"right"}>
            <Typography fontWeight={"bold"} variant="h6">
              Tax Invoice/Bill of Supply/Cash Memo
            </Typography>
            <Typography variant="body">(Original for Recipient)</Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} container spacing={2}>
          <Grid item xs={6}>
            <Typography fontWeight={"bold"} variant="h6">
              Sold By:
            </Typography>
            <Typography>{data.seller_details.name}</Typography>
            <Typography>{data.seller_details.address}</Typography>
            <Typography>{data.seller_details.city}</Typography>
            <Typography>
              {data.seller_details.state} {data.seller_details.pincode}
            </Typography>
          </Grid>
          <Grid item xs={6} textAlign={"right"}>
            <Typography fontWeight={"bold"} variant="h6">
              Billing Address:
            </Typography>
            <Typography>{data.billing_details.name}</Typography>
            <Typography>{data.billing_details.address}</Typography>
            <Typography>{data.billing_details.city}</Typography>
            <Typography>
              {data.billing_details.state}, {data.billing_details.pincode}
            </Typography>
            <Typography fontWeight={"bold"}>
              State/UT Code: {data.billing_details.state_code}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={6} flexDirection={"column"}>
          <Typography fontWeight={"bold"} display={"flex"}>
            PAN No: <Typography>{data.seller_details.pan_no}</Typography>{" "}
          </Typography>
          <Typography fontWeight={"bold"} display={"flex"}>
            GST Registration No:{" "}
            <Typography>{data.seller_details.gst_no}</Typography>
          </Typography>
        </Grid>
        <Grid container xs={12} justifyContent={"flex-end"}>
          <Grid item xs={6} textAlign={"right"}>
            <Typography fontWeight={"bold"} variant="h6">
              Shipping Address:
            </Typography>
            <Typography>{data.shipping_details.name}</Typography>
            <Typography>{data.shipping_details.address}</Typography>
            <Typography>{data.shipping_details.city}</Typography>
            <Typography>
              {data.shipping_details.state}, {data.shipping_details.pincode}
            </Typography>
            <Typography fontWeight={"bold"}>
              State/UT Code: {data.shipping_details.state_code}
            </Typography>
          </Grid>
        </Grid>
        <Grid container xs={12} alignItems={"flex-end"}>
          <Grid item xs={6} paddingLeft={2}>
            <Typography fontWeight={"bold"} display={"flex"}>
              Order Number:
              <Typography>{data.order_details.order_no}</Typography>
            </Typography>
            <Typography fontWeight={"bold"} display={"flex"}>
              Order Date:
              <Typography>{data.order_details.order_date}</Typography>
            </Typography>
          </Grid>
          <Grid item xs={6} textAlign={"right"}>
            <Typography fontWeight={"bold"}>
              Place Of Supply: {data.placeOfSupply}
            </Typography>
            <Typography fontWeight={"bold"}>
              Place of Delivery: {data.placeOfDelivery}
            </Typography>
            <Typography fontWeight={"bold"}>
              Invoice No: {data.invoice_details.invoice_no}
            </Typography>
            <Typography fontWeight={"bold"}>
              Invoice Details: {data.invoice_details.invoice_detail}
            </Typography>
            <Typography fontWeight={"bold"}>
              Invoice Date: {data.invoice_details.invoice_date}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Sl. No</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell align="right">Unit Price</TableCell>
                  <TableCell align="right">Qty</TableCell>
                  <TableCell align="right">Discount</TableCell>
                  <TableCell align="right">Net Amount</TableCell>
                  <TableCell align="right">Tax Rate</TableCell>
                  <TableCell align="right">Tax Type</TableCell>
                  <TableCell align="right">Total Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell align="right">{item.unit_price}</TableCell>
                    <TableCell align="right">{item.quantity}</TableCell>
                    <TableCell align="right">{item.net_amount}</TableCell>
                    <TableCell align="right">{item.taxRate}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={7} align="right">
                    Tax Amount:
                  </TableCell>
                  <TableCell align="right">{data.tax_amount}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={7} align="right">
                    TOTAL:
                  </TableCell>
                  <TableCell align="right">{data.total_amount}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12}>
          <Typography fontWeight={"bold"}>Amount in Words:</Typography>
          <Typography fontWeight={"bold"}>{data.amount_in_words}</Typography>
        </Grid>
        <Grid item xs={12} textAlign={"right"}>
          <Typography fontWeight={"bold"}>For varadhi Silk Export:</Typography>
          {data.logo && (
            <img
              src={data.signature}
              alt="Logo"
              style={{ height: 50, width: 200 }}
            />
          )}
          <Typography fontWeight={"bold"}>Authorized Signatory</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography fontWeight={600}>{data.footerNote}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Invoice;
