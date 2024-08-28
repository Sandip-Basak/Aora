// rnfe

import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link,router } from 'expo-router'
import { getCurrentUser, signIn } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: ""
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [test, setTest] = useState("")
  const { setUser, setIsLoggedIn } = useGlobalContext();

  const submit = async () => {
    if(!form.email || !form.password){
      Alert.alert("Error", "Please fill all the fields");
    }
    else{
      setIsSubmitting(true);
      
      try {
        const userSession = await signIn(form.email, form.password);
        // Set it to global state
        
        getCurrentUser()
        .then((res)=>{
            if(res){
                setIsLoggedIn(true);
                setUser(res);
            }
            else{
                setIsLoggedIn(false);
                setUser(null);
            }
        })


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
          <Text className='text-2xl font-psemibold text-white mt-10 text-semibold'>Log In to Aora</Text>
          <FormField title="Email" value={form.email} 
          handleChangeText = {(e)=>setForm((prev)=>({...prev, email: e}))} 
          otherStyles="mt-7" keyboardType='email.address'/>
          <FormField title="Password" value={form.password} 
          handleChangeText = {(e)=>setForm((prev)=>({...prev, password: e}))} 
          otherStyles="mt-7"/>

          <CustomButton title='Sign In' handlePress={submit} containerStyle='mt-7' isLoading={isSubmitting}/>
          <View className='justify-center flex-row gap-2 pt-5'>
            <Text className='text-lg text-gray-100 font-pregular'>
              Don't have account ?
              <Link href='/SignUp' className='text-lg font-psemibold text-secondary'>Sign Up</Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn