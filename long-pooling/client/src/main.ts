import { createApp } from 'vue';
import main from './app.vue';

const el = document.createElement('div');
createApp(main).mount(document.body.appendChild(el));
