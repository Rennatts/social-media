export const createPost = (userId, token, post) => {
    fetch(`http://localhost:5000/posts/create/new/${userId}`, {
        method: "POST", 
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: post
    })
    .then(res => {
        return res.json()
    })
    .catch(error => console.log(error))
};


export const getPost = ( token, postId) => {
    fetch(`http://localhost:5000/posts/post/single_post/${postId}`, {
        method: "GET", 
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    .then(res => {
        return res.json()
    })
    .catch(error => console.log(error))
};