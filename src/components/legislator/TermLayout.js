import React from 'react'
import PropTypes from 'prop-types'
import SponsorshipTable from './SponsorshipTable'
import VoteTable from './VoteTable'

const sponsorship = 'sponsorship'
const votes = 'votes'

const TermLayout = (props) => {
  const [isActive, setIsActive] = React.useState(
    !props.data.votes || !props.data.votes.length ? sponsorship : votes
  )

  const onTabClick = (active) => (e) => {
    e.preventDefault()
    setIsActive(active)
  }

  const hasSponsorship = props.data.sponsorship && props.data.sponsorship.length
  const sponsorshipTab = (
    <li className='nav-item'>
      <div
        role='link'
        className={`nav-link ${isActive === sponsorship ? 'active' : ''} ${
          !hasSponsorship ? 'disabled' : ''
        }`}
        href='#'
        aria-current={isActive === sponsorship ? 'page' : false}
        onClick={
          hasSponsorship
            ? onTabClick('sponsorship')
            : function (e) {
                e.preventDefault()
              }
        }
        onKeyDown={
          hasSponsorship
            ? onTabClick('sponsorship')
            : function (e) {
                e.preventDefault()
              }
        }
        disabled={!hasSponsorship}>
        Cosponsorship
      </div>
    </li>
  )
  const hasVotes = props.data.votes && props.data.votes.length
  const voteTab = (
    <li className='nav-item'>
      <div
        role='link'
        className={`nav-link ${isActive === votes ? 'active' : ''} ${
          !hasVotes ? 'disabled' : ''
        }`}
        aria-current={isActive === votes ? 'page' : false}
        href='#'
        onClick={
          hasVotes
            ? onTabClick('votes')
            : function (e) {
                e.preventDefault()
              }
        }
        onKeyDown={
          hasVotes
            ? onTabClick('votes')
            : function (e) {
                e.preventDefault()
              }
        }
        disabled={!hasVotes}>
        Voting Record
      </div>
    </li>
  )

  let BodyComponent

  if (isActive === sponsorship) {
    BodyComponent = (
      <SponsorshipTable data={props.data} lastName={props.lastName} />
    )
  } else if (isActive === votes) {
    BodyComponent = <VoteTable data={props.data} lastName={props.lastName} />
  }
  return (
    <div className='white-background mb-4'>
      <ul className='nav justify-content-center'>
        {sponsorshipTab}
        {voteTab}
      </ul>
      <div>{BodyComponent}</div>
    </div>
  )
}

TermLayout.propTypes = {
  data: PropTypes.object.isRequired,
}

export default TermLayout
