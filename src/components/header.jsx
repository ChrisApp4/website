import React from 'react'
import Link from './link'
import { useTranslation } from 'react-i18next'

import HeaderMobile from './header_mobile'

import { generateKey, getLanguageFromAbsolutePath } from './utils'

import logo from '../images/logo.png'
import { graphql, useStaticQuery } from 'gatsby'

const Header = ({ pageContext, path }) => {
  const { t } = useTranslation()

  const menuHeaderNodes = useStaticQuery(headerQuery).allFile.nodes
  const menuItems = menuHeaderNodes.find(
    ({ absolutePath }) =>
      getLanguageFromAbsolutePath(absolutePath) === pageContext.lang
  ).childYaml.parsedContent

  return (
    <header className="header">
      <div className="header__in">
        <div className="header__desktop">
          <div className="header__logo">
            <Link to="/">
              <img src={logo} alt="company-logo" />
            </Link>
          </div>
          <nav className="topbar-menu">
            <ul className="topbar-menu__list">
              {menuItems.map(({ title, to }, idx) => (
                <li key={generateKey(title, idx)} className="topbar-menu__item">
                  <Link
                    className={`topbar-menu__link ${
                      path.startsWith(to) ? 'topbar-menu__link_active' : ''
                    }`}
                    to={to}
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="header__action">
            <Link
              className="header__action-signup"
              to="https://manager.hubrise.com/signup"
              newTab={false}
            >
              {t(`layout.header.buttons.signup`)}
            </Link>
            <Link
              className="header__action-login"
              to="https://manager.hubrise.com/login"
              newTab={false}
            >
              {t(`layout.header.buttons.login`)}
            </Link>
          </div>
        </div>
        <HeaderMobile />
      </div>
    </header>
  )
}

const headerQuery = graphql`
  query getHeaderData {
    allFile(filter: { base: { eq: "menu-header.yaml" } }) {
      nodes {
        absolutePath
        childYaml {
          parsedContent
        }
      }
    }
  }
`

export default Header
