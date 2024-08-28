import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, Text, View } from 'react-native';
import { Redirect, router } from 'expo-router'
import { images } from '../constants'
import 'react-native-url-polyfill/auto'

// SafeAreaView is used so that the content dosent overlap with each other
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';
import { useGlobalContext } from '../context/GlobalProvider';

// This file is like the app.jsx file of a React Project

export default function App() {
  const {isLoading, isLoggedIn} = useGlobalContext();

  if(!isLoading && isLoggedIn){
    return <Redirect href="/Home"/>
  }

  return (
    // SafeAreaView is used to render the content within the app boundary
    <SafeAreaView className='bg-primary h-full'>

      <ScrollView contentContainerStyle={{height:"100"}}>
        
        <View className='w-full justify-center items-center min-h-[85vh] px-4'>
          <Image source={images.logo} className='w-[130px] h-[84px]' resizeMode='contain' />

          <Image source={images.cards} className='max-w-[380px] w-full h-[300px]' resizeMode='contain' />

          <View className='relative mt-5'>
            <Text className='text-3xl text-white text-center font-bold'>
              Discover Endless Possibilities with <Text className='text-secondary-200'>Aura</Text>
            </Text>
            <Image source={images.path} className='w-[136px] h-[15px] absolute -bottom-2 -right-8' resizeMode='contain' />
          </View>
          <Text className='text-sm text-gray-100 mt-7 text-center font-pregular'>Where creativity meets innovation:
            embark on a journey of limitless exploration with Aura
          </Text>

            {/* router.push pushes the page in stack so when pressed the back button it returns to the previous page */}
          <CustomButton title='Continue with Email' handlePress={() => router.push('/SignIn')} containerStyle='w-full mt-7' isLoading={isLoading} />

        </View>
      </ScrollView>


      

      {/* Status Bar the top bar showing time, battery*/}
      <StatusBar backgroundColor='#161622' style='light' hidden={false} />

    </SafeAreaView>
  );
}
