import { useCallback } from "react";
import { useReducer, useState, useEffect } from "react";
import { createContext } from "react";

export const PostListContext = createContext({
 // postList: [],
  // fetching: false,
  addPost: () => {},
  deletePost: () => {},
});

const postListReducer = (currPostList, action) => {
  let newPostList = currPostList;
  if (action.type === "DELETE_POST") {
    newPostList = currPostList.filter(
      (post) => post.id !== action.payload.postId
    );
  } else if (action.type === "ADD_POST") {
    newPostList = [action.payload.post, ...currPostList];
  } else if (action.type === "ADD_MULTIPLE_POSTS") {
    newPostList = action.payload.posts;
  }
  return newPostList;
};

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(postListReducer, []);

  // const [fetching, setFetching] = useState(false);

  const addPost = useCallback(
    (post) => {
      dispatchPostList({
        type: "ADD_POST",
        payload: {
          post: post,
        },
      });
    },
    [dispatchPostList]
  );
  // const addMultiplePosts = useCallback(
  //   (posts) => {
  //     dispatchPostList({
  //       type: "ADD_MULTIPLE_POSTS",
  //       payload: {
  //         posts: posts,
  //       },
  //     });
  //   },
  //   [dispatchPostList]
  // );
  const deletePost = useCallback(
    (postId) => {
      dispatchPostList({
        type: "DELETE_POST",
        payload: {
          postId: postId,
        },
      });
    },
    [dispatchPostList]
  ); // deletePost ref remains same even when dispatchPostList is changed because of useCallback hook

  // const arr = [5, 1, 6, 2, 7];
  // const sortedArr = useMemo(() => arr.sort, [arr]); sorting will only occur if the arr changes not when it is re-rendered

  // useEffect(() => {
  //   setFetching(true);

  //   const controller = new AbortController();
  //   const signal = controller.signal;

  //   fetch("https://dummyjson.com/posts", { signal })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       addMultiplePosts(data.posts);
  //       setFetching(false);
  //     });
  //   return () => {
  //     controller.abort();
  //   };
  // }, []);

  return (
    <PostListContext.Provider
      value={{
       // postList: postList,
        // fetching: fetching,
        addPost: addPost,
        deletePost: deletePost,
      }}
    >
      {children}
    </PostListContext.Provider>
  );
};

export default PostListProvider;
