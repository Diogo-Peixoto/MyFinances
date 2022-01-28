import Modal from "react-modal";
import { Container, TransactionContainer, ButtonBox } from "./styles";
import { FormEvent, useState } from "react";
import { useTransactions } from "../../hooks/useTransactions";



import  closeImg from '../../assets/Vector.svg' 
import incomeImg from '../../assets/Entradas.svg'
import outcomeImg from '../../assets/Saídas.svg'





interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: ()=>void;
}

export function NewTransactionModal({isOpen, onRequestClose}:NewTransactionModalProps){
    
    const { createTransaction } = useTransactions()

    const[title,setTitle] = useState('')
    const[amount, setAmount] = useState(0)
    const[category, setCategory] = useState('')
    const [type, setType] = useState('deposit')

    async function handleCreateNewTransaction(event:FormEvent){
        event.preventDefault()

        await createTransaction({
            title,
            amount,
            category,
            type,

        })

        onRequestClose()
        setTitle('')
        setAmount(0)
        setCategory('')
        setType('deposit')
    }
    
    return(
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} overlayClassName="react-modal-overlay" className="react-modal-content">
        
            <button type="button"><img src={closeImg} alt="Fechar modal" onClick={onRequestClose} className="react-modal-close" /></button>

            <Container onSubmit={handleCreateNewTransaction}>
                <h2>Cadastrar Transação</h2>

                <input placeholder="Título" value={title} onChange={event=> setTitle(event.target.value)} />

                <input placeholder="Valor" type="number" value={amount} onChange={event=> setAmount(Number(event.target.value))} />

                <TransactionContainer>
                    <ButtonBox type="button" onClick={()=>{setType('deposit'); }} isActive={type === 'deposit'} activeColor="green">
                        <img src={incomeImg} alt="Entradas" />
                        <span>Entrada</span>
                    </ButtonBox>

                    <ButtonBox type="button" onClick={()=>{setType('withdraw'); }} isActive={type === 'withdraw'} activeColor="red">
                        <img src={outcomeImg} alt="Saída" />
                        <span>Saída</span>
                    </ButtonBox>
                </TransactionContainer>

                <input placeholder="Categoria" value={category} onChange={event=> setCategory(event.target.value)} />

                <button type="submit">Cadastrar</button>
            </Container>

        </Modal>
    )
}