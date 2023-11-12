import React, { createContext, useEffect, useState } from 'react'
import { type AppProps } from 'next/app'
import Head from 'next/head'
import { ICognitoUserSessionData, type CognitoUserSession } from 'amazon-cognito-identity-js'
import { ToastContainer } from 'react-toastify'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'

import '../styles/style.scss'
import '../styles/menu.scss'

import setting from '../setting'
import Layout from '../components/Layout'

export const CognitoUserContext = createContext<{
  accessToken: string | null
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>
}>({
  accessToken: null,
  setAccessToken: () => {}
})

export default function MyApp ({ Component, pageProps }: AppProps): React.JSX.Element {
  const [accessToken, _setAccessToken] = useState<string | null>(null)
  const setAccessToken = (accessToken: string): void => {
    localStorage.setItem('AccessToken', JSON.stringify(accessToken))
    _setAccessToken(accessToken)
  }

  useEffect(() => {
    const accessToken = localStorage.getItem('AccessToken')
    if (accessToken != null) {
      setAccessToken(JSON.parse(accessToken))
    }
  }, [])

  return (
    <>
      <Head>
        <meta charSet='utf-8' />
        <title>{setting.title}</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <link
          rel='icon'
          type='image/png'
          href={`${setting.basePath}/favicon.ico`}
        />
      </Head>
        <CognitoUserContext.Provider value={{
          accessToken,
          setAccessToken
        }}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <ToastContainer />
        </CognitoUserContext.Provider>
    </>
  )
}
