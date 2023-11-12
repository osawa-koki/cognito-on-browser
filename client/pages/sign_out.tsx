import React, { useContext, useState } from 'react'
import { Button } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { CognitoUserContext } from './_app'
import { cognitoIdentityServiceProvider } from '../src/common/cognito'

export default function SignOutPage (): React.JSX.Element {
  const [isLoading, setIsLoading] = useState(false)

  const { accessToken, setAccessToken } = useContext(CognitoUserContext)

  const signOut = async (): Promise<void> => {
    setIsLoading(true)

    if (accessToken == null) {
      toast.error('Access Token is missing.')
      return
    }

    cognitoIdentityServiceProvider.globalSignOut({
      AccessToken: accessToken
    }, (err, result) => {
      try {
        // サインアウトがエラーとなった場合の処理
        if (err != null) {
          console.error(err.message)
          toast.error('Already signed out.')
          return
        }

        // サインアウトが成功した場合の処理
        if (result != null) {
          toast.success('Succeeded to sign out.')
        } else {
          toast.error('Failed to sign out.')
        }
      } finally {
        setAccessToken(null)
        setIsLoading(false)
      }
    })
  }

  return (
    <>
      <div id='SignOut'>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <Button variant='primary' className='mt-3' onClick={signOut} disabled={isLoading}>
          Sign Out
        </Button>
      </div>
    </>
  )
}
