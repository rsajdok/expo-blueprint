import { Button, FlatList, View } from "react-native";
import FeedPostItem from "@/components/FeedPostItem";
// import posts from "@/dummyPosts";

import { Link } from "expo-router";
import { useAuth } from "@/providers/AuthProvider";
import { useEffect, useState } from "react";
import { Post } from "@/types/models";
import { ButtonR } from "@/components/Button";
import Timer from "@/components/Timer";

export default function App() {
    const { signOut, session } = useAuth();
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const reponse = await fetch('/api/posts', {
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`,
                },
            },
            );
            const data = await reponse.json();
            setPosts(data.posts);
        };

        fetchPosts();
    }, []);

    return (
        <View style={{ marginTop: 100 }}>
            {
                /*
                <ButtonR title="Profile" />
                <ButtonR title="sign out" />
                */
            }
            <FlatList className="px-2"
                data={posts}
                renderItem={({ item }) =>
                    <Link href={`/post/${item.id.toString()}`}> <FeedPostItem post={item} />
                    </Link>
                }
                ListFooterComponent={() => <Button title="Sign out" onPress={signOut} />}
            />
        </View>
    );
}

