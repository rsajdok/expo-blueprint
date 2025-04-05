
type GetPostsParams = {
    cursor?: string;
    limit?: number;
};

export async function getPosts(pageParam: GetPostsParams) { // token: string) {
    const baseUrl = "https://jsonplaceholder.typicode.com";
    const searchParams = new URLSearchParams();

    if (pageParam.cursor) {
        searchParams.append("_start", pageParam.cursor);
    }

    if (pageParam.limit) {
        searchParams.append("_limit", pageParam.limit.toString());
    }

    const url = `${baseUrl}/posts?${searchParams.toString()}`;
    console.log("url", url);

    try {
        const response = await fetch(url, { // baseUrl + "/posts?", {
            /*
            headers: {
                Authorization: `Bearer ${token}`,
            },
            */
        });

        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }
        console.log("response", response.status);

        const data = await response.json();
        console.log("data", JSON.stringify(data[1]));
        return data;

    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}