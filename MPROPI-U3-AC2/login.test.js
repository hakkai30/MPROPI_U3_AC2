import { test, expect } from 'vitest'
import { isStrongPassword, isValidEmail } from './shared/validation.js'

// test: login fails with empty email 
test("login fails with empty email", () => {
  expect(isValidEmail("")).toBe(false);
});

// test: login fails with wrong password
test("login fails with wrong password", () => {
  expect(isStrongPassword("123")).toBe(false);
});

// test: login success
test("login success", () => {
  expect(isValidEmail("user@example.com")).toBe(true);
  expect(isStrongPassword("Admin123!")).toBe(true);
});

test("strong password requires special character", () => {
  expect(isStrongPassword("Admin123")).toBe(false);
});