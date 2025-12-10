'use client';

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Swal from "sweetalert2";

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
}

const EditCustomerPage = () => {
  const router = useRouter();
  const params = useParams();
  const customerId = Number(params?.id); // Get dynamic id

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch customer by ID
  useEffect(() => {
    if (!customerId) return;

    const fetchCustomer = async () => {
      try {
        const res = await fetch(`https://localhost:44385/api/Customers/${customerId}`);
        if (!res.ok) throw new Error("Failed to fetch customer");
        const data = await res.json();
        setCustomer(data);
      } catch (err) {
        console.error(err);
        alert("Error fetching customer data");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [customerId]);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!customer) return;
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  // Save updates
const handleSave = async () => {
  if (!customer) return;
  setSaving(true);

  try {
    const res = await fetch(`https://localhost:44385/api/Customers/${customerId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(customer),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data?.message || "Failed to update customer");
    }

    // Success alert
    await Swal.fire({
      icon: 'success',
      title: 'Customer Updated',
      text: 'Customer updated successfully!',
      timer: 2000,
      showConfirmButton: false,
    });

    router.push("/dashboard/customers"); // Navigate back to customer list
  } catch (err: any) {
    console.error(err);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: err.message || 'Error updating customer',
    });
  } finally {
    setSaving(false);
  }
};
  if (loading) return <p>Loading customer...</p>;
  if (!customer) return <p>Customer not found</p>;

  return (
    // <div className="p-6 bg-white max-w-md mx-auto rounded shadow">
         <div className="p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Edit Customer</h1>

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={customer.name}
        onChange={handleChange}
        className="border p-2 rounded w-full mb-3"
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={customer.email}
        onChange={handleChange}
        className="border p-2 rounded w-full mb-3"
        required
      />

      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={customer.phone}
        onChange={handleChange}
        className="border p-2 rounded w-full mb-3"
        required
      />

      <button
        onClick={handleSave}
        disabled={saving}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
};

export default EditCustomerPage;
