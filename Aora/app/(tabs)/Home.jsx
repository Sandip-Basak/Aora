import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import SearchInput from '../../components/SearchInput'
import Treanding from '../../components/Treanding'
import EmptyState from '../../components/EmptyState'
import { getAllPosts, getLatestPosts } from '../../lib/appwrite'
import useAppWrite from '../../lib/useAppWrite'
import VideoCard from '../../components/VideoCard'
import { useGlobalContext } from '../../context/GlobalProvider'

const Home = () => {
  const {data: posts, refetch} = useAppWrite(getAllPosts);
  const {data: latestPosts} = useAppWrite(getLatestPosts);
  const [refreshing, setRereshing] = useState(false);
  const { user } = useGlobalContext();
  
  const onRefresh = async () => {
    setRereshing(true);
    // We recall videos api to check if any new videos appeared
    await refetch();
    setRereshing(false);
  }
  

  return (
    <SafeAreaView className='bg-primary h-full'>
      
      {/* FlatList is used to render a list of data */}
      <FlatList 
        data={posts} 
        keyExtractor={(item)=>item.$id} 
        renderItem={({item})=>(
          <VideoCard video={item}/>
        )} 
        ListHeaderComponent={()=>(
          <View className='my-6 px-4 space-y-6'>
            <View className='justify-between items-start flex-row'>
              <View>
                <Text className='font-pmedium text-sm text-gray-100'>Welcome back</Text>
                <Text className='text-2xl font-psemibold text-white'>{user?.username}</Text>
              </View>
              <View className='mt-1.5'>
                <Image source={images.logoSmall} className='h-10 w-9' resizeMode='contain'/>
              </View>
            </View>
            <SearchInput />
            <View className='w-full flex-1 pt-5 pb-8'>
              <Text className='text-gray-100 text-lg font-pregular mb-3'>Latest Videos</Text>

              {/* Giving ?? and an empty array as it dosent throw any error */}
              <Treanding posts={latestPosts ?? []} />
            </View>
          </View>
        )} 
        ListEmptyComponent={()=>(
          <EmptyState title="No videos found" subtitle="Be the first one to upload a video" />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  )
}

export default Home