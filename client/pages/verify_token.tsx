import React, { useContext, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { CognitoUserContext } from './_app'
import { cognitoIdentityServiceProvider } from '../src/common/cognito'

export default function VerifyTokenPage (): React.JSX.Element {
  const [isLoadingLocal, setIsLoadingLocal] = useState(false)
  const [isLoadingRemote, setIsLoadingRemote] = useState(false)
  const [userInfo, setUserInfo] = useState('')
  const [responsedInfo, setResponsedInfo] = useState('')

  const { accessToken } = useContext(CognitoUserContext)

  const verifyToken = async (): Promise<void> => {
    setIsLoadingLocal(true)

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
        setIsLoadingLocal(false)
      }
    })
  }

  const SendRequest = async (): Promise<void> => {
    setIsLoadingRemote(true)
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL
      if (baseUrl == null) {
        toast.error('API URL is missing.')
        return
      }
      if (accessToken == null) {
        toast.error('Access Token is missing.')
        return
      }
      const url = `${baseUrl}/api/verify_jwt`
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      if (!response.ok) {
        const message = await response.text()
        console.error(message)
        toast.error('Failed to verify JWT.')
        return
      }
      const body = await response.json()
      setResponsedInfo(JSON.stringify(body, null, 2))
    } catch {
      toast.error('Failed to verify JWT.')
    } finally {
      setIsLoadingRemote(false)
    }
  }

  return (
    <>
      <div id='VerifyToken'>
        <Form.Group controlId='formBasicToken' className='mt-3'>
          <Form.Label>Access Token</Form.Label>
          <Form.Control as='textarea' rows={16} value={accessToken ?? '<NULL>'} disabled />
        </Form.Group>
        <hr />
        <h2>Local</h2>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <Button variant='primary' className='mt-3' onClick={verifyToken} disabled={isLoadingLocal}>
          Verify Token
        </Button>
        <Form.Group controlId='formBasicUserInfo' className='mt-3'>
          <Form.Label>User Info</Form.Label>
          <Form.Control as='textarea' rows={10} value={userInfo} readOnly />
        </Form.Group>
        <hr />
        <h2>Remote</h2>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <Button variant='primary' className='mt-3' onClick={SendRequest} disabled={isLoadingRemote}>
          Verify Token
        </Button>
        <Form.Group controlId='formBasicResponsedInfo' className='mt-3'>
          <Form.Label>Responsed Info</Form.Label>
          <Form.Control as='textarea' rows={10} value={responsedInfo} readOnly />
        </Form.Group>
      </div>
    </>
  )
}
