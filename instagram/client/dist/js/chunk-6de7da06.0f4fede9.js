(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6de7da06"],{2866:function(e,t,r){"use strict";var o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"card-container"},[r("div",{staticClass:"content-wrapper"},[r("div",{staticClass:"profile-pick-container"},[r("img",{class:e.imageSizeClass,attrs:{src:e.profilePicUrl,alt:"user-pic"}})]),r("div",{staticClass:"usernames-container"},[r("router-link",{staticClass:"username",attrs:{to:{name:"single-user-page",params:{username:e.username}}}},[e._v("\n           "+e._s(e.username)+"\n      ")]),r("div",{staticClass:"names",style:e.userNameStyle},[e._v(e._s(e.firstName)+" "+e._s(e.lastName))])],1)]),e.currentUser.active?r("div",{staticClass:"buttons-wrapper"},[r("button",{staticClass:"btn app-button-secondary btn-sm",on:{click:function(t){return e.unfollow(e.userId)}}},[e._v("Following")])]):r("div",{staticClass:"buttons-wrapper"},[r("button",{staticClass:"btn app-button-primary btn-sm",on:{click:function(t){return e.follow(e.userId)}}},[e._v("Follow")])])])},n=[],l=r("aa6f"),s=r.n(l),i=(r("0150"),{name:"people-card",data:function(){return{placeholder:s.a}},props:{currentUser:{type:Object,required:!0},userNameStyle:{type:Object}},computed:{userId:function(){return this.currentUser.followerId||this.currentUser.userId||this.currentUser.id},username:function(){return this.currentUser.username||this.currentUser.followerUsername||this.currentUser.userUsername},firstName:function(){return this.currentUser.firstName||this.currentUser.followerFirstName||this.currentUser.userFirstName},lastName:function(){return this.currentUser.lastName||this.currentUser.lastName||this.currentUser.lastName},profilePicUrl:function(){return this.currentUser.profilePicUrl||this.currentUser.userProfilePicUrl||this.currentUser.followerProfilePicUrl||this.placeholder},imageSizeClass:function(){return this.currentUser.imageClass||""}},methods:{follow:function(e){this.$emit("on-follow",e)},unfollow:function(e){this.$emit("on-unfollow",e)}}}),a=i,c=(r("a472"),r("2877")),u=Object(c["a"])(a,o,n,!1,null,"cb514fda",null);t["a"]=u.exports},"2f21":function(e,t,r){"use strict";var o=r("79e5");e.exports=function(e,t){return!!e&&o(function(){t?e.call(null,function(){},1):e.call(null)})}},"4c4f":function(e,t,r){"use strict";var o=r("d3d8"),n=r.n(o);n.a},"55dd":function(e,t,r){"use strict";var o=r("5ca1"),n=r("d8e8"),l=r("4bf8"),s=r("79e5"),i=[].sort,a=[1,2,3];o(o.P+o.F*(s(function(){a.sort(void 0)})||!s(function(){a.sort(null)})||!r("2f21")(i)),"Array",{sort:function(e){return void 0===e?i.call(l(this)):i.call(l(this),n(e))}})},6143:function(e,t,r){"use strict";r.r(t);var o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("article",{staticClass:"people-article",style:e.wrapperPeople},[r("div",{staticClass:"container col-md-10 wrapper people-container",style:e.wrapperPeople},[e.followerModal?r("section",{staticClass:"people-section"},e._l(e.followers,function(t){return r("div",{key:t.followerId},[t.followerId!=e.loggedInUserId?r("people-card",{attrs:{currentUser:t},on:{"on-follow":e.onFollowHandler,"on-unfollow":e.onUnFollowHandler}}):e._e()],1)}),0):e._e(),e.followingModal?r("section",{staticClass:"people-section"},e._l(e.following,function(t){return r("div",{key:t.userId},[t.userId!=e.loggedInUserId?r("people-card",{attrs:{currentUser:t},on:{"on-follow":e.onFollowHandler,"on-unfollow":e.onUnFollowHandler}}):e._e()],1)}),0):e._e(),r("div",{staticClass:"title-wrapper"},[e.followingCandidates.length&&(e.followingModal||e.followerModal)?r("div",{staticClass:"title"},[e._v("Suggestions For You")]):e._e()]),e.followingModal||e.followerModal?r("section",{staticClass:"people-section"},e._l(e.followingCandidates,function(t){return r("div",{key:t.id},[t.id!=e.loggedInUserId?r("people-card",{attrs:{currentUser:t},on:{"on-follow":e.onFollowHandler,"on-unfollow":e.onUnFollowHandler}}):e._e()],1)}),0):e._e(),r("div",{staticClass:"title-wrapper"},[e.followingModal||e.followerModal?e._e():r("div",{staticClass:"title"},[e._v("Suggested")])]),e.followingModal||e.followerModal?e._e():r("section",{staticClass:"people-section"},e._l(e.users,function(t){return r("div",{key:t.id},[t.id!=e.loggedInUserId?r("people-card",{attrs:{currentUser:t},on:{"on-follow":e.onFollowHandler,"on-unfollow":e.onUnFollowHandler}}):e._e()],1)}),0),0==e.users.length?r("div",[e._m(0)]):e._e()])])},n=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("section",{staticClass:"people-section"},[r("div",{staticClass:"user-message"},[e._v("You are the first user on Instagram! Invite some friends to us!")])])}],l=(r("8e6e"),r("ac6a"),r("456d"),r("55dd"),r("bd86")),s=r("0150"),i=r("2866"),a=r("2f62");function c(e,t){var r=Object.keys(e);return Object.getOwnPropertySymbols&&r.push.apply(r,Object.getOwnPropertySymbols(e)),t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r}function u(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?c(r,!0).forEach(function(t){Object(l["a"])(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):c(r).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}var d={name:"people",components:{PeopleCard:i["a"]},data:function(){return{loggedInUserId:s["a"].getUserId(),orderedByFollowingAscArr:[],orderedByFollowingDescArr:[]}},props:{wrapperPeople:{type:Object},followingModal:{type:Boolean},followerModal:{type:Boolean}},computed:u({},Object(a["c"])("user",{users:"getAllUsers",followers:"getFollowers",following:"getFollowing",followingCandidates:"getFollowingCandidates"})),methods:u({},Object(a["b"])("user",["fetchAllUsersAction","followUserAction","unFollowUserAction"]),{onFollowHandler:function(e){this.followUserAction(e)},onUnFollowHandler:function(e){this.unFollowUserAction(e)},orderByFollowingAsc:function(){this.orderedByFollowingAscArr=this.users.sort(function(e,t){return t.active-e.active})},orderByFollowingDesc:function(){this.orderedByFollowingDescArr=this.users.sort(function(e,t){return e.active-t.active})}}),mounted:function(){this.orderByFollowingDesc()}},f=d,p=(r("4c4f"),r("2877")),w=Object(p["a"])(f,o,n,!1,null,"1e1c2648",null);t["default"]=w.exports},a460:function(e,t,r){},a472:function(e,t,r){"use strict";var o=r("a460"),n=r.n(o);n.a},d3d8:function(e,t,r){}}]);
//# sourceMappingURL=chunk-6de7da06.0f4fede9.js.map