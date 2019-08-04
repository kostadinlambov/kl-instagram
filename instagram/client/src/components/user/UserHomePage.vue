<template>
  <article class="mt-5">
    <section>
      <div class="container text-center col-md-10 pt-5">
        <h1 class="text-center font-weight-bold mt-5"> Hello {{username}}</h1>
        <h2 class="text-center font-weight-bold mt-5"> userId:  {{userId}}</h2>
        
      </div>
    </section>
  </article>
</template>

<script>
import { userService } from "../../infrastructure/userService";

export default {
    name: 'user-home-page',
    data(){
        return{
            username: this.$route.params.username,
            userId: userService.getUserId()
        }
    }
}
</script>

<style>

</style>
