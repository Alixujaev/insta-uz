import { ABOUT_ME, DELETE_FOLLOWER, EXISTS_USER, FOLLOW, GET_FOLLOWERS, GET_FOLLOWING, GET_USER_INFO, GET_USER_INFO_ID, RECOMENDEDS, SEARCH_USERS, UNFOLLOW, UPDATE_USER } from "@/api/User"

export const aboutMe = async(token:string) => {

  const result = await ABOUT_ME(token)

  return result
}

export const handleGetUser = async (username: string) => {
  const result = await GET_USER_INFO(username);
  return result
}

export const handleGetUserId = async (id: string) => {
  const result = await GET_USER_INFO_ID(id);
  return result
}

export const handleUpdate = async (body: any, token: string) => {
  const result = await UPDATE_USER(body, token);
  return result
}

export const handleCheckUsername = async (username: string) => {
  const result = await EXISTS_USER(username);
  return result
}

export const handleSearchUsers = async (username: string) => {
  const result = await SEARCH_USERS(username);
  return result
}

export const handleFollow = async (id: string, token: string) => {
  const result = await FOLLOW(id, token);
  return result
}

export const handleUnFollow = async (id: string, token: string) => {
  const result = await UNFOLLOW(id, token);
  return result
}

export const handleGetFollowers = async (id: string) => {
  const result = await GET_FOLLOWERS(id);
  return result
}

export const handleGetFollowing = async (id: string) => {
  const result = await GET_FOLLOWING(id);
  return result
}

export const handleDeleteFollower = async (id: string, token: string) => {
  const result = await DELETE_FOLLOWER(id, token);
  return result
}

export const handleGetRecomendeds = async (token: string) => {
  const result = await RECOMENDEDS(token);
  return result
}

export function follow(
  id: string,
  token: string | null,
  myId: string,
  followers: string[],
  setFollowers: any,
  socket: any,
  navigate: any
) {
  if (!token) {
    navigate("/");
  }else{
    setFollowers([...followers, myId]);

    handleFollow(id, token)
      .then(() => {
        socket.emit("sendFollowNotification", {
          sender_id: myId,
          receiver_id: id,
        });
      })
      .catch((err) => {
        console.log(err);
        setFollowers(followers.filter((follower) => follower !== myId));
      });
  }

 
}


export function unfollow(
  id: string,
  token: string | null,
  myId: string,
  followers: string[],
  setFollowers: any
) {
  if (!token) return;

  setFollowers(followers.filter((follower) => follower !== myId));
  handleUnFollow(id, token)
    .then(() => {})
    .catch((err) => {
      console.log(err);
      setFollowers([...followers, myId]);
    });
}