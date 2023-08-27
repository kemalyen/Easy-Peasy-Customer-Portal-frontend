import React, { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom';
import { getVerifyEmail } from "../../api/users";
  

function VerifyEmailPage() {
    const [searchParams] = useSearchParams();
    const id = (searchParams.get('id')) ? searchParams.get('id') : 0;
    const hash = (searchParams.get('hash')) ? searchParams.get('hash') : 0;


    getVerifyEmail({id, hash}).then((data) => {
        console.log('Data', data)
    }).catch((e) => {
        console.log('Error', e)
    })

    return (
        <div>VerifyEmailPage</div>
    )
}

export default VerifyEmailPage