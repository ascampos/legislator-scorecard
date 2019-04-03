import React from 'react'
import PropTypes from 'prop-types'
import ProgressBarWContext from '../progressBar'
import ProgressBar from '../progressBar/ProgressBar'
import InfoPopover from '../InfoPopover'

export default class Rating extends React. {
  constructor(props) {
    super(props)
    this.renderVoteSection = this.renderVoteSection.bind(this)
    this.renderCosponsorshipSection = this.renderCosponsorshipSection.bind(this)
    this.renderMedianDem = this.renderMedianDem.bind(this)
  }

  renderMedianDem() {
    if (this.props.chamber === 'senate') {
      return (
        <div className="flex-grow mr-2">
          <span className="font-weight-normal">Median Sen. Democrat</span>
          <ProgressBar
            width={this.props.rating.votes.cumulative.median.democrat}
          />
        </div>
      )
    } else if (this.props.chamber === 'house') {
      return (
        <div className="flex-grow mr-2">
          <span className="font-weight-normal">Median House Democrat</span>
          <ProgressBar
            width={this.props.rating.votes.cumulative.median.democrat}
          />
        </div>
      )
    }
  }

  renderVoteSection() {
    return (
      <div>
        <div className="sr-only">
          <h3>Vote information</h3>
          <p id="sr-stats">
            {`Voted with the progressive position ${
              this.props.rating.votes.score
            } percent of the time.`}
            {`The median democrat progressive rating was ${
              this.props.rating.votes.cumulative.median.democrat
            } percent.`}
            {`The median republican progressive rating was ${
              this.props.rating.votes.cumulative.median.republican
            } percent.`}
          </p>
        </div>

        <div aria-hidden>
          <div className="mb-2">
            <b className="d-block mb-1" style={{ fontSize: '1.1rem' }}>
              {this.props.chamber === 'upper' ? 'Sen.' : 'Rep.'}&nbsp;
              {this.props.lastName}'s votes&nbsp;
              <span className="text-lowercase" style={{ fontSize: '1rem' }}>
                ({this.props.rating.votes.cumulative.term})
              </span>
            </b>
            <ProgressBarWContext data={this.props.rating.votes} animate large />
          </div>
          <div className="d-flex">
            {this.renderMedianDem()}
            <div className="flex-grow ml-2">
              <span className="font-weight-normal">
                Median {this.props.chamber === 'upper' ? 'Sen.' : 'House'}{' '}
                Republican
              </span>
              <ProgressBar
                width={this.props.rating.votes.cumulative.median.republican}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderCosponsorshipSection() {
    return (
      <div className="mt-4">
        <h3 style={{ fontSize: '1.1rem', position: 'relative', top: '.5rem' }}>
          {this.props.chamber === 'senate' ? 'Sen.' : 'Rep.'}&nbsp;
          {this.props.lastName} cosponsored
        </h3>
        <div style={{ fontSize: '2.2rem' }} id="cosponsorship-summary">
          <b
            className={`${
              this.props.rating.sponsorship.legislator > 3
                ? 'text-primary'
                : 'text-danger'
            }`}
          >
            {this.props.rating.sponsorship.legislator}
          </b>
          &nbsp;
          <span className="font-weight-light">
            progressive{' '}
            {this.props.rating.sponsorship.legislator === 1 ? 'bill' : 'bills'}
          </span>
        </div>
        <div style={{ position: 'relative', top: '-.4rem' }}>
          out of&nbsp;
          <b className="text-primary">{this.props.rating.sponsorship.total}</b>
          &nbsp;endorsed by Prog. Mass for {this.props.rating.sponsorship.cumulative.term}&nbsp;
          <InfoPopover
            title="Which bills does Progressive Mass endorse?"
            text='Every session, Prog. Mass chooses a limited selection of progressive bills that advance its <a target="_blank" href="http://www.progressivemass.com/progressiveplatform">Progressive Platform.</a> There are, of course, worthy bills that do not make it into the selected group.'
          />
        </div>
      </div>
    )
  }

  render() {
    if (!this.props.rating) return null

    return (
      <div className="progress-component">
        <h2 className="sr-only">Progressive Ranking Summary</h2>
        {this.renderVoteSection()}
        {this.renderCosponsorshipSection()}
      </div>
    )
  }
}

Rating.propTypes = {
  rating: PropTypes.object.isRequired,
  chamber: PropTypes.string.isRequired,
  legislatorName: PropTypes.string.isRequired,
}
