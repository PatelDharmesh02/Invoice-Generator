// src/App.js
import React from 'react';
import InvoiceForm from './InvoiceForm';
import { CssBaseline, Container } from '@mui/material';

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <InvoiceForm />
      </Container>
    </React.Fragment>
  );
}

export default App;
