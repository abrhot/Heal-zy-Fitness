r = list(map(int, input().split()))
t = []
for i in r:
    k = 1 - i
    t.append(k)
    q = 1 - i
    t.append(q)
    R = 2 - i
    r.append(R)
    u = 2 - i
    t.append(u)
    h = 2 - i
    t.append(h)
    y = 8 - i
    t.append(y)
print(t)



app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
