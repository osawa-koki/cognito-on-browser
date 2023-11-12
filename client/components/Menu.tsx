import React, { useContext, useState } from 'react'
import Link from 'next/link'
import { Button } from 'react-bootstrap'
import { BsGearFill } from 'react-icons/bs'
import pages from '../pages'
import { CognitoUserContext } from '../pages/_app'

interface Props {
  currentPage: string | null
}

function Menu (props: Props): React.JSX.Element {
  const { currentPage } = props

  const [menuOpen, setMenuOpen] = useState<boolean>(false)

  const { cognitoUserSession } = useContext(CognitoUserContext)

  return (
    <>
      <div id='Menu' className={menuOpen ? 'on' : ''}>
        {pages.map((page, index: number) => {
          if (cognitoUserSession != null && !page.showCondition(cognitoUserSession)) return (<></>)
          return (
            <Link
              key={index}
              href={page.path}
              className={`btn ${
                currentPage === page.path
                  ? 'btn-primary active'
                  : ''
              }`}
            >
              {page.emoji}&nbsp;{page.name}
            </Link>
          )
        })}
      </div>
      <div id='ToMenu'>
        <Button
          id='Closer'
          variant='primary'
          className={`btn-close btn-close-white ${menuOpen ? 'on' : ''}`}
          onClick={() => {
            setMenuOpen(false)
          }}
        ></Button>
        <BsGearFill
          id='Opener'
          className={menuOpen ? 'off' : ''}
          onClick={() => {
            setMenuOpen(true)
          }}
        ></BsGearFill>
      </div>
    </>
  )
}

export default Menu
