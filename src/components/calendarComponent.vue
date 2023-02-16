<template>
  <div id="calendar">
    <div class="calendar-header">
      <button @click="monthAgo" class="button is-rounded">prev</button>
      <h1 class="subtitle">{{ monthList[month] }} {{ year }}</h1>
      <button class="button is-rounded" @click="monthAHead">next</button>
    </div>
    <div class="calendarItemsWrapper">
      <div class="tablet pl-4">
        <div
          :class="{
            current: date.date.getDate() === nowDate,
            'other-month': date.date.getMonth() !== month,
          }"
          class="date box"
          :key="date.date.toLocaleDateString()"
          v-for="date in dates"
          @click="
            this.id = date.date.toLocaleDateString();
            getDate();
          "
        >
          <div>
            <h1>{{ days[date.date.getDay()] }}</h1>
          </div>
          <div>
            <h1 class="subtitle">{{ date.date.getDate() }}</h1>
          </div>
          <div>
            <span
              v-show="hasActiveTask(date.id)"
              class="is-size-4 has-text-danger"
              >•</span
            >
            <span
              v-show="hasDoneTask(date.id)"
              class="is-size-4 has-text-success"
              >•</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["todos"],
  data() {
    return {
      days: [
        "Воскресенье",
        "Понедельник",
        "Вторник",
        "Среда",
        "Четверг",
        "Пятница",
        "Суббота",
      ],
      nowDate: new Date().getDate(),
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
      monthList: [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь",
      ],
      isOtherMonth: "",
      arr: [],
      id: "",
    };
  },
  computed: {
    dates() {
      let firstDay = new Date(this.year, this.month, 1); // первый день текущего месяца
      let day = firstDay.getDay() - 1; // день недели число 0-6
      if (day == -1) {
        day = 6;
      }
      let start = 1 - day;
      let dates = [];
      for (let i = 0; i < 36; i++) {
        dates.push({
          date: new Date(this.year, this.month, start + i),
          id: new Date(this.year, this.month, start + i).toLocaleDateString(),
        });
      }
      return dates;
    },
  },
  methods: {
    monthAgo() {
      this.month--;
      if (this.month < 0) {
        this.month = 11;
        this.year--;
      }
    },
    monthAHead() {
      this.month++;
      if (this.month > 11) {
        this.month = 0;
        this.year++;
      }
    },
    //передаем дату дня в  род.компонент для фильтрации тасок по дням
    getDate() {
      this.$emit("getDate", this.id);
    },

    //определяем, содержится ли конкретный день календаря в массиве существующих тасок
    //для определения дней, отмечаемых точкой
    hasActiveTask(id) {
      return this.todos.map((it) => it.taskDate).includes(id);
    },

    // определяем наличие сделанных тасок
    hasDoneTask(id) {
      const temp = this.todos
        .filter((it) => it.taskDate === id)
        .map((it) => it.done);
      return temp.includes(true) ? true : false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "bulma/css/bulma.min.css";

.calendar-header {
  display: flex;
  justify-content: space-around;
}
.calendar-header:not(:last-child) {
  margin-bottom: 20px;
}
.date {
  width: 80px;
  height: 80px;
  border: 1px solid #fff;
  padding: 3px;
  text-align: center;
  color: rgb(10, 0, 0);
  font-size: 20px;
  font-weight: 600;
  justify-content: center;
  &:hover {
    cursor: pointer;
  }
}

.day {
  font-weight: bold;
  background-color: rgb(44, 56, 90);
  font-size: 8px;
}
.date:hover {
  background-color: rgb(169, 178, 205);
  transition: all 0.3s ease 0s;
}
.current {
  background-color: rgb(154, 224, 154);
}
.other-month {
  background-color: rgb(255, 210, 210);
}
.tablet {
  width: 140px;
  height: 1300px;
  overflow-y: auto;
  overflow-x: hidden;
  transform: rotate(-90deg) translateY(-100px);
  transform-origin: right top;
}
.tablet::-webkit-scrollbar {
  display: none;
}
.date {
  font-size: 12px;
  width: 90px;
  height: 90px;
  transform: rotate(90deg);
  transform-origin: right top;
}
.calendarItemsWrapper {
  width: 100%;
  max-width: 100vw;
}
</style>
