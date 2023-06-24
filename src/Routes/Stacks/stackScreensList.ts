import SearchUsersScreen from '../../Screens/Tabs/Search/SearchUsers/SearchUsers.screen';
import UserQuizzesScreen from '../../Screens/User/UserQuizzes/UserQuizzes.screen';
import screenNames from './screenNames';

export default [
  {
    name: screenNames.userQuizzes,
    component: UserQuizzesScreen,
  },
  {
    name: screenNames.searchUsers,
    component: SearchUsersScreen,
  },
];
