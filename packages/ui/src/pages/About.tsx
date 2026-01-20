import { styled } from '@mui/material/styles'
import { Center } from '../components/layout/Center'
import { Box } from '@mui/material'
import { chainsafeSVG } from '../logos/chainsafeSVG'
import { w3fSvg } from '../logos/w3fSVG'
import { chainsPolkadotCircleSVG } from '../logos/polkadot-circleSVG'
import { Link } from '../components/library'

interface Props {
  className?: string
}

const About = ({ className }: Props) => {
  return (
    <Center className={className}>
      <h1>ℹ️ Project Information</h1>
      <p>
        This project is a{' '}
        <strong>
          fork of the{' '}
          <a
            href="https://github.com/polkadot-api/Multix"
            target="_blank"
            rel="noreferrer"
          >
            original
          </a>
        </strong>
        , developed by{' '}
        <a
          href="https://github.com/Tbaut"
          target="_blank"
          rel="noreferrer"
        >
          Thibaut Sardan
        </a>
        . Source code is available{' '}
        <a
          href="https://github.com/helikon-labs/multix"
          target="_blank"
          rel="noreferrer"
        >
          here
        </a>
        .
      </p>
      <h1>Multix values</h1>
      <ul className="values">
        <li>
          <h2>Open</h2>
          <p>
            Multix is open-source from the get-go. The back-end and front-end code can be{' '}
            <a
              href="https://github.com/helikon-labs/multix"
              target="_blank"
              rel="noreferrer"
            >
              found on GitHub
            </a>
            .
          </p>
        </li>
        <li>
          <h2>Permissionless</h2>
          <p>
            While Multix uses an open source indexer, the database is trust minimized and only
            contains information coming from the chain. No user information is stored and anyone can
            re-build this database at will.
          </p>
        </li>
        <li>
          <h2>Interoperable</h2>
          Multix doesn&apos;t create a walled garden. You can create a multisig on-chain anywhere,
          Multix will show it right away.
        </li>
        <li>
          <h2>Privacy-preserving</h2>
          <p>
            We do not gather private information. Additional information such as names is stored on
            your browser, and only visible to you.
          </p>
        </li>
      </ul>
      <h1 className="title">
        Built by{' '}
        <Link
          className="link"
          target="_blank"
          rel="noreferrer"
          href="https://github.com/tbaut"
        >
          Tbaut
        </Link>
      </h1>
      <h1 className="title">
        Maintained by{' '}
        <Link
          className="link"
          target="_blank"
          rel="noreferrer"
          href="https://github.com/helikon-labs"
        >
          Helikon Labs
        </Link>
      </h1>
      <h1 className="title">
        Supported by
        <Box className="logoWrapper">
          <Link
            className="link"
            target="_blank"
            rel="noreferrer"
            href="https://web3.foundation"
          >
            <img
              className="logo-w3f"
              src={w3fSvg}
              alt="web 3 foudation logo"
            />
          </Link>
          <LinkPolkadotLogoStyled
            className="link"
            target="_blank"
            rel="noreferrer"
            href="https://polkadot.network"
          >
            <img
              src={chainsPolkadotCircleSVG}
              alt="Polkadot logo"
            />
          </LinkPolkadotLogoStyled>
          <Link
            className="link chainsafe"
            target="_blank"
            rel="noreferrer"
            href="https://chainsafe.io"
          >
            <img
              className="logo-chainsafe"
              src={chainsafeSVG}
              alt="chainsafe systems logo"
            />
          </Link>
        </Box>
      </h1>
    </Center>
  )
}

const LinkPolkadotLogoStyled = styled(Link)`
  margin-left: 1rem;

  img {
    display: block;
    max-width: 5rem;
  }
`

export default styled(About)`
  .title {
    margin-top: 3rem;
  }

  .values {
    list-style-type: none;

    h2 {
      margin-bottom: 0;
    }
    p {
      margin-top: 0;
    }
  }

  .logoWrapper {
    display: flex;
    align-items: center;
    padding-left: 3rem;
    margin-top: 1rem;
  }

  .link {
    text-decoration: none;
    &.chainsafe {
      margin-left: 1rem;
      display: flex;
      align-items: center;
    }
  }

  .logo-chainsafe {
    max-width: 5rem;
    margin-right: 1rem;
  }

  .logo-w3f {
    display: block;
    min-width: 8rem;
  }
`
