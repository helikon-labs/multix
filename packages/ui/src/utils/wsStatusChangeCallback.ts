import { StatusChange, WsEvent } from 'polkadot-api/ws-provider/web';

export const wsStatusChangeCallback = {
    onStatusChanged: (status: StatusChange) => {
        return status.type === WsEvent.CONNECTING
            ? console.log('⚪ Connecting to RPC:', status.uri)
            : status.type === WsEvent.CONNECTED
              ? console.log('🟢 Connected to RPC:', status.uri)
              : status.type === WsEvent.ERROR
                ? console.error('🔴 Error connecting to RPC: ', status.event)
                : status.type === WsEvent.CLOSE
                  ? console.error('⚫ Connection closed: ', status.event)
                  : undefined;
    },
};
