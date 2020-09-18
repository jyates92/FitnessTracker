const API = {
  async getLastWorkout() {
    let res;
    try {
      res = await fetch("/api/workouts");
    } catch (err) {
      console.log(err);
    }
    const json = await res.json();

    const lastWorkout = json[json.length - 1];
    const totalDuration = lastWorkout.exercises.reduce((prev, curr) => {
      return curr.duration + prev;
    }, 0);

    return { ...lastWorkout, totalDuration };
  },
  async addExercise(data) {
    console.log("addExercise", data);

    const res = await fetch("/api/add-exercise", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const json = await res.json();

    return json;
  },
  async createWorkout(data = {}) {
    console.log("createWorkout", data);

    const res = await fetch("/api/add-workout", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    const json = await res.json();

    return json;
  },

  async getWorkoutsInRange() {
    const res = await fetch(`/api/workouts/range`);
    const json = await res.json();
    return json;
  },
};
