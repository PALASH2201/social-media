import { useContext, useRef } from "react";
import { PostListContext } from "../store/post-list-store";
import { redirect, useNavigate } from "react-router-dom"; 

import { Form } from "react-router-dom";

const CreatePost = () => {
  //const { addPost } = useContext(PostListContext);
  // const navigate = useNavigate();

  // const userIdEle = useRef();
  // const postTitleEle = useRef();
  // const postBodyEle = useRef();
  // const postReactionsEle = useRef();
  // const postTagsEle = useRef();

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const userId = userIdEle.current.value;
  //   const postTitle = postTitleEle.current.value;
  //   const postBody = postBodyEle.current.value;
  //   const postReactions = postReactionsEle.current.value;
  //   const postTags = postTagsEle.current.value.split(" ");
  //   userIdEle.current.value = "";
  //   postTitleEle.current.value = "";
  //   postBodyEle.current.value = "";
  //   postReactionsEle.current.value = "";
  //   postTagsEle.current.value = [];
  // };

  return (
    <Form method="POST" className="create-post">
      <div className="mb-3">
        <label htmlFor="userId" className="form-label">
          Enter your userID
        </label>
        <input
          name="userId"
          type="text"
          className="form-control"
          id="userId"
          placeholder="Your userId"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Post Title
        </label>
        <input
          name="title"
          type="text"
          className="form-control"
          id="title"
          placeholder="How are you feeling today?"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="body" className="form-label">
          Post Content
        </label>
        <textarea
          name="body"
          type="text"
          rows={5}
          className="form-control"
          id="body"
          placeholder="Tell us more about it..."
        />
      </div>
      <div className="mb-3">
        <label htmlFor="reactions" className="form-label">
          Reactions
        </label>
        <input
          name="reactions"
          type="number"
          className="form-control"
          id="reactions"
          placeholder="How many people reacted to this post?"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="tags" className="form-label">
          Enter your hashtags here
        </label>
        <input
          name="tags"
          type="text"
          className="form-control"
          id="tags"
          placeholder="Please enter the tags separated by space"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Post
      </button>
    </Form>
  );
};

export async function createPostAction(data) {
  const formData = await data.request.formData();
  const postData = Object.fromEntries(formData);
  postData.tags = postData.tags.split(" ");
  fetch("https://dummyjson.com/posts/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postData),
  })
    .then((res) => res.json())
    .then((post) => {
      console.log("Response:", post);
      //addPost(post);
    });
    return redirect("/");
};

export default CreatePost;
