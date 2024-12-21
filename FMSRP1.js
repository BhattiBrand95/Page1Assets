 //Script to handle the survay 
    
 const mainButton = document.getElementById('mainButton');
 const overlay = document.getElementById('overlay');
 const videoIframe = document.getElementById('videoIframe');
 const retryModal = document.getElementById('retryModal');
 const retryButton = document.getElementById('retryButton');
 
 let taskCompleted = false;
 let taskStartTime;
 let buttonClicked = false;
 let countdownTime = 15; // Time required in seconds
 let countdownInterval;
 let remainingTime;
 const originalTitle = document.title;
 
 // Array of links to open sequentially
 const links = [
    'https://shorturl.at/zMqwJ',
   'https://tinyurl.com/FMRADLP1',
   'https://shorturl.at/j6CVl',
   'https://tinyurl.com/FMRADL2'
 ];
 
 let survaycurrentLinkIndex = 0; // Start with the first link
 
 // Function to update the document title with the remaining countdown time
 function updateTitleCountdown(time) {
   document.title = `Remaining Time: ${time} seconds`;
 }
 
 // Reset the title to its default state
 function resetTitle() {
   document.title = originalTitle;
 }
 
 // Function to handle countdown timer
 function startCountdown() {
   remainingTime = countdownTime;
   updateTitleCountdown(remainingTime);
 
   countdownInterval = setInterval(() => {
     remainingTime--;
     updateTitleCountdown(remainingTime);
 
     if (remainingTime <= 0) {
       clearInterval(countdownInterval);
       taskCompleted = true;
       overlay.style.display = 'none';
       videoIframe.style.display = 'block';
       resetTitle(); // Reset the title once task is complete
     }
   }, 1000);
 
   // Ensure the title resets after countdown completes
   setTimeout(() => {
     if (remainingTime <= 0) {
       resetTitle();
     }
   }, countdownTime * 1000 + 100); // Main a slight buffer for execution
 }
 
 mainButton.addEventListener('click', (event) => {
   event.preventDefault(); // Prevent the page from navigating away
   taskStartTime = new Date().getTime();
   buttonClicked = true; // Mark that the button has been clicked
 
   // Reset variables for a fresh task attempt
   clearInterval(countdownInterval); // Clear any previous countdown
   resetTitle();
   remainingTime = countdownTime;
 
   // Open the current link in a new tab
   if (links.length > 0) {
     window.open(links[survaycurrentLinkIndex], '_blank');
     survaycurrentLinkIndex = (survaycurrentLinkIndex + 1) % links.length; // Move to the next link, cycle back if needed
   } else {
     console.error("No links available in the array.");
   }
 });
 
 // Check when the user refocuses on the page
 window.addEventListener('focus', () => {
   if (buttonClicked && !taskCompleted) {
     clearInterval(countdownInterval); // Stop the countdown when user returns
 
     // If the user comes back before completing the countdown
     if (remainingTime > 0) {
       document.title = "Start Over Again"; // Indicate to the user that they need to retry
       retryModal.style.display = 'block'; // Show the retry modal
       buttonClicked = false; // Reset button clicked state
     }
   }
 });
 
 // Detect when the user leaves the page
 window.addEventListener('blur', () => {
   if (buttonClicked && !taskCompleted) {
     // Start the countdown when the user leaves the page
     startCountdown();
   }
 });
 
 // Retry button functionality
 retryButton.addEventListener('click', () => {
   retryModal.style.display = 'none'; // Hide the modal
   buttonClicked = false; // Ensure the button must be clicked again to start the task
   resetTitle(); // Reset the title when retrying
 });
 
 document.addEventListener('DOMContentLoaded', () => {
   // Ad close button functionality remains the same
   const adCloseButtons = document.querySelectorAll('.ad-close');
   adCloseButtons.forEach(button => {
     button.addEventListener('click', () => {
       button.parentElement.style.display = 'none';
     });
   });
 });
 
 
 
 
 
 // Script to handle links clicks 
 
 
 // Central links database with multiple links per key
 
 const websiteLinks = {
   'EngImg': [
     'https://tinyurl.com/FMRADLP1',
     'https://shorturl.at/zMqwJ',
     'https://tinyurl.com/FMRADL2',
     'https://shorturl.at/j6CVl'
   ],
 
   'HindiImg': [
     'https://shorturl.at/j6CVl',
     'https://tinyurl.com/FMRADL2',
     'https://shorturl.at/zMqwJ',
     'https://tinyurl.com/FMRADLP1'
   ],
   // You can add more keys with arrays of links
 };
 
 // Track the current link index for each link key
 const currentLinkIndex = {};
 
 // Function to update links dynamically with cycling
 function updateLinksWithCycle(linkKey, element) {
   // Initialize index for this link key if not already tracked
   if (!currentLinkIndex[linkKey]) {
     currentLinkIndex[linkKey] = 0;
   }
 
   // Get the array of links for this key
   const links = websiteLinks[linkKey];
 
   if (links && links.length > 0) {
     // Get the current link and update the href
     const currentLink = links[currentLinkIndex[linkKey]];
     element.href = currentLink;
 
     // Increment index, looping back to 0 if at the end
     currentLinkIndex[linkKey] = (currentLinkIndex[linkKey] + 1) % links.length;
   }
 }
 
 // Function to add click event listeners to elements
 function addLinkCycleListeners() {
   const elementsToUpdate = document.querySelectorAll('[data-link-key]');
 
   elementsToUpdate.forEach(element => {
     const linkKey = element.getAttribute('data-link-key');
 
     // Initial link setup
     if (websiteLinks[linkKey]) {
       element.href = websiteLinks[linkKey][0];
 
       // Add click event listener to cycle through links
       element.addEventListener('click', (e) => {
         // Prevent default link behavior if you want to control cycling
         // e.preventDefault();
 
         updateLinksWithCycle(linkKey, element);
       });
     }
   });
 }
 
 // Call the function when page loads
 document.addEventListener('DOMContentLoaded', addLinkCycleListeners);
 
 
 
 
 // Inspect Disable Sciplt 
 
 // Disable Right-Click
 document.addEventListener('contextmenu', function (e) {
     e.preventDefault();
   });
   
   // Disable Keyboard Shortcuts
   document.addEventListener('keydown', function (e) {
     // Disable F12
     if (e.key === "F12") {
       e.preventDefault();
     }
     // Disable Ctrl+Shift+I (Inspect), Ctrl+Shift+J (Console)
     if (e.ctrlKey && e.shiftKey && ['I', 'J'].includes(e.key)) {
       e.preventDefault();
     }
     // Disable Ctrl+U (View Source)
     if (e.ctrlKey && e.key === 'u') {
       e.preventDefault();
     }
     // Disable Ctrl+S (Save Page)
     if (e.ctrlKey && e.key === 's') {
       e.preventDefault();
     }
     // Disable Ctrl+Shift+C (Inspect Element in some browsers)
     if (e.ctrlKey && e.shiftKey && e.key === 'C') {
       e.preventDefault();
     }
   });
   
   // Freeze DevTools with Silent Debugger
   (function () {
     setInterval(() => {
       debugger;
     }, 50);
   })();
   
   // Optional: Remove the "Inspect" option when right-clicked (some browsers show inspect on the menu)
   document.addEventListener("mousedown", function (e) {
     if (e.button === 2) { // Right-click
       e.preventDefault();
     }
   });
   
   // Prevent copying of page content
   document.addEventListener('copy', function (e) {
     e.preventDefault();
   });
   
   // Prevent selection of text
   document.addEventListener('selectstart', function (e) {
     e.preventDefault();
   });
   
   // Additional protection against developer tools
   (function () {
     const check = function () {
       function detector() { }
       Object.defineProperty(detector, 'toString', {
         get() {
           this.opened = true;
           return 'noDevTools';
         }
       });
       console.log(detector);
     };
   
     try {
       check();
     } catch (err) { }
   })();
 