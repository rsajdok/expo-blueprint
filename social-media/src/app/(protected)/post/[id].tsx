import { Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import FeedPostItem from "@/components/FeedPostItem";
import posts from "@/dummyPosts";

export default function FeedPost() {
    const { id } = useLocalSearchParams<{ id: string }>();

    const post = posts.find((p) => p.id.toString() === id);

    if (!post) {
        return <Text>Post not found</Text>;
    }

    return <FeedPostItem post={post} />;
}