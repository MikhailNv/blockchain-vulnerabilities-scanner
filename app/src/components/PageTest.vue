<template>
    <div id="wrapper">
      <div class="input_row">
        <input type="text" class="input_text" id="shell" v-model="shell_command" />
        <label class="label_" for="shell">Type Shell Command</label>
      </div>
      <button type="button" class="button">Submit !</button>
    </div>
  </template>
  
  <script>
  // import { exec } from "child_process";
  
  // export default {
  //   name: "ShellExec",
  //   components: {},
  //   data() {
  //     return {
  //       shell_command: ""
  //     };
  //   },
  //   methods: {
  //     async shell() {
  //       return new Promise((resolve, reject) => {
  //         exec(this.shell_command, (err, stdout, stderr) => {
  //           if (err) {
  //             reject(err);
  //           } else {
  //             resolve({ stdout, stderr });
  //           }
  //         });
  //       });
  //     },
  
  //     async shellExec() {
  //       let { stdout } = await this.shell();
  //       for (let line of stdout.split("\n")) {
  //         console.log(`ls: ${line}`);
  //       }
  //     }
  //   }
  // };
  </script>
  
  <style scoped>
  </style>