# ShelfieChallenge IOS Frontend
### Built with React Native and [Ant Design Mobile](https://mobile.ant.design/)

## Table of Contents:
* [Amazon S3](#AWS)
* [Important Packages](#Packages)
* [Setup](#Setup)
* [Structure](#Structure)



## <a name="AWS">Amazon S3:</a>
### Amazon S3
* Bucket Name: "shelfie-challenge"
* Region: US West (N. California)
* Upload media using [react-native-aws3](https://github.com/benjreinhart/react-native-aws3)
* File Tree:
   * shelfie-challenge
      * posts
         * photos
         * videos
      * teams
         * logos

### Posts
* Url stored in api [ShelfiePost.Post](https://github.com/KyleLawson16/shelfie-backend#shelfiepost)
* Naming convention:
   * '<random_game_id>-<randomly_generated_id>'

### Users
* Url stored in api [ShelfieUser.User](https://github.com/KyleLawson16/shelfie-backend#shelfieuser)
* Naming convention:
   * '<random_user_id>-<randomly_generated_id>'




## <a name="Packages">Important Packages</a>
* [antd-mobile](https://mobile.ant.design/)
   * Component library
   * Backbone of project
* [axios](https://github.com/axios/axios)
* [moment](http://momentjs.com/docs/)
* [rc-form](https://www.npmjs.com/package/rc-form)
* [react-native-aws3](https://github.com/benjreinhart/react-native-aws3)
   * Handles uploading media to [AWS S3 Bucket](#AWS)
* [react-native-camera](https://github.com/react-native-community/react-native-camera)
* [react-native-image-crop-picker](https://github.com/ivpusic/react-native-image-crop-picker)
   * Photo library access
   * Image cropping
* [react-native-remote-svg](https://www.npmjs.com/package/react-native-remote-svg)
* [react-native-scalable-image](https://www.npmjs.com/package/react-native-scalable-image)
   * Easier image sizing
* [react-native-storage](https://github.com/sunnylqm/react-native-storage)
   * Local storage module
   * Used for storing knox tokens
* [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)
   * Icon font library
* [react-native-video](https://github.com/react-native-community/react-native-video)
   * Displaying videos
* [react-redux](https://github.com/reactjs/react-redux)



## <a name="Setup">Setup:</a>
Clone repository:
```
git clone https://github.com/KyleLawson16/shelfie-frontend-ios.git
```

Install dependencies:
```
yarn install
```

Available scripts:
```
react-native start
react-native run-ios
react-native run-android
```

Uses:
* start -- starts metro bundler
* run-ios -- builds ios bundle and launches simulator
* run-android -- builds android and launches simulator



## <a name="Structure">Structure:</a>
### Root Directory:
##### index.js
* Registers app

##### App.js
* Renders AppNavigation
* Initiates redux store

##### AppNavigation.js
* Serves as main file where user-flows belong
* Includes:
   * Authentication flow
   * Post Submission flow
   * BottomNavbar flow
   * TopNavbar flow
* Manipulated through props passed upward by children

##### styles.js
* Includes all styles within app
* Organized by container (specified in comments)

### Containers/Components:
##### Pages
* GamePage
   * UserPage
      * ChallengeSubmission
      * UserForm
      * UserInfo
      * UserSubmissions
      * UserSubmission
   * GameInfo
   * GameNavbar
      * FeedPage
         * ChallengeSubmission
      * ChallengePage
         * ChallengeCarousel
      * LeaderboardPage
         * LeaderboardItem
      * PrizePage
         * PrizeCarousel
* GamesPage
   * GameItem
* LandingPage
   * SignIn
   * SignUp
* SubmissionPage
   * SubmissionCamera
   * SubmissionPost
* UserPage
   * ChallengeSubmission
   * UserForm
   * UserInfo
   * UserSubmissions
   * UserSubmission
   * ProfilePicture

##### Navigation
* BottomNavbar
* TopNavbar
* GameNavbar

### Actions
* createUser
* loginUser
* logoutUser
* fetchUser
* fetchGames
* fetchPosts
* fetchLeaderboard
* fetchPrizes
* addLike
* deleteLike
* createPost
* joinGame
* updateProfilePicture




This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).
