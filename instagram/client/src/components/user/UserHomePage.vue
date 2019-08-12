<template>
  <main class="mt-5">
    <div class="container text-center col-md-9 pt-5">
      <header class="user-homepage-header">
        <!-- <h1 class="text-center font-weight-bold mt-5">Hello {{username}}</h1>
        <h2 class="text-center font-weight-bold mt-5">userId: {{userId}}</h2>-->
        <div class="card-container">
          <div class="content-wrapper">
            <div class="profile-pick-container">
              <img src="@/assets/images/placeholder.png" alt="user-pic" />
            </div>
            <section class="user-info-wrapper">
              <div class="username-wrapper">
                <!-- <div class="username">{{username}}</div>
                <div class="names">firstName lastName</div>-->
                <h1 class="username">{{username}}</h1>
                <div>
                  <router-link class="btn home-page-btn" to="/accounts/edit">Edit Profile</router-link>
                </div>
                <div>
                  <router-link class="btn home-page-btn" to="/accounts/settings">Settings</router-link>
                </div>

                <!-- <div class="settings-button">Settings</div> -->
              </div>
              <ul class="follower-info">
                <li>
                  <span class="post-count">1 post</span>
                </li>
                <li>
                  <router-link class="follower-link" to="/followers">1 follower</router-link>
                </li>
                <li>
                  <router-link class="follower-link" to="/followers">8 following</router-link>
                </li>
              </ul>

              <div class="bio-info">
                <h2 class="names">Bender Rodrigez</h2>
                <span
                  class="bio"
                >Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate sint aspernatur porro in tenetur aliquid non earum temporibus quam deleniti. Saepe, laudantium provident asperiores similique commodi possimus ratione cum fugit.</span>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="//https//bender.com"
                  class="webpage-link"
                >www.web.page</a>
              </div>
            </section>
          </div>
        </div>
      </header>
      <div class="gallery-navbar-wrapper">
        <router-link class="title-link align-middle" to="#">
          <i class="fas fa-border-all"></i>
          <span class="bookmark-icon-span">POSTS</span>
        </router-link>
        <router-link class="title-link" to="#">
          <i class="far fa-bookmark"></i>
          <span class="bookmark-icon-span">SAVED</span>
        </router-link>
      </div>
      <div class="gallery-container">
        <ul class="gallery-wrapper">
          <router-link class="image-container" to="#">
            <img class="gallery-img l" src="@/assets/images/Social_Media.jpg" alt />
          </router-link>
          <router-link class="image-container" to="#">
            <img class="gallery-img " src="@/assets/images/placeholder.png" alt />
          </router-link>
          <router-link class="image-container" to="#">
            <img class="gallery-img " src="@/assets/images/placeholder.png" alt />
          </router-link>
          <router-link class="image-container" to="#">
            <img class="gallery-img " src="@/assets/images/SoftUniFoundation_Logo.png" alt />
          </router-link>
          <router-link class="image-container" to="#">
            <img class="gallery-img " src="@/assets/images/small_dog.jpg" alt />
          </router-link>
        </ul>
      </div>
    </div>
  </main>
</template>
// <div class="gallery-row">
//             <div class="post-wrapper">
//               <router-link to="#">
//                 <div class="image-wrapper profile-pick-container">
//                   <img src="../../assets/images/default-background-image.jpg" alt />
//                 </div>
//               </router-link>
//             </div>
//           </div>
<script>
import { userService } from "../../infrastructure/userService";

export default {
  name: "user-home-page",
  data() {
    return {
      username: this.$route.params.username,
      userId: userService.getUserId()
    };
  }
};
</script>

<style scoped>
/*############ Header #######################*/

.user-homepage-header {
  margin-bottom: 44px;
}

.card-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* flex-wrap: wrap; */

  /* border: 2px solid red; */
  background: rgb(255, 255, 255);
  padding: 0.5rem 1rem;
  border-radius: 5px;

  /* flex-grow: 1; */
  margin: 0 auto 30px;
  max-width: 935px;
  width: 100%;
  padding: 40px 20px 0;
}

.content-wrapper {
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 1rem 0;
  /* border: 2px solid blue; */
}

.profile-pick-container {
  flex: 0 0 9rem;
  /* width: 3rem; */
  position: relative;
  overflow: hidden;
  border-radius: 50%;
  margin: 0 3rem auto 3rem;
}

.profile-pick-container:after {
  display: block;
  content: "";
  padding-top: 100%;
}

