// ---------------- ML Model Setup ----------------
const net = new brain.NeuralNetwork({ hiddenLayers: [10] });

// Symptom list
const symptomList = [
    "headache","fever","cold","cough","fatigue","nausea","vomiting",
    "dizziness","sore throat","back pain","chest pain","diarrhea",
    "constipation","rash","itching","sneezing","runny nose","body pain",
    "joint pain","muscle pain","stomach ache","abdominal pain",
    "loss of appetite","weight loss","weight gain","anxiety",
    "depression","insomnia","blurred vision","ear pain","toothache",
    "dry mouth","sweating","chills","high temperature","low energy",
    "breathing problem","shortness of breath","heartburn",
    "acidity","gas","bloating","burning sensation","swelling",
    "redness","irritation","weakness","fainting","palpitations",
    "cold hands","cold feet","tingling","numbness"
];

// Sample ML training data for 5 diseases
const trainingData = [
    { input: { fever:1, cough:1, fatigue:1 }, output: { flu:1 } },
    { input: { headache:1, dizziness:1 }, output: { migraine:1 } },
    { input: { cold:1, sneezing:1, runny:1 }, output: { cold:1 } },
    { input: { stomach:1, nausea:1, vomiting:1 }, output: { stomach:1 } },
    { input: { chest:1, breathing:1, fatigue:1 }, output: { asthma:1 } }
];

net.train(trainingData, {
    iterations: 20000,
    errorThresh: 0.005,
    log: true,
    logPeriod: 2000
});

// ---------------- Symptom-to-Advice Map ----------------
const adviceData = {
    "headache": { steps:["Rest in quiet room","Drink water"], medicine:["Paracetamol"], precautions:["Limit screen time"] },
    "fever": { steps:["Stay hydrated","Rest"], medicine:["Paracetamol"], precautions:["Monitor temperature"] },
    "cold": { steps:["Drink warm fluids","Steam inhalation"], medicine:["Cetrizine"], precautions:["Avoid cold drinks"] },
    "cough": { steps:["Use humidifier","Honey water"], medicine:["Cough syrup"], precautions:["Avoid smoke"] },
    "fatigue": { steps:["Rest","Hydrate"], medicine:[], precautions:["Avoid overwork"] },
    "nausea": { steps:["Drink water","Eat light food"], medicine:["Antiemetic if needed"], precautions:["Avoid strong smells"] },
    "vomiting": { steps:["Hydrate","Rest"], medicine:["Antiemetic if needed"], precautions:["Avoid solid food initially"] },
    "dizziness": { steps:["Sit or lie down","Hydrate"], medicine:[], precautions:["Avoid sudden movement"] },
    "sore throat": { steps:["Gargle warm salt water","Drink warm fluids"], medicine:["Throat lozenges"], precautions:["Avoid cold drinks"] },
    "back pain": { steps:["Stretch gently","Apply heat/cold"], medicine:["Ibuprofen if no allergy"], precautions:["Avoid heavy lifting"] },
    "chest pain": { steps:["Sit upright","Rest"], medicine:["Consult doctor"], precautions:["Seek urgent help if severe"] },
    "diarrhea": { steps:["Drink ORS","Eat bland food"], medicine:["Loperamide if advised"], precautions:["Maintain hygiene"] },
    "rash": { steps:["Apply calamine lotion","Keep area dry"], medicine:["Antihistamines"], precautions:["Avoid scratching"] },
    "joint pain": { steps:["Gentle movement","Rest"], medicine:["Painkillers if needed"], precautions:["Avoid strenuous activity"] },
    "muscle pain": { steps:["Stretch","Rest"], medicine:["Painkillers if needed"], precautions:["Avoid overuse"] },
    "stomach ache": { steps:["Hydrate","Light diet"], medicine:["Antacids"], precautions:["Avoid spicy food"] },
    "anxiety": { steps:["Deep breathing","Relaxation"], medicine:[], precautions:["Seek counseling if needed"] },
    "depression": { steps:["Talk to someone","Exercise"], medicine:[], precautions:["Seek professional help"] },
    "insomnia": { steps:["Sleep routine","Avoid caffeine"], medicine:[], precautions:["Keep room dark"] },
    "ear pain": { steps:["Warm compress","Rest"], medicine:["Ear drops if prescribed"], precautions:["Avoid inserting objects"] },
    "toothache": { steps:["Salt water rinse","Brush gently"], medicine:["Painkillers if needed"], precautions:["See dentist"] },
    "shortness of breath": { steps:["Sit upright","Calm breathing"], medicine:["Consult doctor"], precautions:["Seek urgent help if severe"] },
    "heartburn": { steps:["Avoid spicy food","Drink water"], medicine:["Antacids"], precautions:["Avoid lying down after meals"] },
    "acidity": { steps:["Avoid oily food","Drink water"], medicine:["Antacids"], precautions:["Eat small meals"] },
    "bloating": { steps:["Walk gently","Drink water"], medicine:["Simethicone if needed"], precautions:["Avoid carbonated drinks"] },
    "swelling": { steps:["Elevate affected area","Rest"], medicine:[], precautions:["Consult doctor if persistent"] },
    "redness": { steps:["Cold compress","Clean area"], medicine:["Topical creams"], precautions:["Avoid irritants"] },
    "weakness": { steps:["Hydrate","Rest"], medicine:[], precautions:["Balanced diet"] },
    "fainting": { steps:["Lie down","Hydrate"], medicine:[], precautions:["Seek medical help if recurrent"] },
    "tingling": { steps:["Move affected limb","Rest"], medicine:[], precautions:["Consult doctor if persistent"] },
    "numbness": { steps:["Gentle movement","Rest"], medicine:[], precautions:["Consult doctor if persistent"] },
    "sweating": { steps:["Hydrate","Rest"], medicine:[], precautions:["Monitor for fever"] },
    "chills": { steps:["Stay warm","Hydrate"], medicine:[], precautions:["Monitor temperature"] },
    "blurred vision": { steps:["Rest eyes","Hydrate"], medicine:[], precautions:["See eye doctor if persistent"] },
    "dry mouth": { steps:["Drink water","Chew sugar-free gum"], medicine:[], precautions:["Avoid caffeine"] },
    "palpitations": { steps:["Rest","Calm breathing"], medicine:[], precautions:["Consult doctor if frequent"] },
    "cold hands": { steps:["Keep warm","Massage hands"], medicine:[], precautions:["Monitor for circulation issues"] },
    "cold feet": { steps:["Warm socks","Massage feet"], medicine:[], precautions:["Monitor for circulation issues"] }
};

