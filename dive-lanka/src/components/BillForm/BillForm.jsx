// src/components/BillForm.jsx
import React, { useState } from 'react';
import './BillForm.scss';

const BillForm = ({ onAddBill }) => {
  const [formData, setFormData] = useState({
    invoiceNumber: '',
    customerName: '',
    customerPhone: '',
    customerAddress: '',
    date: '',
    items: [{ description: '', quantity: 1, price: 0, total: 0 }],
    subTotal: 0,
    discount: 0,
    total: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const items = [...formData.items];
    items[index][name] = value;
    items[index].total = items[index].quantity * items[index].price;
    setFormData({ ...formData, items, subTotal: calculateSubTotal(items), total: calculateTotal(items, formData.discount) });
  };

  const addItem = () => {
    setFormData({ ...formData, items: [...formData.items, { description: '', quantity: 1, price: 0, total: 0 }] });
  };

  const calculateSubTotal = (items) => {
    return items.reduce((acc, item) => acc + item.total, 0);
  };

  const calculateTotal = (items, discount) => {
    return calculateSubTotal(items) - discount;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddBill(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bill-form">
      <div>
        <label>
          Invoice Number:
          <input type="text" name="invoiceNumber" value={formData.invoiceNumber} onChange={handleInputChange} required />
        </label>
      </div>
      <div>
        <label>
          Customer Name:
          <input type="text" name="customerName" value={formData.customerName} onChange={handleInputChange} required />
        </label>
      </div>
      <div>
        <label>
          Customer Phone:
          <input type="text" name="customerPhone" value={formData.customerPhone} onChange={handleInputChange} required />
        </label>
      </div>
      <div>
        <label>
          Customer Address:
          <input type="text" name="customerAddress" value={formData.customerAddress} onChange={handleInputChange} required />
        </label>
      </div>
      <div>
        <label>
          Date:
          <input type="date" name="date" value={formData.date} onChange={handleInputChange} required />
        </label>
      </div>
      {formData.items.map((item, index) => (
        <div key={index} className="item-row">
          <label>
            Description:
            <input type="text" name="description" value={item.description} onChange={(e) => handleItemChange(index, e)} required />
          </label>
          <label>
            Quantity:
            <input type="number" name="quantity" value={item.quantity} onChange={(e) => handleItemChange(index, e)} required />
          </label>
          <label>
            Price:
            <input type="number" name="price" value={item.price} onChange={(e) => handleItemChange(index, e)} required />
          </label>
          <label>
            Total:
            <input type="number" name="total" value={item.total} readOnly />
          </label>
        </div>
      ))}
      <button type="button" onClick={addItem}>Add Item</button>
      <div>
        <label>
          Sub Total:
          <input type="number" name="subTotal" value={formData.subTotal} readOnly />
        </label>
      </div>
      <div>
        <label>
          Discount:
          <input type="number" name="discount" value={formData.discount} onChange={handleInputChange} required />
        </label>
      </div>
      <div>
        <label>
          Total:
          <input type="number" name="total" value={formData.total} readOnly />
        </label>
      </div>
      <button type="submit">Generate Bill</button>
    </form>
  );
};

export default BillForm;
