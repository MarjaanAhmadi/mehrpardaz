import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectPostById,
  selectAllPosts,
  postUpdated,
  postAdded,
  selectPostByUser,
  fetchAllPostOwnThunk,
  fetchPosts,
} from "./testSlice";
import { Link, useHistory } from "react-router-dom";

export default function Posts() {
  const posts = useSelector(selectAllPosts);
  const dispatch = useDispatch();
  const postStatus = useSelector((state) => state.test.status);

  function addByOwnThunk() {
    return dispatch(fetchAllPostOwnThunk());
  }

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);
  // const posts = useSelector(selectAllPosts)

  // const user2Posts = useSelector((state) => selectPostByUser(state, '2'))
  return (
    <>
      <AddPostForm />
      <PostsList posts={posts} />
    </>
  );
}

const PostExcerpt = React.memo(({ post }) => {
  console.log("post", post);
  return (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content.substring(0, 100)}</p>
      <Link to={`/test/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  );
});

const PostsList = React.memo((props) => {
  const { posts } = props;

  const renderedPosts = posts.map((post) => (
    <PostExcerpt post={post} key={post.id} />
  ));

  return (
    <section>
      <h2>Posts</h2>
      <p>in useEffect it will add by createAsync thunk</p>
      {renderedPosts}
    </section>
  );
});

const AddPostForm = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    postTitle: "",
    postContent: "",
  });

  function onInputChangeDef(e) {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  }

  function onSavePostClicked() {
    const { postTitle, postContent } = state;
    if (postTitle && postContent) {
      dispatch(postAdded(postTitle, postContent));
      setState((prev) => ({ postTitle: "", postContent: "" }));
    }
  }
  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={state.postTitle}
          onChange={onInputChangeDef}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={state.postContent}
          onChange={onInputChangeDef}
        />
        <button type="button" onClick={onSavePostClicked}>
          Save Post
        </button>
      </form>
    </section>
  );
};

export const SinglePostPage = (props) => {
  const { match } = props;
  const { postId } = match.params;

  const post = useSelector(selectPostById(postId));

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <p className="post-content">{post.content}</p>
        <Link to={`/test/editPost/${post.id}`} className="button">
          Edit Post
        </Link>
      </article>
    </section>
  );
};

export const EditPostForm = (props) => {
  const { match } = props;
  const { postId } = match.params;

  const post = useSelector(selectPostById(postId));

  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const dispatch = useDispatch();
  const history = useHistory();

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(postUpdated({ id: postId, title, content }));
      history.push(`/test/posts/${postId}`);
    }
  };

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="What's on your mind?"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
      </form>
      <button type="button" onClick={onSavePostClicked}>
        Save Post
      </button>
    </section>
  );
};
