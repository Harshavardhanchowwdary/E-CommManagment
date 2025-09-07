import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios'
export const Appcontext = createContext();

const AppcontextProvider = ({ children }) => {
    const Backendurl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/"
    const [Totalsuppliers, SetTotalsuppliers] = useState([]);
    const [TotalProducts, SetTotalProducts] = useState([]);
    const [Totalstock, SetTotalstock] = useState([]);
    const [Totalstocktransitions, SetTotalstockTransitions] = useState([]);
    const [Products, setProducts] = useState([]);
    const [Suppliersdata,setsuppliersdata] = useState([]);
    const [StoctTranistionsdata, setStockTranistionsdata]= useState([]);
    useEffect(() => {
        const token = localStorage.getItem("token");

        const fetchtotals = async () => {
            try {
                const headers = {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                };

                const suppliersPromise = axios.get(`${Backendurl}api/Ecommanagement/TotalSuppliers`, headers);
                const productsPromise = axios.get(`${Backendurl}api/Ecommanagement/TotalProducts`, headers);
                const stockPromise = axios.get(`${Backendurl}api/Ecommanagement/TotalStock`, headers);
                const transitionsPromise = axios.get(`${Backendurl}api/Ecommanagement/TotalStockTransitions`, headers);
                const MainProductsPromise = axios.get(`${Backendurl}api/Ecommanagement/getAllProducts`,headers);
                const MainSuppliersPromise = axios.get(`${Backendurl}api/Ecommanagement/getAllSuppliers`,headers);
                const MainStockTranistionsPromise = axios.get(`${Backendurl}api/Ecommanagement/getAllStockTransitions`,headers);
                const [suppliersRes, productsRes, stockRes, transitionsRes, Mainproductsres, MainSuppliersres,MainStockTranisitionsres] = await Promise.all([
                    suppliersPromise,
                    productsPromise,
                    stockPromise,
                    transitionsPromise,
                    MainProductsPromise,
                    MainSuppliersPromise,
                    MainStockTranistionsPromise
                ]);

                SetTotalsuppliers(suppliersRes.data);
                SetTotalProducts(productsRes.data);
                SetTotalstock(stockRes.data);
                SetTotalstockTransitions(transitionsRes.data);
                setProducts(Mainproductsres.data);
                setsuppliersdata(MainSuppliersres.data);
                setStockTranistionsdata(MainStockTranisitionsres.data);
            } catch (error) {
                console.error("Error fetching totals:", error);
            }
        };

        fetchtotals();
    }, []);


    let value = {
        Totalsuppliers,TotalProducts,Totalstock,Totalstocktransitions,Products,Suppliersdata,StoctTranistionsdata
    };

    return (
        <Appcontext.Provider value={value}>
            {children}
        </Appcontext.Provider>
    )
}
export default AppcontextProvider
export const useAppContext = () => useContext(Appcontext);
