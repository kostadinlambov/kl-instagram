export const postService = {
    getPostImageClass : (width, height) => {
        if(width > height){
            return 'l';
        }

        return '';
    }
}