'use client';
import React, { useState } from 'react'

const page = () => {
    const [error, setError] = useState()
  return (
    <div className='p-5'>
        <div className="container-sm" style={{width:"500px"}}>
            <div className="mb-3">
                <h3>
                    Sign up test form
                </h3>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Password</label>
                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="comfim password"/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Confirm Password</label>
                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Password"/>
            </div>
            <div className="mb-3">
                <button className='btn btn-dark container'>Submit</button>
            </div>
        </div>
    </div>
  )
}

export default page
