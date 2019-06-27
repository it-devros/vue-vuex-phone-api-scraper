<template>
  <div class="home-container">
    <b-container>
      <b-row>
        <b-col>
          <div class="m-3" v-if="errorText != ''">
            <span class="text-danger">{{ errorText }}</span>
          </div>
          <div class="m-3 d-flex align-items-center justify-content-center">
            <label class="text-reader btn btn-info mr-3 mb-0">
              Upload Phone List with CSV
              <input type="file" @change="loadTextFromFile">
            </label>
            <b-button class="m-0" @click="getDataFromAPI" variant="info">Get the User Data</b-button>
            <JsonCSV
              :data="scrapedData"
              class="ml-3 btn btn-info"
            >
              Download Data
            </JsonCSV>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div class="bb-2">
            <h4>Input Data</h4>
          </div>
          <div class="m-3" v-if="phone_results.length > 0">
            <b-table :items="phone_results" :fields="phone_fields"></b-table>
          </div>
          <div class="m-3" v-if="phone_results.length == 0">
            <span class="text-danger">No data</span>
          </div>
        </b-col>
        <b-col>
          <div class="bb-2">
            <h4>Result Data</h4>
          </div>
          <div class="m-3" v-if="scrapedData.length > 0 && is_scraped == true">
            <b-table :items="scrapedData" :fields="scraped_fields"></b-table>
          </div>
          <div class="m-3" v-if="scrapedData.length == 0">
            <span class="text-danger">No data</span>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Papa from 'papaparse'
import JsonCSV from 'vue-json-csv'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: {
    JsonCSV
  },
  data () {
    return {
      phone_fields: ['phone', 'country_code'],
      scraped_fields: [
        'carrier',
        'country_calling_code',
        'country_code',
        'country_name',
        'is_prepaid',
        'is_valid',
        'line_type',
        'phone_number'
      ],
      phone_results: [],
      errorText: '',
      is_scraped: false
    }
  },
  computed: {
    ...mapGetters('home', {
      scrapedData: 'getScrapedData'
    })
  },
  methods: {
    ...mapActions('home', {
      getDataFromPhoneAPI: 'getDataFromPhoneAPI'
    }),
    loadTextFromFile (ev) {
      this.is_scraped = false
      this.errorText = ''
      if (ev.target.files.length === 1) {
        const file = ev.target.files[0]
        const reader = new FileReader()
        reader.onload = e => {
          let temp = Papa.parse(e.target.result)
          let data = []
          temp.data.map((item, index) => {
            if (index !== 0) {
              if (item.length > 1) {
                data.push({
                  phone: item[0],
                  country_code: item[1]
                })
              }
            }
          })
          this.phone_results = data
        }
        reader.readAsText(file)
      } else if (ev.target.files.length === 0) {
        this.errorText = 'No file selected'
      } else if (ev.target.files.length > 1) {
        this.errorText = 'So many files are selected'
      }
    },
    getDataFromAPI () {
      this.is_scraped = true
      this.errorText = ''
      if (this.phone_results.length === 0) {
        this.errorText = 'No Phone data. please upload phone data.'
      } else {
        this.phone_results.map((item, index) => {
          setTimeout(() => {
            this.getDataFromPhoneAPI(item).catch(err => {
              console.log(err)
            })
          }, 300 * index)
        })
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
  .bb-2 {
    border-bottom: 2px solid #000;
  }
</style>
