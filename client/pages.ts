import { CognitoUserSession } from "amazon-cognito-identity-js"

interface Page {
  emoji: string
  path: string
  name: string
  showCondition: (cognitoUserSession: CognitoUserSession) => boolean
}

const pages: Page[] = [
  {
    emoji: '🏠',
    path: '/',
    name: 'Home',
    showCondition: () => true
  },
  {
    emoji: '📖',
    path: '/sign_up/',
    name: 'SignUp',
    showCondition: (cognitoUserSession) => cognitoUserSession == null
  },
  {
    emoji: '🖊️',
    path: '/verify_code/',
    name: 'VerifyCode',
    showCondition: (cognitoUserSession) => cognitoUserSession == null
  },
  {
    emoji: '💡',
    path: '/resend_code/',
    name: 'ResendCode',
    showCondition: (cognitoUserSession) => cognitoUserSession == null
  },
  {
    emoji: '🔑',
    path: '/sign_in/',
    name: 'SignIn',
    showCondition: (cognitoUserSession) => cognitoUserSession == null
  }
]

export default pages
