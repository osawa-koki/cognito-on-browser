import React, { createContext, useEffect, useState } from 'react'
import { type AppProps } from 'next/app'
import Head from 'next/head'
import { CognitoUserSession } from 'amazon-cognito-identity-js'
import { ToastContainer } from 'react-toastify'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'

import '../styles/style.scss'
import '../styles/menu.scss'

import setting from '../setting'
import Layout from '../components/Layout'

export const CognitoUserContext = createContext<{
  cognitoUserSession: CognitoUserSession | null
  setCognitoUserSession: React.Dispatch<React.SetStateAction<CognitoUserSession | null>>
}>({
  cognitoUserSession: null,
  setCognitoUserSession: () => {}
})

export default function MyApp ({ Component, pageProps }: AppProps): React.JSX.Element {
  const [cognitoUserSession, _setCognitoUserSession] = useState<CognitoUserSession | null>(null)
  const setCognitoUserSession = (cognitoUserSession: CognitoUserSession | null): void => {
    localStorage.setItem('CognitoUserSession', JSON.stringify(cognitoUserSession))
    _setCognitoUserSession(cognitoUserSession)
  }

  useEffect(() => {
    const cognitoUserSession = localStorage.getItem('CognitoUserSession')
    if (cognitoUserSession != null) {
      setCognitoUserSession(JSON.parse(cognitoUserSession))
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
          cognitoUserSession,
          setCognitoUserSession
        }}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <ToastContainer />
        </CognitoUserContext.Provider>
    </>
  )
}
