import { Box, Checkbox, FormControlLabel, Tooltip, styled } from '@mui/material';
import { HiOutlineInformationCircle } from 'react-icons/hi2';

interface Props {
    setWithProxy: (withProxy: boolean) => void;
    withProxy: boolean;
    className?: string;
}
const WithProxySelection = ({ setWithProxy, withProxy, className }: Props) => {
    return (
        <Box className={className}>
            <TitleBoxStyled>
                Pure proxy <InfoBox />
            </TitleBoxStyled>
            <FormControlLabel
                label={
                    <>
                        Use a pure proxy (not cross-chain{' '}
                        <a
                            href="https://github.com/Tbaut/Multix/wiki/When-to-use-a-Pure-proxy-with-a-Multisig"
                            target="_blank"
                            rel="noreferrer"
                        >
                            see here
                        </a>
                        )
                    </>
                }
                control={
                    <Checkbox
                        checked={withProxy}
                        onChange={() => setWithProxy(!withProxy)}
                        // @ts-expect-error
                        inputProps={{ 'data-cy': 'checkbox-use-pure-proxy' }}
                    />
                }
            />
        </Box>
    );
};

const InfoBox = ({ className = '' }: { className?: string }) => (
    <Tooltip
        className={className}
        title={
            <span>
                Using a pure proxy has advantages and drawbacks see when it makes sense to use it{' '}
                <a
                    href="https://github.com/Tbaut/Multix/wiki/When-to-use-a-Pure-proxy-with-a-Multisig"
                    target="_blank"
                    rel="noreferrer"
                >
                    in the docs
                </a>
                .
            </span>
        }
    >
        <span>
            <HiOutlineInformationCircle />
        </span>
    </Tooltip>
);

const TitleBoxStyled = styled(Box)`
    font-size: 1.125rem;
    font-weight: 500;
    color: ${({ theme }) => theme.custom.text.primary};
`;

export default styled(WithProxySelection)`
    margin-top: 1rem;
`;
