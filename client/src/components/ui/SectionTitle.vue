<template>
  <div class="section-title">
    <h1 class="section-title-primary">{{ primary }}</h1>
    <h2 class="section-title-secondary">{{ secondary }}</h2>
  </div>
</template>

<script>
export default {
  props: {
    primary: String,
    secondary: String,
  },
};
</script>

<style lang="scss" scoped>
.section-title {
  top: 0;
  left: 0;
  width: 100vw;
  height: 600px;
  background-image:url('../../assets/section-title-background.jpg');
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  padding: 150px 0 110px;
  overflow: hidden;
  color: white;
  font-family: Rubik, Arial, sans-serif;
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
