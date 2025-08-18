import Layout from "@/components/layout/Layout";
import InnerHeader from "@/components/layout/InnerHeader";
import AddProperty from "@/components/sections/AddProperty";
import LoginModal from "../pg/components/LoginModal";
import RegisterModal from "../pg/components/RegisterModal";
export default function Home() {
    return (
        <>
            <Layout headerStyle={1}>
                {/* <InnerHeader title="Add New Property" currentpage="Add New Property" /> */}
                <div className="space50"></div>
                <div className="space50"></div>
                <div className="space50"></div>
                <AddProperty />
                
                <div className="space30"></div>
            </Layout>
        </>
    );
}
