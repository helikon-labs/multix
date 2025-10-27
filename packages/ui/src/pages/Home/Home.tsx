import { PropsWithChildren, useCallback, useEffect, useState } from 'react'
import { Box, Grid2 as Grid } from '@mui/material'
import { useMultiProxy } from '../../contexts/MultiProxyContext'
import { useSearchParams } from 'react-router'
import SuccessCreation from '../../components/SuccessCreation'
import NewMulisigAlert from '../../components/NewMulisigAlert'
import { styled } from '@mui/material/styles'
import HeaderView from './HeaderView'
import MultisigView from './MultisigView'
import TransactionList from '../../components/Transactions/TransactionList'
import { ConnectOrWatch } from '../../components/ConnectCreateOrWatch'
import { useDisplayLoader } from '../../hooks/useDisplayLoader'
import { useDisplayError } from '../../hooks/useDisplayError'
import HomeBanner from '../../components/HomeBanner'
// import DomainMoveBanner from '../../components/DomainMoveBanner'

interface HomeProps {
  className?: string
}

const Home = ({ className }: HomeProps) => {
  const [searchParams, setSearchParams] = useSearchParams({
    creationInProgress: 'false'
  })
  const { multiProxyList } = useMultiProxy()
  const [showNewMultisigAlert, setShowNewMultisigAlert] = useState(false)
  const DisplayError = useDisplayError()
  const DisplayLoader = useDisplayLoader()

  const onClosenewMultisigAlert = useCallback(() => {
    setShowNewMultisigAlert(false)
    setSearchParams((prev) => {
      prev.set('creationInProgress', 'false')
      return prev
    })
  }, [setSearchParams])

  useEffect(() => {
    if (searchParams.get('creationInProgress') === 'true') {
      setShowNewMultisigAlert(true)
      setTimeout(() => {
        onClosenewMultisigAlert()
      }, 20000)
    }
  }, [onClosenewMultisigAlert, searchParams])

  if (DisplayLoader) {
    return DisplayLoader
  }

  if (DisplayError) {
    return DisplayError
  }

  if (multiProxyList.length === 0) {
    return (
      <MessageWrapper>
        {showNewMultisigAlert ? <SuccessCreation /> : <ConnectOrWatch />}
      </MessageWrapper>
    )
  }

  return (
    <Grid
      className={className}
      container
    >
      {showNewMultisigAlert && multiProxyList.length > 0 && showNewMultisigAlert && (
        <NewMulisigAlert onClose={onClosenewMultisigAlert} />
      )}
      <HomeBanner />
      {/* <DomainMoveBanner /> */}
      <Grid
        alignItems="center"
        size={{ xs: 12 }}
      >
        <HeaderView />
      </Grid>
      <Grid
        alignItems="center"
        size={{ xs: 12, md: 5, lg: 4 }}
      >
        <MultisigView />
      </Grid>
      {multiProxyList.length > 0 && (
        <Grid size={{ xs: 12, md: 7, lg: 8 }}>
          <TransactionsWrapperStyled data-cy="container-transaction-list">
            <TransactionList />
          </TransactionsWrapperStyled>
        </Grid>
      )}
    </Grid>
  )
}

const MessageWrapper = (props: PropsWithChildren) => {
  return (
    <Grid
      container
      spacing={2}
    >
      <LoaderBoxStyled>{props.children}</LoaderBoxStyled>
    </Grid>
  )
}

const LoaderBoxStyled = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  padding: 1rem;
`

const TransactionsWrapperStyled = styled('div')`
  @media (min-width: ${({ theme }) => theme.breakpoints.values.md}px) {
    margin-left: 1.5rem;
  }
`

export default Home
