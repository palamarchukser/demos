<template>
  <div :class="$style['card-container']">
    <a
      :class="$style['circle-link']"
      title="palamarchukser"
      href="https://github.com/palamarchukser"
      target="_blank"
      rel="noopener">
      <svg
        width="22"
        height="22"
        viewBox="0 0 1024 1024"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4
          14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44
          13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66
          5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22
          3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01
          12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
          transform="scale(64)"
          fill="#1B1F23" />
      </svg>
    </a>

    <a
      :class="$style['circle-link']"
      title="palamarchukser"
      href="https://www.linkedin.com/in/palamarchuk-serhii/"
      target="_blank"
      rel="noopener">
      <svg
        width="24"
        height="24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 291.319 291.319">
        <g>
          <path
            style="fill:#0E76A8;"
            d="M145.659,0c80.45,0,145.66,65.219,145.66,145.66s-65.21,145.659-145.66,145.659S0,226.1,0,145.66 S65.21,0,145.659,0z" />

          <path
            style="fill:#FFFFFF;"
            d="M82.079,200.136h27.275v-90.91H82.079V200.136z M188.338,106.077 c-13.237,0-25.081,4.834-33.483,
            15.504v-12.654H127.48v91.21h27.375v-49.324c0-10.424,9.55-20.593,21.512-20.593 s14.912,10.169,
            14.912,20.338v49.57h27.275v-51.6C218.553,112.686,201.584,106.077,188.338,106.077z M95.589,100.141
            c7.538,0,13.656-6.118,13.656-13.656S103.127,72.83,95.589,72.83s-13.656,6.118-13.656,13.656S88.051,100.141,95.589,100.141z" />
        </g>
      </svg>
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SocialStatic',
});
</script>

<style lang="scss" module>
.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 16px;
}

.circle-link {
  align-items: center;
  background-color: white;
  border: .1rem solid var(--border);
  border-radius: 4rem;
  box-shadow: 0 .1rem .3rem rgba(0, 0, 0, .12), 0 .1rem .2rem rgba(0, 0, 0, .24);
  cursor: pointer;
  display: flex;
  height: 4rem;
  justify-content: center;
  margin: .8rem;
  transition: 1s ease-out;
  width: 4rem;

  &:hover {
    box-shadow: 0 .3rem 1.5rem rgba(0, 0, 0, .2);
    transform: translateY(-.25rem);
  }
}
</style>
