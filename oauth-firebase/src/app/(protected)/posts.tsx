import { getPosts } from "@/services/postService";
import { useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import { View, Text, FlatList, Pressable } from "react-native";

export default function Posts() {
    console.log("Posts");
    const { data, isLoading, error } = useQuery({
        queryKey: ['posts'],
        queryFn: () => getPosts(),
    });

    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return <Text>Error: {error.message}</Text>;
    }
    const posts = data?.flat() || [];

    return (
        <FlatList
            data={posts}
            contentContainerClassName="w-full max-w-lg mx-auto"
            renderItem={({ item }) => (
                <Link href={`/post/${item.id}`} asChild>
                    <Pressable className="flex-1 p-4 bg-white rounded-lg shadow-md mb-4">
                        <Text className="text-lg font-bold text-gray-800 mb-2">{item.title}</Text>
                        <Text className="text-sm text-gray-600">{item.body}</Text>
                    </Pressable>
                </Link>
            )}
            onEndReachedThreshold={2}
        />
    );

}