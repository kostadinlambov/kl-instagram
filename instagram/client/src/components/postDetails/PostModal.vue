<template>
  <div class="container">
    <div class="col-md-12">
      <div class="modal fade" id="post-modal">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <div></div>
              <h1>Hello from Modal</h1>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <post-details > </post-details>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PostDeatils from "./PostDeatils";

export default {
  name: "post-modal",
  components: {
    PostDeatils
  },
  props: {
    followingModal: {
      type: Boolean,
    },
     followerModal: {
      type: Boolean,
    }
  },
  data() {
    return {
      wrapperClass: {
        padding: 0,
        margin: 0
      },
      // followerModal: true
    };
  }
};
</script>

<style scoped>
.modal-content {
  min-height: 200px;
  max-height: 400px;
  border-radius: 10px;
  /* overflow: auto; */
}

.modal-header {
  padding: 1rem;
}

h1 {
  padding: 0;
  margin: 0 auto;
  font-size: 1.5rem;
}

.modal-header .close {
  padding: 1rem 1rem;
  margin: -1rem -1rem -1rem;
}

.modal-body {
  /* height: 200px; */
  /* overflow: auto; */
  min-height: 200px;
  overflow-y: scroll;
}

.wrapper {
  padding: 0;
  margin: 0 !important;
}
</style>
