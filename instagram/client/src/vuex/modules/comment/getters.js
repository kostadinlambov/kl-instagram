
export const getComments = (state) => state.comments; 

// getLastComment
export const getLastComment = (state) => (postId) =>  {
    if( state.lastComments.length > 0){
        const comment = state.lastComments.filter(comment => comment.postId === postId)[0]
        if(comment){
            return comment;
        }
     }

     return '';
}