import React from 'react'
import Layout from "@/components/layout/Layout";
import UpdateProperty from '../components/update-property';

const page = () => {
  return (
    <>
    <Layout>
         <div className="space50"></div>
        <div className="space50"></div>
        <div className="space50"></div>
        <UpdateProperty/>
    </Layout>
    </>
  )
}

export default page
