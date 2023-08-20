import { permute } from "lib/utils";
import { slice } from "lodash";

describe("Slice test", () => {
  it("works", () => {
    const arr = [1, 2, 3];
    const perms = permute(arr);
    console.log(perms);
  });
});
