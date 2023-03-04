import {CommonActions, StackActions} from '@react-navigation/native';

let _navigator: any;

function setTopLevelNavigator(navigatorRef: any) {
  _navigator = navigatorRef;
}

function navigate(name: string, params: any) {
  _navigator.dispatch(
    CommonActions.navigate({
      name,
      params,
    }),
  );
}

function push(name: string, params: any) {
  _navigator.dispatch(StackActions.push(name, params));
}

function replace(name: string) {
  // console.log('Replace to : ', name);
  _navigator.dispatch(
    StackActions.replace(name),
    // StackActions.reset({
    //   index: 0,
    //   actions: [CommonActions.navigate({name})],
    // }),
  );
}
// add other navigation functions that you need and export them

function backMultiLevels(num: number) {
  _navigator.dispatch(StackActions.pop(num));
}

export default {
  navigate,
  replace,
  setTopLevelNavigator,
  push,
  backMultiLevels,
};
