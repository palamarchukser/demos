<template>
  <div :class="$style.component">
    <social-static />

    <h1>Long pooling Demo</h1>

    <div :class="$style.messages">
      <div
        v-for="message in messages"
        :key="message.id"
        :class="[
          $style.message,
          {[$style.self]: username === message.username}
        ]">
        <div :class="$style.username">
          {{ message.username }}
        </div>

        <div :class="$style.text">
          {{ message.body }}
        </div>
      </div>
    </div>

    <div :class="$style.controls">
      <input
        v-model="username"
        placeholder="Name"
        type="text"
        :class="[$style.input, $style['username-input']]">

      <input
        v-model="message"
        type="text"
        placeholder="Write a message"
        :class="[$style.input, $style['message-input']]">

      <button
        type="button"
        :class="$style.submit"
        :disabled="isDisabled"
        @click="onClick">
        Send
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import type { Ref } from 'vue';
import { defineComponent, computed, ref, watch } from 'vue';
import axios from 'axios';
import SocialStatic from './components/social-static.vue';

interface Message {
  id: string;
  body: string;
  username: string;
}

export default defineComponent({
  name: 'App',
  components: {
    SocialStatic,
  },
  setup() {
    const message = ref('');
    const username = ref('');
    const messages: Ref<Message[]> = ref([]);
    const isDisabled = computed(() =>
      (username.value && username.value.trim() === '') &&
      (message.value && message.value.trim() === ''));

    const subscribe = async() => {
      try {
        const { data }: { data: Message } = await axios.get('http://localhost:5000/get');
        messages.value.push(data);
        message.value = '';

        await subscribe();
      } catch (e) {
        setTimeout(() => {
          subscribe();
        }, 1000);
      }
    };

    watch(() => messages, () => {
      subscribe();
    }, { immediate: true });

    const onClick = async() => {
      await axios.post('http://localhost:5000/add', {
        id: Date.now(),
        body: message.value,
        username: username.value,
      });
    };

    return {
      isDisabled,
      onClick,
      messages,
      message,
      username,
    };
  },
});
</script>

<style lang="scss" module>
.component{
  display: flex;
  flex-direction: column;
  max-width: 50rem;
  padding: 1rem;
  margin: 0 auto;
}

.input {
  border: .2rem solid #eee;
  border-top: none;
  min-height: 2rem;
  padding: 1rem;
}

.username {
  font-weight: 600;
}

.text {
  font-size: 1.2rem;
}

.message {
  background: #eee;
  border-radius: .4rem;
  display: flex;
  flex-direction: column;
  gap: .7rem;
  margin: 0 auto 0 0;
  padding: .7rem 1.2rem;

  &.self {
    margin: 0 0 0 auto;
  }
}

.messages {
  border: .2rem solid #eee;
  border-radius: .3rem;
  flex-direction: column;
  display: flex;
  justify-content: end;
  gap: .7rem;
  min-height: 50vh;
  padding: 1rem;
  width: 100%;
}

.controls {
  display: flex;
}

.message-input {
  flex-basis: 40rem;
  border-left: none;
  border-right: none;
}

.username-input {
  flex-basis: 5rem;
  max-width: 10rem;
}

.submit {
  background: #eee;
  border: none;
  cursor: pointer;
  flex-basis: 5rem;
  max-width: 5rem;

  &[disabled] {
    cursor: not-allowed;
    opacity: .7;
  }

  &:hover {
    background: #e3e3e3;
  }
}

:global {
  * {
    box-sizing: border-box;
    outline: none;
  }

  html {
    font-size: 62.5%;
  }

  body {
    background-color: var(--gray-1);
    margin: 0;
    padding: 1.5rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    font-size: 1.4rem;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1 {
    text-align: center;
    margin: 1rem;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
  }
}
</style>
