import { BackHandler, ToastAndroid } from 'react-native';

let backPressCount = 0;
let timeoutId = null;

export const handleDoubleBackPressExit = () => {
  if (backPressCount === 0) {
    backPressCount = 1;
    ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);

    timeoutId = setTimeout(() => {
      backPressCount = 0;
    }, 2000); // 2 sec window

    return true; // prevent default behavior
  } else if (backPressCount === 1) {
    BackHandler.exitApp();
    return true;
  }
};

export const removeBackHandler = (backHandler) => {
  if (backHandler) backHandler.remove();
  if (timeoutId) clearTimeout(timeoutId);
};
