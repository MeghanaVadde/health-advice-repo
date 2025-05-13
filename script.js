function getAdvice() {
    const input = document.getElementById("healthInput").value.toLowerCase().trim();
    const adviceBox = document.getElementById("adviceBox");
    let advice = "";

    const doctorIcon = "👨‍⚕️";

    const adviceData = {
        "headache": {
            steps: [
                "Drink plenty of water",
                "Rest in a quiet, dark room",
                "Avoid screen time"
            ],
            medicine: [
                "Take mild pain reliever like Paracetamol"
            ],
            precautions: [
                "Avoid loud noise and bright lights",
                "Consult a doctor if pain is severe or frequent"
            ]
        },
        "cold": {
            steps: [
                "Drink warm fluids",
                "Take steam inhalation",
                "Rest well"
            ],
            medicine: [
                "Use OTC cold relief (e.g., Cetrizine, Paracetamol)"
            ],
            precautions: [
                "Avoid cold food and drinks",
                "Wash hands frequently"
            ]
        },
        "stomach ache": {
            steps: [
                "Drink clear fluids",
                "Avoid solid food for a few hours",
                "Apply a warm compress"
            ],
            medicine: [
                "Use antacids or simethicone if needed"
            ],
            precautions: [
                "Avoid spicy/oily food",
                "Consult a doctor if pain persists"
            ]
        },
        "fever": {
            steps: [
                "Stay hydrated",
                "Get enough rest",
                "Use cold compress if temperature is high"
            ],
            medicine: [
                "Paracetamol (500mg) every 6 hours if needed"
            ],
            precautions: [
                "Monitor temperature regularly",
                "Avoid overexertion"
            ]
        },
        "cough": {
            steps: [
                "Drink warm water with honey",
                "Use a humidifier",
                "Gargle with salt water"
            ],
            medicine: [
                "Cough syrup (e.g., Benadryl or Honitus)"
            ],
            precautions: [
                "Avoid cold and dusty environments",
                "Do not smoke"
            ]
        },
        "back pain": {
            steps: [
                "Apply heat or cold packs",
                "Do light stretching exercises",
                "Use a supportive chair or cushion"
            ],
            medicine: [
                "Mild painkillers like Ibuprofen (if no allergy)"
            ],
            precautions: [
                "Avoid heavy lifting",
                "Take frequent breaks from sitting"
            ]
        },
        "sore throat": {
            steps: [
                "Gargle with warm salt water",
                "Stay hydrated with warm drinks",
                "Use throat lozenges"
            ],
            medicine: [
                "Paracetamol or throat sprays"
            ],
            precautions: [
                "Avoid smoking or cold drinks",
                "Seek doctor if severe"
            ]
        },
        "diarrhea": {
            steps: [
                "Drink ORS or electrolyte fluids",
                "Eat bland food (banana, rice, toast)",
                "Rest adequately"
            ],
            medicine: [
                "ORS, Zinc tablets, and Loperamide if advised"
            ],
            precautions: [
                "Avoid street food or unclean water",
                "Maintain hand hygiene"
            ]
        },
        "skin rash": {
            steps: [
                "Apply calamine lotion or aloe vera",
                "Use mild soap for cleaning",
                "Keep area dry"
            ],
            medicine: [
                "Antihistamines (e.g., Cetrizine)",
                "Hydrocortisone cream if prescribed"
            ],
            precautions: [
                "Avoid scratching",
                "Wear loose cotton clothing"
            ]
        }
    };

    if (adviceData[input]) {
        const { steps, medicine, precautions } = adviceData[input];

        advice = `
            <div class="advice-container">
                <div class="doctor-icon">${doctorIcon}</div>
                <div class="advice-content">
                    <h3>✅ Steps to Follow:</h3>
                    <ul>${steps.map(s => `<li>${s}</li>`).join('')}</ul>
                    <h3>💊 Medicine to Be Taken:</h3>
                    <ul>${medicine.map(m => `<li>${m}</li>`).join('')}</ul>
                    <h3>⚠️ Precautions to Cure:</h3>
                    <ul>${precautions.map(p => `<li>${p}</li>`).join('')}</ul>
                </div>
                <div class="doctor-icon">${doctorIcon}</div>
            </div>
        `;
    } else {
        advice = "❗ Sorry, we don't have advice for that issue. Please consult a healthcare professional.";
    }

    adviceBox.innerHTML = advice;
}
