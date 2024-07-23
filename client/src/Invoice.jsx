import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import ReactToPrint from "react-to-print";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { calculateNetAmount, calculateTotalAmount } from "./utils/calculate";
import convertInWords from "./utils/convertInWords";

const Invoice = ({ data }) => {
  const invoiceRef = useRef(null);

  const [columnDefs] = useState([
    { headerName: "Sl. No", field: "sl_no", maxWidth: 80 },
    { headerName: "Description", field: "description", minWidth: 140 },
    {
      headerName: "Unit Price(₹)",
      field: "unit_price",
      maxWidth: 115
    },
    {
      headerName: "Quantity",
      field: "quantity",
    },
    {
      headerName: "Discount(%)",
      field: "discount",
    },
    { headerName: "Net Amount(₹)", field: "net_amount" },
    { headerName: "Tax Rate(%)", field: "tax_rate", maxWidth: 120 },
    { headerName: "Tax Type", field: "tax_type", maxWidth: 100 },
    { headerName: "Total Amount(₹)", field: "total_amount" },
  ]);

  const [rowData, setRowData] = useState([]);

  const totalAmountSum = () => {
    let totalSum = 0;
    rowData?.forEach(
      (row) => (totalSum += parseFloat(row.total_amount.replace(/,/g, "")))
    );
    return totalSum;
  };

  const pinnedBottomRowData = [
    {
      id: "description",
      name: "Total Amount",
      total_amount: totalAmountSum().toLocaleString("en-IN"),
      description: "Total Amount(₹)",
    },
  ];

  const defaultColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true,
    sortable: true,
  };

  useEffect(() => {
    const modiFiedRowData = data.items?.map((item, index) => {
      const net_amount = calculateNetAmount(
        item.unit_price,
        item.quantity,
        item.discount
      );
      const total_amount = calculateTotalAmount(net_amount, item.tax_rate);
      return {
        ...item,
        sl_no: index + 1,
        net_amount: net_amount.toLocaleString("en-IN"),
        total_amount: total_amount.toLocaleString("en-IN"),
      };
    });
    setRowData(modiFiedRowData);
  }, [data]);

  return (
    <>
      <Box padding={2} ref={invoiceRef}>
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
              <Typography>{data.seller_details?.name || "NA"}</Typography>
              <Typography>{data.seller_details?.address || "NA"}</Typography>
              <Typography>{data.seller_details?.city || "NA"}</Typography>
              <Typography>
                {data.seller_details?.state || "NA"}
                {data.seller_details?.pincode || "NA"}
              </Typography>
            </Grid>
            <Grid item xs={6} textAlign={"right"}>
              <Typography fontWeight={"bold"} variant="h6">
                Billing Address:
              </Typography>
              <Typography>{data.billing_details?.name || "NA"}</Typography>
              <Typography>{data.billing_details?.address || "NA"}</Typography>
              <Typography>{data.billing_details?.city || "NA"}</Typography>
              <Typography>
                {data.billing_details?.state || "NA"},
                {data.billing_details?.pincode || "NA"}
              </Typography>
              <Typography fontWeight={"bold"}>
                State/UT Code: {data.billing_details?.state_code || "NA"}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={6} flexDirection={"column"}>
            <Typography fontWeight={"bold"} display={"flex"}>
              PAN No:
              <Typography>{data.seller_details?.pan_no || "NA"}</Typography>
            </Typography>
            <Typography fontWeight={"bold"} display={"flex"}>
              GST Registration No:
              <Typography>{data.seller_details?.gst_no || "NA"}</Typography>
            </Typography>
          </Grid>
          <Grid container xs={12} justifyContent={"flex-end"}>
            <Grid item xs={6} textAlign={"right"}>
              <Typography fontWeight={"bold"} variant="h6">
                Shipping Address:
              </Typography>
              <Typography>{data.shipping_details?.name || "NA"}</Typography>
              <Typography>{data.shipping_details?.address || "NA"}</Typography>
              <Typography>{data.shipping_details?.city || "NA"}</Typography>
              <Typography>
                {data.shipping_details?.state || "NA"},
                {data.shipping_details?.pincode || "NA"}
              </Typography>
              <Typography fontWeight={"bold"}>
                State/UT Code: {data.shipping_details?.state_code || "NA"}
              </Typography>
            </Grid>
          </Grid>
          <Grid container xs={12} alignItems={"flex-end"}>
            <Grid item xs={6} paddingLeft={2}>
              <Typography fontWeight={"bold"} display={"flex"}>
                Order Number:
                <Typography>{data.order_details?.order_no || "NA"}</Typography>
              </Typography>
              <Typography fontWeight={"bold"} display={"flex"}>
                Order Date:
                <Typography>
                  {data.order_details?.order_date || "NA"}
                </Typography>
              </Typography>
            </Grid>
            <Grid item xs={6} textAlign={"right"}>
              <Typography fontWeight={"bold"}>
                Place Of Supply: {data.placeOfSupply || "NA"}
              </Typography>
              <Typography fontWeight={"bold"}>
                Place of Delivery: {data.placeOfDelivery || "NA"}
              </Typography>
              <Typography fontWeight={"bold"}>
                Invoice No: {data.invoice_details?.invoice_no || "NA"}
              </Typography>
              <Typography fontWeight={"bold"}>
                Invoice Details: {data.invoice_details?.invoice_detail || "NA"}
              </Typography>
              <Typography fontWeight={"bold"}>
                Invoice Date: {data.invoice_details?.invoice_date || "NA"}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <div className="ag-theme-alpine">
              <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                domLayout="autoHeight"
                pinnedBottomRowData={pinnedBottomRowData}
              />
            </div>
          </Grid>
          <Grid item xs={12} display={"flex"}>
            <Typography fontWeight={"bold"}>Amount in Words:</Typography>
            <Typography fontWeight={"bold"}>
              {convertInWords(totalAmountSum())}
            </Typography>
          </Grid>
          <Grid item xs={12} textAlign={"right"}>
            <Typography fontWeight={"bold"}>
              For {data.seller_details?.name || "NA"}
            </Typography>
            <img src={data.signature} style={{ height: 50, width: 200 }} alt="signature" />
            <Typography fontWeight={"bold"}>Authorized Signatory</Typography>
          </Grid>
        </Grid>
      </Box>
      <Grid item xs={12} display={"flex"} justifyContent={"center"} my={"20px"}>
        <ReactToPrint
          trigger={() => (
            <Button variant="contained" color="primary">
              Print Invoice
            </Button>
          )}
          content={() => invoiceRef.current}
        />
      </Grid>
    </>
  );
};

export default Invoice;
