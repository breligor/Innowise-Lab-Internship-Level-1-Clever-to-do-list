<template>
  <div id="calendar">
    <div class="calendar-header">
      <button @click="monthAgo" class="button is-rounded">prev</button>
      <h1 class="subtitle">{{ monthList[month] }} {{ year }}</h1>
      <button class="button is-rounded" @click="monthAHead">next</button>
    </div>
    <div>
      <div class="tablet">
        <div
          :class="{
            current: date.date.getDate() === nowDate,
            'other-month': date.date.getMonth() !== month,
          }"
          class="date box ml-2 block is-flex is-flex-direction-column"
          :key="date.date"
          v-for="date in dates"
          @click="
            this.id = date.date.toLocaleDateString();
            getDate();
          "
        >
          <h1>{{ days[date.date.getDay()] }}</h1>
          <h1 class="subtitle">{{ date.date.getDate() }}</h1>

          <div class="dotWrapper">
            <span v-if="date.active">•</span>
            <!-- <span class="done">•</span> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['todos'],
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
          date:new Date(this.year, this.month, start + i),
          active:this.hasActiveTask,
          id:(new Date(this.year, this.month, start + i)).toLocaleDateString()});
      }
  console.log(dates);
      // dates.forEach((element) => {
      //   this.arr.push(new Date(element).toLocaleDateString());
      // }); // делаем массив дат месяца в строковом представлении

      // console.log(Array.from(this.arr))
      // // console.log(this.arr);
      // // console.log(this.todos.map(it => it.taskDate));    

      return dates;
    },
    hasActiveTask(){
      // let intersection = (Array.from(this.arr).filter(it => (this.todos.map(it => it.taskDate)).includes(it)))
      // console.log(intersection)
      // return intersection.length > 0       
      return true
    }

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

    getDate() {
      this.$emit("getDate", this.id);
      //передаем дату дня в  род.компонент для фильтрации тасок по дням
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
  display: flex;
  align-items: center;
  justify-content: center;
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
  height: 1200px;
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
</style>
