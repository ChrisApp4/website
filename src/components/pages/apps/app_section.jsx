import React from 'react'
import PropTypes from 'prop-types'
import GatsbyImage from 'gatsby-image'

import Link from '../../link'
import { generateKey } from '../../utils'
import { useLayoutContext } from '../../../context/layout'

export const AppSection = ({ title, apps, logos, suggestAppContent }) => {
  return (
    <section className="section">
      <div className="section__in section__in_padding section__in_reverse">
        <h3 className="section__title section__title_align-left">{title}</h3>
        <ul className="apps">
          {apps.map((app, idx) => {
            const logo = logos.find(({ base }) => base === app.logo)
            if (!logo) throw new Error(`${title} does not have a logo`)

            return (
              <li key={generateKey(title, idx)} className="app">
                <Link
                  to={app.website || app.documentation}
                  className="app__box"
                >
                  <GatsbyImage
                    className="app__box-image"
                    alt={title}
                    imgStyle={{ objectFit: 'scale-down' }}
                    {...logo.childImageSharp}
                  />
                </Link>
                <div className="app__description">
                  {app.description}
                  {app.additional_info && (
                    <p>
                      <i>{app.additional_info}</i>
                    </p>
                  )}
                </div>
                {app.documentation && (
                  <div className="app__more">
                    <Link to={app.documentation} className="app__more-link">
                      View documentation
                    </Link>
                  </div>
                )}
              </li>
            )
          })}
          {suggestAppContent && <SuggestApp {...suggestAppContent} />}
        </ul>
      </div>
    </section>
  )
}

AppSection.propTypes = {
  title: PropTypes.string.isRequired,
  apps: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string.isRequired,
      logo: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      additional_info: PropTypes.string
    })
  ).isRequired,
  logos: PropTypes.arrayOf(
    PropTypes.shape({
      relativeDirectory: PropTypes.string.isRequired,
      childImageSharp: PropTypes.object
    })
  ).isRequired,
  suggestAppContent: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    button: PropTypes.string.isRequired
  })
}

const SuggestApp = ({ title, description, button }) => {
  const { forms } = useLayoutContext()

  return (
    <li className="app">
      <div className="app__title">{title}</div>
      <button
        className="app__box app__box_suggest-app"
        data-open="suggest-app"
        aria-controls="suggest-app"
        aria-haspopup="true"
        tabIndex="0"
        onClick={forms.suggestApp.toggle}
      >
        <div className="app__box-image app__box-image_suggest-app">
          <span>?</span>
        </div>
      </button>
      <div className="app__description">{description}</div>
      <div className="app__more">
        <button
          className="app__more-link"
          data-open="suggest-app"
          aria-controls="suggest-app"
          aria-haspopup="true"
          tabIndex="0"
          onClick={forms.suggestApp.toggle}
        >
          {button}
        </button>
      </div>
    </li>
  )
}

SuggestApp.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  button: PropTypes.string.isRequired
}