.profile-pick-container img {
  display: block;
  position: absolute;
  width: 100%;
  height: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.profile-pick-container img.l {
  display: block;
  position: absolute;
  width: auto;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.user-info-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.username-wrapper {
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 1.2rem;
}

h1.username {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 300;
  font-size: 28px;
  line-height: 36px;
  margin: -5px 1rem -6px 0;
  padding: 0;
}

.home-page-btn {
  margin-left: 1rem;
  margin-right: 0.5rem;
  padding: 0.275rem 0.55rem;
  background-color: transparent;
  border: 1px solid #dbdbdb;
  color: #262626;
}

.home-page-btn:hover {
  background: rgb(65, 184, 131);
  color: #fff;
  border: 1px solid #fff;
  box-shadow: 0 0 14px 1px rgba(0, 0, 0, 0.3);
}

ul.follower-info {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 1.2rem;
}

ul.follower-info li {
  list-style: none;
  margin-right: 2.2rem;
}

.follower-link,
span.post-count {
  text-decoration: none;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
}

.follower-link:hover {
  color: rgb(65, 184, 131);
}

.bio-info {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  font-size: 16px;
  line-height: 24px;
  word-wrap: break-word;
  color: #212529;
}

.names {
  font: inherit;
  display: inline;
  font-weight: 600;
  padding: 0;
  margin: 0;
}

span.bio {
  margin: 0;
  padding: 0;
  border: 0;
  font: inherit;
  vertical-align: baseline;
  text-align: left;
}

.webpage-link {
  font-weight: 600;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  color: #1e6cb9b6;
  text-decoration: none;
}

/*############ gallery-navbar-wrapper #######################*/
.gallery-navbar-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #efefef;
  /* border-top: 1px solid red; */
  padding-top: 0.2rem;
}

.gallery-title {
  margin-right: 60px;
  list-style-type: none;
}

.title-link {
  height: 52px;
  border-top: 1px solid #262626;
  padding: 1rem 0;
  margin-right: 4rem;
  color: #999;
  text-decoration: none;
}

.title-link:hover {
  color: rgb(65, 184, 131);
  border-top: 1px solid rgb(65, 184, 131);
}

.bookmark-icon-span{
  margin-left: 5px;
}

/*############ picture gallery grid #######################*/
.gallery-container {
  max-width: 935px;
  width: 100%;
  padding: 40px 0 0;
  margin: auto;
}

.gallery-wrapper {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 32%);
  gap: 1rem;
  justify-content: space-around;
  align-content: stretch;
  /* justify-items: stretch;
  align-items: stretch; */
}

.image-container {
  /* width: 280px;
  height: 280px; */
   /* width: 280px; */
  height: 100%;
  width:100%;
  overflow: hidden;

  margin: auto;
  position: relative;
  
  transition: transform 1.5s;
}

.image-container:after {
  display: block;
  content: "";
  padding-top: 100%;
}

.image-container:hover {
  transform: scale(1.1);
  box-shadow: 0px 0px 12px 2px rgba(65, 184, 131, 0.8);
}

img.gallery-img {
  display: block;
  position: absolute;
  width: 100%;
  height: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  /* transition: transform 1.5s; */
}

.gallery-img.l {
  position: absolute;
  display: block;
  width: auto;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}



/*############ picture gallery grid #######################*/
/* .gallery-container {
  max-width: 935px;
  width: 100%;
  padding: 40px 0 0;
  margin: auto;
}

.gallery-wrapper {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 30%);
  gap: 1.5rem;
  justify-items: stretch;
  align-items: stretch;
}

.image-container {
  width: 100%;
  margin: auto;
  position: relative;
}

.image-container:after {
  display: block;
  content: '';
  padding-top: 100%;
}

.gallery-img {
  width: 100%;
  height: auto;
  transition: transform 1.5s;
}

.gallery-img.l {
  width: auto;
  height: 100%;
  transition: transform 1.5s;
}

.gallery-img:hover,
.gallery-img.l:hover {
  transform: scale(1.1);
  box-shadow: 0px 0px 12px 2px rgba(65, 184, 131, 0.8);
} */

/*############ junk #######################*/

/* .buttons-wrapper {
  flex: 0 1 50%;
  display: flex;
  justify-content: flex-end;
  margin-right: 5px;
}

.buttons-wrapper button {
  margin-left: 10px;
}

.user-role {
  margin-left: 10px;
  margin: auto;
} */

/* .app-button-primary {
  background-color: rgb(53, 73, 94);
  color: white;
}

.app-button-primary:hover {
  background: rgb(65, 184, 131);
  color: #fff;
  border: 1px solid #fff;
  box-shadow: 0 0 14px 1px rgba(0, 0, 0, 0.3);
}

.app-button-secondary {
  background: rgb(65, 184, 131);
  color: white;
}

.app-button-secondary:hover {
  background: rgb(53, 73, 94);
  color: #fff;
  border: 1px solid #fff;
  box-shadow: 0 0 14px 1px rgba(0, 0, 0, 0.3);
} */

@media screen and (max-width: 900px) {
}

@media screen and (max-width: 690px) {
}

@media screen and (max-width: 400px) {
  .card-container {
    /* flex-direction: column;
    flex-wrap: wrap; */
  }

  .content-wrapper {
    flex-direction: column;
  }

  .username-wrapper {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: auto;
  }

  h1.username,
  .home-page-btn {
    margin: 0.3rem 0;
  }

  .gallery-wrapper {
    /* justify-content: space-around;
    align-content: space-around;
    gap: 0.3rem; */
  }
}

@media screen and (max-width: 350px) {
}
</style>
