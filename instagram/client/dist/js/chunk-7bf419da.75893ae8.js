(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7bf419da"],{"12fc":function(t,e,s){"use strict";var r=s("2313"),n=s.n(r);n.a},2313:function(t,e,s){},"3e44":function(t,e,s){"use strict";var r=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"gallery-container"},[s("ul",{staticClass:"gallery-wrapper"},t._l(t.posts,function(t){return s("post-card",{key:t.id,attrs:{currentPost:t}})}),1)])},n=[],o=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("router-link",{staticClass:"image-container",attrs:{to:{name:"post-details",params:{postId:t.currentPost.id}}}},[s("img",{class:["gallery-img",t.currentPost.imageClass],attrs:{src:t.imageUrl,alt:""}}),s("div",{staticClass:"img-details"},[s("div",{staticClass:"likes-and-comments"},[s("div",{staticClass:"likes"},[s("i",{staticClass:"fas fa-heart"}),s("span",[t._v(t._s(t.currentPost.likeCount))])]),s("div",{staticClass:"comments"},[s("i",{staticClass:"fas fa-comments"}),s("span",[t._v(t._s(t.currentPost.comments.length))])])])])])},a=[],i=s("aa6f"),l=s.n(i),c=(s("0150"),{name:"post-card",components:{},data:function(){return{posts:[],placeholder:l.a,imageClass:""}},props:{currentPost:{type:Object,required:!0}},computed:{imageUrl:function(){return this.currentPost.imageUrl||placeholder}}}),u=c,d=(s("6822"),s("2877")),p=Object(d["a"])(u,o,a,!1,null,"398f3dfd",null),f=p.exports,m={name:"post-gallery",components:{PostCard:f},props:{posts:{type:Array,required:!0}}},g=m,b=(s("12fc"),Object(d["a"])(g,r,n,!1,null,"95409d2e",null));e["a"]=b.exports},6822:function(t,e,s){"use strict";var r=s("8cb3"),n=s.n(r);n.a},"817d":function(t,e,s){},"8cb3":function(t,e,s){},"9bd2":function(t,e,s){},a3c1:function(t,e,s){"use strict";var r=s("9bd2"),n=s.n(r);n.a},d007:function(t,e,s){"use strict";s.r(e);var r=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("section",{staticClass:"main-section"},[s("div",{staticClass:"container text-center col-md-9 mt-5"},[t.users.length>0?s("article",{staticClass:"people-article"},[s("div",{staticClass:"header"},[s("div",{staticClass:"header-title"},[t._v("Discover People")]),s("div",{staticClass:"people-link"},[s("router-link",{staticClass:"people-link",attrs:{to:"/people"}},[t._v("See All")])],1)]),s("div",{staticClass:"slider-container"},[s("people-slider",{attrs:{users:t.users},on:{follow:t.onFollowHandler,unfollow:t.onUnFollowHandler}})],1)]):s("article",{staticClass:"people-article"},[s("div",{staticClass:"user-message"},[t._v("You are the first user on Instagram! Invite some friends to us!")])]),t.users.length>0?s("article",{staticClass:"explore-gallery-article"},[s("div",{staticClass:"explore-title"},[t._v("Explore")]),s("PostGallery",{attrs:{posts:t.posts}})],1):t._e()])])},n=[],o=(s("8e6e"),s("ac6a"),s("456d"),s("bd86")),a=s("3e44"),i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("section",{staticClass:"slider-container"},[s("div",{staticClass:"slider-card-wrapper"},t._l(t.users,function(e){return s("slider-card",{key:e.id,attrs:{user:e},on:{follow:function(e){return t.$emit("follow",e)},unfollow:function(e){return t.$emit("unfollow",e)}}})}),1)])},l=[],c=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("section",{staticClass:"card-container"},[s("div",{staticClass:"slider-image-wrapper"},[s("div",{staticClass:"slider-image-container"},[s("img",{class:t.imageSizeClass,attrs:{src:t.profilePicUrl,alt:"user-pic"}})])]),s("div",{staticClass:"username-container"},[s("router-link",{staticClass:"username",attrs:{to:{name:"single-user-page",params:{username:t.user.username}}}},[t._v(t._s(t.user.username)+"\n    ")])],1),s("div",{staticClass:"button-container"},[t.user.active?s("div",{staticClass:"buttons-wrapper"},[s("button",{staticClass:"btn app-button-secondary btn-sm",on:{click:function(e){return t.unfollow(t.user.id)}}},[t._v("Following")])]):s("div",{staticClass:"buttons-wrapper"},[s("button",{staticClass:"btn app-button-primary btn-sm",on:{click:function(e){return t.follow(t.user.id)}}},[t._v("Follow")])])])])},u=[],d=s("aa6f"),p=s.n(d),f={name:"slider-card",props:{user:{type:Object,required:!0}},computed:{imageSizeClass:function(){return this.user.imageClass||""},profilePicUrl:function(){return this.user.profilePicUrl||p.a}},methods:{follow:function(t){this.$emit("follow",t)},unfollow:function(t){this.$emit("unfollow",t)}}},m=f,g=(s("a3c1"),s("2877")),b=Object(g["a"])(m,c,u,!1,null,"12ca7a92",null),v=b.exports,h={name:"people-slider",components:{SliderCard:v},props:{users:{type:Array,required:!0}}},C=h,w=(s("f349"),Object(g["a"])(C,i,l,!1,null,"8da3b470",null)),P=w.exports,y=s("2f62");function O(t,e){var s=Object.keys(t);return Object.getOwnPropertySymbols&&s.push.apply(s,Object.getOwnPropertySymbols(t)),e&&(s=s.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),s}function _(t){for(var e=1;e<arguments.length;e++){var s=null!=arguments[e]?arguments[e]:{};e%2?O(s,!0).forEach(function(e){Object(o["a"])(t,e,s[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(s)):O(s).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(s,e))})}return t}var j={name:"explore",components:{PostGallery:a["a"],PeopleSlider:P},data:function(){return{pageNumber:0,bottom:!1}},computed:_({},Object(y["c"])("post",{posts:"getNotLoggedInUserPosts",pagesCount:"getForeignPostPagesCount",currentPage:"getCurrentPageForeign",loading:"getLoadingForeignPosts"}),{},Object(y["c"])("auth",{loggedInUser:"getLoggedInUserData"}),{},Object(y["c"])("user",{usersAll:"getAllUsers",users:"getFirstFiveUsers"})),methods:_({},Object(y["b"])("post",["fetchNonLoggedInUserPosts","resetForeignPostState"]),{},Object(y["b"])("user",["followUserAction","unFollowUserAction"]),{scroll:function(){var t={loggedInUser:this.loggedInUser.id,pageNumber:this.pageNumber};this.fetchNonLoggedInUserPosts(t),this.pageNumber=this.pageNumber+1,this.bottomVisible&&this.scroll},bottomVisible:function(){var t=window.scrollY,e=document.documentElement.clientHeight,s=document.documentElement.scrollHeight,r=e+t>=s;return r||s<e},onFollowHandler:function(t){this.followUserAction(t)},onUnFollowHandler:function(t){this.unFollowUserAction(t)},addListeners:function(){var t=this;window.addEventListener("scroll",function(){t.bottom=t.bottomVisible()}),this.scroll()}}),created:function(){this.addListeners()},watch:{bottom:function(t){t&&!this.loading&&this.pagesCount>this.currentPage+1&&this.scroll()}},beforeDestroy:function(){this.resetForeignPostState()}},U=j,k=(s("d454"),Object(g["a"])(U,r,n,!1,null,"169fa1b4",null));e["default"]=k.exports},d454:function(t,e,s){"use strict";var r=s("817d"),n=s.n(r);n.a},f349:function(t,e,s){"use strict";var r=s("f97c"),n=s.n(r);n.a},f97c:function(t,e,s){}}]);
//# sourceMappingURL=chunk-7bf419da.75893ae8.js.map