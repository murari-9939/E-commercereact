// // "use client";

// // import React, { useEffect, useState } from "react";

// // interface Product {
// //   id: number;
// //   name: string;
// //   price: number;
// //   stock: number;
// //   category: string;
// // }

// // interface ApiResponse {
// //   totalRecords: number;
// //   page: number;
// //   pageSize: number;
// //   data: Product[];
// // }

// // const ProductsPage = () => {
// //   const [products, setProducts] = useState<Product[]>([]);
// //   const [search, setSearch] = useState("");
// //   const [category, setCategory] = useState("");
// //   const [page, setPage] = useState(1);
// //   const [pageSize] = useState(10);
// //   const [totalRecords, setTotalRecords] = useState(0);
// //   const [loading, setLoading] = useState(false);

// //   useEffect(() => {
// //     const fetchProducts = async () => {
// //       setLoading(true);
// //       try {
// //         const url = `https://localhost:44385/api/Products?search=${search}&category=${category}&page=${page}&pageSize=${pageSize}`;
// //         const res = await fetch(url);
// //         if (!res.ok) throw new Error("Network response was not ok");
// //         const data: ApiResponse = await res.json();
// //         setProducts(data.data || []); // <-- access the 'data' property
// //         setTotalRecords(data.totalRecords || 0);
// //       } catch (error) {
// //         console.error("Error fetching products:", error);
// //         setProducts([]);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchProducts();
// //   }, [search, category, page, pageSize]);

// //   return (
// //     <div>
// //       <h1>Products</h1>

// //       {/* Search & filter */}
// //       <input
// //         type="text"
// //         placeholder="Search..."
// //         value={search}
// //         onChange={(e) => setSearch(e.target.value)}
// //       />
// //       <input
// //         type="text"
// //         placeholder="Category..."
// //         value={category}
// //         onChange={(e) => setCategory(e.target.value)}
// //       />

// //       {loading ? (
// //         <p>Loading products...</p>
// //       ) : products.length === 0 ? (
// //         <p>No products found.</p>
// //       ) : (
// //         <table>
// //           <thead>
// //             <tr>
// //               <th>Name</th>
// //               <th>Category</th>
// //               <th>Price</th>
// //               <th>Stock</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {products.map((p) => (
// //               <tr key={p.id}>
// //                 <td>{p.name}</td>
// //                 <td>{p.category}</td>
// //                 <td>{p.price}</td>
// //                 <td>{p.stock}</td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       )}

// //       {/* Pagination info */}
// //       <p>
// //         Page {page} of {Math.ceil(totalRecords / pageSize)}
// //       </p>
// //     </div>
// //   );
// // };

// // export default ProductsPage;
// "use client";

// import React, { useEffect, useState } from "react";

// interface Product {
//   id: number;
//   name: string;
//   price: number;
//   stock: number;
//   category: string;
// }

// interface ApiResponse {
//   totalRecords: number;
//   page: number;
//   pageSize: number;
//   data: Product[];
// }

// const ProductsPage = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("");
//   const [page, setPage] = useState(1);
//   const [pageSize] = useState(10);
//   const [totalRecords, setTotalRecords] = useState(0);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       setLoading(true);
//       try {
//         const url = `https://localhost:44385/api/Products?search=${search}&category=${category}&page=${page}&pageSize=${pageSize}`;
//         const res = await fetch(url);
//         if (!res.ok) throw new Error("Network response was not ok");
//         const data: ApiResponse = await res.json();
//         setProducts(data.data || []);
//         setTotalRecords(data.totalRecords || 0);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//         setProducts([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [search, category, page, pageSize]);

//   const totalPages = Math.ceil(totalRecords / pageSize);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Products</h1>

//       {/* Search & filter */}
//       <div className="flex flex-col sm:flex-row gap-4 mb-4">
//         <input
//           type="text"
//           placeholder="Search..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="border rounded-md px-4 py-2 flex-1"
//         />
//         <input
//           type="text"
//           placeholder="Category..."
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           className="border rounded-md px-4 py-2 flex-1"
//         />
//       </div>

