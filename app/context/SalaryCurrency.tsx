import { useContext, useState, useEffect, createContext } from "react";
import { useQuery } from "@apollo/client";
import { GET_SALARY } from "../graphQL/queries/salary.query";

type SalaryCurrencyType = {
    currency: string;
    setCurrency: (currency: string) => void;
}
const SalaryCurrencyContext = createContext<SalaryCurrencyType>({currency: "", setCurrency: () => {}});

export const SalaryCurrencyProvider = ({ children }: { children: React.ReactNode }) => {
    const [currency, setCurrency] = useState("");
    const { data } = useQuery(GET_SALARY, {
        fetchPolicy: 'cache-first'
    });

    useEffect(() => {
        const currencyFromServer = data?.salary?.currency
        console.log(currencyFromServer)
        if (currencyFromServer) setCurrency(currencyFromServer);
    }, [data]);

    return (
        <SalaryCurrencyContext.Provider value={{ currency, setCurrency }}>
            {children}
        </SalaryCurrencyContext.Provider>
    );
}

export const useSalaryCurrency =  () => useContext(SalaryCurrencyContext);