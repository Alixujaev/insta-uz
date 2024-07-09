import { COMMENT, CREATE_POST, DELETE_POST, EDIT_POST, GET_COMMENTS, GET_FOLLOWING_POSTS, GET_ONE_POST, GET_SAVED, GET_USER_POSTS, LIKE, SAVE_POST, UNLIKE, UPLOAD } from "@/api/Post";
import { CommentBodyType, CreatePostBody } from "@/consts";

export const handleImageUpload = async (formData: any, token: string) => {
  const result = await UPLOAD(formData, token);
  return result;
}

export const handleCreate = async (body: CreatePostBody, token:string) => {
  const result = await CREATE_POST(body, token);
  return result
}

export const handleDelete = async (id: string, token: string) => {
  const result = await DELETE_POST(id, token);
  return result
}

export const handleGetPosts = async (id: string) => {
  const result = await GET_USER_POSTS(id);
  return result
}

export const handleGetPost = async (id: string) => {
  const result = await GET_ONE_POST(id);
  return result
}

export const handleLike = async (id: string, token: string) => {
  const result = await LIKE(id, token);
  return result
}

export const handleUnLike = async (id: string, token: string) => {
  const result = await UNLIKE(id, token);
  return result
}


export const handleComment = async (body: CommentBodyType, token: string) => {
  const result = await COMMENT(body, token);
  return result
}


export const handleGetComments = async (postId: string) => {
  const result = await GET_COMMENTS(postId);
  return result
}

export const handleEditPost = async (body: any, token: string, id: string) => {
  const result = await EDIT_POST(body, token, id);
  return result
}

export const handleSavePost = async (id: string, token: string) => {
  const result = await SAVE_POST(id, token);
  return result
}

export const handleGetSaved = async (token: string) => {
  const result = await GET_SAVED(token);
  return result
}

export const handleGetFollowingPosts = async (token: string) => {
  const result = await GET_FOLLOWING_POSTS(token);
  return result
}


export function like(
  id: string,
  token: string | null,
  setLikes: any,
  likes: string[],
  userId: string,
  author_id: string,
  socket: any
) {
  if (!token) return;

  setLikes([...likes, userId]);


  handleLike(id, token)
    .then((res) => {
      socket.emit("sendLikeNotification", {
        sender_id: userId,
        receiver_id: author_id,
      });
    })
    .catch((err) => {
      console.log(err);
      setLikes(likes.filter((like) => like !== userId));
    });
}

export function unlike(
  id: string,
  token: string | null,
  setLikes: any,
  likes: string[],
  userId: string,
) {
  if (!token) return;

  setLikes(likes.filter((like) => like !== userId));

  handleUnLike(id, token)
    .then((res) => {})
    .catch((err) => {
      console.log(err);
      setLikes([...likes, userId]);
    });
}

export function comment(
  body: CommentBodyType,
  token: string | null,
  setIsLoading: any,
  setComments: any,
  setCommentText: any,
  setShowEmoji: any,
  userId: string,
  author_id: string,
  socket: any,
  comments: string[]
) {
  if (!token) return;

  setIsLoading(true);
  handleComment(body, token)
    .then((res) => {
      setCommentText("");
      setShowEmoji(false);
      setComments([...comments, res.data.data]);
      socket.emit("sendCommentNotification", {
        sender_id: userId,
        receiver_id: author_id,
      });
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => setIsLoading(false));
}

export function save(
  id: string,
  token: string | null,
  saveds: string[],
  setSaveds: any
) {
  if (!token) return;

  if (saveds.includes(id)) {
    setSaveds(saveds.filter((saved) => saved !== id));
  } else {
    setSaveds([...saveds, id]);
  }

  handleSavePost(id, token)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
      if (saveds.includes(id)) {
        setSaveds([...saveds, id]);
      } else {
        setSaveds(saveds.filter((saved) => saved !== id));
      }
    });
}