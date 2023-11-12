import React, { useContext, useState } from 'react'
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js'
import { Button, Form } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { CognitoUserContext } from './_app'
import { cognitoIdentityServiceProvider } from '../src/common/cognito'

export default function UpdateAttributesPage (): React.JSX.Element {
  const [isLoading, setIsLoading] = useState(false)
  const [comment, setComment] = useState('')

  const { accessToken } = useContext(CognitoUserContext)

  const updateAttributes = async (): Promise<void> => {
    setIsLoading(true)

    if (accessToken == null) {
      toast.error('Access Token is missing.')
      return
    }

    const attributes: AmazonCognitoIdentity.CognitoUserAttribute[] = []
    if (comment != null) {
      attributes.push(new AmazonCognitoIdentity.CognitoUserAttribute({
        Name: 'custom:comment',
        Value: comment
      }))
    }

    cognitoIdentityServiceProvider.updateUserAttributes({
      AccessToken: accessToken,
      UserAttributes: attributes
    }, (err, result) => {
      try {
        // ユーザー属性の更新がエラーとなった場合の処理
        if (err != null) {
          console.error(err.message)
          toast.error('Failed to update attributes.')
          return
        }

        // ユーザー属性の更新が成功した場合の処理
        if (result != null) {
          toast.success('Succeeded to update attributes.')
        } else {
          toast.error('Failed to update attributes.')
        }
      } finally {
        setIsLoading(false)
      }
    })
  }

  return (
    <>
      <div id='UpdateAttributes'>
        <Form.Group controlId='formBasicComment' className='mt-3'>
          <Form.Label>Access Token</Form.Label>
          <Form.Control as='textarea' rows={10} value={comment} onInput={(event) => { setComment(event.currentTarget.value) }} />
        </Form.Group>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <Button variant='primary' className='mt-3' onClick={updateAttributes} disabled={isLoading}>
          Update Attributes
        </Button>
      </div>
    </>
  )
}
