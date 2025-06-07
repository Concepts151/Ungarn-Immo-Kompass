"use client";
import { useState } from "react";
import { logout } from "../action"; // Adjust the import to your actual logout action

export default function LogoutButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogout = async () => {
    setError(null);
    setLoading(true);
    try {
      await logout(); // Call your async logout action here
      // Optionally, redirect or update state here
       window.location.reload();
    } catch (err: any) {
      setError(err.message || "Logout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleLogout}
        className="btn btn-danger fw-bold px-4 py-2 container"
        disabled={loading}
        style={{ minWidth: 110 }}
      >
        {loading ? (
          <>
            <span
              className="spinner-border spinner-border-sm me-2"
              role="status"
              aria-hidden="true"
            />
            Logging out...
          </>
        ) : (
          "Logout"
        )}
      </button>
      {error && (
        <div className="alert alert-danger mt-3 mb-0 py-2 px-3 text-center">
          {error}
        </div>
      )}
    </div>
  );
}

// import { createClient } from '@/utils/supabase/server'
// import React from 'react'

// const Signout = () => {

//     const logout = async() =>{
//         "use server"
//         const supabase = await createClient();
//         supabase.auth.signOut();
//         //redirect and all
//     }
//   return (
//     <div className=''>
//       <form action={logout}>
//         <button className="btn btn-dark container mb-3">Sign out</button>
//       </form>
//     </div>
//   )
// }

// export default Signout
