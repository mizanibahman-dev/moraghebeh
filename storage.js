const STORAGE_KEY = "moraghebeh_v2";

function loadHabits() {

    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) {

        return [];

    }

    try {

        return JSON.parse(data);

    } catch {

        return [];

    }

}

function saveHabits(habits) {

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(habits)

    );

}

function createHabit(name) {

    const habits = loadHabits();

    habits.push({

        id: Date.now(),

        name: name,

        createdAt: new Date().toISOString(),

        history: {}

    });

    saveHabits(habits);

}

function getTodayKey() {

    return new Date().toLocaleDateString("fa-IR");

}

function findHabit(id) {

    const habits = loadHabits();

    return habits.find(h => h.id == id);

}function addPositive(id) {

    const habits = loadHabits();

    const today = getTodayKey();

    habits.forEach(habit => {

        if (habit.id == id) {

            if (!habit.history[today]) {

                habit.history[today] = {

                    positive: 0,

                    negative: 0

                };

            }

            habit.history[today].positive++;

        }

    });

    saveHabits(habits);

}

function addNegative(id) {

    const habits = loadHabits();

    const today = getTodayKey();

    habits.forEach(habit => {

        if (habit.id == id) {

            if (!habit.history[today]) {

                habit.history[today] = {

                    positive: 0,

                    negative: 0

                };

            }

            habit.history[today].negative++;

        }

    });

    saveHabits(habits);

}function calculateTotals(habit){

    let positive = 0;

    let negative = 0;

    Object.values(habit.history).forEach(day=>{

        positive += day.positive;

        negative += day.negative;

    });

    const total = positive + negative;

    let percent = 0;

    if(total>0){

        percent = Math.round(

            positive / total * 100

        );

    }

    return{

        positive,

        negative,

        total,

        percent

    };

}

function deleteHabit(id){

    let habits = loadHabits();

    habits = habits.filter(

        h=>h.id!=id

    );

    saveHabits(habits);

}