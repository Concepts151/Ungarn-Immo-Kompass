import Layout from "@/components/layout/Layout";
import AddProperty from "@/components/sections/AddProperty";

export default function Home() {
  return (
    <>
      <Layout headerStyle={1}>
        <div className="space50"></div>
        <div className="space50"></div>
        <div className="space50"></div>
        <AddProperty />

        <div className="space30"></div>
      </Layout>
    </>
  );
}
