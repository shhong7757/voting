import React from 'react';
import {SafeAreaView, View, Pressable, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../reducers';
import AccountProfile from '../components/account/AccountProfile';
import {useNavigation} from '@react-navigation/core';
import Svg from '../components/common/Svg';

function AccountScreen() {
  const account = useSelector((state: RootState) => state.auth.account);
  const navigation = useNavigation();

  const handlePressSetting = React.useCallback(
    () => navigation.navigate('Setting'),
    [navigation],
  );

  const {accountWrapper, fl1} = styles;

  return (
    <SafeAreaView>
      <View style={accountWrapper}>
        <View style={fl1}>
          {account && <AccountProfile account={account} />}
        </View>
        <Pressable onPress={handlePressSetting}>
          <Svg svg="Setting" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  accountWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
  fl1: {flex: 1},
});

export default AccountScreen;
