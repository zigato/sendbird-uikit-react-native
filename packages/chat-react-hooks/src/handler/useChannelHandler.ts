import React, { useEffect } from 'react';
import type Sendbird from 'sendbird';

import { Logger, SendbirdChatSDK } from '@sendbird/uikit-utils';

export const useChannelHandler = (
  sdk: SendbirdChatSDK,
  handlerId: string,
  hookHandler: Partial<Sendbird.ChannelHandler>,
  deps: React.DependencyList = [],
) => {
  useEffect(() => {
    Logger.debug('[useChannelHandler] hook called by', handlerId);

    const handler = new sdk.ChannelHandler();
    const handlerKeys = Object.keys(handler) as (keyof typeof handler)[];
    handlerKeys.forEach((key) => {
      const hookHandlerFn = hookHandler[key];
      if (hookHandlerFn) handler[key] = hookHandlerFn as () => unknown;
    });

    sdk.addChannelHandler(handlerId, handler);
    return () => sdk.removeChannelHandler(handlerId);
  }, [sdk, handlerId, ...deps]);
};