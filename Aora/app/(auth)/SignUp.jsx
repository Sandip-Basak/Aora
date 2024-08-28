import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { createUser } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'

const SignUp = () => {
  const [form, setForm] = useState({
    username:"",
    email: "",
    password: ""
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const { setUser, setIsLoggedIn } = useGlobalContext();

  const submit = async () => {
    if(!form.email || !form.password || !form.username){
      Alert.alert("Error", "Please fill all the fields");
    }
    else{
      setIsSubmitting(true);
      try {
        const result = await createUser(form.email, form.password, form.username);
        // Set it to global state
        setUser(result);
        setIsLoggedIn(true);
        // router.replace replaces the top page in stack with the new page
        router.replace('/Home')
      } catch (error) {
        Alert.alert("Error", error.message);
      } finally {
        setIsSubmitting(false);
      }
    }
  }


  return (
    <SafeAreaView className='bg-primary h-full'>
      
      <ScrollView>
        
        <View className='w-full justify-center min-h-[82vh] px-4 my-6'>
          
          <Image source={images.logo} resizeMode='contain' className='w-[115px] h-[35px]' />
          
          <Text className='text-2xl font-psemibold text-white mt-10 text-semibold'>Sign Up to Aora</Text>
          
          <FormField title="Username" value={form.username} 
          handleChangeText = {(e)=>setForm((prev)=>({...prev, username: e}))} 
          otherStyles="mt-7"/>
          
          <FormField title="Email" value={form.email} 
          handleChangeText = {(e)=>setForm((prev)=>({...prev, email: e}))} 
          otherStyles="mt-7" keyboardType='email.address'/>
          
          <FormField title="Password" value={form.password} 
          handleChangeText = {(e)=>setForm((prev)=>({...prev, password: e}))} 
          otherStyles="mt-7"/>

          <CustomButton title='Sign Up' handlePress={submit} containerStyle='mt-7' isLoading={isSubmitting}/>
          
          <View className='justify-center flex-row gap-2 pt-5'>
            
            <Text className='text-lg text-gray-100 font-pregular'>
              Have an account already ?
              <Link href='/SignIn' className='text-lg font-psemibold text-secondary'>Sign In</Link>
            </Text>
            
          
          </View>
        
        </View>
      
      </ScrollView>
    
    </SafeAreaView>
  )
}

export default SignUp