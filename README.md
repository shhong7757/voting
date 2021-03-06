## 실행방법

**앱을 실행하기 위해서는 `GoogleService-Info.plist`, `google-services.json` 파일이 필요합니다.**
```
google-services.json 파일은 Android를 위해 필요한 파일이며 android 프로젝트 앱 수준에 위치해야합니다. 합니다. (android/app/google-services.json)
GoogleService-info.plist 파일은 iOS를 위해 필요한 파일이며 ios 폴더 아래 위치해야 합니다. (ios/GoogleService-info.plist)
```

1. `yarn`
2. `cd ios && pod install`
3. `npx react-native start`
4. `npx react-native run-ios` or `npx react-native run-android`

## 요구사항

- [x] 사용자는 투표를 생성할 수 있어야 한다 투표 생성자는 제목을 입력할 수 있어야 한다
- [x] 투표를 생성하면 항목이 기본으로 3개가 생성되어야 한다
- [x] 투표 생성자는 투표 항목의 이름을 변경할 수 있다
- [x] 투표 생성자는 투표를 저장할 수 있어야 한다 투표자 생성자는 투표를 삭제할 수 있어야한다
- [x] 사용자는 만들어진 투표 리스트를 볼 수 있어야 한다
- [x] 사용자는 투표 리스트에서 제목, 생성자, 기간, 진행 중 여부를 확인 할 수 있어야 한다.
- [x] 사용자는 투표 리스트에서 특정 투표를 클릭시 투표내용 상세보기를 할 수 있다
- [x] 사용자는 투표 리스트에서 진행중인 투표에 투표 할 수 있다
- [x] 사용자는 투표 결과를 텍스트로 확인할 수 있어야 한다
- [x] 투표 생성자는 투표 기간을 설정할 수 있다(시작, 종료) 사용자는 종료시간이 지난 투표는 결과보기만 할 수 있다
