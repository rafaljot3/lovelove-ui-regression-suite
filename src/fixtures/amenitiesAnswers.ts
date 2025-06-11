import { test as base } from '@playwright/test';

const amenitiesAnswers = [
  "w ofercie", "jeszcze jak!", "możesz na to liczyć", "ma się rozumieć",
  "oczywiście że tak", "bez dwóch zdań", "pewnie!", "naturalnie!",
  "oczywiście!", "jasna sprawa",
];

const amenitiesAnswersPattern = new RegExp(amenitiesAnswers.join("|"), "i");

export const test = base.extend<{
  amenitiesAnswersPattern: RegExp;
}>({
  amenitiesAnswersPattern: async ({}, use) => {
    await use(amenitiesAnswersPattern);
  },
});

export { expect } from '@playwright/test';
