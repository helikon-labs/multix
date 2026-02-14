import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
} from '@mui/material';
import {
    HiOutlineChevronDown as ExpandMoreIcon,
    HiOutlineCheck as CheckIcon,
} from 'react-icons/hi2';
import { MdOutlineHourglassBottom } from 'react-icons/md';

import AccountDisplay from '../AccountDisplay/AccountDisplay';

interface TransactionProgressProps {
    value: number;
    threshold: number;
    multisigSignatories: string[];
    approvals: string[];
}

const ListItemToSign = ({ approvals, signer }: { approvals: string[]; signer: string }) => {
    return (
        <ListItem disablePadding>
            <ListItemButtonStyled>
                <ListItemIcon>
                    {approvals.includes(signer) ? (
                        <CheckIconStyled size={24} />
                    ) : (
                        <MdOutlineHourglassBottom size={24} />
                    )}
                </ListItemIcon>
                <AccountDisplay
                    address={signer}
                    canCopy
                />
            </ListItemButtonStyled>
        </ListItem>
    );
};

const ListItemButtonStyled = styled(ListItemButton)`
    &:hover,
    &:focus {
        cursor: auto;
        background: none;
    }
`;

const TransactionProgress = ({
    value,
    threshold,
    multisigSignatories,
    approvals,
}: LinearProgressProps & TransactionProgressProps) => {
    const progressBarFillPercent = (value / threshold) * 100;

    return (
        <AccordionStyled>
            <AccordionSummaryStyled expandIcon={<ExpandMoreIcon size={16} />}>
                <BoxWrapperStyled>
                    <LinearProgressBoxStyled>
                        <LinearProgress
                            variant="determinate"
                            value={progressBarFillPercent}
                        />
                    </LinearProgressBoxStyled>
                    <TypographyBoxStyled>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >{`${value}/${threshold}`}</Typography>
                    </TypographyBoxStyled>
                </BoxWrapperStyled>
            </AccordionSummaryStyled>
            <AccordionDetailsStyled>
                <List dense>
                    {multisigSignatories.map((signer: string) => {
                        return (
                            <ListItemToSign
                                key={signer}
                                approvals={approvals}
                                signer={signer}
                            />
                        );
                    })}
                </List>
            </AccordionDetailsStyled>
        </AccordionStyled>
    );
};

const BoxWrapperStyled = styled(Box)`
    display: flex;
    align-items: center;
    width: 100%;
`;

const LinearProgressBoxStyled = styled(Box)`
    width: 100%;
    margin-right: 0.5rem;
`;

const TypographyBoxStyled = styled(Box)`
    min-width: 2rem;
`;

const AccordionStyled = styled(Accordion)`
    box-shadow: none;
    padding-right: 8px;

    .MuiAccordionSummary-root {
        min-height: 64px;
    }

    &:before {
        display: none;
    }

    &.Mui-expanded {
        margin: 0 !important;
    }
`;

const AccordionSummaryStyled = styled(AccordionSummary)`
    border: none;
    box-shadow: none;
    padding: 0;

    .MuiAccordionSummary-content {
        margin: 0;
    }
`;

const AccordionDetailsStyled = styled(AccordionDetails)`
    padding: 0;
`;

const CheckIconStyled = styled(CheckIcon)(
    ({ theme }) => `
    color: ${theme.custom.identity.green};
  `,
);

export default TransactionProgress;
