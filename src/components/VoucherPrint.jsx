import React, { forwardRef } from "react";
import { useSelector } from "react-redux";

const VoucherPrint = forwardRef((props, ref) => {
  const data = useSelector((state) => state.sales.lastSubmittedVoucher);

  if (!data) return <p>No voucher found</p>;

  return (
    <div ref={ref} className="p-4 bg-white text-black w-full">
      <h2 className="text-xl font-bold mb-2">Voucher #{data.header.vr_no}</h2>
      <p>Date: {data.header.vr_date}</p>
      <p>Account: {data.header.ac_name}</p>
      <p>Status: {data.header.status}</p>
      <p>Total Amount: ₹{data.header.ac_amt}</p>

      <table className="w-full mt-4 border border-collapse border-gray-300 text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th>Sr No</th>
            <th>Item Code</th>
            <th>Item Name</th>
            <th>Description</th>
            <th>Qty</th>
            <th>Rate</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {data.details.map((item, i) => (
            <tr key={i} className="text-center border-t border-gray-300">
              <td>{item.sr_no}</td>
              <td>{item.item_code}</td>
              <td>{item.item_name}</td>
              <td>{item.description}</td>
              <td>{item.qty}</td>
              <td>{item.rate}</td>
              <td>{item.qty * item.rate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default VoucherPrint;
