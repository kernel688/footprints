import {trxTimeStamp,trxDate,trxDateTime} from './sharedfunctions.js'

let trxRecords = []
let submitButton = document.getElementById('submitButton')
submitButton.addEventListener('click',checkAddTrx)


function checkAddTrx() {
    //*****************************//
    //*** VARIABLE DECLARATIONS ***//
    //*****************************//
    let getTrxType = Array.from(document.getElementsByName('trx-type'))
    let getTrxAmount = Number(document.getElementById('trx-amount').value)
    let getTrxDescription = String(document.getElementById('trx-description').value)
    let getCurrentBalance = document.getElementById('currentBalance')
    let getTableHeaders = document.getElementById('transactions-table-header')
    
    let checkedFields = 0
    let trxType = ''
    let successfulCheck = 0
    let successfulAdd = false
    let trxNumber = 0
    let trxID = '000000000'
    
    
    //*************************************//
    //*** CHECKS ALL TRANSACTION INPUTS ***//
    //*************************************//
    for (let index = 0; index < getTrxType.length; index++) {
        if (getTrxType[index].checked) {
            trxType = getTrxType[index].value
            checkedFields++
        }
    }
    if (checkedFields === 0) {
        window.alert('Please choose a transaction type')
    } else {
        successfulCheck++
    }

    if (getTrxAmount === 0) {
        window.alert('Please enter a valid transaction amount')
    } else {
        successfulCheck++
    }

    if (getTrxDescription === '') {
        window.alert('Please enter a transaction description')
    } else {
        successfulCheck++
    }

    
    //***********************************************//
    //*** ADDS TRANSACTION AFTER SUCCESSFUL CHECK ***//
    //***********************************************//
    if (successfulCheck === 3) {
        let currBal = Number(getCurrentBalance.innerText)
        if (typeof currBal === 'number' && trxType === 'Income') {
            getCurrentBalance.innerText = currBal + getTrxAmount
            successfulAdd = true
        } else if (typeof currBal === 'number' && trxType === 'Expense') {
            getCurrentBalance.innerText = currBal - getTrxAmount
            successfulAdd = true
        } else {
            window.alert('k688: Undefined method for trxType')
        }
    }


    //*****************************************************//
    //*** SETS TIMESTAMP AND SHOWS TRANSACTION IN TABLE ***//
    //*****************************************************//
    if (successfulAdd) {
        trxTimeStamp()
        
        trxRecords.push([trxDate,trxType,getTrxAmount,getTrxDescription])
        trxNumber = trxRecords.length
        trxID = String(trxNumber).padStart(9,'0')

        getTableHeaders.insertAdjacentHTML('afterend',`
        <tr class="transactions-table-data">
            <td>${trxNumber}</td>
            <td>${trxDate}</td>
            <td>${trxType}</td>
            <td>${getTrxAmount}</td>
            <td>${getTrxDescription}</td>
            <td><a id="trxID${trxID}" class="trxDelete" href="#">Delete</a></td>
            <td>Edit</td>
        </tr>`)

        
    }

}


