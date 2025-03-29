import { View, Text, SafeAreaView, TouchableOpacity, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import {
  GoogleSignin,
  isErrorWithCode,
  statusCodes,
  GoogleSigninButton
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

import { useAuth } from '@/providers/AuthProvider';

export default function App() {
  // const [initializing, setInitializing] = useState(true);
  // const [email, setEmail] = useState<String | null>(null);

  const { isAuthenticated, signOut } = useAuth();

  return (
    <View className="flex-1 justify-center items-center">
      <Text className='text-2xl'>Welcome</Text>
      <Text>{isAuthenticated ? 'Authenticated' : 'Not Authenticated'}</Text>
      <Button title="Sign out" onPress={signOut} />
    </View>
  );

  /*
  GoogleSignin.configure({
    webClientId: "",
  });

  const signIn = async () => {
    try {
      // Check if your device supports Google Play
      console.log('Checking for Google Play Services');
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      console.log('Google Play Services are available');
      // Get the users ID token
      const response = await GoogleSignin.signIn();

      console.log('response', response);

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(response.data?.idToken);

      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
  console.log("User signed in");
} catch (error) {
  if (isErrorWithCode(error)) {
    switch (error.code) {
      case statusCodes.IN_PROGRESS:
        // operation (eg. sign in) already in progress
        break;
      case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
        // Android only, play services not available or outdated
        break;
      default:
      // some other error happened
    }
  } else {
    // an error that's not related to google sign in occurred
  }
}
};

const signOut = async () => {
try {
  await GoogleSignin.signOut();
  await auth().signOut();
  setEmail(null);
  console.log('User signed out');
} catch (error) {
  console.error('Error signing out:', error);
}
};

// Handle user state changes
function onAuthStateChanged(user) {
console.log('onAuthStateChanged', user);
if (initializing) setInitializing(false);
if (user !== null) {
  setEmail(user.email);
}
}

useEffect(() => {
const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
return subscriber;
}, []);

if (initializing) return null;

  if (!email) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={signIn}
        />
        <TouchableOpacity onPress={signOut}>
          <Text>Sign-out</Text>
        </TouchableOpacity>
      </SafeAreaView>
    )
  }

  return (
    <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
      <Text>Welcome {email}</Text>
      <TouchableOpacity onPress={signOut}>
        <Text>Sign-out</Text>
      </TouchableOpacity>
    </View>
  );
  */

}