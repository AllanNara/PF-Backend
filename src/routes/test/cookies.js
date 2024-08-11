import { Router } from "express";
import cookieParser from "cookie-parser";

const router = Router();
router.use(cookieParser("s3creT pa$sW#rd"));

router.get("/set-cookie", (req, res) => {
	res.cookie("custom-cookie", "'my cookie is alive!!!'", { maxAge: 50000 });
	res.send("Success set cookie");
});

router.get("/get-cookie", (req, res) => {
	req.logger.verbose(
		`Cookies ${Boolean(Object.keys(req.cookies).length)}`,
		req.cookies
	);
	res.send(
		`<h3>My cookie! </h3> </br>
		<p>My personal cookie is ${
			req.cookies["custom-cookie"]
				? req.cookies["custom-cookie"]
				: "not defined :("
		}`
	);
});

router.get("/destroy-cookie", (req, res) => {
	if (!req.cookies["custom-cookie"])
		return res.send("Custom cookie not defined yet");
	res.clearCookie("custom-cookie").send("Cookie removed!!");
});

router.get("/set-safeCookie", (req, res) => {
	res.cookie("secure-cookie", "'My cookie is safe!'", {
		maxAge: 50000,
		// secure: true, // Only HTTPS protocol
		sameSite: "strict",
		httpOnly: true,
		signed: true
	});
	res.send("Success set cookie with httpOnly and signed property set 'true'");
});

router.get("/get-safeCookie", (req, res) => {
	if (!req.signedCookies["secure-cookie"]) {
		req.logger.verbose(`ADULTERATED SIGNED COOKIE`);
	} else {
		req.logger.verbose(
			`Signed cookies ${Boolean(Object.keys(req.signedCookies).length)}`,
			req.signedCookies
		);
	}
	res.send(
		`<h3>Safe cookies </h3> </br>
		<p>My safe cookie is ${
			req.signedCookies["secure-cookie"]
				? req.signedCookies["secure-cookie"]
				: "not defined :("
		}`
	);
});

router.get("/destroy-safeCookie", (req, res) => {
	if (!req.signedCookies["secure-cookie"])
		return res.send("Secure cookie not defined yet");
	res.clearCookie("secure-cookie").send("Safe cookie deleted successfully");
});

export default router;
