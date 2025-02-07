import React from 'react'
import PropTypes from 'prop-types'
import Tabs from 'react-responsive-tabs'
import TermLayout from './TermLayout'
import ProgressBarWContext from '../progressBar'
import { getSessionNumber } from '../../utilities'

export const SessionTabs = ({ terms, chamber, lastName }) => {
  const tabItems = terms.map((d) => {
    const sessionNumber = getSessionNumber(d.term)
    return {
      title: (
        <div>
          <div>{d.term} </div>
          <div style={{ fontSize: '1rem' }}>{sessionNumber} Session</div>
          <div
            style={{
              marginLeft: '8%',
              marginRight: '8%',
              marginTop: '7px',
            }}>
            <ProgressBarWContext data={d} />
          </div>
        </div>
      ),
      key: d.term,
      getContent: () => {
        return (
          <TermLayout
            id={d.term}
            data={d}
            chamber={chamber}
            lastName={lastName}
          />
        )
      },
    }
  })

  const selectedTabKey = terms[terms.length - 1].term

  return (
    <div className='inverted-tabs'>
      <h2 className='sr-only'>Legislative Terms</h2>
      <Tabs
        items={tabItems}
        showMore={false}
        wrapperClass='inverted-tabs'
        transform={false}
        selectedTabKey={selectedTabKey}
      />
    </div>
  )
}

export default SessionTabs

SessionTabs.propTypes = {
  terms: PropTypes.array.isRequired,
  chamber: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
}
