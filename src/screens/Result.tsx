import React from 'react';
import {AppDispatch} from '../store';
import {GET_VOTE_RESULT_REQUEST} from '../actions';
import {getDetail, getVoteResult} from '../reducers/selectors';
import {RouteProp} from '@react-navigation/native';
import {StyleSheet, View, FlatList, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ErrorScreen from '../components/common/ErrorScreen';
import LoadingScreen from '../components/common/LoadingScreen';
import Row from '../components/common/Row';

interface Props {
  route: RouteProp<MainStackParamList, 'Detail'>;
}

function ResultScreen({route}: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const voteResult = useSelector(getVoteResult);
  const detail = useSelector(getDetail);

  React.useEffect(() => {
    const id = route.params.id;
    dispatch({type: GET_VOTE_RESULT_REQUEST, payload: id});
  }, [dispatch, route]);

  const list = React.useMemo(() => {
    if (detail.vote.data === undefined) {
      return [];
    }

    const mValue = new Map();
    if (voteResult.data) {
      Object.values(voteResult.data).forEach(({value}) => {
        if (mValue.has(value)) {
          const count = mValue.get(value);
          mValue.set(value, count + 1);
        } else {
          mValue.set(value, 1);
        }
      });
    }

    return detail.vote.data.list.map((v, idx) => ({
      key: v,
      value: mValue.has(idx) ? mValue.get(idx) : 0,
    }));
  }, [detail, voteResult]);

  if (detail.vote.loading) {
    return <LoadingScreen />;
  } else if (detail.vote.error) {
    return <ErrorScreen error={detail.vote.error} />;
  } else {
    const {head, fl1, fldrr, fwb, f14, itemWrapper, itemWrapperLast} = styles;

    return (
      <Row>
        <FlatList
          data={list}
          ListHeaderComponent={() => (
            <View style={[head, fldrr]}>
              <View style={fl1}>
                <Text style={[fwb, f14]}>대상</Text>
              </View>
              <Text style={[fwb, f14]}>득표 수</Text>
            </View>
          )}
          renderItem={({item, index}) => {
            const last = list.length - 1 === index;
            return (
              <View style={[fldrr, last ? itemWrapperLast : itemWrapper]}>
                <View style={fl1}>
                  <Text>{item.key}</Text>
                </View>
                <Text>{item.value}</Text>
              </View>
            );
          }}
          keyExtractor={(_, idx) => `result-list-item-${idx}`}
        />
      </Row>
    );
  }
}

const styles = StyleSheet.create({
  fldrr: {flexDirection: 'row'},
  fl1: {flex: 1},
  fwb: {fontWeight: 'bold'},
  f14: {fontSize: 14},
  head: {marginBottom: 8},
  itemWrapper: {marginVertical: 4},
  itemWrapperLast: {marginTop: 4},
});

export default ResultScreen;
