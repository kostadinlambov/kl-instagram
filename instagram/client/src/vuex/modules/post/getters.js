
// LoggedIn User Posts
export const getUserPosts = state => state.posts;
export const getPostCount = state => state.posts.length;
export const getLoadingUserPosts = state => state.loadingUserPosts;
export const getUserPostPagesCount = state => {
    if( state.posts.length > 0){
       return state.posts[0].totalPages;
    }
    return 0;
}

export const getCurrentPageUser= state =>{
    if( state.posts.length > 0){
        return state.posts[state.posts.length-1].currentPageNumber;
     }
     return 0;
}

// Not LoggedIn User Posts
export const getNotLoggedInUserPosts = state => state.foreignPosts;
export const getLoadingForeignPosts = state => state.loadingForeignPosts;
export const getForeignPostPagesCount = state => {
    if( state.foreignPosts.length > 0){
       return state.foreignPosts[0].totalPages;
    }
    return 0;
}

export const getCurrentPageForeign= state =>{
    if( state.foreignPosts.length > 0){
        return state.foreignPosts[state.foreignPosts.length-1].currentPageNumber;
     }
     return 0;
}

// Following Posts
export const getFollowingPosts = state => state.followingPosts;

export const getLoadingFollowingPosts = state => state.loadingFollowingPosts;

export const getFollowingPostsPagesCount = state => {
    if( state.followingPosts.length > 0){
       return state.followingPosts[0].totalPages;
    }
    return 0;
}

export const getCurrentPageFollowingPosts= state =>{
    if( state.followingPosts.length > 0){
        return state.followingPosts[state.followingPosts.length-1].currentPageNumber;
     }
     return 0;
}


// getLastComment
export const getLastCommentFollowingPosts = (state) => (postId) =>  {
    if( state.followingPosts.length > 0){
        const comments = state.followingPosts.filter(post => post.id === postId)[0].comments
        if(comments.length > 0){
            return comments[comments.length-1];
        }
     }
     return '';
}
