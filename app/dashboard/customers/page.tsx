// 'use client';

// import React, { useEffect, useState } from "react";

// interface Customer {
//   id: number;
//   name: string;
//   email: string;
//   phone: string;
// }

// const CustomersPage = () => {
//   const [customers, setCustomers] = useState<Customer[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState(""); // optional search input

//   useEffect(() => {
//     const fetchCustomers = async () => {
//       try {
//         const url = search
//           ? `https://localhost:44385/api/Customers?search=${search}`
//           : "https://localhost:44385/api/Customers";
//         const res = await fetch(url);
//         const data = await res.json();
//         setCustomers(data);
//       } catch (error) {
//         console.error("Error fetching customers:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCustomers();
//   }, [search]); // refetch when search changes

//   return (
//     <div className="p-6 bg-white">
//       <h1 className="text-2xl font-bold mb-4">Customers</h1>

//       {/* Search box */}
//       <input
//         type="text"
//         placeholder="Search by name"
//         className="border p-2 mb-4 rounded w-full md:w-1/3"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       {loading ? (
//         <p>Loading customers...</p>
//       ) : (
//         <table className="min-w-full bg-white border rounded">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="py-2 px-4 border">ID</th>
//               <th className="py-2 px-4 border">Name</th>
//               <th className="py-2 px-4 border">Email</th>
//               <th className="py-2 px-4 border">Phone</th>
//             </tr>
//           </thead>
//           <tbody>
//             {customers.map((customer) => (
//               <tr key={customer.id}>
//                 <td className="py-2 px-4 border">{customer.id}</td>
//                 <td className="py-2 px-4 border">{customer.name}</td>
//                 <td className="py-2 px-4 border">{customer.email}</td>
//                 <td className="py-2 px-4 border">{customer.phone}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default CustomersPage;
'use client';
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
}

const CustomersPage = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newCustomer, setNewCustomer] = useState({ name: "", email: "", phone: "" });
  const router = useRouter();

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      try {
        const url = search
          ? `https://localhost:44385/api/Customers?search=${search}`
          : "https://localhost:44385/api/Customers";
        const res = await fetch(url);
        const data = await res.json();
        setCustomers(data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, [search]);

  const handleDelete = (id: number) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`https://localhost:44385/api/Customers/${id}`, {
            method: 'DELETE'
          });
          const data = await res.json();
          if (!res.ok) {
            Swal.fire('Error', data?.message || 'Failed to delete customer', 'error');
            return;
          }
          setCustomers(prev => prev.filter(c => c.id !== id));
          Swal.fire('Deleted!', data?.message || 'Customer deleted', 'success');
        } catch (error: any) {
          Swal.fire('Error', error.message || 'Failed to delete customer', 'error');
        }
      }
    });
  };

  const handleAddCustomer = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("https://localhost:44385/api/Customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCustomer)
      });
      const data = await res.json();
      if (!res.ok) {
        Swal.fire('Error', data?.message || 'Failed to add customer', 'error');
        return;
      }
      setCustomers(prev => [...prev, data]);
      setShowModal(false);
      setNewCustomer({ name: "", email: "", phone: "" });
      Swal.fire('Success', 'Customer added successfully', 'success');
    } catch (error: any) {
      Swal.fire('Error', error.message || 'Failed to add customer', 'error');
    }
  };

  return (
    // <div className="p-6 bg-white rounded shadow">
      <div className="p-6 bg-white rounded shadow max-h-[500px] overflow-y-auto">
      <h1 className="text-2xl font-bold mb-4">Customers</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name"
          className="border p-2 rounded w-full md:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={() => setShowModal(true)}
        >
          Add Customer
        </button>
      </div>

      {loading ? (
        <p>Loading customers...</p>
      ) : (
        <table className="min-w-full bg-white border rounded">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border">ID</th>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Phone</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(customer => (
              <tr key={customer.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border">{customer.id}</td>
                <td className="py-2 px-4 border">{customer.name}</td>
                <td className="py-2 px-4 border">{customer.email}</td>
                <td className="py-2 px-4 border">{customer.phone}</td>
                <td className="py-2 px-4 border flex gap-2">
                  <button
      className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
      onClick={() => router.push(`/dashboard/customers/${customer.id}`)}
    >
      Edit
    </button>
                  <button
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => handleDelete(customer.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Add Customer Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add Customer</h2>
            <form onSubmit={handleAddCustomer} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Name"
                className="border p-2 rounded"
                value={newCustomer.name}
                onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="border p-2 rounded"
                value={newCustomer.email}
                onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                required
              />
              <input
  type="text"
  placeholder="Phone"
  className="border p-2 rounded"
  value={newCustomer.phone}
  onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
  required
  pattern="\d{10}"
  title="Phone number must be 10 digits"
/>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomersPage;
