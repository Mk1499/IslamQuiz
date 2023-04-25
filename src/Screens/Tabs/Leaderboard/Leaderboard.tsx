import React, {memo} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {useTheme} from '../../../Theme/ThemeProvider';
import GlobalRank from './GlobalRank/GlobalRank';
import makeStyle from './leaderboard.styles';

function Leaderboard() {
  const {colors} = useTheme();
  const styles = makeStyle(colors);

  return (
    <View>
      <GlobalRank />
    </View>
  );
}

const mapStateToProps = (state: any) => ({
  user: state.auth.userData,
});

export default connect(mapStateToProps, {})(memo(Leaderboard));
