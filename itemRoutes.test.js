process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("./app");
let items = require("./fakeDb");

let testItem = { name: "sherbert", price: 4.50 };

beforeEach(function() {
  items.push(testItem);
});

afterEach(function() {
  items.length = 0;
});


/** GET /items - returns `{items: [item, ...]}` */

describe("GET /items", function() {
  test("Gets a list of items", async function() {
    const resp = await request(app).get(`/items`);
    expect(resp.statusCode).toBe(200);

    expect(resp.body).toEqual({items: [testItem]});
  });
});
// end

/** GET /items/[name] - return data about one item: `{item: item}` */

describe("GET /items/:name", function() {
  test("Gets a single item", async function() {
    const resp = await request(app).get(`/items/${testItem.name}`);
    expect(resp.statusCode).toBe(200);

    expect(resp.body).toEqual({item: testItem});
  });

  test("Responds with 404 if can't find item", async function() {
    const resp = await request(app).get(`/items/0`);
    expect(resp.statusCode).toBe(404);
  });
});
// end

/** POST /items - create item from data; return `{item: item}` */

describe("POST /items", function() {
  test("Creates a new item", async function() {
    const resp = await request(app)
      .post(`/items`)
      .send({
        name: "Ezra"
      });
    expect(resp.statusCode).toBe(201);
    expect(resp.body).toEqual({
      item: { name: "Ezra" }
    });
  });
});
// end

/** PATCH /items/[name] - update item; return `{item: item}` */

describe("PATCH /items/:name", function() {
  test("Updates a single item", async function() {
    const resp = await request(app)
      .patch(`/items/${testItem.name}`)
      .send({
        name: "icecream"
      });
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      updated:{ name: "icecream", price: 4.50 }
    });
  });

  test("Responds with 404 if id invalid", async function() {
    const resp = await request(app).patch(`/items/0`);
    expect(resp.statusCode).toBe(404);
  });
});
// end

/** DELETE /items/[name] - delete item,
 *  return `{message: "item deleted"}` */

describe("DELETE /items/:name", function() {
  test("Deletes a single a item", async function() {
    const resp = await request(app).delete(`/items/${testItem.name}`);
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({ message: "Deleted" });
  });
});