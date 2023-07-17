<script lang="ts">
  import { t, locale, initialized } from '$lib/translations';

  let value: string = 'en';
  let randomNumber = 0;

  async function handleLocaleChange(event: any) {
    event.preventDefault();
    value = event?.target?.value;
    $locale = value;
    await fetch('/api', {
      body: JSON.stringify({locale:  $locale}),
      method: 'POST'
    });
  }

  function getCurrencyCode(): string {
    switch($locale) {
      case 'en': return 'USD';
      case 'hi': return 'INR';
      case 'fr': return 'EUR';
      default: return 'USD';
    }
  }
</script>

<div class="container">
  {#if $initialized}
    <div class="container__title">
      <h1>{$t('heading')}</h1>
    </div>
    <div class="container__toggle">
      <span>{$t('toggle_label')}: </span>
      <select {value} on:change={handleLocaleChange}>
        <option value="en" selected>English</option>
        <option value="hi">Hindi</option>
        <option value="fr">French</option>
      </select>

      <!-- <select bind:value={$locale}>
        {#each $locales as locale, i}
          {#if i === 0}
            <option value={locale} selected>{locale.toUpperCase()}</option>
          {:else}
            <option value={locale}>{locale.toUpperCase()}</option>
          {/if}
        {/each}
      </select> -->
    </div>
    <div class="container__content">
      <p>{$t('body_text', { dateValue: Date.UTC(2023, 6, 14, 0, 0, 0, 0), download: 3722 }, { date: { year: "numeric", month: "long", day: "numeric" }})}</p>

      <div class="container__content__plural">
        <div class="container__content__plural__buttons">
          <button class:active={randomNumber === 0} on:click={() => randomNumber = 0}>{$t('button_label_0', { value: 0 })}</button>
          <button class:active={randomNumber === 1} on:click={() => randomNumber = 1}>{$t('button_label_1', { value: 1 })}</button>
          <button class:active={randomNumber === 2} on:click={() => randomNumber = 2}>{$t('button_label_2', { value: 2 })}</button>
        </div>
        <span>{$t('awards', { award: randomNumber })}</span>
      </div>

      <div class="container__content__formatter">
        <span><strong>Time: </strong>{$t('time')}</span>
        <span><strong>Date: </strong>{$t('date', {val: new Date()}, { date: {year: "numeric", month: "long", day: "numeric"} })}</span>
        <span><strong>Currency: </strong>{$t('number', { value: 3722 }, { currency: { style: "currency", currency: getCurrencyCode() } })}</span>
      </div>
    </div>
  {:else}
    <div class="container__content">Locale initializing...</div>
  {/if}
</div>

<style lang="scss">
  .container {
    display: flex;
    flex-direction: column;
    margin: 1rem;

    &__title {
      display: flex;
      justify-content: center;
    }

    &__toggle {
      padding: 0 1rem;
      font-size: 1.4rem;
      line-height: 2rem;

      select {
        padding: 0.25rem;
        font-size: 1rem;
        margin-left: 1rem;
      }
    }

    &__content {
      display: flex;
      flex-direction: column;
      padding: 0 1rem;
      font-size: 1.4rem;
      line-height: 2rem;
      text-align: justify;

      &__plural {
        display: flex;
        flex-direction: column;
        margin: 1rem 0;
        
        button {
          margin-right: 2rem;
        }

        span {
          margin-top: 1rem;
        }

        .active {
          color: blue;
          background-color: aliceblue;
          padding: 0.5rem;
        }
      }

      &__formatter {
        display: flex;
        flex-direction: column;
        margin-top: 1rem;
      }
    }
  }
</style>
