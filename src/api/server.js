import {
  Server,
  Model,
  Factory,
  belongsTo,
  hasMany,
  RestSerializer,
} from "miragejs";

import faker from "faker";

const initerPosts = [
  {
    id: "1",
    title: "First Post!",
    content: "Hello!",
    user: {
      id: "user1",
      name: "saeed",
    },
  },
  {
    id: "2",
    title: "Second Post",
    content: "More text",
    user: {
      id: "user1",
      name: "saeed",
    },
  },
  {
    id: "2",
    title: "manadar1 Post",
    content: "More text",
    user: {
      id: "user1",
      name: "saeed",
    },
  },
  {
    id: "2",
    title: "manadar2 Post",
    content: "More text",
    user: {
      id: "user1",
      name: "saeed",
    },
  },
  {
    id: "2",
    title: "manadar3 Post",
    content: "More text",
    user: {
      id: "user1",
      name: "saeed",
    },
  },
  {
    id: "2",
    title: "manadar4 Post",
    content: "More text",
    user: {
      id: "user2",
      name: "mostafa",
    },
  },
];

// import { sentence, paragraph, article, setRandom } from 'txtgen'
// import { parseISO } from 'date-fns'
// import seedrandom from 'seedrandom'

const base = "/api";

new Server({
  models: {
    reminder: Model.extend({
      list: belongsTo(),
    }),
    list: Model.extend({
      reminders: hasMany(),
    }),
    user: Model.extend({
      transaction: hasMany(),
    }),
    transaction: Model.extend({
      user: hasMany(),
    }),
  },
  serializers: {
    reminder: RestSerializer.extend({
      include: ["list"],
      embed: true,
    }),
    transaction: RestSerializer.extend({
      include: ["user", "product"],
      embed: true,
    }),
  },

  seeds(server) {
    // server.createList('reminder', 50)
    let useri = server.create("user", {
      name: faker.name.firstName(),
      nickName: faker.name.firstName(),
    });

    let homeList = server.create("list", { name: "Home" });
    server.create("reminder", { list: homeList, text: "Do taxes" });
    let workList = server.create("list", { name: "Work" });

    server.create("reminder", { list: workList, text: "Visit bank" });

    // server.create('transaction', { byer: useri, seller: useri })
  },
  factories: {
    reminder: Factory.extend({
      text: (i) => `Reminder text ${i}`,
    }),
    transaction: Factory.extend({
      product: faker.random.boolean() ? 1 : 2,
      amount: faker.random.number({
        min: 1,
        max: 2,
      }),
    }),
  },
  routes() {
    //Login
    this.namespace = base;
    this.timing = 2000;
    this.get("/testify", () => {
      return {
        data: [
          {
            id: 1,
            title: "Some Article",
            author: {
              id: 1,
              name: "Dan",
            },
          },
          {
            id: 2,
            title: "Other Article",
            author: {
              id: 1,
              name: "Dan",
            },
          },
        ],
      };
    });
    this.post("/init", (schema, request) => {
      // const token = JSON.parse(request.requestBody)
      return {
        status: "success",
        data: {
          products: [
            { id: 1, title: "24ayar" },
            { id: 2, title: "18ayar" },
          ],
          selects: {
            saeed: [{ name: "123", id: "123" }],
          },
          menus: {
            top: [
              { name: "hime", id: "123456" },
              { name: "hime", id: "hime123456" },
            ],
          },
        },
      };
    });
    this.post(`/login`, (schema, request) => {
      const vals = JSON.parse(request.requestBody);

      return {
        status: "sms_pending",
        message: "کد پیامک شده را وارد کنید",
        data: vals,
      };
    });

    this.post(`/check`, (schema, request) => {
      const vals = JSON.parse(request.requestBody);
      let { otp } = vals;
      otp = Number(otp);
      if (otp === 1)
        return {
          status: "verified",
          message: "یوزر وجود دارد و برو به صفحه داشبورد",
          data: { token: "tokenManadar" },
        };

      if (otp === 2)
        return {
          status: "not_completed",
          message: "هنوز فرم پر نکرده است",
          data: null,
        };
      if (otp === 3)
        return {
          status: "correction",
          message: "توسط ادیمن ریفیوز شده است",
          data: {
            profile: {
              fullname: `${faker.name.firstName()} ${faker.name.lastName()}`,
              code_melli: faker.random.number(),
              mobile: faker.phone.phoneNumber(),
              gender: faker.random.boolean() ? "male" : "female",
              birthdate: faker.date.past(),
              occupation: faker.name.jobTitle(),
              address: faker.address.city(),
              melli_cart_image: faker.image.food(),
              shenasname_image: faker.image.food(),
              bank_name: faker.random.number(),
              bank_account_number: faker.random.number(),
              iban: faker.random.number(),
              bank_approval_image: faker.image.food(),
              city_id: faker.random.number(),
            },
          },
        };

      if (otp === 4) {
        return {
          status: "pending",
          message: "ادمین داره کار میکنه هنوز جوابت نداده",
          data: null,
        };
      }
      return {
        status: "codeIsNotValid",
        message: "حاجی کوری درست بفرست",
        data: null,
      };
    });

    this.post("/api/reminders", (schema, request) => {
      let attrs = JSON.parse(request.requestBody);
      console.log(attrs);
      return schema.reminders.create(attrs);
    });
    this.delete("/api/reminders/:id", (schema, request) => {
      let id = request.params.id;
      return schema.reminders.find(id).destroy();
    });

    // lists

    this.get("/api/lists", (schema, request) => {
      return schema.lists.all();
    });

    this.get("/api/lists/:id/reminders", (schema, request) => {
      let listId = request.params.id;
      let list = schema.lists.find(listId);
      return list.reminders;
    });
    this.get("/posts", () => {
      return { data: initerPosts };
    });
  },
});
