// describe('<App />', () => {
//   it('has 1 child', () => {
//     const tree = renderer.create(<App />).toJSON();
//     expect(tree.children.length).toBe(1);
//   });
// });
// import * as React from "react";
// import renderer from "react-test-renderer";
// import { MonoText } from "../StyledText";
// it(`renders correctly`, () => {
//   const tree = renderer.create(<MonoText>Snapshot test!</MonoText>).toJSON();
//   expect(tree).toMatchSnapshot();
// });
import "isomorphic-fetch";

import * as TreEst from "@/api/treest";

describe("TreEst API", () => {
  let sid: string;

  it("register", async () => {
    sid = (await TreEst.register()).sid;
  });

  it("getLines", async () => {
    console.log(await TreEst.getLines(sid));
  });
});
