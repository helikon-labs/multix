import { styled } from '@mui/material/styles';
import { useGetAssetBalance } from '../../hooks/useGetAssetBalance';

interface BalanceProps {
    address: string;
    assetId: number;
    logo: string;
}

const AssetBalance = ({ address, assetId, logo }: BalanceProps) => {
    const { balanceFormatted } = useGetAssetBalance({ address, assetId });

    if (!balanceFormatted) return null;

    return (
        <BalanceStyled data-cy={`asset-balance-${assetId}`}>
            {balanceFormatted}
            <ImgStyled
                src={logo}
                alt="balance"
            />
        </BalanceStyled>
    );
};

const BalanceStyled = styled('div')`
    display: flex;
    color: ${({ theme }) => theme.custom.gray[700]};
    font-size: 1rem;
    margin-top: 0.5rem;
    justify-content: flex-end;
`;

const ImgStyled = styled('img')`
    margin-left: 0.5rem;
    width: 1.5rem;
    border-radius: 50%;
`;
export default AssetBalance;