//       {/* Products table */}
//       {loading ? (
//         <p className="text-gray-500">Loading products...</p>
//       ) : products.length === 0 ? (
//         <p className="text-gray-500">No products found.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white border rounded-lg shadow-md">
//             <thead>
//               <tr className="bg-gray-200 text-gray-700">
//                 <th className="py-2 px-4 border">Name</th>
//                 <th className="py-2 px-4 border">Category</th>
//                 <th className="py-2 px-4 border">Price</th>
//                 <th className="py-2 px-4 border">Stock</th>
//               </tr>
//             </thead>
//             <tbody>
//               {products.map((p) => (
//                 <tr key={p.id} className="hover:bg-gray-100">
//                   <td className="py-2 px-4 border">{p.name}</td>
//                   <td className="py-2 px-4 border">{p.category}</td>
//                   <td className="py-2 px-4 border">₹{p.price}</td>
//                   <td className="py-2 px-4 border">{p.stock}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Pagination */}
//       <div className="flex justify-between items-center mt-4">
//         <button
//           className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
//           onClick={() => setPage((p) => Math.max(1, p - 1))}
//           disabled={page === 1}
//         >
//           Previous
//         </button>
//         <span>
//           Page {page} of {totalPages}
//         </span>
//         <button
//           className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
//           onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//           disabled={page === totalPages}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProductsPage;
"use client";

import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

// interface Product {
//   id: number;
//   name: string;
//   price: number;
//   stock: number;
//   category: string;
// }

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
}

interface ApiResponse {
  totalRecords: number;
  page: number;
  pageSize: number;
  data: Product[];
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState<Product>({
    id: 0,
    name: "",
    price: 0,
    stock: 0,
    category: ""
  });

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const url = `https://localhost:44385/api/Products?search=${search}&category=${category}&page=${page}&pageSize=${pageSize}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("Network response was not ok");
        const data: ApiResponse = await res.json();
        setProducts(data.data || []);
        setTotalRecords(data.totalRecords || 0);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [search, category, page, pageSize]);

  const totalPages = Math.ceil(totalRecords / pageSize);

  const openAddModal = () => {
    setEditingProduct(null);
    setProductForm({ id: 0, name: "", price: 0, stock: 0, category: "" });
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setProductForm(product);
    setIsModalOpen(true);
  };

  const saveProduct = async () => {
  try {
    const method = editingProduct ? "PUT" : "POST";
    const url = editingProduct
      ? `https://localhost:44385/api/Products/${editingProduct.id}`
      : "https://localhost:44385/api/Products";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productForm)
    });

    // if (!res.ok) throw new Error("Failed to save product");
    const saved = await res.json();

    if (editingProduct) {
      setProducts((prev) =>

        prev.map((p) => (p.id === saved.id ? saved : p))
      );
      Swal.fire({
        icon: "success",
        title: "Product Updated",
        text: "The product has been updated successfully!",
        timer: 2000,
        showConfirmButton: false
      });
    } else {
      setProducts((prev) => [saved, ...prev]);
      Swal.fire({
        icon: "success",
        title: "Product Added",
        text: "The product has been added successfully!",
        timer: 2000,
        showConfirmButton: false
      });
    }

    setIsModalOpen(false);
    setProductForm({ id: 0, name: "", price: 0, stock: 0, category: "" });
  } catch (err) {
    console.error(err);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to save product!"
    });
  }
};
//   const saveProduct = async () => {
//     try {
//       const method = editingProduct ? "PUT" : "POST";
//       const url = editingProduct
//         ? `https://localhost:44385/api/Products/${editingProduct.id}`
//         : "https://localhost:44385/api/Products";

