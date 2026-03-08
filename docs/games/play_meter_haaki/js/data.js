/* ========================================
   GAME DATA — Meter Haaki
   ======================================== */

export const NPCS = {
    'Anna': {
        name: 'Anna (The Friendly)',
        voice: 'Warm',
        modifiers: { respect: 1.0, patience: 1.2 },
        description: 'Middle-aged, helpful. Rewards genuine effort.'
    },
    'Mama': {
        name: 'Mama (The Hustler)',
        voice: 'Fast',
        modifiers: { respect: 1.2, patience: 0.8 },
        description: 'Young, streetwise. Respects confidence and slang.'
    }
};

export const LEVELS = {
    1: {
        title: "The Enquiry",
        background: "url('assets/auto_stand_bg.png')",
        dialogue: {
            start: {
                text: "Yes sir, where to?",
                choices: [
                    {
                        text: "HITEC City ki vestaara?",
                        translation: "Will you go to HITEC City?",
                        effect: { respect: 10, patience: 0 },
                        next: "fare_negotiation",
                        feedback: "Good start! 'Ki vestaara' is the perfect respectful inquiry."
                    },
                    {
                        text: "HITEC City chal.",
                        translation: "(Speaking Hindi roughly)",
                        effect: { respect: -10, patience: -10 },
                        next: "fare_negotiation_angry",
                        feedback: "Rough start. Using Hindi 'chal' sounds commanding and disrespectful."
                    },
                    {
                        text: "I need to go to HITEC City.",
                        translation: "(Speaking English)",
                        isEnglish: true,
                        effect: { respect: -5, patience: -5, barrier: true },
                        next: "fare_negotiation",
                        feedback: "Speaking English marks you as an outsider immediately."
                    }
                ]
            },
            fare_negotiation: {
                text: "HITEC City aan? 300 rupees ayithadhi.",
                choices: [
                    {
                        text: "Meter petta-ra?",
                        translation: "Will you put the meter?",
                        effect: { respect: 10, patience: 0, wallet: 0 },
                        next: "meter_refusal",
                        feedback: "Asking for the meter is the right move."
                    },
                    {
                        text: "Take 300.",
                        translation: "(Paying without bargaining)",
                        effect: { respect: -5, patience: +10, wallet: -300 },
                        next: "ride_start",
                        feedback: "You paid the foreigner tax. Wallet takes a hit, but the driver is happy."
                    }
                ]
            },
            fare_negotiation_angry: {
                text: "Kya chal? 400 rupees aithadhi.",
                choices: [
                    {
                        text: "Idhi ekkuva kadha? 200 teesukondi.",
                        translation: "Isn't this too much? Take 200.",
                        effect: { respect: 15, patience: -5, wallet: -200 },
                        next: "ride_start",
                        feedback: "Excellent recovery! 'Idhi ekkuva kadha' shows you know the rates."
                    },
                    {
                        text: "Meter prakaaram charge cheyyandi.",
                        translation: "Charge according to the meter.",
                        effect: { respect: 5, patience: -10, wallet: 0 },
                        next: "meter_refusal",
                        feedback: "Formal but effective."
                    }
                ]
            },
            meter_refusal: {
                text: "Meter panicheyatledu sir. Traffic untadi.",
                choices: [
                    {
                        text: "Koncham tagginchandi anna. 200?",
                        translation: "Reduce a little brother. 200?",
                        effect: { respect: 15, patience: 0, wallet: -200 },
                        next: "ride_start",
                        feedback: "Perfect! Calling him 'Anna' and asking to reduce ('tagginchandi') works wonders."
                    },
                    {
                        text: "Nakko mama, lite teesko.",
                        translation: "No bro, forget it.",
                        effect: { respect: 20, patience: -5 },
                        next: "level_complete",
                        feedback: "Kiraak! Using local Dakhini slang ('Nakko mama') earns massive respect."
                    }
                ]
            },
            ride_start: {
                text: "Sari, kurchondi. (Okay, sit down)",
                choices: [
                    { text: "Continue Journey", translation: "Start the ride", effect: { respect: 0 }, next: "level_complete" }
                ]
            }
        }
    },
    2: {
        title: "The Drop",
        background: "url('assets/hitec_city_bg.png')",
        dialogue: {
            start: {
                text: "We are reaching HITEC City. Where to drop?",
                choices: [
                    {
                        text: "Ikkada right, akkada left.",
                        translation: "Right here, left there.",
                        effect: { respect: 10, wallet: 0 },
                        next: "drop_point",
                        feedback: "Perfect use of Ikkada (here) and Akkada (there)."
                    },
                    {
                        text: "Just go straight.",
                        translation: "(Speaking English)",
                        isEnglish: true,
                        effect: { respect: -5, wallet: 0, barrier: true },
                        next: "drop_point",
                        feedback: "Lost a bit of respect for reverting to English."
                    }
                ]
            },
            drop_point: {
                text: "Okay sir. Stop here?",
                choices: [
                    {
                        text: "Avunu, ikkada aapandi.",
                        translation: "Yes, stop here.",
                        effect: { respect: 15, wallet: 0 },
                        next: "level_complete",
                        feedback: "Excellent! 'Aapandi' (please stop) is the respectful imperative."
                    },
                    {
                        text: "Ruko yahan.",
                        translation: "(Hindi command)",
                        effect: { respect: -10, wallet: 0 },
                        next: "level_complete",
                        feedback: "Commanding in Hindi is seen as rude."
                    }
                ]
            }
        }
    }
};
