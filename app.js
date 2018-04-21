// app.js
// see: https://scotch.io/tutorials/build-an-app-with-vue-js-a-lightweight-alternative-to-angularjs
var app = new Vue({
    // We want to target the div with an id of 'events'
      el: '#events',
      
      // This is where you can store data to be rendered within the application using vue magic
      data: {
          event: { name: '', description: '', date: ''},
          events: []
      },

      // Once the document loads, do this stuff
      created: function() {
          this.fetchEvents();     
          
      },

      // Register methods to used in within the rendering of the application (see above vue magic explanation)
      methods: {
          deleteEvent: function(index) {
            if(confirm("Are you sure you want to delete this event?")) {

                this.events.splice(index,1);
            }
          },
          fetchEvents: function() {
              var events = 
              [
                  
                {
                      
                    id: 1,
                    name: '.gabeCON',
                    description: 'Become a master of programming in 5 minutes.',
                    date: '4-20-2018'
                },
                {
                    id: 2,
                    name: 'Dan Burke\'s Q&A',
                    description: 'Meet and greet with Dan Burke, doer of all, master of none. Free autographs.',
                    date: '4-22-2018'
                },
                {
                    id: 3,
                    name: 'KatiCup Finals',
                    description: 'Kati and Gabriel face off in the final game of winners bracket of the Sarcasm Tournament 2018. Who will win? Probably not the current constituents in running for re-election in this year\'s Congressionals.',
                    date: '5-18-2018'
                }
              ];
              this.events = events.slice();
            },

        // Adds an event to the existing events array
        addEvent: function() {
            if(this.event.name) {
                this.events.push(this.event);
                this.event = { name: '', description: '', date: '' };
            }
      }
    }
    });
    Vue.component('button-counter', {
        data: function () {
          return {
            count: 0
          }
        },
        template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
      });