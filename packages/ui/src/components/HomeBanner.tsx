import { Alert, styled } from '@mui/material'
import { useEffect, useState } from 'react'
// import { HiOutlineXMark as CloseIcon } from 'react-icons/hi2'
// import { HiOutlineArrowTopRightOnSquare as LaunchIcon } from 'react-icons/hi2'
// import { Link } from './library'

interface Props {
  className?: string
}

const REFERENDUM_NUMBER = 120
const DISMISSED_REFERENDUM_KEY = `multix.dismissedReferendumBanner${REFERENDUM_NUMBER}`

export const HomeBanner = ({ className = '' }: Props) => {
  const [isVisible, setIsVisible] = useState(false)
  const doNotDisplay = localStorage.getItem(DISMISSED_REFERENDUM_KEY) === 'true'

  useEffect(() => {
    if (!doNotDisplay) {
      setIsVisible(true)
    }
  }, [doNotDisplay])

  // const onClose = useCallback(() => {
  //   localStorage.setItem(DISMISSED_REFERENDUM_KEY, 'true')
  //   setIsVisible(false)
  // }, [])

  if (!isVisible) return null

  return (
    <Alert
      severity="info"
      className={className}
    >
      <InfoTextStyled>
        Multix will no longer be maintained after 2025-12-31. Please migrate to a new multisig
        solution by then. Nova, Mimir, Signet or Polkadot.js are good options.
        {/* If you like Multix, consider showing your support and voting AYE on our treasury proposal.
        <Linkstyled
          href={`https://polkadot.polkassembly.io/referenda/${REFERENDUM_NUMBER}`}
          target="_blank"
        >
          Polkassembly
          <LaunchIcon
            className="icon"
            size={20}
          />
        </Linkstyled>
        <Linkstyled
          href={`https://polkadot.subsquare.io/referenda/referendum/${REFERENDUM_NUMBER}`}
          target="_blank"
        >
          Subsquare
          <LaunchIcon
            className="icon"
            size={20}
          />
        </Linkstyled> */}
      </InfoTextStyled>
      {/* <IconButton
        className="closeButton"
        size="small"
        aria-label="close"
        color="inherit"
        onClick={onClose}
      >
        <CloseIcon size={20} />
      </IconButton> */}
    </Alert>
  )
}

// const Linkstyled = styled(Link)`
//   display: inline-flex;
//   padding: 0 0 0 0.5rem;

//   .icon {
//     padding-left: 0.5rem;
//   }
// `

const InfoTextStyled = styled('div')`
  flex: 1;
`

export default styled(HomeBanner)`
  width: 100%;
  margin-bottom: 1rem;

  .MuiAlert-message {
    display: flex;
    align-items: center;
    width: 100%;
  }

  .MuiAlert-icon {
    align-items: center;
  }
`
