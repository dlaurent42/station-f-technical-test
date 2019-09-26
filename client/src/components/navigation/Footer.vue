<template>
  <footer id="footer" v-if="isAuthenticated">
    This a footer
  </footer>
</template>

<script>
import { mapGetters } from 'vuex';
import * as types from '../../store/types/user';

export default {
  computed: {
    ...mapGetters({
      isAuthenticated: types.IS_AUTHENTICATED,
    }),
  },
};
</script>
