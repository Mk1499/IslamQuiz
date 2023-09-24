import ConfirmCode from '../../Screens/Auth/Confirm Code/ConfirmCode';
import ForgotPassword from '../../Screens/Auth/Forgot Password/ForgotPassword';
import Login from '../../Screens/Auth/Login/Login';
import OTPVerify from '../../Screens/Auth/OTPVerify/OTPVerify';
import Register from '../../Screens/Auth/Register/Register';
import ResetPassword from '../../Screens/Auth/Reset Password/ResetPassword';
import Landing from '../../Screens/Landing/Landing';
import ChangeLanguage from '../../Screens/ProfileOptions/ChangeLang/ChangeLanguage';
import ChangeTheme from '../../Screens/ProfileOptions/ChangeTheme/ChangeTheme';
import ContactUs from '../../Screens/ProfileOptions/Contact Us/ContactUs';
import EditProfile from '../../Screens/ProfileOptions/EditProfile/EditProfile';
import FriendRequestsScreen from '../../Screens/ProfileOptions/FriendRequests/FriendRequests.screen';
import AddQuestions from '../../Screens/Quiz/AddQuestions/AddQuestions';
import CreateQuiz from '../../Screens/Quiz/CreateQuiz/CreateQuiz';
import JoinQuiz from '../../Screens/Quiz/JoinQuiz/JoinQuiz';
import QuizAnswers from '../../Screens/Quiz/QuizAnswers/QuizAnswers';
import QuizDetails from '../../Screens/Quiz/QuizDetails/QuizDetails';
import QuizIntro from '../../Screens/Quiz/QuizIntro/QuizIntro';
import CategoryDetails from '../../Screens/Shared/CategoryDetails/CategoryDetails';
import SearchQuizzesScreen from '../../Screens/Tabs/Search/SearchQuizzes/SearchQuizzes.screen';
import SearchUsersScreen from '../../Screens/Tabs/Search/SearchUsers/SearchUsers.screen';
import UserFriendsScreen from '../../Screens/User/UserFriends/UserFriends.screen';
import UserProfile from '../../Screens/User/UserProfile/UserProfile';
import UserQuizzesScreen from '../../Screens/User/UserQuizzes/UserQuizzes.screen';
import screenNames from './screenNames';

export default [
  {
    name: screenNames.userQuizzes,
    component: UserQuizzesScreen,
    isPrimaryBG: true,
  },
  {
    name: screenNames.searchUsers,
    component: SearchUsersScreen,
  },
  {
    name: screenNames.searchQuizzes,
    component: SearchQuizzesScreen,
  },
  {
    name: screenNames.friendRequests,
    component: FriendRequestsScreen,
    isPrimaryBG: true,
  },
  {
    name: screenNames.QuizAnswers,
    component: QuizAnswers,
  },
  {
    name: screenNames.EditProfile,
    component: EditProfile,
    isPrimaryBG: true,
  },
  {
    name: screenNames.UserProfile,
    component: UserProfile,
    isPrimaryBG: true,
  },
  {
    name: screenNames.ContactUs,
    component: ContactUs,
    isPrimaryBG: true,
  },
  {
    name: screenNames.ChangeTheme,
    component: ChangeTheme,
    isPrimaryBG: true,
  },
  {
    name: screenNames.ChangeLanguage,
    component: ChangeLanguage,
    isPrimaryBG: true,
  },
  {
    name: screenNames.AddQuestions,
    component: AddQuestions,
    isPrimaryBG: true,
  },
  {
    name: screenNames.ConfirmCode,
    component: ConfirmCode,
    isPrimaryBG: true,
  },
  {
    name: screenNames.ResetPassword,
    component: ResetPassword,
    isPrimaryBG: true,
  },
  {
    name: screenNames.ForgotPassword,
    component: ForgotPassword,
    isPrimaryBG: true,
  },
  {
    name: screenNames.Register,
    component: Register,
    isPrimaryBG: true,
  },
  {
    name: screenNames.QuizDetails,
    component: QuizDetails,
    isPrimaryBG: true,
  },
  {
    name: screenNames.QuizIntro,
    component: QuizIntro,
    isPrimaryBG: true,
  },
  {
    name: screenNames.CategoryDetails,
    component: CategoryDetails,
  },
  {
    name: screenNames.JoinQuiz,
    component: JoinQuiz,
    isPrimaryBG: true,
  },
  {
    name: screenNames.CreateQuiz,
    component: CreateQuiz,
  },

  {
    name: screenNames.Login,
    component: Login,
    isPrimaryBG: true,
  },
  {
    name: screenNames.OTP,
    component: OTPVerify,
    isPrimaryBG: true,
  },
  {
    name: screenNames.Landing,
    component: Landing,
    // isPrimaryBG: true,
  },
  {
    name: screenNames.UserFriends,
    component: UserFriendsScreen,
    isPrimaryBG: true,
  },
];
