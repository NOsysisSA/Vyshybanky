import React, {useState, useEffect} from 'react'
function AddBanka() {
    const [bankURL, setBankURL] = useState('')
    const [banks, setBanks] = useState([])
    
    async function fetchData(clientId) {
        const apiUrl = 'https://send.monobank.ua/api/handler';
        const requestBody = {
          clientId: clientId,
          c: 'hello',
          Pc: 'BL/p65E8LZI5OaAMILxWGISmg/NXNxxnFTq019kCLHECheorK7vOXeqAUO0jJBnCr4XaRY60eYsmMhsIxCMxk5k='
        }
      
        try {
          const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
          })
      
          if (response.ok) {
            const data = await response.json();
            return data
          } else {
            throw new Error('Не удалось выполнить запрос к серверу')
          }
        } catch (error) {
          console.error('Ошибка при выполнении запроса:', error)
          return null
        }
      }
      
      const clientId = '4CLy9vEFBM' 
      fetchData(clientId)
        .then((result) => {
          if (result) {
            console.log('Данные получены', result);
          } else {
            console.log('Не удалось получить данные');
          }
        })
        .catch((error) => {
          console.error('Произошла ошибка', error);
        });
    

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