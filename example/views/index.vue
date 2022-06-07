<template>
  <CodeCompile 
    :schema="schema"
  ></CodeCompile>
</template>

<script>
import CodeCompile from './codeCompile.vue'
import props from '../../src/JsonProp';
import schemas from '../../src/JsonSchema';
import { input } from '../../src/JsonColumn';
import config from '../../src/config';


export default {
  components: { CodeCompile },
  computed: {

    schema(){
      return `schemas({
        
}, {
  format: 'form'
})`
    }

  },
  created() {
    console.info(this.schema.toString())
  },
  methods: {
      
  }
};
</script>

<style>
.app {
  
}
</style>
