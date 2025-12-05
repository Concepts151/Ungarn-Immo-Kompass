import Layout from "@/components/layout/Layout";
import InnerHeader from "@/components/layout/InnerHeader";
import FavouritePropertyList from "./components/favourite-property-list";
export default function Home() {
    return (
        <>
            <Layout headerStyle={5}>
                <InnerHeader title="My Favourite" currentpage="My Favourite" />
                <FavouritePropertyList />
                <div className="space30"></div>
            </Layout>
        </>
    );
}
