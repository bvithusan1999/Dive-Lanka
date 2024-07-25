// src/App.jsx
import React, { useRef, useState } from 'react';
import BillForm from './components/BillForm';
import BillTemplate from './components/BillTemplate';
import ReactToPrint from 'react-to-print';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './App.css'; // Import any global styles

const App = () => {
  const [bill, setBill] = useState(null);
  const billRef = useRef();

  const handleAddBill = (billData) => {
    setBill(billData);
  };

  const handlePrint = () => {
    const input = billRef.current;
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0);
        pdf.save('bill.pdf');
      });
  };

  return (
    <div>
      <BillForm onAddBill={handleAddBill} />
      {bill && (
        <div>
          <BillTemplate ref={billRef} bill={bill} />
          <ReactToPrint
            trigger={() => <button>Print Bill</button>}
            content={() => billRef.current}
          />
          <button onClick={handlePrint}>Export as PDF</button>
        </div>
      )}
    </div>
  );
};

export default App;
