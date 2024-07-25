// src/components/BillTemplate.js
import React from 'react';
import './BillTemplate.css'; // Import the CSS file for styling

const BillTemplate = React.forwardRef(({ bill }, ref) => (
  <div ref={ref} className="bill-template">
    <div className="header">
      <div className="logo">
        <h1>DiveLanka</h1>
        <p>Trincomalee / Galle</p>
        <p>076 489 9898 / 071 9161 535</p>
      </div>
      <div className="invoice-details">
        <p>Invoice: {bill.invoiceNumber}</p>
        <p>Date: {bill.date}</p>
      </div>
    </div>
    <div className="customer-details">
      <p>Invoice to:</p>
      <p>{bill.customerName} ({bill.customerPhone})</p>
      <p>{bill.customerAddress}</p>
    </div>
    <table>
      <thead>
        <tr>
          <th>Qty.</th>
          <th>Item Description</th>
          <th>Price</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {bill.items.map((item, index) => (
          <tr key={index}>
            <td>{item.quantity}</td>
            <td>{item.description}</td>
            <td>{item.price}</td>
            <td>{item.total}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <div className="totals">
      <p>Sub Total: {bill.subTotal}</p>
      <p>Discount: {bill.discount}</p>
      <p>Total: {bill.total}</p>
    </div>
    <div className="footer">
      <p>Dive into adventure with our snorkeling gear. Explore vibrant underwater worlds with ease and clarity, making every moment unforgettable.</p>
    </div>
  </div>
));

export default BillTemplate;
