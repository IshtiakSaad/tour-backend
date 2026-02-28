import { Router } from "express";
import { UserRoutes } from "../modules/user/user.routes.js";
// import { AuthRoutes } from "../modules/auth/auth.routes.js";
// import { BookingRoutes } from "../modules/booking/booking.routes.js";

const router = Router();

const moduleRoutes: { path: string; router: Router }[] = [
  { path: "/user", router: UserRoutes },
  // { path: "/auth", router: AuthRoutes },
  // { path: "/bookings", router: BookingRoutes },
];

moduleRoutes.forEach((module) => {
  router.use(module.path, module.router);
});

export default router;