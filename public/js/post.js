const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('postId');
console.log(postId); // Use this postId to fetch or display more details


document.addEventListener('DOMContentLoaded' , ()=>
{
    const reqPayLoad = JSON.stringify({postId:postId})

    // To Get Post Data
    fetch('http://localhost:3001/post/getPostData' ,{
        method: 'POST',
        headers : {
            'Content-Type':'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body : reqPayLoad
    })

    .then((response) =>
    {
        return response.json();
    })

    .then((response)=>
    {
        console.log(response);
    })


    // To Get Comment Data
    fetch('http://localhost:3001/post/getCommentData' ,{
        method: 'POST',
        headers : {
            'Content-Type':'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body : reqPayLoad
    })

    .then((response) =>
    {
        return response.json();
    })

    .then((response)=>
    {
        console.log(response);
    })


    // To Get Likes Data
    fetch('http://localhost:3001/post/getLikesCount' ,{
        method: 'POST',
        headers : {
            'Content-Type':'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body : reqPayLoad
    })

    .then((response) =>
    {
        return response.json();
    })

    .then((response)=>
    {
        console.log(response);
    })
});