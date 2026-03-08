---
title: English to Telugu Flashcards
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
        
        // Show next area when this one is done
        area.addEventListener('orbit-review-completed', () => {
             if (areas[index + 1]) {
                 areas[index + 1].style.display = 'block';
             }
        });
    });

    // Badge hook
    const observer = new MutationObserver(() => {
        if (window.unlockBadge) {
            window.unlockBadge('flashcard_starter');
            observer.disconnect();
        }
    });
    
    if (areas.length > 0) {
        observer.observe(areas[0], { attributes: true, childList: true, subtree: true });
    }
});
</script>

# English → Telugu

## Group 1: Greetings & Basics

<orbit-reviewarea color="orange">
    <orbit-prompt question="How do you say 'Hello' (formal) in Telugu?" answer="Namaskaaram ⟨Na-mas-kaa-ram⟩"></orbit-prompt>
    <orbit-prompt question="How do you say 'How are you?'" answer="Baagunnaara? ⟨Baa-gun-naa-ra?⟩"></orbit-prompt>
    <orbit-prompt question="How do you say 'I am fine'?" answer="Baagunnaanu ⟨Baa-gun-naa-nu⟩"></orbit-prompt>
    <orbit-prompt question="How do you say 'What is your name?'" answer="Mee peru enti? ⟨Mee pay-ru en-ti?⟩"></orbit-prompt>
    <orbit-prompt question="How do you say 'Please come'?" answer="Randi ⟨Ran-di⟩"></orbit-prompt>
</orbit-reviewarea>

## Group 2: Survival & Clarity

<orbit-reviewarea color="orange">
    <orbit-prompt question="How do you say 'I want' / 'I need'?" answer="Naaku kaavaali ⟨Naa-ku kaa-vaa-li⟩"></orbit-prompt>
    <orbit-prompt question="How do you say 'I don't want'?" answer="Vaddhu ⟨Vad-dhu⟩"></orbit-prompt>
    <orbit-prompt question="How do you say 'I don't know'?" answer="Naaku teliyadu ⟨Naa-ku te-li-ya-du⟩"></orbit-prompt>
    <orbit-prompt question="How do you say 'I didn't understand'?" answer="Naaku ardham kaaledu ⟨Naa-ku ar-dham kaa-lay-du⟩"></orbit-prompt>
    <orbit-prompt question="If a shopkeeper asks 'Anything else?', how do you say 'Enough' (Bas)?" answer="Chaalu ⟨Chaa-lu⟩"></orbit-prompt>
</orbit-reviewarea>

## Group 3: Real Estate & Brokering

<orbit-reviewarea color="orange">
    <orbit-prompt question="What is the Telugu word for 'House'?" answer="Illu ⟨Il-lu⟩"></orbit-prompt>
    <orbit-prompt question="What is the Telugu word for 'Rent'?" answer="Adde ⟨Ad-day⟩"></orbit-prompt>
    <orbit-prompt question="How do you ask 'How much is the rent'?" answer="Adde entha? ⟨Ad-day en-tha?⟩"></orbit-prompt>
    <orbit-prompt question="What is the Telugu word for 'Landlord' or 'Owner'?" answer="Yajamaani ⟨Ya-ja-maa-ni⟩"></orbit-prompt>
    <orbit-prompt question="How do you say 'Please do the repair' (using the bridge system)?" answer="Repair cheyyandi ⟨Re-pair chey-yan-di⟩"></orbit-prompt>
</orbit-reviewarea>

## Group 4: Grocery Shopping (Vegetables)

<orbit-reviewarea color="#F5E6CC">
    <orbit-prompt question="What is the Telugu word for 'Potato'?" answer="Bangala dumpa or Alugadda ⟨A-lu-gad-da⟩"></orbit-prompt>
    <orbit-prompt question="What is the Telugu word for 'Onion'?" answer="Ullipaaya or Yerragadda ⟨Ul-li-paa-ya⟩"></orbit-prompt>
    <orbit-prompt question="What is the Telugu word for 'Tomato'?" answer="Tamota ⟨Ta-mo-ta⟩"></orbit-prompt>
    <orbit-prompt question="What is the Telugu word for 'Green Chilli'?" answer="Pachimirapa ⟨Pach-ch-mi-ra-pa⟩"></orbit-prompt>
    <orbit-prompt question="What is the Telugu word for 'Ladies Finger' (Bhindi)?" answer="Bendakaya ⟨Ben-da-ka-ya⟩"></orbit-prompt>
</orbit-reviewarea>

## Group 5: Local Slang & Culture

<orbit-reviewarea color="#F5E6CC">
    <orbit-prompt question="What Hyderabadi slang word means 'Bro' or 'Friend'?" answer="Mama ⟨Ma-ma⟩"></orbit-prompt>
    <orbit-prompt question="What Hyderabadi slang word means 'Awesome' or 'Fantastic'?" answer="Kiraak ⟨Ki-raak⟩"></orbit-prompt>
    <orbit-prompt question="What does 'Light teesko' mean?" answer="Take it easy / Forget it ⟨Lite tees-ko⟩"></orbit-prompt>
    <orbit-prompt question="In local Dakhini slang, how do you say 'No' or 'Don't'?" answer="Nakko ⟨Nak-ko⟩"></orbit-prompt>
    <orbit-prompt question="What does 'Baigan' literally translate to, and what does it mean in slang?" answer="Literal: Eggplant. Slang: Nonsense. ⟨Bai-gan⟩"></orbit-prompt>
</orbit-reviewarea>

<script>
document.addEventListener('DOMContentLoaded', () => {
    if (!window.swalpaStorage.load('flashcard_eng_tel_done')) {
        setTimeout(() => {
            window.unlockBadge && window.unlockBadge('flashcard_pro');
            import('/assets/js/progress.js').then(m => m.addPoints(15));
            window.swalpaStorage.save('flashcard_eng_tel_done', true);
        }, 3000);
    }
});
</script>
