<template>
    <div class="notification-container" >
        <notification-bar 
            v-for="notification in notifications" 
            :key="notification.id"
            :notification="notification"
        />
    </div>
</template>

<script>
import NotificationBar from './NotificationBar';
import { mapState } from 'vuex';
    export default {
        components:{
            NotificationBar,
        },
        computed:{
            ...mapState({
                notifications: state => state.notification.notifications
            })
        }
    }
</script>

<style lang="scss" scoped>
.notification-container {
    position: fixed;
    bottom: 0;
    right:0
 }
</style>