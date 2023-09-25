import React, {useState, useEffect} from 'react'
function AddBanka() {
    const [bankURL, setBankURL] = useState('')
    const [banks, setBanks] = useState([])
    
    // async function fetchData(clientId){
    //     const apiURL = 'https://send.monobank.ua/api/handler'
    //     const request = {
    //         clientId: clientId,
    //         c:'hello',
    //         Pc: 'BL/p65E8LZI5OaAMILxWGISmg/NXNxxnFTq019kCLHECheorK7vOXeqAUO0jJBnCr4XaRY60eYsmMhsIxCMxk5k=',
    //     }
    // }
    

    useEffect(() => {
        const savedBnaks = JSON.parse(localStorage.getItem('banks')) || []
        setBanks(savedBnaks)
    },[])

    const addBank = () => {
        if (bankURL !== ''){
            const bankId = bankURL.replace('https://send.monobank.ua/jar/','')

            const newBank = {
                banka: bankId,
                date: Date.now(),
            }

            setBanks(prevBanks => [...prevBanks, newBank])

            localStorage.setItem('banks', JSON.stringify([...banks, newBank]))

            setBankURL('')
        }

    }
  return (
    <div>
        <h1>Банки</h1>
        <input type='text' placeholder='Введите URL' value={bankURL} onChange={(e) => setBankURL(e.target.value)}/>
        <button onClick={addBank}>Добавить банку</button>
        <div>
            {banks.map((bank, index) => (
                <div key={index}>{bank.banka}</div>
            ))}
        </div>
    </div>
  )
}

export default AddBanka


  