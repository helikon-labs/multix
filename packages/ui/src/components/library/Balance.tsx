import { styled } from '@mui/material/styles';
import { useGetBalance } from '../../hooks/useGetBalance';
import { useNetwork } from '../../contexts/NetworkContext';

interface BalanceProps {
    address: string;
}

const Balance = ({ address }: BalanceProps) => {
    const { balanceFormatted } = useGetBalance({ address });
    const { selectedNetworkInfo } = useNetwork();

    return (
        <BalanceStyled data-cy="asset-balance-native">
            {balanceFormatted}
            <ImgStyled
                src={selectedNetworkInfo?.nativeAssetLogo || selectedNetworkInfo?.networkLogo}
                alt="balance"
            />
        </BalanceStyled>
    );
};

const BalanceStyled = styled('div')`
    display: flex;
    color: ${({ theme }) => theme.custom.gray[700]};
    font-size: 1rem;
    justify-content: flex-end;
`;

const ImgStyled = styled('img')`
    margin-left: 0.5rem;
    width: 1.5rem;
    border-radius: 50%;
`;
export default Balance;
