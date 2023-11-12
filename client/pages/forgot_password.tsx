import React, { useState } from 'react'
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js'
import { Button, Form } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { userPool } from '../src/common/cognito'

export default function ForgotPasswordPage (): React.JSX.Element {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')

  const forgotPassword = async (): Promise<void> => {
    setIsLoading(true)

    const userData = {
      Username: email,
      Pool: userPool
    }
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)

    cognitoUser.forgotPassword({
      onSuccess: (result) => {
        try {
          // パスワードリセットが成功した場合の処理
          if (result != null) {
            toast.success('Send reset password mail.')
          } else {
            toast.error('Send reset password mail failed.')
          }
        } finally {
          setIsLoading(false)
        }
      },
      onFailure: (err) => {
        console.error(err.message)
        toast.error('Send reset password mail failed.')
        setIsLoading(false)
      }
    })
  }

  return (
    <>
      <div id='ForgotPassword'>
        <Form.Group controlId='formBasicEmail' className='mt-3'>
          <Form.Label>Email address</Form.Label>
          <Form.Control type='email' placeholder='Enter email' value={email} onChange={(event): void => { setEmail(event.target.value) }}
          />
        </Form.Group>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <Button variant='primary' className='mt-3' onClick={forgotPassword} disabled={isLoading}>
          Forgot Password
        </Button>
      </div>
    </>
  )
}
