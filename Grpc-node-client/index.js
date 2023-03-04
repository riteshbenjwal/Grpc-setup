const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const packageDefinition = protoLoader.loadSync("./todo.proto", {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
var todoService = protoDescriptor.TodoService;

const client = new todoService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

client.listTodos({}, (err, todos) => {
  if (!err) {
    client.createTodo(
      {
        id: "3",
        title: "Todo3",
        content: "Content of todo 3",
      },
      (err, res) => {
        if (!err) {
          console.log(res);
        } else {
          console.log(err);
        }
      }
    );
  }
});
