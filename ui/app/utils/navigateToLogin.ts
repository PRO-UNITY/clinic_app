import React from 'react';
import {
  CommonActions,
  NavigationContainerRef,
} from '@react-navigation/native';

// @ts-ignore
export const navigationRef = React.createRef<NavigationContainerRef>();

export function navigateToLoginPage() {
  navigationRef.current?.dispatch(
    CommonActions.navigate({
      name: 'Login',
    })
  );
}
