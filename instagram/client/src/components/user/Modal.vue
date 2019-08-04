<template>
<div class="modal-test">
    <div class="modal fade" id="testleModalId" tabindex="-1" role="dialog" aria-labelledby="testleModalIdTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                ...
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
            </div>
            </div>
        </div>
    </div>
</div>

<!-- <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
  Launch demo modal
</button> -->
</template>

<script>
export default {
    name: 'modal'

}
</script>

<style>

</style>
