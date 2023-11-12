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
    name: 'Sign Up',
    showCondition: (userInfo) => userInfo.accessToken == null
  },
  {
    emoji: '🖊️',
    path: '/verify_code/',
    name: 'Verify Code',
    showCondition: (userInfo) => userInfo.accessToken == null
  },
  {
    emoji: '💡',
    path: '/resend_code/',
    name: 'Resend Code',
    showCondition: (userInfo) => userInfo.accessToken == null
  },
  {
    emoji: '🔑',
    path: '/sign_in/',
    name: 'Sign In',
    showCondition: (userInfo) => userInfo.accessToken == null
  },
  {
    emoji: '🔒',
    path: '/verify_token/',
    name: 'Verify Token',
    showCondition: (userInfo) => userInfo.accessToken != null
  },
  {
    emoji: '📗',
    path: '/sign_out/',
    name: 'Sign Out',
    showCondition: (userInfo) => userInfo.accessToken != null
  },
  {
    emoji: '📝',
    path: '/change_password/',
    name: 'Change PW',
    showCondition: (userInfo) => userInfo.accessToken != null
  },
  {
    emoji: '⛰️',
    path: '/forgot_password/',
    name: 'Forgot PW',
    showCondition: (userInfo) => userInfo.accessToken == null
  },
  {
    emoji: '📚',
    path: '/confirm_password/',
    name: 'Confirm PW',
    showCondition: (userInfo) => userInfo.accessToken == null
  }
]

export default pages
