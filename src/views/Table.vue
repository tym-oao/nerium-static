<template>
  <main class="main">
    <section class="section">
        <div class="columns is-centered">
          <div class="column">
            <h1 class="title">{{ title }}</h1>
            <div class="ct-chart ct-golden-section">
              {{ message }}
            </div>
            <div class="section">
              <p class="has-text-right">
                <button type="button" class="button is-normal is-link" @click="$auth.logout()">Logout</button>
              </p>
            </div>
          </div>
        </div>
    </section>
  </main>
</template>

<script>
import Chartist from 'chartist'
import groupBy from 'lodash.groupby'
import moment from 'moment'

export default {
  data() {
    return {
      title: 'Nerium-Static table example',
      message: 'Loading...',
      series: [],
      labels: [],
      data: {}
    }
  },
  methods: {
    populateTable() {
      // Void the loading message
      .then(() => this.message = null)
    }
  },
  mounted () {
    this.populateTable()
  } 
}
</script>