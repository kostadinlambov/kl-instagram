<template>
  <article class="mt-5">
    <div class="container col-md-10 wrapper mt-5">
      <div class="title">People</div>
      <section class>
        <div>Section</div>
        <div v-for="user in users" :key="user.id">
          <div>{{user.firstName}} - {{user.lastName}} - {{user.role}}</div>
        </div>
      </section>
      <!-- <h1 class="text-center font-weight-bold mt-5">All Users</h1> -->
    </div>
  </article>
</template>

<script>
import { userRequester } from '@/mixins/requester';
import { userservice } from '@/infrastructure/userService';
import { userService } from '../../infrastructure/userService';


export default {
  name: "people",
  // components: {PeopleCard},
  data(){
    return{
      userId: userService.getUserId(),
      users: [],
    }
  },
  mixins: [userRequester],
  created(){
      this.userRequester.getAllUsers({id: this.userId})
      .then(res => {
         console.log(res)
        this.users = res.body;
       
      })
      .catch(err => {
        console.log(err)
      })
  }
};
</script>

<style>
.wrapper {
  margin: 0 auto;
  max-width: 600px;
  width: 100%;
  border: 1px solid red;
}

@media screen and (min-width: 640px) {
  .wrapper {
    padding-top: 60px;
    padding-bottom: 60px;
  }
}
</style>
