
model User {
    name: string;
    uid: int64;
}

model Post {
    title: string;
    body: string;
    uid: int64;
    pid: int64;
}
