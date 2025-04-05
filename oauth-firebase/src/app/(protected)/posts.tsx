import { getPosts } from "@/services/postService";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import { View, Text, FlatList, Pressable, ActivityIndicator, Button } from "react-native";

export default function Posts() {
    console.log("Posts");
    const { data, isLoading, error, refetch, isRefetching, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ["posts"],
        queryFn: ({ pageParam }) => getPosts(pageParam),
        initialPageParam: { limit: 3, cursor: undefined },
        getNextPageParam: (lastPage, pages) => {
            if (lastPage.length === 0) {
                return undefined;
            }
            return {
                limit: 2,
                cursor: lastPage[lastPage.length - 1].id,
            }
        },
    });

    console.log("data", JSON.stringify(data));
    const posts = data?.pages.flat() || [];

    console.log("posts", JSON.stringify(posts));

    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return <Text>Error: {error.message}</Text>;
    }
    console.log(JSON.stringify(data));

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
            // refreshing={isRefetching}
            // onEndReachedThreshold={2}
            ListFooterComponent={() =>
                isFetchingNextPage ? (<ActivityIndicator />) :
                    hasNextPage ? (<Button title="Load More" onPress={() => fetchNextPage()} disabled={!hasNextPage} />) : null
            }
        />
    );

}