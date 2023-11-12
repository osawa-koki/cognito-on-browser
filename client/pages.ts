import { type CognitoUserSession } from 'amazon-cognito-identity-js'

interface Page {
  emoji: string
  path: string
  name: string
  showCondition: (userInfo: {
    accessToken: string | null
  }) => boolean
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
    showCondition: (userInfo) => userInfo.accessToken == null
  },
  {
    emoji: '🖊️',
    path: '/verify_code/',
    name: 'VerifyCode',
    showCondition: (userInfo) => userInfo.accessToken == null
  },
  {
    emoji: '💡',
    path: '/resend_code/',
    name: 'ResendCode',
    showCondition: (userInfo) => userInfo.accessToken == null
  },
  {
    emoji: '🔑',
    path: '/sign_in/',
    name: 'SignIn',
    showCondition: (userInfo) => userInfo.accessToken == null
  },
  {
    emoji: '🔒',
    path: '/verify_token/',
    name: 'VerifyToken',
    showCondition: (userInfo) => userInfo.accessToken != null
  }
]

export default pages
