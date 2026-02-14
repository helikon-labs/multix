import { AccountBaseInfo } from '../components/select/GenericAccountSelection';

export const getOptionLabel = (option: string | AccountBaseInfo | null) => {
    if (!option) return '';

    return typeof option === 'string' ? option : option.address;
};
