export async function getPosts() { // token: string) {
    const baseUrl = "https://jsonplaceholder.typicode.com";

    try {
        const response = await fetch(baseUrl + "/posts", {
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
        console.log("data", JSON.stringify(data[0]));
        return data;

    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}