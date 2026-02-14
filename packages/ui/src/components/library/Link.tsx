import { css, styled } from '@mui/material/styles';
import { Link as RouterLinkDom, LinkProps, NavLink as RouterNavLink } from 'react-router';

const BaseLinkStyles = css`
    color: #3a3b3b;
    text-decoration: none;
    font-weight: 500;
    cursor: pointer;
    padding: 0.5rem 1rem;
    transition: color 0.2s linear;

    &:focus,
    &:hover {
        color: #1244f5;
    }

    &:disabled {
        background: #d2d2d2;
        box-shadow: none;
    }
`;

export const Link = styled('a')`
    ${BaseLinkStyles};
`;

export const RouterLink = styled(RouterLinkDom)<LinkProps>`
    ${BaseLinkStyles};
`;

export const NavLink = styled(RouterNavLink)<LinkProps>`
    ${BaseLinkStyles};

    display: inline-block;
    color: ${({ theme }) => theme.custom.gray[900]};
    transition: all 0.2s ease-in-out;

    &:hover {
        background: ${({ theme }) => theme.custom.gray[300]};
        border-radius: ${({ theme }) => theme.custom.borderRadius};
        color: ${({ theme }) => theme.custom.gray[900]};
    }

    &:active {
        background: ${({ theme }) => theme.custom.gray[500]};
    }

    &.active {
        color: ${({ theme }) => theme.custom.brand[400]};
    }
`;
