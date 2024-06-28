// src/App.js
import React, { useState } from "react";
import InvoiceForm from "./InvoiceForm";
import { CssBaseline, Container } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Invoice from "./Invoice";
import InvoiceContext from "./utils/invoiceContext";

function App() {
  const [image, setImage] = useState();
  const [invoiceData, setInvoiceData] = useState({});
  console.log(invoiceData);

  return (
    <React.Fragment>
      <CssBaseline />
      <InvoiceContext.Provider value={{ invoiceData, setInvoiceData }}>
        <Container>
          <Router>
            <Routes>
              <Route path="/" element={<InvoiceForm />} />
              <Route
                path="/invoice"
                element={<Invoice data={{ ...invoiceData }} />}
              />
            </Routes>
          </Router>
        </Container>
      </InvoiceContext.Provider>
    </React.Fragment>
  );
}

export default App;
