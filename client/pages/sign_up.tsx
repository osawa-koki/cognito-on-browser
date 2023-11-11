import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import makeCognitoUserAttributes from '../src/common/makeCognitoUserAttributes'
import { userPool } from '../src/common/cognito'
import { toast } from 'react-toastify'

export default function SignUpPage (): React.JSX.Element {
  const [isLoading, setIsLoading] = useState(false)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signUp = async () => {
    setIsLoading(true)

    const attributeList = makeCognitoUserAttributes({ name, email })

    userPool.signUp(
      email,
      password,
      attributeList,
      attributeList,
      (err, result) => {
        try {
          // 登録がエラーとなった場合の処理
          if (err != null) {
            console.error(err.message)
            toast.error('User registration failed.')
            return
          }

          // 登録が成功した場合の処理
          if (result != null) {
            const cognitoUser = result.user
            toast.success(`User ${cognitoUser.getUsername()} has signed up!`)
          } else {
            toast.error('User registration failed.')
          }
        } finally {
          setIsLoading(false)
        }
      }
    )
  }

  return (
    <>
      <div id='SignUp'>
        <Form.Group controlId='formBasicName' className='mt-3'>
          <Form.Label>Your name</Form.Label>
          <Form.Control type='text' placeholder='Enter name' value={name} onInput={(event) => setName(event.currentTarget.value)} />
        </Form.Group>
        <Form.Group controlId='formBasicEmail' className='mt-3'>
          <Form.Label>Email address</Form.Label>
          <Form.Control type='email' placeholder='Enter email' value={email} onInput={(event) => setEmail(event.currentTarget.value)} />
        </Form.Group>
        <Form.Group controlId='formBasicPassword' className='mt-3'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' placeholder='Password' value={password} onInput={(event) => setPassword(event.currentTarget.value)} />
        </Form.Group>
        <hr />
        <Button variant='primary' className='mt-3' onClick={signUp} disabled={isLoading}>
          Sign Up
        </Button>
      </div>
    </>
  )
}
