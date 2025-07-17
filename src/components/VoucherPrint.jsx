import React, { forwardRef } from "react";
import { useSelector } from "react-redux";

const VoucherPrint = forwardRef((props, ref) => {
  const data = useSelector((state) => state.sales.lastSubmittedVoucher);

  if (!data) return <p>No voucher found</p>;

  return (
    <div ref={ref} className="p-8 bg-white text-black text-sm font-sans w-full max-w-3xl mx-auto">
      {/* Header Section */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold uppercase tracking-wide">Company Name</h1>
        <p className="text-sm">123 Business St, City, ZIP</p>
        <p className="text-sm">Phone: 9876543210 | Email: info@company.com</p>
      </div>

      {/* Voucher Info */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2 underline">Voucher Details</h2>
        <div className="grid grid-cols-2 gap-y-1 gap-x-8">
          <p><strong>Voucher No:</strong> {data.header_table.vr_no}</p>
          <p><strong>Date:</strong> {data.header_table.vr_date}</p>
          <p><strong>Account:</strong> {data.header_table.ac_name}</p>
          <p><strong>Status:</strong> {data.header_table.status}</p>
          <p><strong>Total Amount:</strong> ₹{data.header_table.ac_amt}</p>
        </div>
      </div>

      {/* Item Table */}
      <table className="w-full mt-6 border border-collapse border-gray-400 text-xs">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-400 px-2 py-1">Sr No</th>
            <th className="border border-gray-400 px-2 py-1">Item Code</th>
            <th className="border border-gray-400 px-2 py-1">Item Name</th>
            <th className="border border-gray-400 px-2 py-1">Description</th>
            <th className="border border-gray-400 px-2 py-1">Qty</th>
            <th className="border border-gray-400 px-2 py-1">Rate</th>
            <th className="border border-gray-400 px-2 py-1">Total</th>
          </tr>
        </thead>
        <tbody>
          {data.detail_table.map((item, i) => (
            <tr key={i} className="text-center">
              <td className="border border-gray-300 px-2 py-1">{item.sr_no}</td>
              <td className="border border-gray-300 px-2 py-1">{item.item_code}</td>
              <td className="border border-gray-300 px-2 py-1">{item.item_name}</td>
              <td className="border border-gray-300 px-2 py-1">{item.description}</td>
              <td className="border border-gray-300 px-2 py-1">{item.qty}</td>
              <td className="border border-gray-300 px-2 py-1">₹{item.rate}</td>
              <td className="border border-gray-300 px-2 py-1">
                ₹{(item.qty * item.rate).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Footer Section */}
      <div className="mt-10 flex justify-between text-sm">
        <div>
          <p>Received By:</p>
          <div className="border-t border-black w-40 mt-6" />
        </div>
        <div>
          <p>Authorized Signatory:</p>
          <div className="border-t border-black w-40 mt-6" />
        </div>
      </div>
    </div>
  );
});

export default VoucherPrint;
