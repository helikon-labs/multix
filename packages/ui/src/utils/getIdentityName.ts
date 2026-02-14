import { IdentityInfo } from '../hooks/useGetIdentity';

export interface IdentityNameResults {
    identityName: string;
    sub: string;
}

export const getIdentityName = (identity?: IdentityInfo): IdentityNameResults => {
    if (!identity) return { identityName: '', sub: '' };

    if (identity.sub && identity.display) {
        // when an identity is a sub identity, `sub` is set
        // and `display` is the parent identity
        return {
            identityName: identity.display,
            sub: identity.sub,
        };
    } else {
        // There there is no sub.
        return {
            identityName: identity.displayParent || identity.display || '',
            sub: '',
        };
    }
};
