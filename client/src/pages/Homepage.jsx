import AboutUs from "../AboutUs/AboutUs";
import HeroBanner from "../HeroBanner/HeroBanner";
import ProductosDestacados from "../ProductosDestacados/ProductosDestacados";

function Homepage() {
    return (
        <>
        <HeroBanner />
        <ProductosDestacados />
        <AboutUs />
        </>
    )
}

export default Homepage;