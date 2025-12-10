'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface PageProps {
  params: { id: string };
}

const EditCustomerPage: React.FC<PageProps> = ({ params }) => {
  const router = useRouter();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const customerId = params.id;

  // Fetch customer by ID
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const res = await fetch(`https://localhost:44385/api/Customers/${customerId}`);
        const data = await res.json();
        setCustomer(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomer();
  }, [customerId]);

  // Handle form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!customer) return;
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  // Save changes
  const handleSave = async () => {
    if (!customer) return;
    setSaving(true);
    try {
      const res = await fetch(`https://localhost:44385/api/Customers/${customerId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customer)
      });

      if (!res.ok) throw new Error("Failed to update customer");

      alert("Customer updated successfully");
      router.push("/dashboard/customers"); // go back to list
    } catch (err) {
      console.error(err);
      alert("Error updating customer");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading customer...</p>;
  if (!customer) return <p>Customer not found</p>;

  return (
    <div className="p-6 bg-white max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Customer</h1>

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={customer.name}
        onChange={handleChange}
        className="border p-2 rounded w-full mb-3"
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={customer.email}
        onChange={handleChange}
        className="border p-2 rounded w-full mb-3"
      />

      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={customer.phone}
        onChange={handleChange}
        className="border p-2 rounded w-full mb-3"
      />

      <button
        onClick={handleSave}
        disabled={saving}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
};

export default EditCustomerPage;