// ---------------- Prediction & Advice ----------------
function getAdvice() {
    const inputText = document.getElementById("healthInput").value.toLowerCase();
    const adviceBox = document.getElementById("adviceBox");
    const doctorIcon = "👨‍⚕️";

    // Convert input text into ML input
    let inputs = {};
    symptomList.forEach(symptom => {
        inputs[symptom] = inputText.includes(symptom) ? 1 : 0;
    });

    // Run ML prediction
    const result = net.run(inputs);
    let predictedDisease = Object.keys(result)
        .reduce((a,b) => result[a] > result[b] ? a : b);

    // Prepare final advice
    let finalAdvice = "";

    // First, check if ML predicted a known disease
    if (["flu","migraine","cold","stomach","asthma"].includes(predictedDisease)) {
        finalAdvice += `
        <div class="advice-container">
            <div class="doctor-icon">${doctorIcon}</div>
            <div class="advice-content">
                <h3>🧠 ML Prediction: ${predictedDisease}</h3>
                <p>This prediction is based on multiple symptoms.</p>
            </div>
            <div class="doctor-icon">${doctorIcon}</div>
        </div>
        `;
    }

    // Then, provide symptom-specific advice for all detected symptoms
    symptomList.forEach(symptom => {
        if (inputText.includes(symptom) && adviceData[symptom]) {
            const { steps, medicine, precautions } = adviceData[symptom];
            finalAdvice += `
            <div class="advice-container">
                <div class="doctor-icon">${doctorIcon}</div>
                <div class="advice-content">
                    <h3>✅ Symptom: ${symptom}</h3>
                    <h4>Steps to Follow:</h4>
                    <ul>${steps.map(s => `<li>${s}</li>`).join('')}</ul>
                    <h4>Medicine:</h4>
                    <ul>${medicine.map(m => `<li>${m}</li>`).join('')}</ul>
                    <h4>Precautions:</h4>
                    <ul>${precautions.map(p => `<li>${p}</li>`).join('')}</ul>
                </div>
                <div class="doctor-icon">${doctorIcon}</div>
            </div>
            `;
        }
    });

    if (!finalAdvice) {
        finalAdvice = "❗ Sorry, we don't have advice for the entered symptoms. Please consult a doctor.";
    }

    adviceBox.innerHTML = finalAdvice;
}

// ---------------- Enter Key Support ----------------
document.getElementById("healthInput")
    .addEventListener("keypress", function(e){
        if (e.key === "Enter") getAdvice();
    });
