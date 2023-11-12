import React, { useContext, useState } from 'react'
import { Button } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { CognitoUserContext } from './_app'
import { cognitoIdentityServiceProvider } from '../src/common/cognito'

export default function WithdrawalPage (): React.JSX.Element {
  const [isLoading, setIsLoading] = useState(false)

  const { accessToken } = useContext(CognitoUserContext)

  const withdrawal = async (): Promise<void> => {
    if (!window.confirm('Are you sure you want to withdrawal?')) {
      return
    }
    setIsLoading(true)

    if (accessToken == null) {
      toast.error('Access Token is missing.')
      return
    }

    cognitoIdentityServiceProvider.deleteUser({
      AccessToken: accessToken
    }, (err, result) => {
      try {
        // ユーザーの削除がエラーとなった場合の処理
        if (err !== null) {
          console.error(err.message)
          toast.error('Failed to withdrawal.')
          return
        }

        // ユーザーの削除が成功した場合の処理
        if (result != null) {
          toast.success('Succeeded to withdrawal.')
        } else {
          toast.error('Failed to withdrawal.')
        }
      } finally {
        setIsLoading(false)
      }
    })
  }

  return (
    <>
      <div id='Withdrawal'>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <Button variant='primary' className='mt-3' onClick={withdrawal} disabled={isLoading}>
          Withdrawal
        </Button>
      </div>
    </>
  )
}
