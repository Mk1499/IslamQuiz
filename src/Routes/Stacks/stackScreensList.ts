import FriendRequestsScreen from '../../Screens/ProfileOptions/FriendRequests/FriendRequests.screen';
import SearchQuizzesScreen from '../../Screens/Tabs/Search/SearchQuizzes/SearchQuizzes.screen';
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
  {
    name: screenNames.searchQuizzes,
    component: SearchQuizzesScreen,
  },
  {
    name: screenNames.friendRequests,
    component: FriendRequestsScreen,
  },
];
