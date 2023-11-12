import React, { useState } from 'react'
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js'
import { Button, Form } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { userPool } from '../src/common/cognito'

export default function ResendCodePage (): React.JSX.Element {
  const [isLoading, setIsLoading] = useState(false)

  const [email, setEmail] = useState('')

  const verifyCode = async (): Promise<void> => {
    setIsLoading(true)

    const userData = {
      Username: email,
      Pool: userPool
    }
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)

    cognitoUser.resendConfirmationCode((err, result) => {
      try {
        // 再送信がエラーとなった場合の処理
        if (err != null) {
          console.error(err.message)
          toast.error('Resend code failed.')
          return
        }

        // 再送信が成功した場合の処理
        if (result != null) {
          toast.success(`Resend code to ${cognitoUser.getUsername()}!`)
        } else {
          toast.error('Resend code failed.')
        }
      } finally {
        setIsLoading(false)
      }
    })
  }

  return (
    <>
      <div id='ResendCode'>
        <Form.Group controlId='formBasicEmail' className='mt-3'>
          <Form.Label>Email address</Form.Label>
          <Form.Control type='email' placeholder='Enter email' value={email} onInput={(event) => { setEmail(event.currentTarget.value) }} />
        </Form.Group>
        <hr />
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <Button variant='primary' className='mt-3' onClick={verifyCode} disabled={isLoading}>
          Verify
        </Button>
      </div>
    </>
  )
}
