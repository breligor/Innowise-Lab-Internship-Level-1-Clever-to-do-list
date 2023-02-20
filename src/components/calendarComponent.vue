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
          :class="[item.getDayClass, item.getMonthClass]"
          class="date box"
          :key="item.id"
          v-for="(item, index) in dates"
          @click="getDate(index)"
        >
          <div>
            <h1>{{ days[item.date.getDay()] }}</h1>
          </div>
          <div>
            <h1 class="subtitle">{{ item.date.getDate() }}</h1>
          </div>
          <div>
            <span v-show="hasActiveTask(item.id)" class="is-size-4 has-text-danger"
              >•</span
            >
            <span v-show="hasDoneTask(item.id)" class="is-size-4 has-text-success"
              >•</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { days, nowDate, month, year, monthList } from "@/data";

export default {
  props: ["todos"],
  data() {
    return {
      days,
      nowDate,
      month,
      year,
      monthList,
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
      let datesList = [];
      for (let i = 0; i < 36; i++) {
        let newDate = new Date(this.year, this.month, start + i);
        datesList.push({
          date: newDate,
          id: newDate.toLocaleDateString(),
          getDayClass: newDate.getDate() === this.nowDate ? "current" : "",
          getMonthClass: newDate.getMonth() !== this.month ? "other-month" : "",
        });
      }
      return datesList;
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
    getDate(index) {
      this.id = this.dates[index].date.toLocaleDateString(); // по клику получаем id дня === дате  в нужном формате
      this.$emit("getDate", this.id); // отправляем этот  id в homePage для фильтрации массива всех тасок по этому id
    },

    //определяем, содержится ли конкретный день календаря в массиве существующих тасок
    //для определения дней, отмечаемых точкой
    hasActiveTask(id) {
      return this.todos.map((it) => it.taskDate).includes(id);
    },

    // определяем наличие сделанных тасок
    hasDoneTask(id) {
      const temp = this.todos.filter((it) => it.taskDate === id).map((it) => it.done);
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
  align-items: center;
  h1{
    margin-bottom: 0;
  }
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
  width: 120px;
  height: 100vw;
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
