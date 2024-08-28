import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs, Redirect } from 'expo-router'
import { icons } from '../../constants'
import { StatusBar } from 'expo-status-bar';
 
const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className='items-center gap-1 justify-center'>
      <Image 
        source={icon}
        resizeMode='contain'
        tintColor={color}
        className='w-6 h-6'
      />
      <Text className={`${focused?'font-psemibold':'font-pregular'} text-xs`} style={{color:color}} >{name}</Text>
    </View>
  )
}

const TabsLayout = () => {
  return (
    <>
      <Tabs screenOptions={{
        tabBarShowLabel:false,
        tabBarActiveTintColor: "#ffa001",
        tabBarInactiveTintColor: "#cdcde0",
        tabBarStyle: {
          backgroundColor: "#161622",
          borderTopWidth: 1,
          borderTopColor: '#232533',
          height: 60
        }
        }}>
        <Tabs.Screen 
        name='Home'
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({color, focused}) => (
            <TabIcon icon={icons.home} color={color} name="Home" focused={focused}/>
          )
        }}
        />
        <Tabs.Screen 
        name='Create'
        options={{
          title: 'Create',
          headerShown: false,
          tabBarIcon: ({color, focused}) => (
            <TabIcon icon={icons.plus} color={color} name="Create" focused={focused}/>
          )
        }}
        />
        <Tabs.Screen 
        name='Profile'
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({color, focused}) => (
            <TabIcon icon={icons.profile} color={color} name="Profile" focused={focused}/>
          )
        }}
        />
      </Tabs>
      <StatusBar backgroundColor='#161622' style='light' hidden={false} />
    </>
  )
}

export default TabsLayout