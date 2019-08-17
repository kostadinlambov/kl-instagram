<template>
  <div class="container">
    <div class="col-md-12">
      <div class="modal fade" id="follower-modal">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <div></div>
              <h1 v-if="followingModal">Following</h1>
              <h1 v-else>Followers</h1>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <People v-bind:wrapperPeople="wrapperClass" :followingModal="followingModal" />
            </div>
            <!-- <div class="modal-footer">
              <input class="btn btn-default" data-dismiss="modal" value="Close" />
            </div>-->
          </div>
        </div>

        <!-- <a href="#" data-toggle="modal" data-target="#follower-modal">Open Modal</a> -->
      </div>
    </div>
  </div>
</template>

<script>
import People from "../people/People";

export default {
  name: "follower-modal2",
  components: {
    People
  },
  props: {
    followingModal: {
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
