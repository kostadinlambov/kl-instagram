<template>
  <main class="mt-5 pb-5">
    <div class="container text-center post-wrapper col-md-5 mt-5">
      <div class="container">
        <h1 class>Create Post</h1>

        <form class="post-form-container" @submit.prevent="onSubmitHandler">
          <div class="form-group text-left">
            <label for="caption">Caption</label>
            <textarea
              rows="3"
              v-model.trim="$v.caption.$model"
              v-bind:class="['form-control', {'error': $v.caption.$error}]"
              id="caption"
              aria-describedby="captionHelp"
              placeholder="Write a caption..."
            />
            <small
              v-if="!$v.caption.required && $v.caption.$dirty"
              id="captionHelp"
              class="form-text alert alert-danger"
            >Caption is required!</small>
          </div>

          <div class="form-group text-left">
            <label for="location">Location</label>
            <input
              type="text"
              v-model.trim="$v.location.$model"
              v-bind:class="['form-control', {'error': $v.location.$error}]"
              id="location"
              placeholder="Add Location..."
            />
            <small
              v-if="!$v.location.required && $v.location.$dirty"
              id="locationHelp"
              class="form-text alert alert-danger"
            >Location is required!</small>
          </div>

          <div class="form-group text-left image-wrapper">
            <label class="form-control-label post-image-label" for="postImage">Image</label>

            <!-- <img :src="defaultImg" alt="post-image" :style="styleImg" class="post-image" /> -->
            <div class="image-container">
              <img class="gallery-img post-image" :style="styleImg" :src="defaultImg" alt />
            </div>

            <input
              class="form-control"
              id="postImage"
              type="file"
              accept="img/*"
              :style="{'display': 'none'}"
              ref="fileInput"
              @change="onFileSelected"
            />

            <button
              type="button"
              class="btn app-button-secondary post-image-btn"
              @click="$refs.fileInput.click()"
            >Pick File</button>

            <small
              v-if="!$v.postImage.required && $v.postImage.$dirty"
              id="postImageHelp"
              class="form-text alert alert-danger"
            >Image is required!</small>
          </div>

          <button
            :disabled="$v.$invalid"
            type="submit"
            class="btn btn-lg app-button-primary m-3"
          >Create Post</button>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import defaultImg from "../../assets/images/noImage.jpg";
import { mapGetters, mapActions } from "vuex";
import { userService } from "@/infrastructure/userService";

export default {
  name: "create-post",
  data: function() {
    return {
      caption: "",
      location: "",
      postImage: null,
      styleImg: {
        // width: "250px",
        // height: "200px"
      },
      defaultImg
    };
  },
  computed: {
    ...mapGetters("auth", {
      loggedInUser: "getLoggedInUserData"
    })
  },
  validations: {
    caption: {
      required
    },
    location: {
      required
    },
    postImage: {
      required
    }
  },
  methods: {
    ...mapActions("post", ["createPost"]),

    onFileSelected(event) {
      this.postImage = event.target.files[0];

      const reader = new FileReader();
      reader.onload = event1 => {
        this.defaultImg = event1.target.result;
      };

      reader.readAsDataURL(this.postImage);
    },

    onSubmitHandler() {
      if (this.$v.$invalid) {
        return;
      }

      if (!this.postImage) {
        Vue.$toast.open({
          message: "Please upload a file.",
          type: "error"
        });

        return;
      }

      if (this.postImage.size >= 200000) {
        Vue.$toast.open({
          message: "File size exceeds limit of 2MB.",
          type: "error"
        });

        return;
      }

      let data = new FormData();

      data.append("file", this.postImage);
      data.append("loggedInUserId", this.loggedInUser.id);
      data.append("caption", this.caption);
      data.append("location", this.location);

      this.createPost(data);
    }
  }
};
</script>

<style scoped>
.post-wrapper {
  margin-top: 4rem;
  width: 50%;
  margin: 5rem auto;
  border-radius: 5px;
  box-shadow: 0 0 14px 1px rgba(0, 0, 0, 0.3);
  background: white;
  padding: 2rem 1rem;
}

.form-group {
  position: relative;
  margin-bottom: 2.8rem;
}

.alert {
  position: absolute;
  width: 100%;
  padding: 0.5rem 0.75rem;
}

.image-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
img {
  border: 1px solid #ddd;
}

.image-container {
  width: 293px;
  height: 250px;
  /* width: 280px; */
  /* height: 100%;
  width: 100%; */
  overflow: hidden;

  margin: auto;
  position: relative;

  box-shadow: 0px 0px 12px 2px rgba(65, 184, 131, 0.3);

  transition: transform 1.5s;
}

.image-container:after {
  display: block;
  content: "";
  padding-top: 100%;
}

.image-container:hover {
  /* transform: scale(1.1); */
  /* box-shadow: 0px 0px 12px 2px rgba(65, 184, 131, 0.8); */
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

img.gallery-img.l {
  position: absolute;
  display: block;
  width: auto;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.post-image-label,
.post-image,
.image-container {
  margin-bottom: 1rem;
}

.app-button-primary {
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
}

@media screen and (max-width: 400px) {
  .post-wrapper {
    margin-top: 4rem;
    width: 100%;
    margin: 5rem auto 0;
    border-radius: 5px;
    padding: 2rem 0;
    /* .username-wrapper {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: auto;
  } */
  }

  .image-container {
    width: 100%;
    height: auto;
  }
}

@media screen and (max-width: 350px) {
}
</style>