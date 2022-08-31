import React from 'react';
import { StatusBar, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { BaseHeaderProps, HeaderElement } from '../types';
import getDefaultHeaderHeight from './getDefaultHeaderHeight';

export type HeaderStyleContextType = {
  HeaderComponent: (
    props: BaseHeaderProps<
      {
        title?: HeaderElement;
        left?: HeaderElement;
        right?: HeaderElement;
        onPressLeft?: () => void;
        onPressRight?: () => void;
      },
      { clearTitleMargin?: boolean }
    >,
  ) => React.ReactElement | null;
  defaultTitleAlign: 'left' | 'center';
  statusBarTranslucent: boolean;
  topInset: number;
  defaultHeight: number;
};
export const HeaderStyleContext = React.createContext<HeaderStyleContextType>({
  HeaderComponent: () => null,
  defaultTitleAlign: 'left',
  statusBarTranslucent: true,
  topInset: StatusBar.currentHeight ?? 0,
  defaultHeight: getDefaultHeaderHeight(false),
});

type Props = Pick<HeaderStyleContextType, 'statusBarTranslucent' | 'defaultTitleAlign' | 'HeaderComponent'>;
export const HeaderStyleProvider = ({
  children,
  HeaderComponent = () => null,
  defaultTitleAlign,
  statusBarTranslucent,
}: React.PropsWithChildren<Props>) => {
  const { top } = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();

  return (
    <HeaderStyleContext.Provider
      value={{
        HeaderComponent,
        defaultTitleAlign,
        statusBarTranslucent,
        topInset: statusBarTranslucent ? top : 0,
        defaultHeight: getDefaultHeaderHeight(width > height),
      }}
    >
      {children}
    </HeaderStyleContext.Provider>
  );
};
