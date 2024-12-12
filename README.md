# PlaceFinder

This is a bare React Native project. It provides a flexible and customizable environment for mobile application development on both iOS and Android platforms.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

To run this project on your local machine, ensure you have the following tools installed:

### General Requirements

- [Node.js](https://nodejs.org/) (version 14 or later is recommended)
- [Yarn](https://yarnpkg.com/) or npm (Node Package Manager)

### iOS Requirements

- macOS
- [Xcode](https://developer.apple.com/xcode/)
  - Ensure the Command Line Tools are installed via Xcode.
  - Open Xcode and install any additional required components.
- [Cocoapods](https://cocoapods.org/) (run `sudo gem install cocoapods`)

### Android Requirements

- [Android Studio](https://developer.android.com/studio)
  - Install the Android SDK and relevant tools.
  - Add the `ANDROID_HOME` environment variable to your system.
- [Java Development Kit (JDK)](https://www.oracle.com/java/technologies/javase-downloads.html) (version 11 or later)

### Additional Notes

- Ensure you have a device emulator or a physical device connected for testing.

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/hanafiothman/PlaceFinder.git
   cd PlaceFinder
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```
   Or, if you prefer npm:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root of the project and add the following line:

   ```
   GOOGLE_API_KEY=<YOUR_GOOGLE_API_KEY>
   ```

   Ensure that the API key is associated with a project in which the Maps SDK for Android and Places API are enabled. Refer [How to get a Google API key](https://developers.google.com/maps/documentation/android-sdk/get-api-key) for more information.

4. Install iOS dependencies (macOS only):

   ```bash
   cd ios
   pod install
   cd ..
   ```

## Running the Project

### Running on iOS

1. Start the Metro bundler:

   ```bash
   yarn start
   ```
   Or:

   ```bash
   npm start
   ```

2. Open the iOS simulator:

   ```bash
   yarn ios
   ```
   Or:

   ```bash
   npx react-native run-ios
   ```

### Running on Android

1. Start the Metro bundler:

   ```bash
   yarn start
   ```
   Or:

   ```bash
   npm start
   ```

2. Run the app on an Android emulator or connected device:

   ```bash
   yarn android
   ```
   Or:

   ```bash
   npx react-native run-android
   ```

## Project Structure

The project follows a standard React Native structure:

```
PlaceFinder
├── android/           # Android-specific files
├── ios/               # iOS-specific files
├── src/               # Source code (components, screens, etc.)
├── node_modules/      # Installed dependencies
├── App.tsx            # Entry point of the application
├── package.json       # Project metadata and scripts
└── README.md          # Project documentation
└── ...
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Open a pull request.

## Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.