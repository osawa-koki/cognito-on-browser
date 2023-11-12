import React, { useState } from 'react'
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js'
import { Button, Form } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { userPool } from '../src/common/cognito'

export default function ChangePasswordPage (): React.JSX.Element {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const changePassword = async (): Promise<void> => {
    setIsLoading(true)

    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
      Username: email,
      Password: oldPassword
    })

    const userData = {
      Username: email,
      Pool: userPool
    }
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (_result) => {
        cognitoUser.changePassword(oldPassword, newPassword, (err, result) => {
          try {
            // パスワード変更がエラーとなった場合の処理
            if (err != null) {
              console.error(err.message)
              toast.error('Failed to change password.')
              return
            }

            // パスワード変更が成功した場合の処理
            if (result != null) {
              toast.success('Changed password!')
            } else {
              toast.error('Failed to change password.')
            }
          } finally {
            setIsLoading(false)
          }
        })
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
      <div id='ChangePassword'>
        <Form.Group controlId='formBasicEmail' className='mt-3'>
          <Form.Label>Email address</Form.Label>
          <Form.Control type='email' placeholder='Enter email' value={email} onInput={(event) => { setEmail(event.currentTarget.value) }} />
        </Form.Group>
        <Form.Group controlId='formBasicOldPassword' className='mt-3'>
          <Form.Label>Old Password</Form.Label>
          <Form.Control type='password' placeholder='Password' value={oldPassword} onInput={(event) => { setOldPassword(event.currentTarget.value) }} />
        </Form.Group>
        <Form.Group controlId='formBasicNewPassword' className='mt-3'>
          <Form.Label>New Password</Form.Label>
          <Form.Control type='password' placeholder='Password' value={newPassword} onInput={(event) => { setNewPassword(event.currentTarget.value) }} />
        </Form.Group>
        <hr />
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <Button variant='primary' className='mt-3' onClick={changePassword} disabled={isLoading}>
          Change Password
        </Button>
      </div>
    </>
  )
}
