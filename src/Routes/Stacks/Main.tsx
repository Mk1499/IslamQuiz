import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../../Screens/Auth/Login/Login';
// import navigation from '../NavigationService';
import {useTheme} from '../../Theme/ThemeProvider';
import Register from '../../Screens/Auth/Register/Register';
import ForgotPassword from '../../Screens/Auth/Forgot Password/ForgotPassword';
// import Home from '../../Screens/Tabs/Home/Home';
import CategoryDetails from '../../Screens/Shared/CategoryDetails/CategoryDetails';
import QuizIntro from '../../Screens/Quiz/QuizIntro/QuizIntro';
import QuizDetails from '../../Screens/Quiz/QuizDetails/QuizDetails';
import CreateQuiz from '../../Screens/Quiz/CreateQuiz/CreateQuiz';
import AddQuestions from '../../Screens/Quiz/AddQuestions/AddQuestions';
import MainTabs from '../Tabs/MainTabs';
import OTPVerify from '../../Screens/Auth/OTPVerify/OTPVerify';
import ResetPassword from '../../Screens/Auth/Reset Password/ResetPassword';
import ConfirmCode from '../../Screens/Auth/Confirm Code/ConfirmCode';
import Landing from '../../Screens/Landing/Landing';
import ChangeLanguage from '../../Screens/ProfileOptions/ChangeLang/ChangeLanguage';
import ChangeTheme from '../../Screens/ProfileOptions/ChangeTheme/ChangeTheme';
import ContactUs from '../../Screens/ProfileOptions/Contact Us/ContactUs';
import EditProfile from '../../Screens/ProfileOptions/EditProfile/EditProfile';
import JoinQuiz from '../../Screens/Quiz/JoinQuiz/JoinQuiz';
import QuizAnswers from '../../Screens/Quiz/QuizAnswers/QuizAnswers';
// import Test from '../../Screens/Test/Text';
import UserProfile from '../../Screens/User/UserProfile/UserProfile';
import stackScreensList from './stackScreensList';
import uuid from 'react-native-uuid';
import {SafeAreaView, StyleSheet} from 'react-native';
import {color} from 'native-base/lib/typescript/theme/styled-system';

const Stack = createStackNavigator();

const MainStack = () => {
  const {colors, rtl} = useTheme();
  // useEffect(() => {
  // }, []);

  return (
    <Stack.Navigator initialRouteName="Landing">
      {/* <Stack.Screen
        name="Test"
        component={Test}
        options={{
          headerShown: false,
          cardStyle: {
            backgroundColor: colors.bg,
            direction: !rtl ? 'ltr' : 'rtl',
          },
        }}
      /> */}
      <Stack.Screen
        getId={uuid.v4}
        name="Tabs"
        component={MainTabs}
        options={{
          headerShown: false,
          cardStyle: {
            backgroundColor: colors.bg,
            direction: !rtl ? 'ltr' : 'rtl',
          },
        }}
      />

      {stackScreensList.map(s => (
        <Stack.Screen
          getId={uuid.v4}
          name={s.name}
          component={props => (
            <SafeAreaView
              style={{
                flex: 1,
                backgroundColor: s.isPrimaryBG ? colors.primary : colors.bg,
              }}>
              <s.component {...props} />
            </SafeAreaView>
          )}
          options={{
            headerShown: false,
            cardStyle: {
              backgroundColor: colors.bg,
              direction: !rtl ? 'ltr' : 'rtl',
            },
          }}
        />
      ))}
    </Stack.Navigator>
  );
};

export default MainStack;

// export class MainStack extends Component {
//   componentDidMount() {
//     this.setupLinking();
//     this.linkingListener();
//     console.log("Login : ", useTheme());
//   }

// setupLinking = () => {
//   Linking.getInitialURL().then(url => {
//     try {
//       this.navigateHandler(url);
//     } catch (err) {
//       console.error('ERR : ', err);
//     }
//   });
// };

// linkingListener = () => {
//   Linking.addEventListener('url', ({url}) => {
//     this.navigateHandler(url);
//   });
// };

//   navigateHandler = async (url: string) => {
//     console.log('URL : ', url);
//     if (url) {
//       let {navigate} = navigation;
//       let base = 'https://bo0ky.netlify.app/app-';
//       let route = url.replace(base, '');
//       console.log('route : ', route);
//       let routeArr = route.split('-');
//       let stack = routeArr[0];
//       let screen = routeArr[1];
//       let keyName = routeArr[2];
//       let id = routeArr[3];
//       let props = {};
//       props[keyName] = id;
//       console.log('Data : ', routeArr, screen, id);
//       console.log('Route : ', screen, props);
//       if (stack === 'Main') {
//         navigate(screen, props);
//       } else {
//         navigate(stack, {
//           screen,
//           params: props,
//         });
//       }
//     }
//   };

//   render() {
//     return (
//       <Stack.Navigator>
//         <Stack.Screen
//           name="Login"
//           component={Login}
//           options={{
//             headerShown: false,
//             cardStyle: {
//               backgroundColor: '#fff',
//             },
//           }}
//         />
//       </Stack.Navigator>
//     );
//   }

//   componentWillUnmount() {
//     Linking.removeAllListeners();
//   }
// }
