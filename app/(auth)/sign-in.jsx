import { View, Text, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link } from 'expo-router'

import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  function submit() {

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