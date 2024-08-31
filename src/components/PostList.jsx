import { useContext} from "react";
import Post from "./Post";
import { PostListContext } from "../store/post-list-store";
import LoadingSpinner from "./LoadingSpinner";
import { useLoaderData } from "react-router-dom";

const PostList = () => {
  // const { postList} = useContext(PostListContext);
  const postList = useLoaderData();
  return (
    <>
      {postList.map((post) => <Post key={post.id} post={post} />)}
    </>
  );
};

export const postLoader = async () =>{
  return fetch("https://dummyjson.com/posts")
  .then((res) => res.json())
  .then((data) => {
    return data.posts;
  });
}
export default PostList;
