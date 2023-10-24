import { Selector } from "testcafe";

fixture`Auth`.page`http://localhost:3000/`;

test("login works", async (t) => {
  const username = "bob";
  const password = "bob";
  const useNameInput = Selector('input[name="Input.Username"]');
  const passwordInput = Selector('input[name="Input.Password"]');

  await t
    .click("#login")
    .expect(useNameInput.exists)
    .ok()
    .typeText(useNameInput, username, { replace: true })
    .typeText(passwordInput, password, { replace: true })
    .pressKey("enter")
    .click("#logout")
});
