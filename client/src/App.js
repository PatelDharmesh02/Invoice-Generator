import React, { useState } from "react";
import InvoiceForm from "./InvoiceForm";
import { CssBaseline, Container } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Invoice from "./Invoice";
import InvoiceContext from "./utils/invoiceContext";

function App() {
  const [invoiceData, setInvoiceData] = useState({});

  return (
    <React.Fragment>
      <CssBaseline />
      <InvoiceContext.Provider value={{ invoiceData, setInvoiceData }}>
        <Container>
          <Router>
            <Routes>
              <Route
                path="/invoice"
                element={<Invoice data={{ ...invoiceData }} />}
              />
              <Route path="*" element={<InvoiceForm />} />
            </Routes>
          </Router>
        </Container>
      </InvoiceContext.Provider>
    </React.Fragment>
  );
}

export default App;
