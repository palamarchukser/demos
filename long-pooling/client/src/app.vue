<template>
  <header />

  <main>
    <div
      v-for="message in messages"
      :key="message.id"
      :class="$style['message']"
      v-text="message.value" />
  </main>

  <footer>
    <input
      type="text"
      :value="value"
      @change="onChange($event.target.value)">

    <button
      type="button"
      @click="onClick">
      Send
    </button>
  </footer>
</template>

<script lang="ts">
import type { Ref } from 'vue';
import { defineComponent, ref, watch } from 'vue';
import axios from 'axios';

interface Message {
  id: string;
  value: string;
}

export default defineComponent({
  name: 'App',
  setup() {
    const input = ref(null);
    const messages: Ref<Message[]> = ref([]);
    const value = ref('');

    const subscribe = async() => {
      try {
        const { data }: { data: Message } = await axios.get('http://localhost:3000/get');
        messages.value.push(data);

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

    function onChange(val: string) {
      value.value = val;
    }

    const onClick = async() => {
      await axios.post('http://localhost:3000/add', {
        id: Date.now(),
        value: value.value,
      });
    };

    return {
      input,
      onChange,
      onClick,
      messages,
      value,
    };
  },
});
</script>

<style lang="scss" module>
:global {
  header {
    display: flex;
  }

  main {
    display: flex;
  }

  footer {
    display: flex;
  }
}
</style>
