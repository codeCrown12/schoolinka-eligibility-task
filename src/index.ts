import App from "./app"
import AuthRoute from "./routes/auth.route"
import BlogRoute from "./routes/blog.route"

const app = new App([
    new AuthRoute(),
    new BlogRoute()
])

app.listen()