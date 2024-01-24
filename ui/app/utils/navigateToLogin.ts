import { CommonActions } from '@react-navigation/native';

export const navigateToLoginPage = (navigation: any) => {
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [
        {
          name: 'Login',
        },
      ],
    })
  );
};
