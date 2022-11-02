
import auth from "../routes/api/auth";
import user from "../routes/api/user";
import profile from "../routes/api/profile";
import ground from "../routes/api/grounds";
import slots from "../routes/api/slots.routes";


export const initRoutes = (app: any) => {
    app.use("/api/auth", auth);
    app.use("/api/user", user);
    app.use("/api/profile", profile);
    app.use("/api/ground", ground);
    app.use("/api/v1/slots", slots);
    return;
}