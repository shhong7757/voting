import React from 'react';
import {AppDispatch} from '../store';
import {
  DELETE_VOTE_REQUEST,
  GET_DETAIL_REQUEST,
  SET_DETAIL_SELECTED_IDX,
  SET_VOTE_ACTIVATE,
  VOTE_REQUEST,
} from '../actions';
import {getAuth, getDetail} from '../reducers/selectors';
import {getVoteStatus} from '../lib/detailt';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import {View, Text, Alert} from 'react-native';
import BallotPaer from '../components/detail/DetailBallotPaper';
import ErrorScreen from '../components/common/ErrorScreen';
import Footer from '../components/detail/DetailFooter';
import Header from '../components/detail/DetailHeader';
import LoadingOverlay from '../components/common/LoadingOverlay';
import LoadingScreen from '../components/common/LoadingScreen';
import Row from '../components/common/Row';

interface Props {
  route: RouteProp<MainStackParamList, 'Detail'>;
  navigation: StackNavigationProp<MainStackParamList, 'Detail'>;
}

function DetailScreen({navigation, route}: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const auth = useSelector(getAuth);
  const detail = useSelector(getDetail);

  React.useEffect(() => {
    const id = route.params.id;
    dispatch({type: SET_DETAIL_SELECTED_IDX, payload: -1});
    dispatch({type: GET_DETAIL_REQUEST, payload: id});
  }, [dispatch, route]);

  React.useEffect(() => {
    navigation.setOptions({title: route.params.title});
  }, [navigation, route]);

  const handleChangeIdx = React.useCallback(
    (idx: number) => {
      dispatch({type: SET_DETAIL_SELECTED_IDX, payload: idx});
    },
    [dispatch],
  );

  const handlePressEndVote = React.useCallback(() => {
    dispatch({type: SET_VOTE_ACTIVATE, payload: route.params.id});
  }, [dispatch, route]);

  const handlePressShowResult = React.useCallback(() => {
    navigation.navigate('Result', {id: route.params.id});
  }, [navigation, route]);

  const handlePressVote = React.useCallback(() => {
    if (detail.selectedIdx < 0) {
      return Alert.alert('????????? ??????????????????');
    }

    Alert.alert(
      '?????? ??????????????????',
      '?????? ????????? ????????? ????????? ?????? ???????????? ??? ????????????.',
      [
        {
          text: '??????',
          onPress: () =>
            dispatch({type: VOTE_REQUEST, payload: route.params.id}),
        },
        {text: '??????'},
      ],
    );
  }, [detail, dispatch, route]);

  const handlePressDelete = React.useCallback(() => {
    dispatch({
      type: DELETE_VOTE_REQUEST,
      payload: route.params.id,
    });
  }, [dispatch, route]);

  if (detail.vote.loading) {
    return <LoadingScreen />;
  } else if (detail.vote.error) {
    return <ErrorScreen error={detail.vote.error} />;
  } else {
    if (detail.vote.data === undefined) {
      return <View />;
    }

    return (
      <>
        <LoadingOverlay visible={detail.voteProgress} />
        <Row>
          <Header
            auth={auth}
            vote={detail.vote.data}
            onPressDelete={handlePressDelete}
          />
        </Row>
        <Row>
          {getVoteStatus(detail.vote.data) === 'DONE' ? (
            <Text>????????? ?????????????????????.</Text>
          ) : detail.voted ? (
            <Text>
              ?????? ????????? ???????????????. ????????? ????????? ???????????? ??????????????? ????????????
              ??? ????????????.
            </Text>
          ) : (
            <BallotPaer
              list={detail.vote.data.list}
              selectedIdx={detail.selectedIdx}
              onChangeIndex={handleChangeIdx}
            />
          )}
        </Row>
        <Row>
          <Footer
            auth={auth}
            vote={detail.vote.data}
            voted={detail.voted}
            onPressEndVote={handlePressEndVote}
            onPressShowResult={handlePressShowResult}
            onPressVote={handlePressVote}
          />
        </Row>
      </>
    );
  }
}

export default DetailScreen;
