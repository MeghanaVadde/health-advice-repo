// ML Model
const net = new brain.NeuralNetwork();

// List of 50+ symptoms
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

// Training Data
net.train([
    {
        input: { fever: 1, cough: 1, fatigue: 1 },
        output: { flu: 1 }
    },
    {
        input: { cold: 1, sneezing: 1, runny: 1 },
        output: { cold: 1 }
    },
    {
        input: { headache: 1, dizziness: 1 },
        output: { headache: 1 }
    },
    {
        input: { stomach: 1, nausea: 1, vomiting: 1 },
        output: { stomach: 1 }
    },
    {
        input: { chest: 1, breathing: 1 },
        output: { chest: 1 }
    }
]);

function getAdvice() {

    const inputText = document
        .getElementById("healthInput")
        .value
        .toLowerCase();

    const adviceBox = document.getElementById("adviceBox");

    const doctorIcon = "👨‍⚕️";

    // Convert text into ML inputs
    let inputs = {};

    symptomList.forEach(symptom => {
        inputs[symptom] = inputText.includes(symptom) ? 1 : 0;
    });

    // Run ML prediction
    const result = net.run(inputs);

    let predictedDisease = Object.keys(result)
        .reduce((a, b) => result[a] > result[b] ? a : b);

    const adviceData = {

        flu: {
            steps: [
                "Drink warm fluids",
                "Take rest",
                "Use steam inhalation"
            ],
            medicine: [
                "Paracetamol",
                "Cold relief tablets"
            ],
            precautions: [
                "Avoid cold drinks",
                "Stay warm"
            ]
        },

        cold: {
            steps: [
                "Drink warm water",
                "Take steam",
                "Rest well"
            ],
            medicine: [
                "Cetrizine",
                "Paracetamol"
            ],
            precautions: [
                "Avoid cold foods",
                "Keep warm"
            ]
        },

        headache: {
            steps: [
                "Rest in quiet room",
                "Drink water",
                "Relax"
            ],
            medicine: [
                "Paracetamol"
            ],
            precautions: [
                "Avoid stress",
                "Limit screen time"
            ]
        },

        stomach: {
            steps: [
                "Drink fluids",
                "Eat light food",
                "Rest"
            ],
            medicine: [
                "Antacid"
            ],
            precautions: [
                "Avoid spicy food",
                "Stay hydrated"
            ]
        },

        chest: {
            steps: [
                "Sit upright",
                "Relax breathing",
                "Rest"
            ],
            medicine: [
                "Consult doctor"
            ],
            precautions: [
                "Avoid exertion",
                "Seek help if severe"
            ]
        }
    };

    if (adviceData[predictedDisease]) {

        const { steps, medicine, precautions }
            = adviceData[predictedDisease];

        adviceBox.innerHTML = `
        <div class="advice-container">
            <div class="doctor-icon">${doctorIcon}</div>
            <div class="advice-content">

                <h3>🧠 ML Prediction: ${predictedDisease}</h3>

                <h3>Steps:</h3>
                <ul>${steps.map(s => `<li>${s}</li>`).join("")}</ul>

                <h3>Medicine:</h3>
                <ul>${medicine.map(m => `<li>${m}</li>`).join("")}</ul>

                <h3>Precautions:</h3>
                <ul>${precautions.map(p => `<li>${p}</li>`).join("")}</ul>

            </div>
            <div class="doctor-icon">${doctorIcon}</div>
        </div>
        `;

    } else {
        adviceBox.innerHTML =
            "No advice found. Please consult a doctor.";
    }
}

// Enter key support
document
.getElementById("healthInput")
.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        getAdvice();
    }
});
