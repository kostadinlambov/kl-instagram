export const getUserPosts = state => state.posts;

export const getNotLoggedInUserPosts = state => state.foreignPosts;

export const getLoadingForeignPosts = state => state.loadingForeignPosts;

export const getLoadingUserPosts = state => state.loadingUserPosts;

export const getPostCount = state => state.posts.length;

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


