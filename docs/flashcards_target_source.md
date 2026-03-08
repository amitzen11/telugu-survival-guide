---
title: Telugu to English Flashcards
hide:
  - toc
---

<script type="module" src="https://js.withorbit.com/orbit-web-component.js"></script>
<script>
// Logic to show one review area at a time and unlock the starter badge
document.addEventListener('DOMContentLoaded', () => {
    const areas = document.querySelectorAll('orbit-reviewarea');
    areas.forEach((area, index) => {
        if (index > 0) area.style.display = 'none';
        
        area.addEventListener('orbit-review-completed', () => {
             if (areas[index + 1]) {
                 areas[index + 1].style.display = 'block';
             }
        });
    });
});
</script>

# Telugu → English

## Group 1: Greetings & Basics

<orbit-reviewarea color="orange">
    <orbit-prompt answer="How do you say 'Hello' (formal) in Telugu?" question="What does 'Namaskaaram' mean?"></orbit-prompt>
    <orbit-prompt answer="How do you say 'How are you?'" question="What does 'Baagunnaara?' mean?"></orbit-prompt>
    <orbit-prompt answer="How do you say 'I am fine'?" question="What does 'Baagunnaanu' mean?"></orbit-prompt>
    <orbit-prompt answer="How do you say 'What is your name?'" question="What does 'Mee peru enti?' mean?"></orbit-prompt>
    <orbit-prompt answer="How do you say 'Please come'?" question="What does 'Randi' mean?"></orbit-prompt>
</orbit-reviewarea>

## Group 2: Survival & Clarity

<orbit-reviewarea color="orange">
    <orbit-prompt answer="How do you say 'I want' / 'I need'?" question="What does 'Naaku kaavaali' mean?"></orbit-prompt>
    <orbit-prompt answer="How do you say 'I don't want'?" question="What does 'Vaddhu' mean?"></orbit-prompt>
    <orbit-prompt answer="How do you say 'I don't know'?" question="What does 'Naaku teliyadu' mean?"></orbit-prompt>
    <orbit-prompt answer="How do you say 'I didn't understand'?" question="What does 'Naaku ardham kaaledu' mean?"></orbit-prompt>
    <orbit-prompt answer="If a shopkeeper asks 'Anything else?', how do you say 'Enough' (Bas)?" question="What does 'Chaalu' mean?"></orbit-prompt>
</orbit-reviewarea>

## Group 3: Real Estate & Brokering

<orbit-reviewarea color="orange">
    <orbit-prompt answer="What is the Telugu word for 'House'?" question="What does 'Illu' mean?"></orbit-prompt>
    <orbit-prompt answer="What is the Telugu word for 'Rent'?" question="What does 'Adde' mean?"></orbit-prompt>
    <orbit-prompt answer="How do you ask 'How much is the rent'?" question="What does 'Adde entha?' mean?"></orbit-prompt>
    <orbit-prompt answer="What is the Telugu word for 'Landlord' or 'Owner'?" question="What does 'Yajamaani' mean?"></orbit-prompt>
    <orbit-prompt answer="How do you say 'Please do the repair'?" question="What does 'Repair cheyyandi' mean?"></orbit-prompt>
</orbit-reviewarea>

## Group 4: Grocery Shopping (Vegetables)

<orbit-reviewarea color="orange">
    <orbit-prompt answer="What is the Telugu word for 'Potato'?" question="What does 'Bangala dumpa' mean?"></orbit-prompt>
    <orbit-prompt answer="What is the Telugu word for 'Onion'?" question="What does 'Yerragadda / Ullipaaya' mean?"></orbit-prompt>
    <orbit-prompt answer="What is the Telugu word for 'Tomato'?" question="What does 'Tamota' mean?"></orbit-prompt>
    <orbit-prompt answer="What is the Telugu word for 'Green Chilli'?" question="What does 'Pachimirapa' mean?"></orbit-prompt>
    <orbit-prompt answer="What is the Telugu word for 'Ladies Finger' (Bhindi)?" question="What does 'Bendakaya' mean?"></orbit-prompt>
</orbit-reviewarea>

## Group 5: Local Slang & Culture

<orbit-reviewarea color="#F5E6CC">
    <orbit-prompt answer="What Hyderabadi slang word means 'Bro' or 'Friend'?" question="What does 'Mama' mean in street slang?"></orbit-prompt>
    <orbit-prompt answer="What Hyderabadi slang word means 'Awesome' or 'Fantastic'?" question="What does 'Kiraak' mean?"></orbit-prompt>
    <orbit-prompt answer="What does 'Light teesko' mean?" question="What does 'Lite teesko' mean?"></orbit-prompt>
    <orbit-prompt answer="In local Dakhini slang, how do you say 'No' or 'Don't'?" question="What does 'Nakko' mean?"></orbit-prompt>
    <orbit-prompt answer="What does 'Baigan' literally translate to, and what does it mean in slang?" question="What does 'Baigan' literally mean, and what is its slang usage?"></orbit-prompt>
</orbit-reviewarea>
