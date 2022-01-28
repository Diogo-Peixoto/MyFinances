import { createContext, useEffect, useState, ReactNode, useContext } from "react";
import { api } from "../services/api";


interface Transaction{
    
    title: string;
    amount: number;
    category: string;
    createdAt: string;
    type: string;
    id: number;
}

interface TransactionsProviderProps{
    children: ReactNode
}

interface TransactionContextData{
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}

type TransactionInput = Omit<Transaction, 'id'| 'createdAt'>

export const TransactionsContext = createContext<TransactionContextData>(
    {} as TransactionContextData
)

export function TransactionsProvider({children}:TransactionsProviderProps){
    const [transactions, setTransactions] = useState<Transaction[]>([])

    useEffect(()=>{
        api.get('transactions').then(response=> setTransactions(response.data.transactions))
    },[])

    async function createTransaction(transactionsInput:TransactionInput){

        const response = await api.post('/transactions', {
            ...transactionsInput,
            createdAt: new Date(),
        })
        const { transaction } = response.data
        
        setTransactions([
            ...transactions,
            transaction
        ])
    }

    return(
        <TransactionsContext.Provider value={{transactions, createTransaction}}>
            {children}
        </TransactionsContext.Provider>
    )
}

export function useTransactions(){
    const context = useContext(TransactionsContext)
    
    return context;
}