let submitButton = document.getElementById('submitButton')

submitButton.addEventListener('click',getTrxValue)

function getTrxValue() {
    let getTrxType = Array.from(document.getElementsByName('trx-type'))
    let checkedFields = 0
    
    for (let index = 0; index < getTrxType.length; index++) {
        if (getTrxType[index].checked) {
            trxType = getTrxType[index].value
            console.log(trxType);
            checkedFields++
            modifyBalance()
        }
    }
    
    if ( checkedFields === 0 ) {
        window.alert('Please choose a transaction type')
    }
}


function modifyBalance() {
    let trxAmount = Number(document.getElementById('trx-amount').value)
    let currentBalance = document.getElementById('currentBalance')
    let currBal = Number(currentBalance.innerText)
    
    if (typeof currBal === 'number' && trxAmount !== 0 && trxType === 'Income') {
        currentBalance.innerText = currBal + trxAmount
    } else if (typeof currBal === 'number' && trxAmount !== 0 && trxType === 'Expense') {
        currentBalance.innerText = currBal - trxAmount
    } else {
        window.alert('Please enter a valid transaction amount')
    }

}