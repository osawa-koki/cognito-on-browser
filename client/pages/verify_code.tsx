import React, { useState } from 'react'
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js'
import { Button, Form } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { userPool } from '../src/common/cognito'

export default function VerifyCOdePage (): React.JSX.Element {
  const [isLoading, setIsLoading] = useState(false)

  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')

  const verifyCode = async (): Promise<void> => {
    setIsLoading(true)

    const userData = {
      Username: email,
      Pool: userPool
    }
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)

    cognitoUser.confirmRegistration(code, true, (err, result) => {
      try {
      // 確認がエラーとなった場合の処理
        if (err != null) {
          console.error(err.message)
          toast.error('User verify failed.')
          return
        }

        // 確認が成功した場合の処理
        if (result != null) {
          toast.success(`User ${cognitoUser.getUsername()} has verified!`)
        } else {
          toast.error('User verify failed.')
        }
      } finally {
        setIsLoading(false)
      }
    })
  }

  return (
    <>
      <div id='SignUp'>
        <Form.Group controlId='formBasicEmail' className='mt-3'>
          <Form.Label>Email address</Form.Label>
          <Form.Control type='email' placeholder='Enter email' value={email} onInput={(event) => { setEmail(event.currentTarget.value) }} />
        </Form.Group>
        <Form.Group controlId='formBasicCode' className='mt-3'>
          <Form.Label>Code</Form.Label>
          <Form.Control type='text' placeholder='text' value={code} onInput={(event) => { setCode(event.currentTarget.value) }} />
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
