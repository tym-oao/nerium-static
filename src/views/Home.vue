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
      title: 'Alpha Monthly Revenue, EU vs. Non-EU',
      message: 'Loading...',
      series: [],
      labels: [],
      data: {}
    }
  },
  methods: {
    populateChart() {
      // JSON data from Nerium http://nerium:8080/v1/alpha-eu-revenue-monthly-summary/
      fetch('./alpha-eu.json')
      .then(response => response.json())
      // Separate month_rev to series by EU/Non-EU
      .then(data => this.data = groupBy(data, month => month.european_union))
      .then(series => this.series = [
        series.EU.map(rev => rev.monthly_rev), 
        series['Non-EU'].map(rev => rev.monthly_rev)
        ]
      )
      // Set bar labels to months
      .then(() => this.labels = this.data.EU.map(month => month.month))
      // Provision Chartist stacked bar chart
      .then(() => {
        var data = { 
          labels: this.labels, 
          series: this.series 
          }
        var options = {
          axisX: { 
            labelInterpolationFnc: function(value) {
              return (value / 1000) + 'k' 
            }
          },
          axisY: { 
            labelInterpolationFnc: function(value) { 
              return moment(value).format('MMM YYYY') 
            }
          },
          horizontalBars: true,
          reverseData: true,
          stackBars: true,
        } 
        new Chartist.Bar('.ct-chart', data, options)
        })
      // Void the loading message
      .then(() => this.message = null)
    }
  },
  mounted () {
    this.populateChart()
  } 
}
</script>