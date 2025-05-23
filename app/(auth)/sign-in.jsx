import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router } from 'expo-router'

import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { getCurrentUser, signIn } from '../../lib/appwrite'
import { setSourceMapRange } from 'typescript'
import { useGlobalContext } from "../../context/GlobalProvider";

const SignIn = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  async function submit() {
    if(!form.email || !form.password) {
      Alert.alert('Error', 'Please in all the fields');
      return;
    }

    setIsSubmitting(true);

    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLoggedIn(true);

      Alert.alert("Success", "User signed in successfully");
      
      router.replace('/home');
    } catch (error) {
      Alert.alert('Error', `${error.message} (app/(auth)/sign-in)`)
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="justify-center my-6 px-4 w-full min-h-[75vh]">
          <Image 
            source={images.logo}
            resizeMode='contain'
            className="w-[115px] h-[35px]"
          />

          <Text className="mt-10 font-psemibold text-2xl text-semibold text-white">Log in to Aora</Text>

          <FormField 
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ email: e, password: form.password })} //... is spread operator
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField 
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })} //... is spread operator
            otherStyles="mt-7"
          />

          <CustomButton 
            title="Sign in"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="flex-row justify-center gap-2 pt-5">
            <Text className="font-pregular text-gray-100 text-lg">
              Don't have account?
            </Text>

            <Link href="/sign-up" className="font-psemibold text-lg text-secondary">Sign Up</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn