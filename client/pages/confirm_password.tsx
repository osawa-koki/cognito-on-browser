import React, { useState } from 'react'
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js'
import { Button, Form } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { userPool } from '../src/common/cognito'

export default function ConfirmPasswordPage (): React.JSX.Element {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const confirmPassword = async (): Promise<void> => {
    setIsLoading(true)

    const userData = {
      Username: email,
      Pool: userPool
    }
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)

    cognitoUser.confirmPassword(code, newPassword, {
      onSuccess: (result) => {
        try {
          // パスワード変更が成功した場合の処理
          if (result != null) {
            toast.success('Changed password!')
          } else {
            toast.error('Failed to change password.')
          }
        } finally {
          setIsLoading(false)
        }
      },
      onFailure: (err) => {
        console.error(err.message)
        toast.error('Failed to change password.')
        setIsLoading(false)
      }
    })
  }

  return (
    <>
      <div id='ConfirmPassword'>
        <Form.Group controlId='formBasicEmail' className='mt-3'>
          <Form.Label>Email address</Form.Label>
          <Form.Control type='email' placeholder='Enter email' value={email} onChange={(event): void => { setEmail(event.target.value) }}
          />
        </Form.Group>
        <Form.Group controlId='formBasicCode' className='mt-3'>
          <Form.Label>Code</Form.Label>
          <Form.Control type='text' placeholder='Enter code' value={code} onChange={(event): void => { setCode(event.target.value) }}
          />
        </Form.Group>
        <Form.Group controlId='formBasicPassword' className='mt-3'>
          <Form.Label>New Password</Form.Label>
          <Form.Control type='password' placeholder='Enter new password' value={newPassword} onChange={(event): void => { setNewPassword(event.target.value) }}
          />
        </Form.Group>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <Button variant='primary' className='mt-3' onClick={confirmPassword} disabled={isLoading}>
          Confirm Password
        </Button>
      </div>
    </>
  )
}
