<template>
  <div class="wrapperTodo">
    <div class="title has-text-centered">WHAT's TODO</div>
    <div class="field is-grouped mb-5">
      <p class="control is-expanded">
        <input class="input" type="text" placeholder="Add a todo..." />
      </p>
      <p class="control">
        <a class="button is-info"> Add </a>
      </p>
    </div>

    <div class="card mb-5"
    v-for = "i in 3"

    >
      <div class="card-content">
        <div class="content">
          <div class="columns is-mobile is-vcentered">
            <div class="column">my btn</div>
            <div class="column is-3 had-text-right">
              <button class="button is-light">&check;</button>
              <button class="button is-danger ml-2">&cross;</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script></script>

<style>
@import "bulma/css/bulma.min.css";
.wrapperTodo {
  width: 100%;
  max-width: 600px;
  padding: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
</style>
