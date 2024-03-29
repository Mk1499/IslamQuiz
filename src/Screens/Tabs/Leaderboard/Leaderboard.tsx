import React, {memo} from 'react';
import {SafeAreaView} from 'react-native';
import {connect} from 'react-redux';
import GlobalRank from './GlobalRank/GlobalRank';
import {useTheme} from '../../../Theme/ThemeProvider';
// import makeStyle from './leaderboard.styles';

function Leaderboard() {
  const {colors} = useTheme();
  // const styles = makeStyle(colors);

  return (
    <SafeAreaView style={{backgroundColor: colors.bg}}>
      <GlobalRank />
    </SafeAreaView>
  );
}

const mapStateToProps = (state: any) => ({
  user: state.auth.userData,
});

export default connect(mapStateToProps, {})(memo(Leaderboard));
