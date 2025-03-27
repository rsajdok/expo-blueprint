import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { View, Text, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Post } from "@/types/models";

// Configure dayjs to use relativeTime plugin
dayjs.extend(relativeTime);

type FeedPostItemProps = {
    post: Post;
};

export default function FeedPostItem({ post }: FeedPostItemProps) {
    return (
        <View className="flex-row gap-3 p-4 border-b border-b-gray-200">
            <Image
                source={{ uri: post.author.avatar }}
                className="w-12 h-12 rounded-full"
            />
            <View className="flex-1 gap-2">
                <View className="flex-row items-center gap-1">
                    <Text className="font-semibold">{post.author.name}</Text>
                    <Text className="text-gray-500">{post.author.handle}</Text>
                    <Text className="text-gray-500">·</Text>
                    <Text className="text-gray-500">
                        {dayjs(post.created_at).fromNow(true)}
                    </Text>
                </View>

                <Text className="leading-5">{post.content}</Text>

                <View className="flex-row gap-5">
                    <View className="flex-row items-center gap-1">
                        <MaterialCommunityIcons
                            name="message-outline"
                            size={20}
                            color="gray"
                        />
                        <Text className="text-gray-500">{post.replies_count}</Text>
                    </View>
                    <View className="flex-row items-center gap-1">
                        <MaterialCommunityIcons name="repeat" size={20} color="gray" />
                        <Text className="text-gray-500">{post.retweets_count}</Text>
                    </View>
                    <View className="flex-row items-center gap-1">
                        <MaterialCommunityIcons
                            name={post.is_liked ? "heart" : "heart-outline"}
                            size={20}
                            color={post.is_liked ? "crimson" : "gray"}
                        />
                        <Text className="text-gray-500">{post.likes_count}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}