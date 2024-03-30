import axios from 'axios'

const url = 'http://192.168.1.11:3000'

const findAccountByPhone = async (phone) => {
    fetch(
        url +
            '/account/find-account-by-phone-number?phoneNumber=${phoneNumber}',
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        },
    )
        .then((response) => response.json())
        .then((json) => {
            console.log(json)
            return json
        })
        .catch((error) => {
            console.error('Error:', error)
        })
}

export { findAccountByPhone }
