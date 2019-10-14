/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
//     first suit RSS feeds definitions
    describe('RSS Feeds', function() {
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('feed has URL', function() {
            allFeeds.forEach(element => {
                expect(element.url).toBeTruthy();
            });
        });

        it('feed has name', function() {
            allFeeds.forEach(element => {
                expect(element.name).toBeDefined();
                expect(element.name.length).not.toBe(0);
            });
        });
    });
//  Suit related to the menu icon   
    describe('The menu', function() {
//         the menu is hidden by default
        it('Menu is hidden', function() {
            expect($('body').is('.menu-hidden')).toBe(true);
        });
         
        it('Menu toggles visibility on click', function() {
           let menu = $('.menu-icon-link');
           // first click, menu displays, class .menu-hidden is not there
           menu.click()
           expect($('body').hasClass('menu-hidden')).toBe(false);
           // second click, menu hides, class .menu-hidden appears
           menu.click()
           expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });
//     suit to test entries
    describe('Initial Entries', function(){
        //source of information https://jasmine.github.io/2.1/introduction.html
        beforeEach (function(done){
            // loadFeed function takes 2 parameters the index position and a callback function
            loadFeed(0, done);
        });

        it('There is at least an entry', function () {
            expect($('.feed .entry').length).not.toBe(0);
        });
    });

    /* suit to test a new feed is loaded */
    describe('New Feed Selection', function() {
        let firstFeed;
        beforeEach (function(done){
            //loading of first feed
            loadFeed(0, function (){
               firstFeed = $('.feed').html();
               loadFeed(1, done);
            });
        });

        it('Content of feed changes when new feed is loaded', function(done) {
            let newerFeed = $('.feed').html();
            expect(firstFeed).not.toEqual(newerFeed);
            // it is finished
            done();
        });
     });

}());
