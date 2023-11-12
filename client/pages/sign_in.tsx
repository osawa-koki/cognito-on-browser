import React, { useContext, useState } from 'react'
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js'
import { Button, Form } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { CognitoUserContext } from './_app'
import { userPool } from '../src/common/cognito'

export default function SignInPage (): React.JSX.Element {
  const [isLoading, setIsLoading] = useState(false)

  const { setCognitoUserSession } = useContext(CognitoUserContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signIn = async (): Promise<void> => {
    setIsLoading(true)

    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
      Username: email,
      Password: password
    })

    const userData = {
      Username: email,
      Pool: userPool
    }
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        console.log(JSON.stringify(result, null, 2))
        setCognitoUserSession(result)
        toast.success(`User ${result.getIdToken().payload.email as string} has signed in!`)
        setIsLoading(false)
      },
      onFailure: (err) => {
        console.error(err.message)
        toast.error('User sign in failed.')
        setIsLoading(false)
      }
    })
  }

  return (
    <>
      <div id='SignIn'>
        <Form.Group controlId='formBasicEmail' className='mt-3'>
          <Form.Label>Email address</Form.Label>
          <Form.Control type='email' placeholder='Enter email' value={email} onInput={(event) => { setEmail(event.currentTarget.value) }} />
        </Form.Group>
        <Form.Group controlId='formBasicPassword' className='mt-3'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' placeholder='Password' value={password} onInput={(event) => { setPassword(event.currentTarget.value) }} />
        </Form.Group>
        <hr />
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <Button variant='primary' className='mt-3' onClick={signIn} disabled={isLoading}>
          Verify
        </Button>
      </div>
    </>
  )
}
