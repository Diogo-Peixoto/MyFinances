import { useTransactions } from "../../hooks/useTransactions";

import { Container } from "./styles";

import  edit  from "../../assets/edit.png"
import  trash  from "../../assets/trash.png"


export function TransactionsTable(){
    const { transactions } = useTransactions()

    
    return(
        <Container>
            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Valor</th>
                        <th>Categoria</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(transactions=> (
                            <tr key={transactions.id}>
                                <td>{transactions.title}</td>
                                <td className={transactions.type}>
                                    {new Intl.NumberFormat('pr-BR', {
                                        style: 'currency',
                                        currency: 'BRL'
                                    }).format(transactions.amount)}
                                </td>
                                <td>{transactions.category}</td>
                                <td>
                                {new Intl.DateTimeFormat('pr-BR').format(new Date(transactions.createdAt))}
                                </td>
                                <td>
                                    <img src={edit} />
                                    <img src={trash} />
                                </td>
                            </tr>
                        
                    ))}

                </tbody>
            </table>
        </Container>
    )
}