//       const res = await fetch(url, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(productForm)
//       });
//       if (!res.ok) throw new Error("Failed to save product");
//       const saved = await res.json();

//       if (editingProduct) {
//         setProducts((prev) =>
//           prev.map((p) => (p.id === saved.id ? saved : p))
//         );
//       } else {
//         setProducts((prev) => [saved, ...prev]);
//       }

//       setIsModalOpen(false);
//       setProductForm({ id: 0, name: "", price: 0, stock: 0, category: "" });
//     } catch (err) {
//       console.error(err);
//     }
//   };



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
        const res = await fetch(`https://localhost:44385/api/Products/${id}`, {
          method: 'DELETE'
        });

        const data = await res.json();

    

        // Remove deleted product from state
        setProducts((prev) => prev.filter((p) => p.id !== id));

        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: data?.message || 'The product has been deleted.',
          timer: 2000,
          showConfirmButton: false
        });
      } catch (error: any) {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message || 'Failed to delete the product.'
        });
      }
    }
  });
};

  return (
    <div className="p-6 bg-white  rounded shadow overflow-y-auto">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      {/* Search & filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-md px-4 py-2 flex-1"
        />
        <input
          type="text"
          placeholder="Category..."
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded-md px-4 py-2 flex-1"
        />
        <button
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          onClick={openAddModal}
        >
          Add Product
        </button>
      </div>

      {/* Products table */}
      {loading ? (
        <p className="text-gray-500">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Category</th>
                <th className="py-2 px-4 border">Price</th>
                <th className="py-2 px-4 border">Stock</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
       


{/*  
               {products.map((p) => (
                <tr key={p.id} className="hover:bg-gray-100"> */}
                {products.map((p, index) => (
  <tr key={p.id ?? index} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border">{p.name}</td>
                  <td className="py-2 px-4 border">{p.category}</td>
                  <td className="py-2 px-4 border">₹{p.price}</td>
                  <td className="py-2 px-4 border">{p.stock}</td>
                  <td className="py-2 px-4 border"> 
                    <div className="flex gap-2">
    <button
      className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
      onClick={() => openEditModal(p)}
    >
      Edit
    </button>
    <button
      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
      onClick={() => handleDelete(p.id)}
    >
      Delete
    </button>
  </div>
             
         
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              {editingProduct ? "Edit Product" : "Add Product"}
            </h2>

            <input
              type="text"
              placeholder="Product Name"
              className="border px-3 py-2 rounded w-full mb-3"
              value={productForm.name}
              onChange={(e) =>
                setProductForm({ ...productForm, name: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Category"
              className="border px-3 py-2 rounded w-full mb-3"
              value={productForm.category}
              onChange={(e) =>
                setProductForm({ ...productForm, category: e.target.value })
              }
            />

            {/* <input
              type="number"
              placeholder="Price"
              className="border px-3 py-2 rounded w-full mb-3"
              value={productForm.price}
              onChange={(e) =>
                setProductForm({ ...productForm, price: parseFloat(e.target.value) })
              }
            />

            <input
              type="number"
              placeholder="Stock"
              className="border px-3 py-2 rounded w-full mb-4"
              value={productForm.stock}
              onChange={(e) =>
                setProductForm({ ...productForm, stock: parseInt(e.target.value) })
              }
            /> */}
            <input
  type="number"
  placeholder="Price"
  className="border px-3 py-2 rounded w-full mb-3"
  value={productForm.price || ''}
  onChange={(e) =>
    setProductForm({ 
      ...productForm, 
      price: e.target.value === '' ? '' : parseFloat(e.target.value)
    })
  }
/>


<input
  type="number"
  placeholder="Stock"
  className="border px-3 py-2 rounded w-full mb-4"
  value={productForm.stock || ''}
  onChange={(e) =>
    setProductForm({ 
      ...productForm, 
      stock: e.target.value === '' ? '' : parseInt(e.target.value)
    })
  }
/>


            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={saveProduct}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
