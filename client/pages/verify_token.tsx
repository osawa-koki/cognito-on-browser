import React, { useContext, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { CognitoUserContext } from './_app'
import { cognitoIdentityServiceProvider } from '../src/common/cognito'

export default function VerifyTokenPage (): React.JSX.Element {
  const [isLoading, setIsLoading] = useState(false)
  const [userInfo, setUserInfo] = useState('')

  const { accessToken } = useContext(CognitoUserContext)

  const verifyToken = async (): Promise<void> => {
    setIsLoading(true)

    if (accessToken == null) {
      toast.error('Access Token is missing.')
      return
    }

    cognitoIdentityServiceProvider.getUser({
      AccessToken: accessToken
    }, (err, result) => {
      try {
        // ユーザー情報の取得がエラーとなった場合の処理
        if (err != null) {
          console.error(err.message)
          toast.error('Failed to verify JWT.')
          return
        }

        // ユーザー情報の取得が成功した場合の処理
        if (result != null) {
          setUserInfo(JSON.stringify(result, null, 2))
          toast.success('Succeeded to verify JWT.')
        } else {
          toast.error('Failed to verify JWT.')
        }
      } finally {
        setIsLoading(false)
      }
    })
  }

  return (
    <>
      <div id='VerifyToken'>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <Button variant='primary' className='mt-3' onClick={verifyToken} disabled={isLoading}>
          Verify
        </Button>
        <hr />
        <Form.Group controlId='formBasicTextarea' className='mt-3'>
          <Form.Label>Access Token</Form.Label>
          <Form.Control as='textarea' rows={10} value={userInfo} readOnly />
        </Form.Group>
      </div>
    </>
  )
}
