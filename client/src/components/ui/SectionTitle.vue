<template>
  <div class="section-title" :style="{ backgroundImage: getBackgroundUrl() }">
    <h1 class="section-title-primary">{{ primary }}</h1>
    <h2 class="section-title-secondary">{{ secondary }}</h2>
  </div>
</template>

<script>
export default {
  data: () => ({
    images: [
      'http://trials.vevs.website/web-demo/meeting-room-booking-website/app/web/upload/medium/dummy-314-1568044665.jpg',
      'http://trials.vevs.website/web-demo/meeting-room-booking-website/app/web/upload/medium/dummy-315-1568044665.jpg',
      'http://trials.vevs.website/web-demo/meeting-room-booking-website/app/web/upload/medium/dummy-316-1568044665.jpg',
      'https://www.vevs.com/images/meeting-room-booking-website-builder-demo.jpg',
      'http://trials.vevs.website/web-demo/meeting-room-booking-website/app/web/upload/medium/dummy-274-1568044665.jpg',
    ],
  }),
  props: {
    primary: String,
    secondary: String,
  },
  methods: {
    getBackgroundUrl() {
      // This method return a random image based on 'images' array
      // 4th image already has an overlay so no overlay is added for it
      const index = Math.floor(Math.random() * this.images.length);
      return (index === 3)
        ? `url(${this.images[Math.floor(Math.random() * this.images.length)]})`
        : `linear-gradient(0deg,rgba(24,25,24,0.8),rgba(24,25,24,0.8)), url(${this.images[Math.floor(Math.random() * this.images.length)]})`;
    },
  },
};
</script>

<style lang="scss" scoped>
.section-title {
  top: 0;
  left: 0;
  width: 100vw;
  height: 600px;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  padding: 150px 0 110px;
  overflow: hidden;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;


  & .section-title-primary {
    line-height: 1.4;
    margin-bottom: 30px;
    font-weight: 500;
    font-size: 78px;
    letter-spacing: 1px;
    text-shadow: 2px 2px 5px rgb(50,50,50);
  }
  & .section-title-secondary {
    font-size: 30px;
    line-height: 1.4em;
    font-weight: 300;
    margin-bottom: 55px;
    letter-spacing: 1px;
    text-shadow: 2px 2px 5px rgb(50,50,50);
  }

  @media (max-width: 768px) {

    padding: 0 30px;
    & .section-title-primary {
      font-size: 48px;
    }
    & .section-title-secondary {
      font-size: 24px;
    }
  }
}
</style>
