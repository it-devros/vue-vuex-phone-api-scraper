<template>
  <div class="home-container">
    <b-container>
      <b-row>
        <b-col>
          <div class="m-3" v-if="errorText != ''">
            <span class="text-danger">{{ errorText }}</splan>
          </div>
          <div class="m-3">
            <label class="text-reader btn btn-info">
              Upload Phone List with CSV
              <input type="file" @change="loadTextFromFile">
            </label>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data () {
    return {
      resultText: '',
      errorText: ''
    }
  },
  methods: {
    loadTextFromFile (ev) {
      if (ev.target.files.length == 1) {
        const file = ev.target.files[0]
        const reader = new FileReader()
        reader.onload = e => {
          this.resultText = e.target.result
          console.log(e.target.result)
        }
        reader.readAsText(file)
      } else if (ev.target.files.length == 0) {
        this.errorText = 'No file selected'
      } else if (ev.target.files.length > 1) {
        this.errorText = 'So many files are selected'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .text-reader {
    position: relative;
    overflow: hidden;
    display: inline-block;
  }
  .text-reader input {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    opacity: 0;
  }
</style>
