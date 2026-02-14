import { Binary } from 'polkadot-api';
import json5 from 'json5';

export const JSONprint = (e: unknown) => {
    if (e === null || e === undefined) {
        return '';
    }
    return (
        json5
            .stringify(e, {
                replacer: (_, v) => {
                    if (typeof v === 'bigint') return v.toString();
                    if (v instanceof Binary) {
                        const text = v.asText();
                        // Check if all characters are printable ASCII (32-126)
                        const isAscii = /^[\x20-\x7E]*$/.test(text);
                        return isAscii ? text : v.asHex();
                    }
                    return v;
                },
                space: 4,
            })
            // remove { and }
            .slice(1, -1)
            // remove trailing comma if any
            .replace(/,\s*$/, '')
    );
};
