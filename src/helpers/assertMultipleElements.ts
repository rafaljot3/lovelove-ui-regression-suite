import { Locator } from "@playwright/test";
import { expect } from "@playwright/test";

export const assertMultipleElementsDisplayed = async (
  elementToAssert: Locator,
  assertNotToBeEmpty: boolean,
): Promise<void> => {
  await expect(elementToAssert.first()).toBeVisible();

  const countElementToAssert = await elementToAssert.count();
  expect(countElementToAssert).toBeGreaterThan(0);

  for (let i = 0; i < countElementToAssert; ++i) {
    await expect(elementToAssert.nth(i)).toBeVisible();
    if (assertNotToBeEmpty === true) {
      await expect(elementToAssert.nth(i)).not.toBeEmpty();
    }
  }
};

export const assertMultipleElementsHidden = async (elementToAssert: Locator): Promise<void> => {
  const countElementToAssert = await elementToAssert.count();

  for (let i = 0; i < countElementToAssert; ++i) {
    await expect(elementToAssert.nth(i)).toBeHidden({ timeout: 30000 });
  }
};
