import {RootState} from '.';

export const getFormData = (state: RootState) => state.form;
export const getAuth = (state: RootState) => state.auth;
export const getHome = (state: RootState) => state.home;
export const getDetail = (state: RootState) => state.detail;
export const getVoteResult = (state: RootState) => state.voteResult;
